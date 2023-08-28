<script>
	import { emailStore, addStarredEmail, removeStarredEmail, bulkDelete, getInboxEmails } from '$lib/store/emails';
	import InboxEmails from '$lib/components/InboxEmails.svelte';
	import InboxToolbar from '$lib/components/InboxToolbar.svelte';

	$emailStore.search = '';
	let selectedEmails = [];

	const onSelect = (id) => (selectedEmails = [...selectedEmails, id]);
	const onDeselect = (id) => (selectedEmails = selectedEmails.filter((emailId) => emailId != id));

	const onBulkDelete = () => {
		bulkDelete(selectedEmails);
		selectedEmails = [];
	};

	const onStarred = (id, star) => {
		if (star) addStarredEmail(id);
		else removeStarredEmail(id);
	};

	function handleInboxEvents(event) {
		const detail = event.detail;
		if (!detail || !detail.id || !detail.type) return;
		if (detail.type == 'starred') return onStarred(detail.id, true);
		if (detail.type == 'unstar') return onStarred(detail.id, false);
		if (detail.type == 'selected') return onSelect(detail.id);
		if (detail.type == 'deselected') return onDeselect(detail.id);
	}

	function handleToolboxEvents(event) {
		const detail = event.detail;
		if (!detail || !detail.type) return;
		if (detail.type == 'delete') return onBulkDelete();
	}

	$: emailsSorted = $emailStore.drafts.sort((a, b) => b.timestamp - a.timestamp);
	$: emailCount = emailsSorted.reduce((a, e) => (a += 1), 0);
</script>

<InboxToolbar on:message={handleToolboxEvents} bind:selectedEmails bind:emailCount />
<InboxEmails emails={emailsSorted} on:message={handleInboxEvents} bind:selectedEmails />
