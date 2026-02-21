import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProfileChart({ chartData }) {
    if (!chartData || chartData.labels.length === 0) {
        return <p>Valora algunos discos para generar tu gráfico.</p>;
    }

    return (
        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
            <Bar
                data={chartData}
                options={{ scales: { y: { beginAtZero: true, max: 5 } } }}
            />
        </div>
    );
}