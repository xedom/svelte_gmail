<script>
	export let label;
	export let count;
</script>

<div class="flex cursor-pointer items-center gap-2 rounded-full px-4 py-1 hover:bg-slate-200">
	<slot />
	<div class="flex-1">{label}</div>
	<div class="text-xs text-gray-700">{count}</div>
</div>
