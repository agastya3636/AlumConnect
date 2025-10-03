import Welcome from "./Welcome";
import DashboardForums from "./DashboardForums";
import DashboardEvents from "./DashboardEvents";
import Jobs from "./Jobs";

const DashboardLayout = () => {
  return (
    <div className="min-h-full p-3 sm:p-4 md:p-6 lg:p-8">
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