import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Chart from 'chart.js/auto';

function SchedulingGraph({ schedules }) {
  // Group the schedules by item date
  const groupedSchedules = groupSchedulesByItemDate(schedules);

  // Get the list of item dates sorted in ascending order
  const sortedItemDates = Object.keys(groupedSchedules).sort((a, b) =>
    moment(a).diff(moment(b))
  );

  // Create the chart data
  const chartData = {
    labels: sortedItemDates,
    datasets: [
      {
        label: 'Number of Schedules',
        data: sortedItemDates.map(date => groupedSchedules[date].length),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Render the chart
  useEffect(() => {
    const canvas = document.getElementById('scheduling-chart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              title: {
                display: true,
                text: 'Item Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Schedules'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Scheduling Patterns over Time'
            },
            legend: {
              display: false
            }
          }
        }
      });
    }
  }, [chartData]);

  // Render the chart canvas
  return <canvas id="scheduling-chart" />;
}

// Group schedules by item date
function groupSchedulesByItemDate(schedules) {
  const groupedSchedules = {}; // Initialize the variable to an empty object
  return schedules.reduce((groupedSchedules, schedule) => {
    const itemDate = moment(schedule.itemDate).format('YYYY-MM-DD');
    if (!groupedSchedules[itemDate]) {
      groupedSchedules[itemDate] = [];
    }
    groupedSchedules[itemDate].push(schedule);
    return groupedSchedules;
  }, groupedSchedules); // Pass the initial value as the second argument to reduce()
}


export default SchedulingGraph;
