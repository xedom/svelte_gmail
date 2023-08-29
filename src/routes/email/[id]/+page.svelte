<script>
	import { emailStore } from '$lib/store/emails';
	import Email from '$lib/components/Email.svelte';
	import InboxToolbar from '$lib/components/InboxToolbar.svelte';
	import { page } from '$app/stores';

	$: currentEmail = $emailStore.emails.filter((e) => e.id === $page.params.id);

	let selectedEmails = [];

	function handleToolboxEvents(event) {
		const detail = event.detail;
		if (!detail || !detail.type) return;
		if (detail.type == 'select-all') selectedEmails = [];
		if (detail.type == 'unselect-all') selectedEmails = [];
	}
</script>

<InboxToolbar on:message={handleToolboxEvents} bind:selectedEmails emailCount={''} showCheckbox={false} />
<Email email={currentEmail[0]} />
