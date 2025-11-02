import React, { useState, useMemo } from 'react';
import { Search, Calendar, Utensils, Music, DollarSign, Coffee, Zap, User, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper function to generate date string
const getDateStr = (year, month, day) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Helper function to get date from date string
const getDateFromStr = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};

// --- Initial Event Data ---
const getInitialEvents = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  
  return [
    { 
      name: 'Arijit Singh Concert', 
      time: '10:00 PM', 
      city: 'Delhi - Pragati Maidan', 
      price: '45.90',
      image: 'url("https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Arijit+Concert")',
      color: 'bg-red-500/30',
      category: 'Concerts',
      date: getDateStr(year, month, 15)
    },
    { 
      name: 'Tape a tale - The poetic night', 
      time: '9:00 PM', 
      city: 'Delhi - Pragati Maidan', 
      price: '45.90',
      image: 'url("https://via.placeholder.com/600x400/DAF7A6/000000?text=Poetic+Night")',
      color: 'bg-amber-700/30',
      category: 'Creative',
      date: getDateStr(year, month, 16)
    },
    { 
      name: "Hackathon - hacker's night", 
      time: '11:00 PM', 
      city: 'Delhi - Pragati Maidan', 
      price: '45.90',
      image: 'url("https://via.placeholder.com/600x400/C70039/FFFFFF?text=Hackathon")',
      color: 'bg-green-700/30',
      category: 'Challenges',
      date: getDateStr(year, month, 17)
    },
    { 
      name: 'Garba night - The memorable one', 
      time: '11:00 PM', 
      city: 'Delhi - Pragati Maidan', 
      price: '45.90',
      image: 'url("https://via.placeholder.com/600x400/900C3F/FFFFFF?text=Garba+Night")',
      color: 'bg-yellow-400/30',
      category: 'Cultural',
      date: getDateStr(year, month, 18)
    },
    { 
      name: 'Competitive Challenges', 
      time: '11:00 PM', 
      city: 'Delhi - Pragati Maidan', 
      price: '45.90',
      image: 'url("https://via.placeholder.com/600x400/581845/FFFFFF?text=Challenges")',
      color: 'bg-yellow-600/40',
      category: 'Challenges',
      date: getDateStr(year, month, 20)
    },
  ];
};

const initialEvents = getInitialEvents();

// Color mapping based on category
const categoryColors = {
  'Concerts': 'bg-red-500/30',
  'Creative': 'bg-amber-700/30',
  'Challenges': 'bg-green-700/30',
  'Cultural': 'bg-yellow-400/30',
  'Food': 'bg-orange-500/30',
  'Drinks': 'bg-blue-500/30',
  'Charges': 'bg-purple-500/30',
};

