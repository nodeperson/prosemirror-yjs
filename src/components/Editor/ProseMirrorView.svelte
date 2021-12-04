<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { EditorView } from "prosemirror-view";
  import { EditorState } from "prosemirror-state";
  import { schema } from "prosemirror-markdown";
  import { exampleSetup } from "prosemirror-example-setup";
  import { keymap } from "prosemirror-keymap";
  import type { Doc } from "yjs";
  import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo,
  } from "y-prosemirror";
  import type { Awareness } from "y-protocols/awareness";

  export let ydoc: Doc = undefined;
  export let provider_awareness: Awareness = undefined;

  const yXmlFragment = ydoc.getXmlFragment("prosemirror");

  let master: HTMLDivElement = undefined;
  let view: EditorView = undefined;

  onMount(() => {
    view = new EditorView(master, {
      state: EditorState.create({
        schema,
        plugins: [
          ySyncPlugin(yXmlFragment),
          yCursorPlugin(provider_awareness),
          yUndoPlugin(),
          keymap({
            "Mod-z": undo,
            "Mod-y": redo,
            "Mod-Shift-z": redo,
          }),
        ].concat(exampleSetup({ schema })),
      }),
    });
    view.focus();
  });

  onDestroy(() => view.destroy());
</script>

<div transition:fade bind:this={master} />

<style>
  div {
    width: 100%;
  }
</style>
