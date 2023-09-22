import {Line} from 'react-chartjs-2';
import {
  Chart as chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({arr = [], days, currency}) {
  const prices = [];
  const date = [];
  for (let i = 0; i < arr.length; i++) {
    if (days === '24h') date.push(new Date(arr[i][0]).toLocaleString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }
  const data = {
    labels: date,
    datasets: [
      {
        label: `price in ${currency}`,
        data: prices,
        borderColor: '#36A2EB',
        backgroundColor: '#000',
        // borderWidth: 1,
      },
    ],
  };
  return <Line options={{responsive: true}} data={data} />;
}

export default Chart;
