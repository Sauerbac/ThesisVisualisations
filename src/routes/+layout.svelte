<script>
	import '../app.css';

	import { page } from '$app/stores';
	$page.url.pathname;
	$: console.log($page.url.pathname);
</script>

<div class="flex flex-col h-dvh">
	<div class="flex w-full border-b border-zinc-600 bg-zinc-200">
		<div class="flex mx-auto font-semibold text-lg">
			<a
				href="/"
				class="px-8 py-4 border-b-4 {$page.url.pathname === '/'
					? 'border-teal-600'
					: 'hover:border-zinc-400'}">Animation</a
			>
			<a
				href="/explorer"
				class="px-8 py-4 border-b-4 {$page.url.pathname === '/explorer'
					? 'border-teal-600'
					: 'hover:border-zinc-400'}">Explorer</a
			>
		</div>
	</div>
	<div class="flex flex-col mx-auto w-full md:w-2/3 h-full">
		<slot />
	</div>
</div>
