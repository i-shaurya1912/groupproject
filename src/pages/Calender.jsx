import React, { useState, useMemo } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper function to generate date string
const getDateStr = (year, month, day) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Initial event data - will be initialized with current month dates
const getInitialEventsData = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  
  return {
    [getDateStr(year, month, 15)]: [
      { time: '7:00', event: 'Poster making competition', place: 'Main Hall' },
      { time: '9:00', event: 'Arijit Singh concert', place: 'Auditorium' },
      { time: '11:00', event: 'Hackathon', place: 'Tech Lab' },
    ],
    [getDateStr(year, month, 16)]: [{ time: '8:00', event: 'Sports Quiz', place: 'Sports Complex' }],
    [getDateStr(year, month, 17)]: [{ time: '10:00', event: 'Garba night', place: 'Cultural Center' }],
  };
};

// Time slots for the rows
const timeSlots = ['7:00', '8:00', '9:00', '10:00', '11:00'];

// Day abbreviations
const dayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage = () => {
  // Get current date
  const today = new Date();
  
  // State for current month/year being viewed
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  // State for tracking events (using full date strings as keys)
  const [eventsData, setEventsData] = useState(getInitialEventsData);
  
  // State for tracking the currently selected date (full date string)
  const [selectedDate, setSelectedDate] = useState(() => {
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return todayStr;
  });
  
  // State for add event modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    time: '7:00',
    event: '',
    place: '',
  });

  // Function to generate all dates for the current month
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dateObj = new Date(currentYear, currentMonth, day);
      const dayOfWeek = dayAbbr[dateObj.getDay()];
      
      // Check if it's today
      const isToday = 
        day === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear();

      days.push({
        date: day,
        dateStr: dateStr,
        day: dayOfWeek,
        isToday: isToday,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  // Function to format date for display
  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Function to get month/year display
  const monthYearDisplay = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [currentMonth, currentYear]);

  // Navigation functions
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDate(todayStr);
  };

  // Calculate total events count
  const totalEvents = Object.keys(eventsData).reduce((sum, date) => {
    return sum + eventsData[date].length;
  }, 0);

  // Get events count for selected date
  const selectedDateEventsCount = eventsData[selectedDate] ? eventsData[selectedDate].length : 0;

  // Function to check if an event exists for a specific date and time
  const getEventForSlot = (dateStr, time) => {
    const dayEvents = eventsData[dateStr];
    if (dayEvents) {
      return dayEvents.find(event => event.time === time);
    }
    return null;
  };

  // Function to handle adding new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.event.trim() || !newEvent.place.trim()) {
      alert('Please fill in both event name and place');
      return;
    }

    const dateStr = newEvent.date;
    setEventsData(prev => {
      const updated = { ...prev };
      if (updated[dateStr]) {
        // Check if event already exists at this time
        const existing = updated[dateStr].find(e => e.time === newEvent.time);
        if (existing) {
          alert('An event already exists at this time. Please choose a different time.');
          return prev;
        }
        updated[dateStr] = [...updated[dateStr], { time: newEvent.time, event: newEvent.event, place: newEvent.place }];
      } else {
        updated[dateStr] = [{ time: newEvent.time, event: newEvent.event, place: newEvent.place }];
      }
      return updated;
    });

    // Reset form
    setNewEvent({
      date: selectedDate,
      time: '7:00',
      event: '',
      place: '',
    });
    setShowAddModal(false);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (dateStr, time) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEventsData(prev => {
        const updated = { ...prev };
        if (updated[dateStr]) {
          updated[dateStr] = updated[dateStr].filter(event => event.time !== time);
          if (updated[dateStr].length === 0) {
            delete updated[dateStr];
          }
        }
        return updated;
      });
    }
  };

  // Function to handle clicking on empty calendar cell to add event
  const handleEmptyCellClick = (dateStr, time) => {
    setSelectedDate(dateStr);
    setNewEvent({
      date: dateStr,
      time: time,
      event: '',
      place: '',
    });
    setShowAddModal(true);
  };

  // Function to handle date selection from calendar
  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
  };

  return (
    <div className="min-h-screen bg-[#E0BBE4]"> 
      {/* Top Dark Purple Gradient Header */}
      <div className="bg-gradient-to-r from-[#6A0DAD] to-[#8B4FA8] w-full py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-green-500">E</span>
            <span className="text-xl font-semibold text-white">Ease</span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Calendar Title Section */}
        <div className="bg-purple-200 py-4 mb-4 rounded-lg text-center">
          <h1 className="text-3xl font-bold text-black">
            Calendar - {selectedDateEventsCount} Events on {formatDateDisplay(selectedDate)}
          </h1>
        </div>

        {/* Month Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">{monthYearDisplay}</h2>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Today
              </button>
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Monthly Calendar Grid */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b-2 border-purple-300">
            {dayAbbr.map((day) => (
              <div key={day} className="p-3 border-r border-purple-200 last:border-r-0 font-bold text-center text-gray-700 bg-purple-50">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Dates Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((dayData, index) => {
              if (!dayData) {
                return (
                  <div key={`empty-${index}`} className="min-h-[80px] border-r border-b border-purple-200 last:border-r-0"></div>
                );
              }

              const { date, dateStr, day, isToday } = dayData;
              const isSelected = dateStr === selectedDate;
              const hasEvents = eventsData[dateStr] && eventsData[dateStr].length > 0;

              return (
                <div
                  key={dateStr}
                  className={`min-h-[80px] border-r border-b border-purple-200 last:border-r-0 p-2 cursor-pointer transition-all
                    ${isSelected ? 'bg-purple-100' : 'hover:bg-purple-50'}
                  `}
                  onClick={() => handleDateSelect(dateStr)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div
                      className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all
                        ${isSelected 
                          ? 'bg-[#6A0DAD] text-white shadow-lg scale-110' 
                          : isToday 
                            ? 'bg-purple-300 text-purple-900' 
                            : 'text-gray-700'
                        }`
                      }
                    >
                      {date}
                    </div>
                    {hasEvents && (
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{day}</div>
                  {hasEvents && (
                    <div className="mt-1 text-xs text-purple-600 font-semibold">
                      {eventsData[dateStr].length} event{eventsData[dateStr].length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Categories Bar */}
        <div className="bg-[#9B59B6] rounded-lg p-3 mb-4 grid grid-cols-4 gap-4 text-white font-semibold">
          <div className="text-center">Day</div>
          <div className="text-center">Date</div>
          <div className="text-center">Place</div>
          <div className="text-center">Event</div>
        </div>

        {/* Time Slots and Events Grid - Showing only selected date */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Selected Date Header */}
          <div className="grid grid-cols-2 border-b-2 border-purple-300 bg-purple-50">
            <div className="col-span-2 p-3 border-r border-purple-200 font-bold text-center text-gray-700">
              <div className="text-lg">{formatDateDisplay(selectedDate)}</div>
              <div className="text-sm text-purple-600">
                {calendarDays.find(d => d && d.dateStr === selectedDate)?.day || ''}
              </div>
            </div>
          </div>

          {/* Time Slots and Events Grid */}
          <div className="relative">
            {timeSlots.map((time, timeIndex) => {
              const event = getEventForSlot(selectedDate, time);
              
              return (
                <div key={time} className={`grid grid-cols-2 ${timeIndex > 0 ? 'border-t border-purple-200' : ''}`}>
                  {/* Time Slot Column */}
                  <div className="col-span-1 p-3 border-r border-purple-200 font-bold text-black text-center flex items-center justify-center min-h-[80px]">
                    {time}
                  </div>
                  
                  {/* Event Column */}
                  <div 
                    className={`col-span-1 border-r border-purple-200 last:border-r-0 min-h-[80px] relative p-2 transition-colors
                      ${!event ? 'cursor-pointer hover:bg-purple-50 group' : ''}
                    `}
                    onClick={() => {
                      if (!event) {
                        handleEmptyCellClick(selectedDate, time);
                      }
                    }}
                    title={!event ? `Click to add event on ${formatDateDisplay(selectedDate)} at ${time}` : ''}
                  >
                    {event ? (
                      <div 
                        className="bg-[#FFFACD] rounded-md p-2 text-xs font-semibold text-black shadow-md cursor-pointer hover:shadow-lg transition-shadow relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(selectedDate, time);
                        }}
                        title="Click to delete"
                      >
                        <div className="font-bold mb-1">{event.event}</div>
                        <div className="text-[10px] text-gray-600">{event.place}</div>
                        <button 
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(selectedDate, time);
                          }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col items-center">
                          <Plus className="w-5 h-5 text-purple-400 mb-1" />
                          <span className="text-xs text-purple-400 font-medium">Add Event</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Event Button and Instructions */}
        <div className="mt-6 flex flex-col items-center space-y-3">
          <p className="text-sm text-gray-700 text-center px-4">
            <span className="font-semibold">Tip:</span> Click on any empty time slot in the calendar to add an event, or click a date header to select it first
          </p>
          <button
            onClick={() => {
              setNewEvent({ 
                date: selectedDate, 
                time: '7:00',
                event: '',
                place: '',
              });
              setShowAddModal(true);
            }}
            className="bg-[#9B59B6] hover:bg-[#8B4FA8] text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Event to Selected Date</span>
          </button>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add New Event</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {newEvent.date ? formatDateDisplay(newEvent.date) : 'None'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time
                </label>
                <select
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  value={newEvent.event}
                  onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter event name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Place
                </label>
                <input
                  type="text"
                  value={newEvent.place}
                  onChange={(e) => setNewEvent({ ...newEvent, place: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter event place"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#9B59B6] hover:bg-[#8B4FA8] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;