<script>
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Thesis: Optimization Visualisation</title>
</svelte:head>

<div class="p-2 md:w-3/4 lg:w-1/2 md:mx-auto">
	<h1 class="m-4 text-center font-semibold text-xl md:text-3xl">
		Visualisation of the progress of Nelder-Mead optimization algorithm for my masters thesis
	</h1>
	<div class="h-full">
		<video controls loop src="{base}/mix_grid.mp4"><track kind="captions" /></video>
	</div>
</div>
