<script>
	import '@fontsource/ibm-plex-mono';
	import {
		Button,
		ButtonSet,
		Checkbox,
		Form,
		FormGroup,
		TextInput
	} from 'carbon-components-svelte';
	import { syncedStore, getYjsValue } from '@syncedstore/core';
	import { svelteSyncedStore } from '@syncedstore/svelte';
	import { WebrtcProvider } from 'y-webrtc';
	import { TaskRemove } from 'carbon-icons-svelte';

	const todoStore = syncedStore({ todos: [] });

	const store = svelteSyncedStore(todoStore);

	const doc = getYjsValue(todoStore);
	let webrtcProvider = new WebrtcProvider('todo', doc);

	const disconnect = () => webrtcProvider.disconnect();
	const connect = () => webrtcProvider.connect();

	let newTodo = '';

	const addTodo = () => {
		const value = newTodo && newTodo.trim();

		if (!value) {
			return;
		}
		$store.todos.push({
			title: value,
			completed: false
		});
		newTodo = '';
	};

	const removeTodo = (todo) => {
		$store.todos.splice($store.todos.indexOf(todo), 1);
	};
</script>

<h1>Todo Svelte</h1>

<p>
	This is POC page that use sample code from <a
		href="https://svelte.dev/repl/a3eb6fab2c8a47019ca7dc12701f6b7b?version=3.46.3">Svelte REPL</a
	>
</p>

<ButtonSet>
	<Button on:click={connect} kind="primary">Connect</Button>
	<Button on:click={disconnect} kind="danger-ghost">Disconnect</Button>
</ButtonSet>
<Form on:submit={addTodo}>
	<TextInput autocomplete="off" placeholder="What needs to be done?" bind:value={newTodo} />
	<Button type="submit" on:click={addTodo}>Add Todo</Button>
</Form>

<FormGroup legendText="Todos">
	{#each $store.todos as todo}
		<Checkbox labelText={todo.title} bind:checked={todo.completed} />
		<Button on:click={() => removeTodo(todo)} kind="danger" icon={TaskRemove} size="small" />
	{/each}
</FormGroup>

<pre>
{JSON.stringify($store, null, 2)}
</pre>

<style>
	pre {
		background: #eee;
		padding: 1rem;
		font-family: 'IBM Plex Mono', monospace;
	}

	h2 {
		font-family: 'IBM Plex Sans Thai', sans-serif;
	}
</style>
