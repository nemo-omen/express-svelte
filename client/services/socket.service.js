/**
 * This service is for socket calls
 * http calls can be found in http.service.js
 */

import { writable } from 'svelte/store';

import { setTodos, updateTodos, updateTodo, destroyTodo } from './todos.service.js';

export const socketError = writable(null);

export const socketUrl = 'ws://localhost:3060';

let socket;

function socketOpenListener(event) {
    console.log('Socket connected');
}

function socketClosedListener(event) {
    if(socket) {
        console.log('Socket disconnected');
    }
    socket = new WebSocket(socketUrl);

    socket.addEventListener('message', (event) => {
        const messageData = JSON.parse(event.data);
        const method = messageData.method;
        const data = messageData.data;
        const ok = messageData.ok;
        handleSocketMessage(ok, method, data);
    });

    socket.addEventListener('open', socketOpenListener);
    socket.addEventListener('close', socketClosedListener);
}

function setError(error) {
    socketError.set(error);
    setTimeout(()=>{
        socketError.set(null);
    }, 5000);
}

export function socketPost(newTodo) {
    const message = {
        method: 'post',
        data: newTodo
    }
    socket.send(JSON.stringify(message));
} 

export function socketGet() {
    const message = {
        method: 'get'
    }
    socket.send(JSON.stringify(message));
}

export function socketGetOne(todoId) {
    const message = {
        method: 'getOne',
        data: todoId
    }
    socket.send(JSON.stringify(message));
}

export function socketPut(todo) {
    const message = {
        method: 'put',
        data: todo
    }
    socket.send(JSON.stringify(message));
}

export function socketDestroy(todoId) {
    const message = {
        method: 'destroy',
        data: todoId
    }
    socket.send(JSON.stringify(message));
}

function handleSocketMessage(ok, method, data) {
    console.log(ok, method, data);
    if(method === 'get') {
        console.log(method);
        setTodos(data);
    }
    if(method === 'put') {
        const updatedTodo = {
            task: data.ops[0].task,
            completed: data.ops[0].completed,
            _id: data._id
        }
        updateTodo(updatedTodo);
    }
    if(method === 'post') {
        updateTodos(data);
    }
    if(method === 'destroy') {
       destroyTodo(data._id);
   }
}

socketClosedListener();

//  setTimeout(() => {
//     setError('This is a test error');
// }, 2000);