// Generate placeholder image URL based on event name
const generateImageUrl = (eventName) => {
  const colors = ['FF5733', 'DAF7A6', 'C70039', '900C3F', '581845', 'FF6B9D', '4ECDC4'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const encodedName = encodeURIComponent(eventName);
  return `url("https://via.placeholder.com/600x400/${randomColor}/FFFFFF?text=${encodedName}")`;
};

// --- Nav Button Component ---
const NavButton = ({ icon: Icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 py-2 px-4 rounded-full font-medium text-sm transition-colors duration-200 shadow-lg whitespace-nowrap
      ${isActive
        ? 'bg-pink-600 text-white shadow-pink-600/50' // Active state matching the screenshot
        : 'bg-transparent text-white border border-purple-400/50 hover:bg-purple-700/50' // Inactive state
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </button>
);

// --- Event Card Component ---
const EventCard = ({ event, onDelete }) => (
  <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gray-800/10 hover:shadow-pink-500/20 transition duration-300 cursor-pointer group">
    
    {/* Image container with gradient overlay */}
    <div 
      className="h-64 bg-cover bg-center" 
      style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), ${event.image}` }}
    >
      {/* Visual effect layer (for color mixing) */}
      <div className={`absolute inset-0 ${event.color} opacity-40 mix-blend-color-dodge pointer-events-none`}></div>

      {/* Price Tag (bottom right in the image) */}
      {event.price && (
        <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-80 text-white font-bold py-1 px-3 rounded-lg text-lg border border-gray-700">
          ${event.price}
        </div>
      )}

      {/* Delete Button (top right, visible on hover) */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
          title="Delete event"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      {/* Text Details (bottom left) */}
      <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-extrabold leading-snug">{event.name}</h3>
          <p className="text-sm text-gray-300 mt-1">
              {event.city} - {event.time}
          </p>
      </div>
    </div>
  </div>
);

// Day abbreviations
const dayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// --- Calendar View Component ---
const CalendarView = ({ events, onEventClick, currentMonth, currentYear, onMonthChange, onToday }) => {
  const today = new Date();
  
  // Generate calendar days for the current month
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
      const dateStr = getDateStr(currentYear, currentMonth + 1, day);
      const dateObj = new Date(currentYear, currentMonth, day);
      const dayOfWeek = dayAbbr[dateObj.getDay()];
      
      // Check if it's today
      const isToday = 
        day === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear();

      // Get events for this date
      const dayEvents = events.filter(event => event.date === dateStr);

      days.push({
        date: day,
        dateStr: dateStr,
        day: dayOfWeek,
        isToday: isToday,
        events: dayEvents,
      });
    }

    return days;
  }, [currentMonth, currentYear, events, today]);

  const monthYearDisplay = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [currentMonth, currentYear]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  return (
    <div className="bg-[#581c87] rounded-xl p-6 border border-purple-600 shadow-2xl">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-purple-700 rounded-lg transition-colors text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white">{monthYearDisplay}</h2>
          <button
            onClick={onToday}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors"
          >
            Today
          </button>
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-purple-700 rounded-lg transition-colors text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#3b0764] rounded-lg overflow-hidden border border-purple-600">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b-2 border-purple-600">
          {dayAbbr.map((day) => (
            <div key={day} className="p-3 border-r border-purple-600 last:border-r-0 font-bold text-center text-white bg-purple-800/50">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Dates Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((dayData, index) => {
            if (!dayData) {
              return (
                <div key={`empty-${index}`} className="min-h-[100px] border-r border-b border-purple-600 last:border-r-0 bg-[#581c87]/30"></div>
              );
            }

            const { date, dateStr, day, isToday, events: dayEvents } = dayData;

            return (
              <div
                key={dateStr}
                className="min-h-[100px] border-r border-b border-purple-600 last:border-r-0 p-2 bg-[#581c87]/50 hover:bg-purple-700/30 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <div
                    className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all
                      ${isToday 
                        ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/50' 
                        : 'text-white'
                      }`}
                  >
                    {date}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  )}
                </div>
                <div className="text-xs text-gray-400 mb-2">{day}</div>
                {dayEvents.length > 0 && (
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, idx) => (
                      <div
                        key={idx}
                        onClick={() => onEventClick && onEventClick(event)}
                        className="text-xs bg-pink-600/80 text-white px-2 py-1 rounded cursor-pointer hover:bg-pink-500 truncate"
                        title={event.name}
                      >
                        {event.name}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-pink-300 font-semibold">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const EventsPage = () => {
  const categories = [
    { icon: Zap, text: "My feed", filter: 'All' },
    { icon: Calendar, text: "Calendar", filter: 'Calendar' },
    { icon: Utensils, text: "Food", filter: 'Food' },
    { icon: Music, text: "Concerts", filter: 'Concerts' },
    { icon: DollarSign, text: "Charges", filter: 'Charges' },
    { icon: Coffee, text: "Drinks", filter: 'Drinks' },
  ];
  
  const today = new Date();
  const [events, setEvents] = useState(initialEvents);
  const [activeFilter, setActiveFilter] = useState('My feed');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [newEvent, setNewEvent] = useState({
    name: '',
    time: '',
    city: '',
    price: '',
    category: 'Concerts',
    image: '',
    date: '',
  });

  const isCalendarView = activeFilter === 'Calendar';

  // Basic filtering logic
  const filteredEvents = events.filter(event => {
    if (activeFilter === 'My feed' || activeFilter === 'All') {
      return true;
    }
    if (activeFilter === 'Calendar') {
      return true; // All events shown in calendar
    }
    return event.category === activeFilter || event.category === activeFilter;
  });

  // Handle month navigation
  const handleMonthChange = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  // Handle go to today
  const handleGoToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Handle adding new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.name.trim() || !newEvent.time.trim() || !newEvent.city.trim()) {
      alert('Please fill in all required fields (Name, Time, City, Date)');
      return;
    }

    // Generate date if not provided
    let eventDate = newEvent.date.trim();
    if (!eventDate) {
      // Default to today if no date provided
      eventDate = getDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    } else {
      // Ensure date format is correct (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
        alert('Please enter date in format YYYY-MM-DD (e.g., 2024-12-25)');
        return;
      }
    }

    // Format image URL properly
    let imageUrl = newEvent.image.trim();
    if (!imageUrl) {
      imageUrl = generateImageUrl(newEvent.name);
    } else if (!imageUrl.startsWith('url(')) {
      imageUrl = `url("${imageUrl}")`;
    }

    const eventToAdd = {
      ...newEvent,
      price: newEvent.price || '0.00',
      image: imageUrl,
      color: categoryColors[newEvent.category] || categoryColors['Concerts'],
      date: eventDate,
    };

    setEvents([...events, eventToAdd]);
    
    // Reset form
    setNewEvent({
      name: '',
      time: '',
      city: '',
      price: '',
      category: 'Concerts',
      image: '',
      date: '',
    });
    setShowAddModal(false);
  };

  // Handle deleting event
  const handleDeleteEvent = (index) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((_, i) => i !== index));
    }
  };

  return (
    // Main container uses the deep purple background color from the screenshot
    <div className="min-h-screen bg-[#3b0764] p-4 sm:p-8">

      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-1">
          <h1 className="text-5xl font-extrabold text-yellow-400 leading-none">
            E<span className="text-white">Ease</span>
          </h1>
          {/* Small leaf placeholder (from screenshot) */}
          <span className="text-green-400 text-lg"></span>
        </div>
        {/* User Icon (Avatar) - Rounded pink/orange button from screenshot */}
        <div className="rounded-full bg-pink-600 p-2 text-white shadow-lg shadow-pink-600/50 cursor-pointer">
          <User className="w-6 h-6" />
        </div>
      </header>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search all events......."
          // Custom background color matching the screenshot's search bar
          className="w-full bg-[#581c87] text-white placeholder-gray-400 p-4 pl-12 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 transition-shadow"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {/* Upcoming Events Heading */}
      <h2 className="text-xl font-semibold text-white mb-6">Upcoming events</h2>
      
      {/* Navigation Filters (Horizontal Scroll) */}
      <div className="flex space-x-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <NavButton 
            key={cat.text}
            icon={cat.icon} 
            text={cat.text} 
            isActive={activeFilter === cat.text} 
            onClick={() => setActiveFilter(cat.text)}
          />
        ))}
      </div>

      {/* Add Event Button */}
      <div className="mb-8 flex justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Calendar View */}
      {isCalendarView && (
        <CalendarView
          events={filteredEvents}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={handleMonthChange}
          onToday={handleGoToToday}
        />
      )}

      {/* Events Grid */}
      {!isCalendarView && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard 
              key={index} 
              event={event} 
              onDelete={() => handleDeleteEvent(index)}
            />
          ))}
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#3b0764] rounded-lg shadow-2xl max-w-2xl w-full p-6 border-2 border-pink-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Add New Event to Feed</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                    placeholder="Enter event name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Time *
                  </label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                    placeholder="e.g., 10:00 PM"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Date (YYYY-MM-DD) *
                  </label>
                  <input
                    type="text"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                    placeholder="e.g., 2024-12-25 (defaults to today if empty)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    City & Location *
                  </label>
                  <input
                    type="text"
                    value={newEvent.city}
                    onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                    placeholder="e.g., Delhi - Pragati Maidan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                    placeholder="e.g., 45.90"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">
                    Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  >
                    <option value="Concerts">Concerts</option>
                    <option value="Creative">Creative</option>
                    <option value="Challenges">Challenges</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Food">Food</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Charges">Charges</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">
                    Image URL (Optional - will generate placeholder if empty)
                  </label>
                  <input
                    type="text"
                    value={newEvent.image}
                    onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                    className="w-full px-4 py-2 bg-[#581c87] text-white border border-purple-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent placeholder-gray-400"
                    placeholder="Enter image URL or leave empty for auto-generated"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Add Event to Feed
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
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

export default EventsPage;