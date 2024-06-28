import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';
import './AttendanceList.css'; // Import the CSS file

function AttendanceList() {
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    const storedRecords = localStorage.getItem('attendanceRecords');
    if (storedRecords) {
      setAttendanceRecords(JSON.parse(storedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const handleUpdateRecord = (date, record) => {
    setAttendanceRecords((prevRecords) => ({
      ...prevRecords,
      [date.format('YYYY-MM-DD')]: record,
    }));
  };

  const dates = [
    moment(),
    moment().subtract(1, 'days'),
    moment().subtract(2, 'days'),
    moment().subtract(3, 'days'),
    moment().subtract(4, 'days'),
    moment().subtract(5, 'days'),
    moment().subtract(6, 'days'),
    moment().subtract(7, 'days'),
    moment().subtract(8, 'days'),
    moment().subtract(9, 'days'),
  ];

  return (
    <div className="attendance-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>Lunch Start</th>
            <th>Lunch End</th>
            <th>End Time</th>
            <th>Overtime</th>
            <th>Hourly Rate (USD)</th>
            <th>Total Hours Worked (h)</th>
            <th>Amount Earned</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const record = attendanceRecords[date.format('YYYY-MM-DD')] || {};
            const startTime = record.checkInTime ? moment(record.checkInTime).format('HH:mm') : 'N/A';
            const endTime = record.checkOutTime ? moment(record.checkOutTime).format('HH:mm') : 'N/A';
            const duration = record.checkOutTime && record.checkInTime ? moment.duration(moment(record.checkOutTime).diff(moment(record.checkInTime))).asHours().toFixed(2) : 'N/A';
            const hourlyRate = 50;
            const overtime = record.overtime || 0;
            const totalHoursWorked = duration !== 'N/A' ? parseFloat(duration) + overtime : 'N/A';
            const amountEarned = totalHoursWorked !== 'N/A' ? totalHoursWorked * hourlyRate : 'N/A';

            return (
              <tr key={date.format('YYYY-MM-DD')}>
                <td>{date.format('YYYY-MM-DD')}</td>
                <td>{startTime}</td>
                <td>1:00pm</td>
                <td>1:30pm</td>
                <td>{endTime}</td>
                <td>{overtime}</td>
                <td>{hourlyRate}</td>
                <td>{totalHoursWorked}</td>
                <td>{amountEarned}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className="App">
      <h1>Daily Time Tracker</h1>
      <div className="ButProfile">
        <Link to={`/profile?email=${userEmail}`}>Go to Profile</Link>
      </div>
      <AttendanceList />
    </div>
  );
}

export default App;
