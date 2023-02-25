import React, { useState } from 'react';
import moment from 'moment';
import StackedBar from './StackedBarChart';

function SchedulingPattern({ schedules }) {
  console.log(schedules)
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  // Filter the schedules based on the selected date
  const filteredSchedules = schedules.filter(schedule => moment(schedule.itemDate).isSame(selectedDate, 'day'));

  // Group the schedules based on their schedule time
  const groupedSchedules = filteredSchedules.reduce((groups, schedule) => {
    const time = moment(schedule.scheduleTime).format('HH:mm');
    if (!groups[time]) {
      groups[time] = [];
    }
    groups[time].push(schedule);
    return groups;
  }, {});

  // Count the number of schedules for each time slot
  const timeSlots = Object.keys(groupedSchedules).sort();
  const timeSlotCounts = timeSlots.map(time => groupedSchedules[time].length);

  // Render the SchedulingPattern component
  return (
    <div className="scheduling-pattern">
      <div className="scheduling-pattern-header">
        <h2>Scheduling Pattern</h2>
        <div className="scheduling-pattern-date">
          <span>Select a date:</span>
          <input type="date" value={selectedDate} onChange={event => setSelectedDate(event.target.value)} />
        </div>
      </div>
      <StackedBar labels={timeSlots} data={[timeSlotCounts]} />
    </div>
  );
}

export default SchedulingPattern;