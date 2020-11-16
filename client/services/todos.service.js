/**
 * This service is strictly for setting and updating the todos store below
 * all http calls are in http.service.js
 * all socket calls are in socket.service.js
 */

import { writable } from 'svelte/store';

export let todos = writable([]); 

export function setTodos(arrayData) {
    todos.set([...arrayData]);
}

export function updateTodos(newTodo) {
    todos.update((todoItems) => {
        return [...todoItems, newTodo];
    });
}

export function updateTodo(newTodo) {
    todos.update((todoItems) => {
        let todoIndex = todoItems.findIndex((todo) => todo._id === newTodo._id);
        todoItems[todoIndex] = {...newTodo};
        return todoItems;
    });
    // todos = todos;
}

export function destroyTodo(todoId) {
    console.log('destroyTodo called');
    todos.update((todoItems) => {
        return todoItems.filter((todo) => todo._id !== todoId);
    });
}