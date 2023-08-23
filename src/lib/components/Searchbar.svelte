<script>
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Tune from 'svelte-material-icons/Tune.svelte';

	import IconButton from '$lib/components/IconButton.svelte';
</script>

<div class="mr-8 flex flex-1 overflow-hidden rounded-full bg-slate-200">
	<IconButton><Magnify class="h-6 w-6" /></IconButton>
	<input class="h-[46px] min-w-min flex-1 bg-transparent outline-none" type="text" placeholder="Cerca nella Posta" />
	<IconButton><Close class="h-6 w-6" /></IconButton>
	<IconButton><Tune class="h-6 w-6" /></IconButton>
</div>
