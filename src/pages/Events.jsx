import React, { useState } from 'react';
import { Search, Calendar, Utensils, Music, DollarSign, Coffee, Zap, User } from 'lucide-react';

// --- Event Data ---
const Events = [
  { 
    name: 'Arijit Singh Concert', 
    time: '10:00 PM', 
    city: 'Delhi - Pragati Maidan', 
    price: '45.90', 
    image: 'url("https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Arijit+Concert")',
    color: 'bg-red-500/30',
    category: 'Concerts'
  },
  { 
    name: 'Tape a tale - The poetic night', 
    time: '9:00 PM', 
    city: 'Delhi - Pragati Maidan', 
    price: '45.90', 
    image: 'url("https://via.placeholder.com/600x400/DAF7A6/000000?text=Poetic+Night")',
    color: 'bg-amber-700/30',
    category: 'Creative'
  },
  { 
    name: "Hackathon - hacker's night", 
    time: '11:00 PM', 
    city: 'Delhi - Pragati Maidan', 
    price: '45.90', 
    image: 'url("https://via.placeholder.com/600x400/C70039/FFFFFF?text=Hackathon")',
    color: 'bg-green-700/30',
    category: 'Challenges'
  },
  { 
    name: 'Garba night - The memorable one', 
    time: '11:00 PM', 
    city: 'Delhi - Pragati Maidan', 
    price: '45.90', 
    image: 'url("https://via.placeholder.com/600x400/900C3F/FFFFFF?text=Garba+Night")',
    color: 'bg-yellow-400/30',
    category: 'Cultural'
  },
  { 
    name: 'Competitive Challenges', 
    time: '11:00 PM', 
    city: 'Delhi - Pragati Maidan', 
    price: '45.90', 
    image: 'url("https://via.placeholder.com/600x400/581845/FFFFFF?text=Challenges")',
    color: 'bg-yellow-600/40',
    category: 'Challenges'
  },
];

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
const EventCard = ({ event }) => (
  <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gray-800/10 hover:shadow-pink-500/20 transition duration-300 cursor-pointer">
    
    {/* Image container with gradient overlay */}
    <div 
      className="h-64 bg-cover bg-center" 
      // The image prop defines the background, including the placeholder URL
      style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), ${event.image}` }}
    >
      {/* Visual effect layer (for color mixing) */}
      <div className={`absolute inset-0 ${event.color} opacity-40 mix-blend-color-dodge pointer-events-none`}></div>

      {/* Price Tag (bottom right in the image) */}
      <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-80 text-white font-bold py-1 px-3 rounded-lg text-lg border border-gray-700">
          ${event.price}
      </div>

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
  
  const [activeFilter, setActiveFilter] = useState('My feed');
  
  // Basic filtering logic (currently placeholder since data doesn't map to all filters)
  const filteredEvents = Events.filter(event => 
    activeFilter === 'My feed' || activeFilter === 'All'
    // Add logic here if you want real filtering, e.g., event.category === activeFilter
  );

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
      <div className="flex space-x-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;