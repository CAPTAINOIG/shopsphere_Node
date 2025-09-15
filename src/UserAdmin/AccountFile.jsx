import React, { useState } from "react";
import MyCards from "./MyCards";
import Plan from "./Plan";
import DoughnutChart from "./DoughnutChart";
import BarRevenue from "./BarRevenue";
import InviteMembers from "./InviteMembers";
import TeamsManage from "./TeamsManage";

const AccountFile = () => {
  const [view, setView] = useState("default");

  const renderContent = () => {
    switch (view) {
      case "team":
        return <div className="p-10 text-xl"><TeamsManage onBack={() => setView("default")}/></div>;
      case "invite":
        return (
          <div className="md:p-10  text-xl">
            <InviteMembers onBack={() => setView("default")} />
          </div>
        );
      case "reminder":
        return <div className="p-10 text-xl">🔔 Send Reminders View</div>;
      default:
        return (
          <>
            <MyCards onCardClick={setView} />
            <Plan />
            <BarRevenue />
            <DoughnutChart />
          </>
        );
    }
  };

  return <div className="my-20 mx-5">{renderContent()}</div>;
};

export default AccountFile;
