<script>
	import './styles.css';
	import '../app.postcss';
	import Navbar from '../lib/components/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar.svelte';
	import InboxSidebar from '../lib/components/InboxSidebar.svelte';
</script>

<div class="flex h-screen flex-col bg-gray-100">
	<Sidebar />
	<!-- <div class="absolute top-0 flex h-full w-[68px] flex-col items-center pt-14"></div> -->
	<InboxSidebar />
	<Navbar />
	<!-- <div class="ml-[68px] overflow-hidden rounded-lg bg-black p-2"> -->
	<div class="ml-[324px] flex flex-1 pb-2 pr-2">
		<div class="flex-1 overflow-hidden rounded-2xl bg-white">
			<slot />
		</div>
	</div>
</div>
