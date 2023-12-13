<script lang="ts">
	export let href: `https://${string}` | `http://${string}`;
</script>

<a {href} target="_blank" rel="noopener noreferrer">
	<slot />
</a>

<style lang="scss">
	a::after {
		font-size: 1em;
		margin-left: 0.2em;
		content: '';
	}
	a[href*='developer.mozilla.org']::after {
		background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="m21.538 1.1l-6.745 21.8h-2.77L18.77 1.1ZM24 1.1v21.8h-2.462V1.1Zm-12 0v21.8H9.538V1.1Zm-2.462 0L2.77 22.9H0L6.746 1.1Z"%2F%3E%3C%2Fsvg%3E');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: 0 0.2em;
		width: 0.85em;
		height: 0.85em;
		display: inline-block;
	}
</style>
