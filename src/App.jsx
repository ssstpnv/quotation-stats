import { useState } from 'react';
import './App.css';
import useQuotationStats from './hooks/useQuotationStats.js';

function App() {
    const [isReady, getStats] = useQuotationStats();
    const [stats, setStats] = useState([]);

    const getUpdatedStats = () => {
        setStats([...stats, getStats()]);
    };

    return (
        <div className="app">
            <button>
                Старт
            </button>
            <button onClick={getUpdatedStats} disabled={!isReady}>
                Статистика
            </button>
            <div>
                <p>{isReady ? 'Connection established.' : 'Waiting to connect'}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Mean</th>
                            <th>Standard Deviation</th>
                            <th>Mode</th>
                            <th>Median</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(({id, mean, standardDeviation, mode, median}) => (
                            <tr key={id}>
                                <td>{mean}</td>
                                <td>{standardDeviation}</td>
                                <td>{mode}</td>
                                <td>{median}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App
