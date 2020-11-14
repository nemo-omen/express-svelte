export function example(wss, ws, message) {
    ws.send(JSON.stringify({hello: 'world', received: message}));
}