"use client";
import { Card, Hero, Popup } from "@/Components";
import React, { useState, useEffect, useContext } from "react";
import { CrowdfundingContext } from "../Context/Crowdfunding";

function page() {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations
  } = useContext(CrowdfundingContext);

  const [allCampaign, setAllCampaign] = useState();
  const [userCampaign, setUserCampaign] = useState();

  useEffect(() => {
    const getCampaignData = getCampaigns();
    const userCampaignData = getUserCampaigns();
    return async () => {
      const allData = await getCampaignData;
      const userData = await userCampaignData;

      setAllCampaign(allData);
      setUserCampaign(userData);  
    };
  }, []);

  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  return (
    <>
        <Hero titleData={titleData} createCampaign={createCampaign} />

        <Card 
          title="All Listed Campaign"
          allCampaign = {allCampaign}
          setOpenModel = {setOpenModel}
          setDonate = {setDonateCampaign}
        />

        <Card 
          title="Your Created Campaign"
          allCampaign={userCampaign}
          setOpenModel={setOpenModel}
          setDonate={setDonateCampaign}
        />

        {openModel && (
          <Popup
            setOpenModel={setOpenModel}
            getDonations={getDonations}
            donate={donateCampaign}
            donateFunction={donate}
          />
        )}
    </>
  );
}

export default page;
