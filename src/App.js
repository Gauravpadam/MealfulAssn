import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SchedulingPattern from './components/SchedulingPattern';
import StackedBarChart from './components/StackedBarChart';
import './App.css';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [selectedItemDate, setSelectedItemDate] = useState(null);

  useEffect(() => {
    fetch('https://www.jsonkeeper.com/b/8JM9')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(schedule => ({
          ...schedule,
          scheduleTime: moment(schedule.scheduleTime),
          itemDate: moment(schedule.itemDate)
        }));
        setSchedules(formattedData);
        console.log(formattedData); // Add this line to log the fetched data
      })
      .catch(error => console.error(error));
  }, []);
  

  const handleSelectItemDate = itemDate => {
    setSelectedItemDate(itemDate);
  };

  return (
    <div className="App">
      <SchedulingPattern
        schedules={schedules}
        selectedItemDate={selectedItemDate}
        onSelectItemDate={handleSelectItemDate}
      />
      {selectedItemDate && (
        <StackedBarChart schedules={schedules} selectedItemDate={selectedItemDate} />
      )}
    </div>
  );
}

export default App;
