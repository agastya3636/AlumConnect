import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BatchDetails = ({ username, setUsername, room, setRoom, socket }) => {
  const { year } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [batch, setBatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/alumni?batch=${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch batch");
        }
        const data = await response.json();
        setBatch(data.alumni);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBatch();
  }, [year]);

  const handleChat = (student) => {
    const roomName = `${username}-${student.username}`;
    setRoom(roomName);
    socket.emit("join_room", { studentUsername: username, room: roomName });
    navigate(`/chat/${roomName}`);
  };

  if (loading) {
    return <p className="text-gray-600">Loading batch...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = batch.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-400 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-6 md:mb-8 gap-4">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center md:text-left">
          Batch of {year}
        </h1>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 px-4 rounded-lg w-full md:w-auto text-sm md:text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="w-full max-w-6xl">
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStudents.map((student, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-3xl p-4 md:p-6 shadow-lg transform transition duration-500 hover:scale-105 min-h-[180px] md:min-h-[200px] flex flex-col md:flex-row items-center md:items-start gap-4"
              >
                <img
                  src={`https://robohash.org/${student.name}.png?size=150x150`}
                  alt="Student Avatar"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2">
                    {student.name}
                  </h2>
                  <p className="text-white text-xs md:text-sm mb-1">
                    {student.department}
                  </p>
                  <p className="text-white text-xs md:text-sm mb-1">
                    {student.current_position}
                  </p>
                  <p className="text-white text-xs md:text-sm mb-2 md:mb-4">
                    {student.career_path}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <a
                      href={student.linkedinlink}
                      className="text-yellow-300 hover:underline text-sm"
                    >
                      LinkedIn
                    </a>
                    <button
                      onClick={() => handleChat(student)}
                      className="text-yellow-300 hover:underline text-sm"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <p className="text-white text-xl md:text-2xl font-bold">
              No match found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetails;