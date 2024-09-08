import { useEffect, useState, useRef, useCallback } from 'react';

export default (url) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isReady, setReady] = useState(false);
    const [data, setData] = useState(null);

    const ws = useRef(null);

    useEffect(() => {
        if (isOpen && !ws.current) {
            const socket = new WebSocket(url);

            socket.onopen = () => setReady(true);
            socket.onclose = () => setReady(false);
            socket.onmessage = (event) => setData(event.data);

            ws.current = socket;

            // bind is needed to make sure `send` references correct `this`
            ws.current.send.bind(ws.current);
            ws.current.close.bind(ws.current);
        }

        return () => {
            ws.current?.close();
        }
    }, [isOpen]);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    return [open, isReady, data, ws.current?.send, ws.current?.close];
}
