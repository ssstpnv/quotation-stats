import { useCallback, useEffect, useState } from 'react';
import useWebSocket from './useWebSocket.js';
import QuotationStatsHandler from '../utils/QuotationStatsHandler.js';

const statsHandler = new QuotationStatsHandler();

export default () => {
    const [openWebSocket, isWebSocketReady, onMessage] = useWebSocket(`wss://trade.termplat.com:8800/?password=${import.meta.env.VITE_WEBSOCKET_PASSWORD}`);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (isWebSocketReady) {
            onMessage((data) => {
                if (data?.value) {
                    statsHandler.add(data.value);
                    setIsReady(true);
                }
            })
        }
    }, [isWebSocketReady]);

    const getStats = useCallback(() => {
        if (statsHandler.getDataPointsCount() === 0) return {
            id: Date.now(),
            time: new Date().toLocaleString(),
            mean: 0,
            standardDeviation: 0,
            mode: 0,
            median: 0,
        }

        return {
            id: Date.now(),
            time: new Date().toLocaleString(),
            mean: statsHandler.getMean().toFixed(2),
            standardDeviation: statsHandler.getStandardDeviation().toFixed(2),
            mode: statsHandler.getMode(),
            median: statsHandler.getMedian(),
        };
    }, []);

    return [openWebSocket, isReady, getStats];
};