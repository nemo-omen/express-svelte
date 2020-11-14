import WebSocket from 'ws';
import { socketPort } from '../config.js';
import { safeParseJSON, generateError } from '../helpers/index.js';
import { methods as Methods } from './methods/index.js';
export const wss = new WebSocket.Server({port: socketPort});

wss.on('listening', () => {
    console.log(`\nWebSocket server listening at ws://localhost:${socketPort}\n`);
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = safeParseJSON(message);

        if(data === null) {
            ws.send(
                JSON.stringify(
                    generateError({
                        error: 'Parse Error',
                        reasons: [
                            {
                                reason: 'invalid_message_data',
                                message: 'Unable to parse message contents',
                                data: message,
                                location: 'websocket-message',
                            }

                        ]
                    })
                )
            );
        }else if (typeof data.method === 'string' && Methods[data.method]) {
            Methods[data.method](wss, ws, data);
        }else{
            ws.send(
                JSON.stringify(
                    generateError({
                        error: 'Method Not Found',
                        reasons: [
                            {
                                reason: 'invalid_method',
                                message: 'Unable to find matching method',
                                data: data.method,
                                location: 'method'
                            }
                        ]
                    })
                )
            )
        }
    });
});