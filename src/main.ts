import App from './App.svelte';


const app = new App({
	target: document.body,
	props: {
		useLocalStorage: true,
		wssServerPath: "wss://demos.yjs.dev",
		channelName: "prosemirror-discours.io-demo"
	}
});

export default app;