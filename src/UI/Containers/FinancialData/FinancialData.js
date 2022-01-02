import React, { useEffect } from "react";
import ViewEditData from "../../Component/SebiForm/SectionA/ViewEditData/ViewEditData";
import hitAPI from "../../../api/axios/hitApi";

const FinancialData = ({ callApi, siteData, setSiteData }) => {
  siteData.finencial = siteData.finencial ? siteData.finencial : {};
  useEffect(() => {
    callApi("brsr/details", "GET", "", siteData.finencial);

    if (siteData.finencial.brsr) {
      callApi(
        "brsr/details",
        siteData.finencial.brsr.operation,
        siteData.finencial.brsr.input,
        siteData.finencial.brsr,
        function (out) {
          if (out) {
            if (
              siteData.finencial.brsr.operation == "POST" &&
              siteData.finencial.brsr.input.entityId
            )
              siteData.finencial.response = siteData.finencial.response.map(
                (el) =>
                  el.entityId == siteData.finencial.brsr.input.entityId
                    ? out
                    : el
              );
            else if (siteData.finencial.brsr.operation === "POST")
              siteData.finencial.response.push(out);
            else if (siteData.finencial.brsr.operation === "DELETE")
              siteData.finencial.response = siteData.finencial.response.filter(
                (el) => el.entityId !== siteData.finencial.brsr.input.entityId
              );
          }
        }
      );
    }
  }, []);

  return (
    <div className="wrapperBody">
      {siteData.finencial.response && (
        <ViewEditData siteDataObj={{ siteData, setSiteData }} />
      )}
    </div>
  );
};

export default FinancialData;
