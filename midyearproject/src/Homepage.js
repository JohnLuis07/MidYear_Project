import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';

function AttendanceCard({ date, record, onUpdateRecord }) {
  const [isCheckedIn, setIsCheckedIn] = useState(record.isCheckedIn);
  const [checkInTime, setCheckInTime] = useState(record.checkInTime ? moment(record.checkInTime) : null);
  const [checkOutTime, setCheckOutTime] = useState(record.checkOutTime ? moment(record.checkOutTime) : null);

  const handleCheckIn = () => {
    const checkInMoment = moment();
    setIsCheckedIn(true);
    setCheckInTime(checkInMoment);
    onUpdateRecord(date, { isCheckedIn: true, checkInTime: checkInMoment, checkOutTime: null });
  };

  const handleCheckOut = () => {
    const checkOutMoment = moment();
    setCheckOutTime(checkOutMoment);
    onUpdateRecord(date, { ...record, checkOutTime: checkOutMoment });
  };

  const calculateDuration = () => {
    if (checkOutTime && checkInTime) {
      const duration = moment.duration(checkOutTime.diff(checkInTime));
      return duration.asHours().toFixed(2);
    }
    return 'N/A';
  };

  return (
    <div className="attendance-card">
      <p>Date: {date.format('YYYY-MM-DD')}</p>
      {isCheckedIn ? (
        <>
          <p>Check-In: {checkInTime.format('HH:mm')}</p>
          {!checkOutTime && <button onClick={handleCheckOut}>Check Out</button>}
        </>
      ) : (
        <button onClick={handleCheckIn}>Check In</button>
      )}
      {checkOutTime && <p>Check-Out: {checkOutTime.format('HH:mm')}</p>}
      <p>Duration: {calculateDuration()} hours</p>
    </div>
  );
}

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

  const dates = [moment(), moment().subtract(1, 'days'), moment().subtract(2, 'days')];

  return (
    <div className="attendance-list">
      {dates.map((date) => (
        <AttendanceCard
          key={date.format('YYYY-MM-DD')}
          date={date}
          record={attendanceRecords[date.format('YYYY-MM-DD')] || {}}
          onUpdateRecord={handleUpdateRecord}
        />
      ))}
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
