import React from "react";
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
    return <p className="text-gray-600">Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }


  return (

    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                <Link
                  to={`/events/${event._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {event.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">
                {event.date} - {event.location}
              </p>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No events available at the moment.</p>
      )}
    </div>
  );
};

export default DashboardEvents;
