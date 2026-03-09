import { useState, useEffect } from "react";
import { useSelectedDateProvider } from '../context/selectedDateContext'
import "../styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const { sharedDate, setSharedDate } = useSelectedDateProvider();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  const months = [ "January","February","March","April","May","June","July","August","September","October","November","December" ];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function handleDayClick(day) {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDay(day);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const date = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${date}/${month}/${year}`;
    setSharedDate(formattedDate)
  }

  function prevMonth() {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  }

  function goToToday() {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today.getDate());
  }

  const currentDay = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  useEffect(() => {
    const renderDefaultDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${day}/${month}/${year}`;
      if ( sharedDate === '' ) setSharedDate(formattedDate)
    };
    renderDefaultDate();
  }, [sharedDate]);

  return (
    <div className='calendar-container'>
      <h2 className='centered-h2'>Today's Date: {currentDay()}</h2>
      <div className="calendar">
        <div className="calendar-header">
          <button className='light-button' onClick={prevMonth}>‹</button>
          <div>{months[currentMonth]} {currentYear}</div>
          <button className='light-button' onClick={nextMonth}>›</button>
        </div>
        <div className="calendar-body">
          <div className="calendar-weekdays">
            <div className='calendar-weekday'>S</div>
            <div className='calendar-weekday'>M</div>
            <div className='calendar-weekday'>T</div>
            <div className='calendar-weekday'>W</div>
            <div className='calendar-weekday'>T</div>
            <div className='calendar-weekday'>F</div>
            <div className='calendar-weekday'>S</div>
          </div>
          <div className="calendar-dates">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="blank"></div>
            ))}
            {days.map(day => {
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <div
                  key={day}
                  className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button className="dark-button" onClick={goToToday}>Today</button>
    </div>
  );
}