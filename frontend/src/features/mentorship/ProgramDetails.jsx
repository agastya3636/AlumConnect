import { useParams } from "react-router-dom";
import { mentorshipPrograms } from "../../utils/MockData";

const ProgramDetails = () => {
  const { id } = useParams();
  const program = mentorshipPrograms.programs.find(
    (p) => p.id === Number.parseInt(id)
  );

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <div className="min-h-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-12xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <img
          src={program.mentor.image || "/placeholder.svg"}
          alt={program.title}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          {program.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-2">
          {program.mentor.name}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-2">
          {program.duration}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {program.description}
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Benefits
        </h2>
        <ul className="list-disc list-inside mb-4">
          {program.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              {benefit}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Prerequisites:</strong> {program.prerequisites}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Application Process:</strong> {program.applicationProcess}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Fees:</strong> {program.fees}
        </p>
      </div>
    </div>
  );
};

export default ProgramDetails;