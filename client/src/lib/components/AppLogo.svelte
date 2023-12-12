<script>
	export let showLabel = true;
</script>

<div class="container">
	<a href="/" class="flex">
		<img src="/favicon.png" alt="logo" />

		{#if showLabel}
			<p>e-Bakuna</p>
		{/if}
	</a>
</div>

<style lang="postcss">
	.container {
		@apply flex items-center;
	}

	img {
		@apply mx-2 w-8 h-8;
	}

	p {
		@apply text-xl;
	}
</style>
