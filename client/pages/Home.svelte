<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Todo from '../components/Todo.svelte';
//   import { getData } from '../services/test.store.js';

const apiUrl = 'http://localhost:3030/api/test';

$: todos = [];
let task = '';

async function getData() {
	const response = await fetch(apiUrl);
	const data = await response.json();
	todos = [...data];
}

async function saveData() {
	let newTodo = {
		task: task,
		completed: false,
	}
	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newTodo)
	});

	if(response.ok) {
		const data = await response.json();
		const oldTodos = [...todos];
		todos = [...oldTodos, data];
	}
	task = '';
}

async function updateData(event) {
	const object = event.detail;
	const response = await fetch(apiUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(object)
	});
	if(response.ok) {
		const data = await response.json();
	}
}

async function deleteData(event) {
	const todoId = event.detail;
	const response = await fetch(`${apiUrl}/${todoId}`, {
		method: 'DELETE'
	});
	if(response.ok) {
		let filtered = todos.filter((todo) => todo._id !== todoId);
		todos = [...filtered];
	}
}

//   const response = getData('http://localhost:3030/api/test');
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
	{#each todos as todo (todo._id)}
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