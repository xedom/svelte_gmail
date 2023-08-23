<script>
	import InboxEmails from '$lib/components/InboxEmails.svelte';
	import InboxToolbar from '../lib/components/InboxToolbar.svelte';

	export let data;
	const { emails } = data;
</script>

<InboxToolbar />

<InboxEmails {emails} />
