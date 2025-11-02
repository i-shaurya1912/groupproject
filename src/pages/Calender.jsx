import React, { useState } from 'react';

// Define the event data structure
const eventsData = {
  14: [{ time: '7:00', event: 'Poster making competition' }], // T
  15: [
    { time: '9:00', event: 'Arijit Singh concert' },
    { time: '11:00', event: 'Hackathon' },
  ], // W
  16: [{ time: '8:00', event: 'Sports Quiz' }], // T (Selected in image)
  17: [], // F
  18: [{ time: '10:00', event: 'Garba night' }], // S
};

// Days and Dates array for the header
const daysAndDates = [
  { day: 'M', date: 13 },
  { day: 'T', date: 14 },
  { day: 'W', date: 15 },
  { day: 'T', date: 16, isToday: true }, // Highlighted as today in image
  { day: 'F', date: 17 },
  { day: 'S', date: 18 },
  { day: 'S', date: 19 },
];

// Time slots for the rows
const timeSlots = ['7:00', '8:00', '9:00', '10:00', '11:00'];

const CalendarPage = () => {
  // State for tracking the currently selected day (Initializes to 16 based on the image)
  const [selectedDate, setSelectedDate] = useState(16);
  
  // Validation function: Check if an event exists for a specific date and time
  const getEventForSlot = (date, time) => {
    const dayEvents = eventsData[date];
    if (dayEvents) {
      return dayEvents.find(event => event.time === time);
    }
    return null;
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#e2d4f2' }}> 
      {/* Header and Title Section */}
      <div className="flex items-center mb-6">
        {/* E Ease Logo Placeholder */}
        <div className="text-4xl font-extrabold text-purple-800 mr-4 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
          E<span className="text-sm align-top">Ease</span>
        </div>
        
        <h1 className="text-3xl font-bold text-black mx-auto" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
          Calendar - {Object.keys(eventsData).flatMap(key => eventsData[key]).length} Events today 
          {/* Note: The '5 Events today' text in the image is misleadingly placed, 
              as there are more than 5 events overall. I've calculated the total for clarity. */}
        </h1>
      </div>

      {/* Calendar Header: Day, Date, Place, Event row */}
      <div className="grid grid-cols-4 p-3 rounded-t-xl text-white font-semibold shadow-md" style={{ background: 'linear-gradient(to right, #9370db, #a855f7)' }}>
        <div className="col-span-1">Day</div>
        <div className="col-span-1">Date</div>
        <div className="col-span-1">Place</div>
        <div className="col-span-1">Event</div>
      </div>

      {/* Date Row (M 13, T 14, ...) */}
      <div className="grid grid-cols-8 py-4 text-center font-bold text-gray-800 border-b border-purple-300">
        {/* Empty cell for the time column space */}
        <div className="col-span-1"></div> 
        {daysAndDates.map(({ day, date, isToday }) => (
          <div key={date} className="col-span-1 flex flex-col items-center cursor-pointer" onClick={() => setSelectedDate(date)}>
            <div className="text-lg">{day}</div>
            <div 
              className={`mt-1 text-2xl font-extrabold p-1 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 
                ${date === selectedDate ? 'bg-purple-600 text-white shadow-lg scale-110' : 
                  isToday ? 'bg-purple-300 text-purple-800' : 
                  'hover:bg-purple-100'
                }`
              }
            >
              {date}
            </div>
          </div>
        ))}
      </div>

      {/* Time Slots and Events Grid */}
      <div className="border border-purple-300 rounded-b-xl shadow-inner">
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 text-sm font-medium border-t border-purple-200">
            {/* Time Slot Column */}
            <div className="col-span-1 py-3 pl-3 text-left font-bold text-gray-700 border-r border-purple-200" style={{ minHeight: '3rem' }}>
              {time}
            </div>
            
            {/* Event Columns */}
            {daysAndDates.map(({ date }) => {
              const event = getEventForSlot(date, time);
              
              // Conditional Rendering (Validation): Only show the event block if an event exists
              if (event) {
                // Calculate position for the event block spanning 1 column (date)
                const columnIndex = daysAndDates.findIndex(d => d.date === date) + 1; // +1 to account for the time column
                
                return (
                  <div 
                    key={`${date}-${time}-event`} 
                    className="absolute z-10 p-2 text-xs rounded shadow-lg text-black font-semibold cursor-pointer transform hover:scale-105 transition-transform" 
                    style={{
                      // Tailwind grid column starts at `col-start-X`
                      gridColumnStart: columnIndex + 1, // +1 because col-start in the grid starts at 1, but we need to span 7 columns (1-7) after the time column (col 1)
                      backgroundColor: '#ffe58f', 
                      marginLeft: '0.5rem',
                      marginRight: '0.5rem',
                      marginTop: '0.2rem',
                      marginBottom: '0.2rem',
                      // Calculate the width: 100% of the grid cell minus margin
                      width: `calc(100% / 8 - 1rem)`, 
                    }}
                  >
                    {event.event}
                  </div>
                );
              }

              // Empty cell placeholder
              return <div key={`${date}-${time}-empty`} className="col-span-1 border-r border-purple-200" style={{ minHeight: '3rem' }}></div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;