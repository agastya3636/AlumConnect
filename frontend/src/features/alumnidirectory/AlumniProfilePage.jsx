import React from "react";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, Agastya!
          </h1>

          <p className="text-lg text-gray-600">
            Bachelor of Technology in Computer Science
          </p>
          <p className="text-lg text-gray-600">
            Rajiv Gandhi Institute Of Petroleum Technology
          </p>
          <p className="text-lg text-gray-600">Year of Graduation: 2026</p>

          <div className="pt-8 w-full">
            <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
              <span className="font-semibold text-yellow-800">Demo Alumni Account:</span><br/>
              <span className="text-gray-700">Email: <span className="font-mono">alumni@example.com</span></span><br/>
              <span className="text-gray-700">Password: <span className="font-mono">alumni123</span></span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Connect with me:</h3>
            <div className="flex space-x-4 mt-2">
              <Link to="https://linkedin.com/agastya" className="text-blue-600"><BsLinkedin size={32} /></Link>
              <Link to="https://twitter.com/agastya" className="text-blue-400"><BsTwitter size={32} /></Link>
              <Link to="https://github.com/agastya" className="text-gray-800"><BsGithub size={32} /></Link>
              <Link to="https://instagram.com/agastya" className="text-pink-500"><span className="text-2xl">📸</span></Link>
              <Link to="https://facebook.com/agastya" className="text-blue-800"><span className="text-2xl">📘</span></Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Download CV</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Contact</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Endorse Skills</button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Add Testimonial</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Add Calendar Meeting</button>
            </div>
          </div>
          <div className="mt-8 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Projects</h3>
            <ul className="list-disc ml-6 text-gray-600">
              <li>AI Chatbot for College Portal</li>
              <li>Open Source Contribution: React UI Library</li>
              <li>Placement Prediction Model</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Achievements & Awards</h3>
            <ul className="list-disc ml-6 text-gray-600">
              <li>Winner, Hackathon 2025</li>
              <li>Dean's List 2024</li>
              <li>Best Project Award 2023</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Location</h3>
            <div className="mb-4">
              <iframe title="Location" src="https://maps.google.com/maps?q=Rajiv%20Gandhi%20Institute%20Of%20Petroleum%20Technology&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="150" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Batchmates</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 p-2 rounded shadow text-center w-32">John Doe<br/><span className="text-xs text-gray-500">Software Engineer</span></div>
              <div className="bg-gray-100 p-2 rounded shadow text-center w-32">Jane Smith<br/><span className="text-xs text-gray-500">Data Scientist</span></div>
              <div className="bg-gray-100 p-2 rounded shadow text-center w-32">Sophia Lee<br/><span className="text-xs text-gray-500">Designer</span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2 mt-8 md:mt-0">
          <img
            src="https://avatars.githubusercontent.com/u/124435030?v=4"
            alt="Profile"
            className="rounded-full w-48 h-48 md:w-72 md:h-72 object-cover shadow-md"
          />
          <h3 className="text-xl font-bold bg-green-500 px-8 text-white p-2 rounded mt-4">
            Student
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
