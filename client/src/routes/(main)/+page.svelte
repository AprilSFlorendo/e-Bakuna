<script>
	import Fader from '$lib/components/Fader.svelte';
</script>

<div class="container mx-auto flex justify-center items-center">
	<Fader>
		<div class="p-2 shrink-0 space-y-10 text-center flex flex-col items-center">
			<h2 class="h2">Welcome to e-Bakuna!</h2>
			<!-- Animated Logo -->
			<figure>
				<section class="img-bg" />
				<img src="/favicon.png" alt="logo" />
			</figure>
			<!-- / -->
			<div class="flex justify-center space-x-2">
				<a
					class="btn variant-filled"
					href="https://github.com/AprilSFlorendo/e-Bakuna"
					target="_blank"
					rel="noreferrer"
				>
					Launch Documentation
				</a>
			</div>
		</div>
	</Fader>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}

	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}

	figure img {
		width: 50%;
		height: 50%;
		align-self: center;
	}

	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
