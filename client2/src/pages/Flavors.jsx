import axios from 'axios';
import { socket } from '../services/websocket';
import { Pie } from 'react-chartjs-2';
import { useEffect, useMemo, useState } from 'react';

export default function Flavors() {
    const [flavors, setFlavors] = useState(null)
    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    const parseData = (data) => {
        const entries = Object.entries(data);
        console.log("ENTRIES:",entries)
        setFlavors({
            labels: entries.map((entry) => entry[0]),
            datasets: [{
                label: 'Flavors',
                data: entries.map((entry) => entry[1]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        });
    };

    useEffect(() => {
        axios.get('http://localhost:3002/api/getAllQuantity')
            .then(res => {
                console.log(res.data)
                parseData(res.data);
            });
    }, []);

    useEffect(() => {
        socket.on('update:flavors', (data) => {
            parseData(data);
        });

        return () => {
            socket.off('update:flavors');
        };
    }, []);

    return (
        <div style={{height: '500px'}}>
            {flavors && <Pie data={flavors} options={chartOptions} />}
        </div>
    )
}
