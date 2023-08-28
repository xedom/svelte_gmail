<script>
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import InboxSidebar from '$lib/components/InboxSidebar.svelte';
	import EmailModal from '$lib/components/EmailModal.svelte';

	let collapseInboxSideBar = false;
	const toggleCollapse = () => (collapseInboxSideBar = !collapseInboxSideBar);
	function handleMessage(event) {
		const eventType = event.detail?.type;
		if (eventType && eventType == 'collapse') toggleCollapse();
	}

	let collapseDraftModal = false;
	const toggleDraftModal = () => (collapseDraftModal = !collapseDraftModal);
	function handleDraftMessage(event) {
		const eventType = event.detail?.type;
		if (eventType && eventType == 'close-draft') toggleDraftModal();
	}
</script>

<div class="flex h-screen flex-col bg-gray-100">
	<div class="absolute top-0 flex h-full w-[4.25rem] flex-col items-center gap-1 bg-slate-200 pt-16"></div>

	<EmailModal on:message={handleDraftMessage} bind:show={collapseDraftModal} />
	<Navbar on:message={handleMessage} />

	<div class="z-10 flex h-3 flex-grow pb-2 pr-2">
		<div class="flex h-full min-w-[4.25rem] flex-col items-center gap-1">
			<Sidebar />
		</div>

		<div
			class="mx-1 h-full overflow-hidden transition-all duration-300 ease-in-out"
			class:w-[15.625rem]={!collapseInboxSideBar}
			class:w-[0rem]={collapseInboxSideBar}
		>
			<InboxSidebar on:message={handleDraftMessage} />
		</div>

		<div class="flex h-full flex-1 flex-col rounded-2xl bg-white">
			<slot />
		</div>
	</div>
</div>
