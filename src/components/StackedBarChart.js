import React from 'react';
import moment from 'moment';

function StackedBarChart(props) {
  console.log(props)
  const { schedules, selectedItemDate } = props;

  // Group schedules by item date
  const groupedSchedules = groupSchedulesByItemDate(schedules);

  // Get the schedules for the selected item date
  const schedulesForSelectedItemDate =
    selectedItemDate && groupedSchedules[selectedItemDate];

  // Group the schedules by slot for the selected item date
  const schedulesBySlotForSelectedItemDate =
    schedulesForSelectedItemDate &&
    groupSchedulesBySlot(schedulesForSelectedItemDate);

  // Get the slots for the selected item date
  const slotsForSelectedItemDate =
    schedulesBySlotForSelectedItemDate &&
    Object.keys(schedulesBySlotForSelectedItemDate);

  // Get the maximum number of schedules for a single slot for the selected item date
  const maxSchedulesForSelectedItemDate =
    slotsForSelectedItemDate &&
    Math.max(
      ...slotsForSelectedItemDate.map(
        slot => schedulesBySlotForSelectedItemDate[slot].length
      )
    );

  // Render the stacked bar chart
  const renderStackedBarChart = () => {
    return (
      <div className="StackedBarChart">
        {slotsForSelectedItemDate.map(slot => {
          const schedulesForSlot = schedulesBySlotForSelectedItemDate[slot];
          const count = schedulesForSlot.length;
          const height = `${(count / maxSchedulesForSelectedItemDate) * 100}%`;
          return (
            <div key={slot} className="StackedBarChart-slot">
              <div className="StackedBarChart-bar" style={{ height }} />
              <div className="StackedBarChart-label">{slot}</div>
              <div className="StackedBarChart-count">{count}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {schedulesForSelectedItemDate && renderStackedBarChart()}
    </div>
  );
}

// Group schedules by item date
function groupSchedulesByItemDate(schedules) {
  return schedules.reduce((groupedSchedules, schedule) => {
    const itemDate = moment(schedule.itemDate).format('YYYY-MM-DD');
    if (!groupedSchedules[itemDate]) {
      groupedSchedules[itemDate] = [];
    }
    groupedSchedules[itemDate].push(schedule);
    return groupedSchedules;
  }, {});
}

// Group schedules by slot
function groupSchedulesBySlot(schedules) {
  return schedules.reduce((groupedSchedules, schedule) => {
    const slot = schedule.scheduleTime.format('h:mm A');
    if (!groupedSchedules[slot]) {
      groupedSchedules[slot] = [];
    }
    groupedSchedules[slot].push(schedule);
    return groupedSchedules;
  }, {});
}

export default StackedBarChart;
