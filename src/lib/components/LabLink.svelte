<script lang="ts">
  import { UnorderedList, ListItem } from 'carbon-components-svelte';
  export let href = "/"
</script>

<ListItem>
  <a href={href}><slot/></a>
</ListItem>