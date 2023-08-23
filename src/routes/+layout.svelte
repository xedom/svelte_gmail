<script>
	import './styles.css';
	import '../app.postcss';
	import Navbar from '../lib/components/Navbar.svelte';
</script>

<div class="flex h-screen flex-col">
	<div class="absolute top-0 -z-10 h-full w-[68px] bg-blue-400"></div>
	<div class="absolute top-0 -z-20 h-full w-full bg-gray-100"></div>
	<Navbar />
	<!-- <div class="ml-[68px] overflow-hidden rounded-lg bg-black p-2"> -->
	<div class="ml-[324px] flex flex-1 pb-2 pr-2">
		<div class="flex-1 overflow-hidden rounded-2xl bg-white">
			<slot />
		</div>
	</div>
</div>
