import Welcome from "./Welcome";
import DashboardForums from "./DashboardForums";
import DashboardEvents from "./DashboardEvents";
import Jobs from "./Jobs";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="lg:col-span-3">
          <Welcome />
        </div>
        <div className="lg:col-span-2">
          <DashboardForums />
        </div>
        <div className="lg:col-span-1">
          <DashboardEvents />
        </div>
        <div className="lg:col-span-3">
          <Jobs />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;