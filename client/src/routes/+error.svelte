<script lang="ts">
	export let status: number | string | undefined = 404;
</script>

<main>
	<h1>Page Not Found</h1>
	<p>Status: {status}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 2rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
	}
</style>
