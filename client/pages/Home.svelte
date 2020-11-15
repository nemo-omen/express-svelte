<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Todo from '../components/Todo.svelte';
	import Switch from '../components/Switch.svelte';

	const apiUrl = 'http://localhost:3030/api/test';
	const socketUrl = 'ws://localhost:3060';

	let socket = new WebSocket(socketUrl);

	let isSocket = false;

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
		if(!isSocket) {
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
		}else{
			const message = {
				method: 'post',
				data: newTodo
			}
			socket.send(JSON.stringify(message));
			socket.onmessage = (message) => {
				const response = JSON.parse(message.data);
				console.log('Socket message: ', {...message, data: response});
				if(response.ok === true && response.method === 'post') {
					const oldTodos = [...todos];
					todos = [...oldTodos, response.data];
				}
			}
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

	function startSocket(url) {
		socket = null;
		
		socket = new WebSocket(url);

		socket.onclose = () => {
			console.log('Socket connection closed.');
			if(isSocket === true) {
				socket = null;
				console.log('Attempting to reconnect to socket...')
				setTimeout(() => startSocket(url), 1000)
			}
		};

		socket.onopen = () => console.log('Websocket connection opened!');
	}

	function toggleSocket() {
		if(socket.readyState !== 1) {
			startSocket(socketUrl)
		}else{
			socket.close();
		}
	}

	onMount(() => {
		//find a way to check for server before fetch
		//or...just get rid of this before pushing to production
		setTimeout(() => {
			getData();
		}, 500);
		startSocket(socketUrl);
	});

</script>

<h1>Test App</h1>
<div class="protocol-select">
	<h2 class={isSocket ? 'unselected' : 'selected'}>HTTP</h2>
		<Switch bind:checked={isSocket} on:toggleSocket={toggleSocket}></Switch>
	<h2 class={isSocket ? 'selected' : 'unselected'}>WS</h2>
</div>
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