<script>
    import { createEventDispatcher } from 'svelte';
    import { Trash2Icon } from 'svelte-feather-icons'
    const dispatch = createEventDispatcher();
    export let todo;
    let task = todo.task;
    let completed = todo.completed;

    function updateTodo() {
        const newTodo = {
            _id: todo._id,
            task: task,
            completed: completed
        }
        dispatch('updateTodo', newTodo);
    }

    function deleteTodo() {
        dispatch('deleteTodo', todo._id);
    }

</script>

<div class="todo">
    <h3 class:completed id={todo._id}>
        {task}
    </h3>
    <div class="todo-control">
        <div class="delete" on:click={deleteTodo}>
            <Trash2Icon size="16"/>
        </div>
        <input type="checkbox" name="status" id="status" bind:checked={completed} on:change={updateTodo}>
    </div>
</div>
<style>
    .todo {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em;
        margin: 0 0 1em 0;
        border: 1px solid #dadada;
        text-align: left;
    }
    .todo>* {
        margin: 0;
        padding: 0;
        transition-property: all;
        transition-duration: 300ms;
    }
    .completed {
        color: #999;
        text-decoration: line-through;
    }
    .todo-control {
        display: flex;
        flex-direction: row;
        margin-left: 0.5em;
    }
    input[type="checkbox"] {
		margin: 0;
        padding: 0.25em;
	}
    .delete {
        color: red;
        opacity: 0.7;
        cursor: pointer;
        margin: 0 0.5em 0 0;
        transition-property: all;
        transition-duration: 300ms;
    }
    .delete:hover {
        opacity: 1;
    }

</style>