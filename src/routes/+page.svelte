<script lang="ts">
	import { ClickableTile, Column, Grid, Row, UnorderedList } from 'carbon-components-svelte';
	import ShowLab from '$lib/components/ShowLab.svelte';
</script>

<svelte:head>
	<title>Patsagorn's Code Labs</title>
	<meta
		name="description"
		content="Welcome to my playground! In here will be mostly my mini project or code that I interested in for Web devlopment."
	/>
</svelte:head>

<div class="flex flex-col">
	<div class="">
		<h1>Patsagorn's Code Labs</h1>
		<p>
			Welcome to my playground! In here will be mostly my mini project or code that I interested in
			for Web development.
		</p>
	</div>
	<div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		<ShowLab href="/dotted-hover-background">
			<enhanced:img
				class="grid-image"
				src="$lib/thumbnail/dotted-hover-background.png"
				title="Dotted Hover Background"
			/>
		</ShowLab>
		<ShowLab href="/sync-todo">
			<enhanced:img class="grid-image" src="$lib/thumbnail/sync-todo.png" />
		</ShowLab>
		<ShowLab href="/rock-paper-scissors-tournament">
			<enhanced:img class="grid-image" src="$lib/thumbnail/rock-paper-scissors-tournament.png" />
		</ShowLab>
	</div>
</div>

<style lang="scss">
	.grid-image {
		@apply aspect-video object-cover align-bottom justify-start;
	}
</style>
