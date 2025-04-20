// Placeholder ReportHistoryChart component
import React, { useEffect, useRef } from 'react';
import { Report, ReportEntry } from '../../types';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface ReportHistoryChartProps {
  reports: Report[];
}

const ReportHistoryChart: React.FC<ReportHistoryChartProps> = ({ reports }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Basic check to prevent errors if reports is empty or undefined
  if (!reports || reports.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
        <p className="text-sm text-gray-500">No report data available for chart.</p>
      </div>
    );
  }

  // Sort reports by date ascending
  const sortedReports = [...reports].sort((a, b) => {
    return new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime();
  });

  // Get unique symptoms from all reports
  const allSymptoms = new Set<string>();
  sortedReports.forEach(report => {
    report.entries?.forEach(entry => {
      if (entry.symptom) {
        allSymptoms.add(entry.symptom);
      }
    });
  });

  // Format dates for x-axis
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const dates = sortedReports.map(report => formatDate(report.reportDate));

  // Create datasets for each symptom
  const datasets = Array.from(allSymptoms).map(symptom => {
    const data = sortedReports.map(report => {
      const entry = report.entries?.find(e => e.symptom === symptom);
      return entry ? entry.grade : 0;
    });

    // Generate a color based on the symptom name for consistency
    const hue = Math.abs(symptom.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360);
    
    return {
      label: symptom,
      data,
      borderColor: `hsl(${hue}, 70%, 60%)`,
      backgroundColor: `hsla(${hue}, 70%, 60%, 0.2)`,
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    };
  });

  // Add overall wellbeing dataset if available
  if (sortedReports.some(report => report.overallWellbeing !== undefined)) {
    const wellbeingData = sortedReports.map(report => report.overallWellbeing || 0);
    
    datasets.push({
      label: 'Overall Wellbeing',
      data: wellbeingData,
      borderColor: '#7c3aed', // Primary color
      backgroundColor: 'rgba(124, 58, 237, 0.2)',
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderDash: [5, 5], // Dashed line for overall wellbeing
    });
  }

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#1f2937',
              bodyColor: '#4b5563',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y;
                  return `${label}: Grade ${value}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#6b7280',
              }
            },
            y: {
              min: 0,
              max: 5,
              ticks: {
                stepSize: 1,
                color: '#6b7280',
              },
              grid: {
                color: 'rgba(107, 114, 128, 0.1)',
              },
              title: {
                display: true,
                text: 'Symptom Grade',
                color: '#374151',
                font: {
                  size: 12,
                  weight: 'normal',
                }
              }
            }
          }
        }
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reports]);

  return (
    <div className="w-full h-64 md:h-80 relative">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ReportHistoryChart; 