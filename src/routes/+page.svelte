<script>
	import { emailStore, bulkDelete } from '$lib/store/emails';
	import InboxEmails from '$lib/components/InboxEmails.svelte';
	import InboxToolbar from '$lib/components/InboxToolbar.svelte';

	let selectedEmails = [];

	const onSelect = (id) => (selectedEmails = [...selectedEmails, id]);
	const onDeselect = (id) => (selectedEmails = selectedEmails.filter((emailId) => emailId != id));

	const onBulkDelete = () => {
		bulkDelete(selectedEmails);
		selectedEmails = [];
	};

	function handleInboxEvents(event) {
		const detail = event.detail;
		if (!detail || !detail.id || !detail.type) return;
		if (detail.type == 'starred') return;
		if (detail.type == 'unstar') return;
		if (detail.type == 'delete') return;
		if (detail.type == 'selected') return onSelect(detail.id);
		if (detail.type == 'deselected') return onDeselect(detail.id);
	}

	function handleToolboxEvents(event) {
		const detail = event.detail;
		if (!detail || !detail.type) return;
		if (detail.type == 'delete') return onBulkDelete();
	}
</script>

<InboxToolbar on:message={handleToolboxEvents} bind:selectedEmails />
<InboxEmails emails={$emailStore.filtered} on:message={handleInboxEvents} bind:selectedEmails />
