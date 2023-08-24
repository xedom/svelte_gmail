<script>
	import InboxEmailRow from '$lib/components/InboxEmailRow.svelte';

	export let emails;
	export let selectedEmails = [];
</script>

<div class="flex flex-col">
	{#each emails as email (email.id)}
		<!-- <div class="flex items-center gap-2 bg-slate-300 px-4 py-2"> -->
		<InboxEmailRow {email} on:message />
	{/each}
</div>
