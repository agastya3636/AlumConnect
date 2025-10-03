import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EventsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events/?limit=20`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events" + response);
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-gray-600 text-center p-4">Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center p-4">Error: {error}</p>;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center sm:text-left">
          Events
        </h1>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 sm:p-3 px-3 sm:px-4 rounded-lg w-full sm:w-64 md:w-80 text-sm md:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      <div className="w-full max-w-6xl">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white/20 dark:bg-gray-800/60 backdrop-filter backdrop-blur-lg rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-lg ring-1 ring-white/20 dark:ring-gray-700 transform transition duration-500 hover:scale-105 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] flex flex-col"
              >
                <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 break-words">
                  {event.title}
                </h2>
                <p className="text-white text-xs sm:text-sm mb-1">
                  {event.date}
                </p>
                <p className="text-white text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 line-clamp-3 break-words">
                  {event.description}
                </p>
                <p className="text-white text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 break-words">
                  Author: {event.collage}
                </p>
                <a
                  href={event.collage}
                  className="text-blue-200 dark:text-blue-400 hover:underline text-xs sm:text-sm md:text-base break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Google Meet
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold">
              No match found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCard;