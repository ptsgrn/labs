<script lang="ts">
	import { page } from '$app/stores';
	import {
		Button,
		Checkbox,
		Column,
		Form,
		FormGroup,
		Grid,
		Row,
		Slider
	} from 'carbon-components-svelte';
	import { Maximize } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	let container: HTMLDivElement | null = null;
	let parentContainer: HTMLDivElement | null = null;

	type Emoji = '🪨' | '✂️' | '📄';
	type EmojiName = 'rock' | 'scissors' | 'paper';

	const emojisWinMap: Record<Emoji, Emoji> = {
		'🪨': '✂️',
		'✂️': '📄',
		'📄': '🪨'
	};
	const emojiLoseMap: Record<Emoji, Emoji> = {
		'🪨': '📄',
		'✂️': '🪨',
		'📄': '✂️'
	};
	const emojiName: Record<Emoji | EmojiName, Emoji | EmojiName> = {
		'🪨': 'rock',
		'✂️': 'scissors',
		'📄': 'paper',
		rock: '🪨',
		scissors: '✂️',
		paper: '📄'
	};
	const emojiList: EmojiName[] = ['rock', 'paper', 'scissors'];

	let containerRect: DOMRect | undefined;
	let config = {
		speed: $page.url.searchParams.get('speed') ? parseInt($page.url.searchParams.get('speed')!) : 5,
		count: $page.url.searchParams.get('count') ? parseInt($page.url.searchParams.get('count')!) : 20
	};
	let eachCount = $page.url.searchParams.get('count')
		? parseInt($page.url.searchParams.get('count')!)
		: 20;
	let count = {
		rock: 0,
		paper: 0,
		scissors: 0
	};

	enum gameStatus {
		Playing,
		Win,
		Stoped
	}

	let status = gameStatus.Playing;
	let logs: string[] = [];
	let showLogs = false;
	const log = (...args: string[]) => {
		console.log('[G]', ...args);
		logs = [...logs, args.join(' ')];
	};

	onMount(() => {
		const containerRect = container?.getBoundingClientRect();
		if (!containerRect) return;
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
						const childEmoji = childNode.innerText as Emoji;
						const otherEmoji = otherNode.innerText as Emoji;
						if (emojisWinMap[childEmoji] === otherEmoji) {
							// child wins
							log(childEmoji, '+', otherEmoji, '=', childEmoji);
							otherNode.innerText = childEmoji;
							count[emojiName[childEmoji]]++;
							count[emojiName[otherEmoji]]--;
						} else if (emojisWinMap[otherEmoji] === childEmoji) {
							// other wins
							log(childEmoji, '+', otherEmoji, '=', otherEmoji);
							childNode.innerText = otherEmoji;
							count[emojiName[otherEmoji]]++;
							count[emojiName[childEmoji]]--;
						}
						childNode.dataset.t = emojiName[childNode.innerText];
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
					x: [1, -1][~~(Math.random() * 2)],
					y: [1, -1][~~(Math.random() * 2)]
				};
				// random speed
				let speed = ~~(Math.random() * config.speed) + 1;
				// move
				pos.x += dir.x * speed;
				pos.y += dir.y * speed;
				// is out of bounds?
				if (pos.x < 0 || pos.x > containerRect.width || pos.y < 0 || pos.y > containerRect.height) {
					// push it off the wall
					if (pos.x < 0) pos.x = 0;
					if (pos.x > containerRect.width - 30) pos.x = containerRect.width - 30;
					if (pos.y < 0) pos.y = 0;
					if (pos.y > containerRect.height - 30) pos.y = containerRect.height - 30;
				}
				childNode.style.left = `${pos.x}px`;
				childNode.style.top = `${pos.y}px`;
			}
		}
		function wiggly() {
			if (status === gameStatus.Stoped) return;
			wigglyMoveChildren();
			checkCollisions();
			requestAnimationFrame(wiggly);
		}

		function start() {
			// random position each child
			const children = container?.childNodes;
			if (!children) return;
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child instanceof Text) continue;
				if (!containerRect) return;
				count[child.dataset.t as keyof typeof count]++;
				const childNode = child as HTMLSpanElement;
				childNode.addEventListener('click', (e) => {
					e.preventDefault();
					log(childNode.innerText, '=>', emojiLoseMap[childNode.innerText as Emoji]);
					childNode.innerText = emojiLoseMap[childNode.innerText as Emoji];
					reCount();
				});
				childNode.style.left = `${~~(Math.random() * containerRect.width) - 20}px`;
				childNode.style.top = `${~~(Math.random() * containerRect.height) - 20}px`;
			}
			requestAnimationFrame(wiggly);
		}

		function reCount() {
			const children = container?.childNodes;
			if (!children) return;
			count = {
				rock: 0,
				paper: 0,
				scissors: 0
			};
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child instanceof Text) continue;
				if (!containerRect) return;
				child.dataset.t = emojiName[child.innerText as Emoji];
				count[child.dataset.t as keyof typeof count]++;
			}
		}
		start();
	});

	function onContainerResize() {
		containerRect = container?.getBoundingClientRect();
	}

	let isFullscreen = false;
	function onFullscreenClick() {
		if (!parentContainer) return;
		if (parentContainer.requestFullscreen) {
			parentContainer.requestFullscreen();
			isFullscreen = true;
		}
	}
	function onExitFullscreenClick() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			isFullscreen = false;
		}
	}
