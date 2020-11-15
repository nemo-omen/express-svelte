<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide } from 'svelte/transition';
	import Todo from '../components/Todo.svelte';
	import Switch from '../components/Switch.svelte';
	import { todos } from '../services/todos.service.js';

	import { httpError, httpGet, httpGetOne, httpPost, httpPut, httpDestroy } from '../services/http.service.js';
	import { socketUrl, socketError, socketGet, socketGetOne, socketPost, socketPut, socketDestroy } from '../services/socket.service.js';


	let task = '';
	let isSocket = true;

	async function getData() {
		if(isSocket === true) {
			socketGet();
		}else{
			httpGet();
		}
	}

	async function saveData() {
		let newTodo = {
			task: task,
			completed: false,
		}
		if(isSocket === true) {
			socketPost(newTodo);
		}else{
			httpPost(newTodo);
		}
		task = '';
	}

	async function updateData(event) {
		const todo = event.detail;
		if(isSocket === true) {
			socketPut(todo);
		}else{
			httpPut(todo);
		}
	}

	async function deleteData(event) {
		const todoId = event.detail;
		if(isSocket === true) {
			socketDestroy(todoId);
		}else{
			httpDestroy(todoId);
		}
	}

	onMount(() => {
		//find a way to check for server before fetch
		//or...just get rid of this before pushing to production
		setTimeout(() => {
			getData();
		}, 500);
	});
</script>

<h1>Test App</h1>
<section class="todo-section">
	<form action="" on:submit|preventDefault={saveData}>
		<input type="text" class="todo" bind:value={task} placeholder="Do something!">
		<button type="submit">save</button>
	</form>
	{#if $httpError !== null}
		<h3 class="error" transition:slide>{$httpError}</h3>
	{/if}
	{#if $socketError !== null}
	<h3 class="error" transition:slide>{$socketError}</h3>
	{/if}
	{#each $todos as todo (todo._id)}
	<div class="todo-item" animate:flip={{duration:300, delay: 100}} transition:fade={{duration: 200}}>
		<Todo {todo} on:updateTodo={updateData} on:deleteTodo={deleteData} />
	</div>
	{/each}
</section>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin: 0.5em 0;
		padding: 0;
	}
	h2 {
		padding: 0;
		margin: 0;
		transition-property: all;
		transition-duration: 300ms;
	}
	.protocol-select {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: 340px;
		margin: 0 0 1em 0;
	}
	.error {
		margin: 0 0 1em 0;
		padding: 0;
		color: crimson;
		font-weight: 400;
	}
	.unselected {
		color: #999;
	}
	.selected {
		color: #ff3e00;
	}
	.todo-section {
		margin: 0 auto;
		width: 340px;
	}
	.todo-section form {
		margin-bottom: 1em;
		display: flex;
		flex-direction: row;
	}
	input[type="text"] {
		margin: 0;
		flex-grow: 1;
		border-right: 0;
	}
	button {
		margin: 0;
		border-radius: 0 2px 2px 0;
	}
</style>