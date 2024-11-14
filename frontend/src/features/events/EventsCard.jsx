import React, { useEffect, useState } from "react";
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
          throw new Error("Failed to fetch events"+response);
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


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) //||
      // event.keywords.some((keyword) =>
      //   keyword.toLowerCase().includes(searchTerm.toLowerCase())
      // )
  );

  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="flex items-center justify-between w-full max-w-6xl mb-8">
        <h1 className="text-white text-3xl font-bold">Events</h1>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 px-4 pr-6 rounded-lg"
        />
      </div>
      
      <div className="w-full max-w-6xl">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg transform transition duration-500 hover:scale-105 min-h-[200px] flex flex-col"
              >
                <h2 className="text-white text-2xl font-bold mb-2">
                  {event.title}
                </h2>
                <p className="text-white text-sm mb-1">{event.date}</p>
                <p className="text-white text-sm mb-4">{event.description}</p>
                <p className="text-white text-sm mb-4"> 
                  Author: {event.collage}  
                  {/* change this to author */}
                </p>
                {/* <p className="text-white text-sm mb-4">
                  Keywords: {event.keywords.join(", ")}
                </p> */}
                <a
                  href={event.collage}  //change this to google meet link
                  className="text-yellow-300 hover:underline"
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
            <p className="text-white text-2xl font-bold">No match found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCard;