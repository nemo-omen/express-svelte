/**
 * This service is for all of the http calls
 * socket calls can be found in socket.service.js
 */

import { writable } from 'svelte/store';

import { setTodos, updateTodo, updateTodos, destroyTodo } from './todos.service.js';

export const httpError = writable(null);

const apiUrl = 'http://localhost:3030/api/test';

function setError(error) {
    httpError.set(error);
    setTimeout(()=>{
        httpError.set(null);
    }, 5000);
}

export async function httpGet() {
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            setError('There was an error getting the todos.');
        }
            const data = await response.json();
            setTodos([...data]);
    } catch (error) {
        setError(error);
    }
}

export async function httpGetOne(todoId) {
    try {
        const response = await fetch(`${apiUrl}/${todoId}`);
        if(!response.ok) {
            setError('There was an error getting the todo');
        }
            const data = await response.json();
            return data;
    } catch (error) {
        setError(error);
    }
}

export async function httpPost(newTodo) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
        
        if(!response.ok) {
            setError('There was an error saving the todo.');
        }
            const data = await response.json();
            updateTodos(data);
    } catch (error) {
        setError(error);
    }
}

export async function httpPut(object) {
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
        if(!response.ok) {
            setError('There was a problem saving the todo.')
        }
            //we don't need to update the store in this case
            //because that behavior is set with the component
            // const data = await response.json();
            // updateTodo(data);
    } catch (error) {
        setError(error);
    }
}
export async function httpDestroy(todoId) {
    try {
		const response = await fetch(`${apiUrl}/${todoId}`, {
			method: 'DELETE'
		});
		if(!response.ok) {
            setError('There was a problem deleting the todo');
        }
			destroyTodo(todoId);
    } catch (error) {
        setError(error);
    }
}

//  setTimeout(() => {
//     setError('This is a test error');
// }, 2000);