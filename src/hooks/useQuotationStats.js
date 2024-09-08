import { useCallback, useEffect } from 'react';
import useWebSocket from './useWebSocket.js';
import QuotationStatsHandler from '../utils/QuotationStatsHandler.js';

const statsHandler = new QuotationStatsHandler();

export default () => {
    const [openWebSocket, isWebSocketReady, data] = useWebSocket(`wss://trade.termplat.com:8800/?password=${import.meta.env.VITE_WEBSOCKET_PASSWORD}`);

    useEffect(() => {
        if (isWebSocketReady) {
            const parsedData = JSON.parse(data);
            if (parsedData?.value) {
                statsHandler.add(parsedData.value);
            }
        }
    }, [isWebSocketReady, data]);

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

    return [openWebSocket, isWebSocketReady, getStats];
};