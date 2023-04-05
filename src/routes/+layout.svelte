<script lang="ts">
	import '../app.postcss';
	import 'carbon-components-svelte/css/g10.css';
	import {
		Header,
		SkipToContent,
		HeaderUtilities,
		HeaderPanelLink,
		HeaderPanelDivider,
		HeaderAction,
		HeaderPanelLinks,
		Content
	} from 'carbon-components-svelte';
	let isOpen = false;
</script>

<header company="PTSGRN">
	<span slot="platform" class="font-mono">Labs</span>
	<svelte:fragment slot="skip-to-content">
		<skiptocontent />
	</svelte:fragment>
	<headerutilities>
		<headeraction bind:isopen>
			<headerpanellinks>
				<headerpaneldivider>Switcher subject 1</headerpaneldivider>
				<headerpanellink href="about">Switcher item 1</headerpanellink>
				<headerpaneldivider>Switcher subject 2</headerpaneldivider>
				<headerpanellink>Switcher item 1</headerpanellink>
				<headerpanellink>Switcher item 2</headerpanellink>
				<headerpanellink>Switcher item 3</headerpanellink>
				<headerpanellink>Switcher item 4</headerpanellink>
				<headerpanellink>Switcher item 5</headerpanellink>
			</headerpanellinks>
		</headeraction>
	</headerutilities>
</header>

<content>
	<slot />
</content>
