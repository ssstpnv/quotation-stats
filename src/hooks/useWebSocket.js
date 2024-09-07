import { useEffect, useState, useRef } from "react";

export default (url) => {
    const [isReady, setReady] = useState(false);
    const [data, setData] = useState(null);

    const ws = useRef(null);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => setReady(true);
        socket.onclose = () => setReady(false);
        socket.onmessage = (event) => setData(event.data);

        ws.current = socket;

        // bind is needed to make sure `send` references correct `this`
        ws.current.send.bind(ws.current);
        ws.current.close.bind(ws.current);

        return () => {
            socket.close();
        }
    }, []);

    return [isReady, data, ws.current?.send, ws.current?.close];
}
