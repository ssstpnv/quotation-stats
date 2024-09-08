import { useState } from 'react';
import './App.css';
import useQuotationStats from './hooks/useQuotationStats.js';
import Button from './ui/components/Button.jsx';
import Table from './ui/components/Table.jsx';

function App() {
    const [open, isReady, getStats] = useQuotationStats();
    const [stats, setStats] = useState([]);

    const getUpdatedStats = () => {
        const startTime = performance.now();
        const updatedStats = getStats();
        const statsCountTime = performance.now() - startTime;
        setStats([
            {
                ...updatedStats,
                statsCountTime: statsCountTime.toFixed(2)
            },
            ...stats,
        ]);
    };

    return (
        <div className="app">
            <div className="app__content">
                <div className="app__control-btn-row">
                    <Button onClick={open} className="btn_fit">
                        Старт
                    </Button>
                    <Button onClick={getUpdatedStats} disabled={!isReady}>
                        Статистика
                    </Button>
                </div>
                <div className="app__stats-table">
                    <Table
                        rowHeaders={[
                            'Время операции',
                            'Среднее',
                            'Стандартное отклонение',
                            'Мода',
                            'Медиана',
                            'Время потраченное на рассчеты, мс'
                        ]}
                        rows={stats}
                    />
                </div>
            </div>
        </div>
    );
}

export default App
