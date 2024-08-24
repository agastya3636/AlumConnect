import React from "react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "React Workshop",
    date: "2023-10-10",
    location: "Online",
    description: "A workshop to learn the basics of React.",
  },
  {
    id: 2,
    title: "JavaScript Conference",
    date: "2023-11-15",
    location: "San Francisco, CA",
    description: "A conference for JavaScript enthusiasts.",
  },
  {
    id: 3,
    title: "Tech Meetup",
    date: "2023-12-05",
    location: "New York, NY",
    description:
      "A meetup for tech professionals to network and share knowledge.",
  },
];

const DashboardEvents = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                <Link
                  to={`/events/${event.id}`}
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
