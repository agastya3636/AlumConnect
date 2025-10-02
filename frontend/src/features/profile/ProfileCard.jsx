import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ProfileCard = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div
      className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg 
    shadow-lg p-4 sm:p-6 md:p-8 max-w-7xl mx-auto text-white"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 md:gap-8 lg:gap-12">
        {/* Profile Picture */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <img
            src={profile?.image || "/placeholder.svg"}
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-grow w-full space-y-4 md:space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {profile.name}
            </h2>
            <p className="text-base sm:text-lg break-all">{profile.email}</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                profile.role === "student"
                  ? "bg-green-200 text-green-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {profile.role === "student" ? "Student" : "Alumnus"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Bio</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {profile.bio || "No bio available"}
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Education
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {profile.education || "No education info"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-white/80">No skills added</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests && profile.interests.length > 0 ? (
                  profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-white text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-white/80">No interests added</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Batch</h3>
            <p className="text-sm sm:text-base">
              {profile.batch || "No batch info"}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-6 w-full lg:w-auto">
          {profile.socialLinks?.github && (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl sm:text-3xl hover:text-gray-300" />
            </a>
          )}
          {profile.socialLinks?.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl sm:text-3xl hover:text-gray-300" />
            </a>
          )}
          {profile.socialLinks?.twitter && (
            <a
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Twitter"
            >
              <FaTwitter className="text-2xl sm:text-3xl hover:text-gray-300" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;