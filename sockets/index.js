import WebSocket from 'ws';
import { socketPort } from '../config.js';

export const wss = new WebSocket.Server({port: socketPort});

wss.on('listening', () => {
    console.log(`\nWebSocket server listening at ws://localhost:${socketPort}\n`);
});