</script>

<svelte:head>
	<title>Rock Paper Scissors Tournament</title>
	<meta name="description" content="You-can-decide version of famous rock paper scissors game" />
	<meta
		name="keywords"
		content="rock paper scissors, rock paper scissors tournament, rock paper scissors game"
	/>
	<meta name="author" content="ptsgrn.dev" />
	<meta property="og:title" content="Rock Paper Scissors Tournament" />
	<meta
		property="og:description"
		content="You-can-decide version of famous rock paper scissors game"
	/>
</svelte:head>

<svelte:window />

<div class="container bg-white" bind:this={parentContainer}>
	<Grid>
		<Row>
			<Column>
				<div
					on:resize={onContainerResize}
					bind:this={container}
					class="relative resize my-3 border-solid h-[80vh] [&>span]:text-xl [&>span]:absolute [&>span]:duration-200
		[&>span]:-m-2 [&>span]:select-none [&>span]:cursor-pointer"
				>
					{#each Array(eachCount) as _}
						{#each emojiList as ptype}
							<span data-t={ptype}>
								{emojiName[ptype]}
							</span>
						{/each}
					{/each}
				</div></Column
			>
		</Row>
		<Row>
			{#each emojiList as ptype}
				{#if count[ptype] !== 0}
					<Column class="text-center">
						<span class="text-2xl">
							{emojiName[ptype]}x {count[ptype]}
						</span>
					</Column>
				{/if}
			{/each}
		</Row>
		{#if isFullscreen}
			<Row>
				<Button kind="secondary" on:click={onExitFullscreenClick} size="small"
					>Exit Fullscreen</Button
				>
			</Row>
		{/if}
	</Grid>
</div>
<Button
	kind="ghost"
	class=""
	on:click={onFullscreenClick}
	iconDescription="Fullscreen"
	icon={Maximize}
/>
<Form>
	<Slider bind:value={config.speed} labelText="Speed" fullWidth min={1} max={16} />
	<FormGroup>
		<Slider
			bind:value={config.count}
			labelText="Number of player for each type (need to apply before taking effect)"
			fullWidth
			min={3}
			max={100}
		/>
		<Button
			href={`/rock-paper-scissors-tournament?speed=${
				$page.url.searchParams.get('speed') || 5
			}&count=${config.count}`}
			data-sveltekit-reload
			size="small">Apply</Button
		>
	</FormGroup>
	<Checkbox bind:checked={showLogs} labelText="Show Logs" />
</Form>
{#if showLogs}
	<div class="flex flex-wrap-reverse items-start content-start space-x-1 gap-1">
		{#each logs as l, idx}
			<span class="p-1 bg-stone-100 font-mono rounded-md">
				[{idx}] {l}
			</span>
		{/each}
	</div>
{/if}
