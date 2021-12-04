<script lang="ts">
    import { fade } from "svelte/transition";
    import ProseMirrorView from "./ProseMirrorView.svelte";
    import * as Y from "yjs";
    import { WebsocketProvider } from "y-websocket";
    import { IndexeddbPersistence } from "y-indexeddb";

    export let useLocalStorage: boolean;
    export let wssServerPath: string;
    export let channelName: string;

    let ydoc = new Y.Doc();
    let provider: WebsocketProvider = undefined;

    let provider_connecting = true;
    let provider_error: string;

    try {
        provider = new WebsocketProvider(wssServerPath, channelName, ydoc);
        provider_connecting = false;
    } catch (e) {
        provider_connecting = false;
        provider_error =
            "An error occurred while trying to establish a connection with the remote server.";
    }

    if (useLocalStorage) {
        const indexeddbProvider = new IndexeddbPersistence(channelName, ydoc);
    }
</script>

<div>
    {#if provider_connecting}
        <span transition:fade class="provider-connecting"
            >Connecting to the messaging server...</span
        >
    {:else if provider_error}
        <span transition:fade class="provider-error">{provider_error}</span>
    {:else}
        <ProseMirrorView
            bind:provider_awareness={provider.awareness}
            bind:ydoc
        />
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px lightgray solid;
        border-radius: 3px;
    }
    .provider-connecting {
        color: silver;
    }
    .provider-error {
        color: red;
    }
</style>
