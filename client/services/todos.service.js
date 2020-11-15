/**
 * This service is strictly for setting and updating the todos store below
 * all http calls are in http.service.js
 * all socket calls are in socket.service.js
 */

import { writable } from 'svelte/store';

export const todos = writable([]); 

export function setTodos(arrayData) {
    todos.set([...arrayData]);
}

export function updateTodos(newTodo) {
    todos.update((todoItems) => {
        return [...todoItems, newTodo];
    });
}

export function updateTodo(newTodo) {
    console.log(newTodo);
    todos.update((todoItems) => {
        let oldTodos = [...todoItems];
        let todoIndex = oldTodos.findIndex((todo) => todo._id === newTodo._id);
        oldTodos[todoIndex] = newTodo;
        // todoItems = todoItems;
        return oldTodos;
    });
}

export function destroyTodo(todoId) {
    console.log('destroyTodo called');
    todos.update((todoItems) => {
        return todoItems.filter((todo) => todo._id !== todoId);
    });
}