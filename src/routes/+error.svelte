<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<div class="error-code">
		{$page.status}
	</div>
	<div class="error-message">
		{$page.error?.message}
	</div>
</div>

<style>
	.container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}
	.error-code {
		font-size: 2rem;
		margin: 8px;
	}
	.error-message {
		font-size: medium;
	}
</style>
