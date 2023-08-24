<script>
	import { emailStore } from '$lib/store/emails';
	import InboxEmails from '$lib/components/InboxEmails.svelte';
	import InboxToolbar from '$lib/components/InboxToolbar.svelte';

	export let data;
</script>

<InboxToolbar />
<InboxEmails emails={$emailStore.sent} />
