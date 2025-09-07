'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96">Loading chart...</div>
});

interface PopularTimesChartProps {
  popularTimes: { time: string; count: number }[];
}

const PopularTimesChart: React.FC<PopularTimesChartProps> = ({ popularTimes }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartData = {
    series: [
      {
        name: 'Reservations',
        data: popularTimes.map(item => item.count)
      }
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      colors: ['#10B981'],
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '60%'
        }
      },
      xaxis: {
        categories: popularTimes.map(item => item.time),
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value} reservations`
        }
      },
      theme: {
        mode: 'light' as const
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Popular Reservation Times
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Reservations</span>
        </div>
      </div>
      {isClient ? (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      ) : (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading chart...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularTimesChart;
