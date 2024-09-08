import { useCallback, useState } from 'react';
import './App.css';
import useQuotationStats from './hooks/useQuotationStats';
import Button from './ui/components/Button';
import Table from './ui/components/Table';
import Loader from './ui/components/Loader';

const App = () => {
    const [open, isReady, getStats] = useQuotationStats();
    const [stats, setStats] = useState([]);
    const [isStarted, setIsStarted] = useState(false);

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

    const onStart = useCallback(() => {
        open();
        setIsStarted(true);
    }, []);

    return (
        <div className="app">
            <div className="app__content">
                <div className="app__control-btn-row">
                    <Button onClick={onStart}>
                        Старт
                    </Button>
                    <Button onClick={getUpdatedStats} disabled={!isReady}>
                        Статистика
                    </Button>
                </div>
                {isStarted && (
                    <div className="app__stats-table">
                        <Loader show={!isReady}>
                            <Table
                                rowHeaders={[
                                    'Время операции',
                                    'Среднее',
                                    'Стандартное отклонение',
                                    'Мода',
                                    'Медиана',
                                    'Время потраченное на расчеты, мс'
                                ]}
                                rows={stats}
                            />
                        </Loader>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App
