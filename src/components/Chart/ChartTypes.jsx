import React, { useEffect, useState } from 'react';
import { chartApi } from '../../api/chart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import tuongquan2018 from './tuongquan2018.png';
import tuongquan2019 from './tuongquan2019.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  ChartDataLabels
);

const ChartContainer = ({ title, children, height = "400px" }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="w-full" style={{ height }}>
      {children}
    </div>
  </div>
);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    }
  }
};

export const BarChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching bar chart data...');
        const result = await chartApi.getBarChartData();
        console.log('Bar chart data received:', result);
        setData(result);
      } catch (err) {
        console.error('Error in BarChart:', err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  console.log('Rendering bar chart with data:', data);
  return (
    <ChartContainer title="So sánh điểm trung bình các môn giữa năm 2018 và 2019">
      <Bar data={data} options={commonOptions} />
    </ChartContainer>
  );
};

export const LineChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getLineChartData();
        console.log('Line chart data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching line chart data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <ChartContainer title="Biểu đồ thay đổi điểm trung bình">
      <Line data={data} options={commonOptions} />
    </ChartContainer>
  );
};

export const HistogramChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getHistogramData();
        console.log('Histogram data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching histogram data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <ChartContainer title="Phân phối điểm môn Toán năm 2018">
      <Bar data={data} options={commonOptions} />
    </ChartContainer>
  );
};

export const PieChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getPieChartData();
        console.log('Pie chart data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching pie chart data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <ChartContainer title="Tỉ lệ đậu/rớt của học sinh">
      <Pie data={data} options={commonOptions} />
    </ChartContainer>
  );
};

export const AreaChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getAreaChartData();
        console.log('Area chart data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching area chart data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  const areaOptions = {
    ...commonOptions,
    fill: true
  };

  return (
    <ChartContainer title="Phân phối điểm theo khối">
      <Line data={data} options={areaOptions} />
    </ChartContainer>
  );
};

export const HeatmapChart = ({ year }) => {
  return (
    <ChartContainer 
      title={`Ma Trận Tương Quan Giữa Các Môn Học Năm ${year} TPHCM`}
      height="auto"
    >
      <div className="flex justify-center items-center">
        <img 
          src={year === 2018 ? tuongquan2018 : tuongquan2019}
          alt={`Ma trận tương quan năm ${year}`}
          style={{ 
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            aspectRatio: '1/1'
          }}
        />
      </div>
    </ChartContainer>
  );
};

export const ScatterChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartApi.getScatterData();
        console.log('Scatter chart data:', result);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching scatter data:', err);
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <ChartContainer title="Tương quan giữa điểm Toán và Văn">
      <Scatter data={data} options={commonOptions} />
    </ChartContainer>
  );
};
  