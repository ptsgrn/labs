<script lang="ts">
	import { UnorderedList, ListItem } from 'carbon-components-svelte';
	export let href = '/';
</script>

<ListItem>
	<a {href} class="hover:bg-blue-500 hover:text-base-100"><slot /></a>
</ListItem>
