import { useState } from "react";
import "../styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

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

    console.log(selectedDate);
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

  return (
    <div className='calendar-container'>
      <div className="calendar">
        <div className="calendar-header">
          <button className='light-button' onClick={prevMonth}>‹</button>
          <div>{months[currentMonth]} {currentYear}</div>
          <button className='light-button' onClick={nextMonth}>›</button>
        </div>
        <div className="calendar-body">
          <div className="calendar-weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
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