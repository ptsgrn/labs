<script lang="ts">
	import { ClickableTile } from 'carbon-components-svelte';
	export let href = '';
</script>

<ClickableTile {href} class="flex align-top">
	<slot />
	<code class="px-2 mt-3 text-sm"> ⬢{href}</code>
</ClickableTile>
