<script lang="ts">
	import '../app.postcss';
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Toast />
<slot />

<style lang="postcss">
	:global(.tippy-box[data-theme='current']) {
		border-radius: var(--theme-rounded-base);
		@apply text-white bg-gray-900;
	}
</style>
