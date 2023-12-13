<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import type { ButtonProps } from 'carbon-components-svelte/types/Button/Button.svelte';
	import { Maximize, Minimize } from 'carbon-icons-svelte';
	export let ref: HTMLElement;
	export let isFullscreen = false;
	export let size: ButtonProps['size'] = 'small';

	function handleClick() {
		if (isFullscreen) {
			document.exitFullscreen();
			isFullscreen = false;
		} else {
			ref.requestFullscreen();
			isFullscreen = true;
		}
	}
</script>

<Button
	kind="ghost"
	on:click={handleClick}
	iconDescription={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
	icon={isFullscreen ? Minimize : Maximize}
	{size}
	{...$$restProps}
/>
