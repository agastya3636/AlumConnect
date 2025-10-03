import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events/?limit=2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events");
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
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
        <p className="text-gray-600 text-sm md:text-base">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
        <p className="text-red-500 text-sm md:text-base break-words">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 h-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
        Upcoming Events
      </h2>
      {events.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="border-b pb-3 sm:pb-4 last:border-b-0"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 break-words">
                <Link
                  to={`/events/${event._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {event.title}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
                {event.date} - {event.location}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 line-clamp-3 break-words">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm md:text-base">
          No events available at the moment.
        </p>
      )}
    </div>
  );
};

export default DashboardEvents;