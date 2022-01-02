import React, { useEffect } from "react";
import "../../../assets/css/styles.css";

function Dashboard({ InternalLoad, setInternalLoad, siteData }) {
  siteData.dashboard = siteData.dashboard ? siteData.dashboard : {};
  console.log(siteData.dashboard);
  useEffect(() => {
    if (!siteData.dashboard.loaded) {
      siteData.dashboard.loaded = 1;
      setInternalLoad(true);
      setTimeout(() => {
        siteData.dashboard.loaded = 2;
        setInternalLoad(false);
      }, 1000);
    } else if (siteData.dashboard.loaded == 1 && !InternalLoad)
      setInternalLoad(true);
    else if (siteData.dashboard.loaded == 2 && InternalLoad) {
      setInternalLoad(false);
    }
  }, []);

  return (
    <div className="wrapperContent">
      <h2 className="label heading">Hello World</h2>
    </div>
  );
}

export default Dashboard;
