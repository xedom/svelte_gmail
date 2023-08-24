<script>
	import InboxEmailRow from '$lib/components/InboxEmailRow.svelte';

	export let emails;
</script>

<div class="flex flex-col">
	{#each emails as email}
		<!-- <div class="flex items-center gap-2 bg-slate-300 px-4 py-2"> -->
		<InboxEmailRow {email} />
	{/each}
</div>
