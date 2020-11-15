import { 
    createOne as servicePost, 
    getAll as serviceGet, 
    getOne as serviceGetOne, 
    updateOne as serviceUpdate, 
    deleteOne as serviceDelete 
} from '../../services/test.service.js';

import { generateRestResponse } from '../../helpers/restresponse.js';

export async function post(wss, ws, message) {
    const messageData = message.data;
    const response = await servicePost(messageData);
    ws.send(generateRestResponse('post', 'ok', response));
}

export async function get(wss, ws, message) {
    const response = await serviceGet();
    ws.send(generateRestResponse('get', 'ok', response));
}

export async function getOne(wss, ws, message) {
    const messageData = message.data;
    const response = await serviceGetOne(messageData);
    ws.send(generateRestResponse('getOne', 'ok', response))
}

export async function put(wss, ws, message) {
    const messageData = message.data;
    const response = await serviceUpdate(messageData);
    ws.send(generateRestResponse('put', 'ok', response));
}

export async function destroy(wss, ws, message) {
    const messageData = message.data;
    const response = await serviceDelete(message.data);
    ws.send(generateRestResponse('destroy', 'ok', response));
}