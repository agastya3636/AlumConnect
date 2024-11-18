import React from "react";
import Welcome from "./Welcome";
import DashboardForums from "./DashboardForums";
import DashboardEvents from "./DashboardEvents";
import Jobs from "./Jobs";

const DashboardLayout = () => {
  return (
    <div className="min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Welcome />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <DashboardForums />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <DashboardEvents />
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-3">
          <Jobs />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
