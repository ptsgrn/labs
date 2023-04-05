<script lang="ts">
	import '@fontsource/ibm-plex-mono/latin.css'
	import '@fontsource/ibm-plex-sans-thai'
	import 'carbon-components-svelte/css/all.css';
	import { expoIn } from 'svelte/easing';
	import Home from "carbon-icons-svelte/lib/Home.svelte";
	import {
		Header,
		SkipToContent,
		HeaderUtilities,
		HeaderPanelLink,
		HeaderPanelDivider,
		HeaderAction,
		Content,
		HeaderNav,
		HeaderNavItem,
		SideNav,
		SideNavItems,
		SideNavLink
	} from 'carbon-components-svelte';
	let isSideNavOpen = false;
	let isOpen = false;
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
