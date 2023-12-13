<script lang="ts">
	import '../app.scss';
	import '../app.postcss';
	import '@fontsource/ibm-plex-mono/latin.css';
	import '@fontsource/ibm-plex-sans-thai';
	import 'carbon-components-svelte/css/all.css';
	import Home from 'carbon-icons-svelte/lib/Home.svelte';
	import {
		Header,
		SkipToContent,
		Content,
	} from 'carbon-components-svelte';
	let isSideNavOpen = false;
</script>

<Header company="PTSGRN" bind:isSideNavOpen href="/">
	<span slot="platform" class="font-mono">Labs</span>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
</Header>

<Content>
	<slot />
</Content>
