<svelte:head>
  <title>
    Dotted Hover Background
  </title>
</svelte:head>
<svelte:window bind:scrollX bind:scrollY/>

<script lang="ts">
  import Lorem from '$lib/components/Lorem.svelte';
	import { onMount } from 'svelte';
  let mousePos = {
    x: 0,
    y: 0
  }
  let scrollX = 0;
  let scrollY = 0;
  let bgE: HTMLDivElement
  /**
   * Get Element Offset relative to documents
   * @param {HTMLElement} element Target element
   */
  function offset(element: HTMLDivElement|null){
    if (element === null) return {top:0, left:0}
    let rect = element.getBoundingClientRect(),
    scrollLeft = document.documentElement.scrollLeft,
    scrollTop = document.documentElement.scrollTop,
    offsetWidth = element.clientWidth,
    offsetHeight = element.clientHeight;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      offsetWidth,
      offsetHeight
    }
  }
  let elementOffset: {
    top: number;
    left: number;
    offsetWidth: number;
    offsetHeight: number;
}
  onMount(()=>{
    elementOffset = offset(document.querySelector('.bg'))
    document.querySelector('.innerbg').addEventListener('mousemove', (e)=>{
      e.preventDefault()
      mousePos = {
        x: e.clientX,
        y: e.clientY
      }
    })
  })
  function cssVariables(node: HTMLElement, variables: {[x:string]:string|null}) {
		setCssVariables(node, variables);
		
		return {
			update(variables: {[x:string]:string|null}) {
				setCssVariables(node, variables);
			}
		}
	}
	function setCssVariables(node: HTMLElement, variables: {[x:string]:string|null}) {
		for (const name in variables) {
			node.style.setProperty(`--${name}`, variables[name]);
		}
	}
</script>

<!-- <span class="blob" use:cssVariables={{top: `${mousePos.y+scrollY}px`, left: `${mousePos.x+scrollX}px`}}></span> -->
<div>
  <div class="bg" use:cssVariables={{x: `${mousePos.x}px`, y: `${mousePos.y}px` }}>
    <div class="innerbg"></div>
  </div>
  {JSON.stringify(mousePos)}
  {JSON.stringify(elementOffset)}
  <Lorem/>
</div>

<style>
  div {
    color: #a8a8a8;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    user-select: all;
  }
  /* .blob {
    display: block;
    width: 75px;
    height: 75px;
    position: absolute;
    z-index: -5;
    -webkit-background-composite: border;
    border: 5px solid #333;
    border-radius: 50%;
    top: var(--top);
    left: var(--left);
    transform: translate(-50%, -50%);
    background: none;
  } */
  .bg {
    --dotsColor: 255 255 255;
    --bg: radial-gradient(circle at center, rgb(var(--dotsColor)) 10%, rgb(var(--dotsColor) / 0.2) var(--dotRadius, 100%));
    --bgSize: var(--size);
    --cardBg: transparent;
    background: var(--cardBg);
    overflow: hidden;
  }
  .innerbg {
    position: relative;
    aspect-ratio: 1;
    background: rgb(8, 8, 8);
    filter: contrast(var(--contrast, 20)) invert(1);
    mix-blend-mode: multiply;
  }
  .innerbg::before {
    content: '';
    position: absolute;
    top:0;
    left:0;
    inset: 0;
    background-image: var(--bg);
    background-size: var(--bgSize, .85rem) var(--bgSize, .85rem);
    background-repeat: round;
    background-position: 0 0, 0 0;
    mask-image: radial-gradient(40px 40px, rgb(0 0 0), rgb(0 0 0 / 0.5));
    mask-size: cover;
    mask-position: 0 0;
    transition: background-size 100ms;
    mask-position: var(--x, 0) var(--y, 0);
  }
</style>