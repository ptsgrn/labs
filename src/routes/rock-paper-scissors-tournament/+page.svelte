<script lang="ts">
	import { Choices } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	let container: HTMLDivElement | null = null;

	const emojisWinMap: Record<string, string> = {
		'🪨': '✂️',
		'✂️': '📄',
		'📄': '🪨'
	};

	let info = {
		cpuUsage: 0,
		memoryUsage: 0,
		frameRate: 0
	};

	onMount(() => {
		const containerRect = container?.getBoundingClientRect();
		if (!containerRect) return;
		console.log(containerRect);
		container?.childNodes.forEach((child) => {
			if (child instanceof Text) return;
			// randomly move emojis around
			const childNode = child as HTMLSpanElement;
			let pos = {
				x: ~~(Math.random() * containerRect.width),
				y: ~~(Math.random() * containerRect.height)
			};
			function updatePos() {
				childNode.style.left = `${pos.x}px`;
				childNode.style.top = `${pos.y}px`;
			}
			updatePos();
		});

		function isColliding(a: HTMLElement, b: HTMLElement) {
			const aRect = a.getBoundingClientRect();
			const bRect = b.getBoundingClientRect();
			return !(
				aRect.top + aRect.height < bRect.top ||
				aRect.top > bRect.top + bRect.height ||
				aRect.left + aRect.width < bRect.left ||
				aRect.left > bRect.left + bRect.width
			);
		}

		function checkCollisions() {
			const children = container?.childNodes;
			if (!children) return;
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child instanceof Text) continue;
				const childNode = child as HTMLSpanElement;
				for (let j = i + 1; j < children.length; j++) {
					const other = children[j];
					if (other instanceof Text) continue;
					const otherNode = other as HTMLSpanElement;
					if (isColliding(childNode, otherNode)) {
						const childEmoji = childNode.innerText;
						const otherEmoji = otherNode.innerText;
						if (emojisWinMap[childEmoji] === otherEmoji) {
							// child wins
							console.log('C ', childEmoji, 'O ', otherEmoji, 'W ', emojisWinMap[childEmoji]);
							otherNode.innerText = childEmoji;
						} else if (emojisWinMap[otherEmoji] === childEmoji) {
							// other wins
							console.log('C ', childEmoji, 'O ', otherEmoji, 'W ', emojisWinMap[otherEmoji]);
							childNode.innerText = otherEmoji;
						}
					}
				}
			}
		}

		function wigglyMoveChildren() {
			const children = container?.childNodes;
			if (!children) return;
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child instanceof Text) continue;
				if (!containerRect) return;
				const childNode = child as HTMLSpanElement;
				// current position
				let pos = {
					x: parseInt(childNode.style.left),
					y: parseInt(childNode.style.top)
				};
				// random direction
				let dir = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1
				};
				// random speed
				let speed = Math.random() * 2 + 1;
				// move
				pos.x += dir.x * speed;
				pos.y += dir.y * speed;
				// is out of bounds?
				if (pos.x < 0 || pos.x > containerRect.width) {
					// reset position
					pos = {
						x: ~~(Math.random() * containerRect.width),
						y: ~~(Math.random() * containerRect.height)
					};
				}
				childNode.style.left = `${pos.x}px`;
				childNode.style.top = `${pos.y}px`;
			}
		}
		setInterval(() => {
			wigglyMoveChildren();
			checkCollisions();
		}, 100);
	});
</script>

<div class="container">
	<h1>Rock Paper Scissors Tournament</h1>

	<div
		bind:this={container}
		class="relative border-2 border-solid h-64 border-black [&>span]:text-lg"
	>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
		<span class="absolute"> 🪨 </span>
		<span class="absolute"> ✂️ </span>
		<span class="absolute"> 📄 </span>
	</div>
</div>
