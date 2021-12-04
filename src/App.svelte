<script lang="ts">
	import Editor from "./components/Editor/index.svelte";

	export let useLocalStorage;
	export let wssServerPath;
	export let channelName;
</script>

<Editor {useLocalStorage} {wssServerPath} {channelName} />
