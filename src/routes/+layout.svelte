<script>
	import './styles.css';
	import '../app.postcss';
	import Navbar from '../lib/components/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar.svelte';
	import InboxSidebar from '../lib/components/InboxSidebar.svelte';

	let collapseInboxSideBar = false;
	const toggleCollapse = () => (collapseInboxSideBar = !collapseInboxSideBar);
</script>

<div class="flex h-screen flex-col bg-gray-100">
	<div class="absolute top-0 flex h-full w-[4.25rem] flex-col items-center gap-1 bg-slate-200 pt-16"></div>

	<Navbar />

	<div class="z-10 flex flex-1 pb-2 pr-2">
		<div class="flex h-full w-[4.25rem] flex-col items-center gap-1">
			<Sidebar />
			<button on:click={toggleCollapse}>collapse</button>
		</div>

		<div
			class="mx-1 h-full overflow-hidden transition-all duration-300 ease-in-out"
			class:w-[15.625rem]={!collapseInboxSideBar}
			class:w-[0rem]={collapseInboxSideBar}
		>
			<InboxSidebar />
		</div>

		<div class="flex-1 overflow-hidden rounded-2xl bg-white">
			<slot />
		</div>
	</div>
</div>
