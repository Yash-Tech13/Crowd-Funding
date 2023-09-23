"use client";
import { Footer, NavBar } from "@/Components";
import React, { useState } from "react";
import { CrowdfundingProvider } from "@/Context/Crowdfunding";

function page() {
  return (
    <>
      <CrowdfundingProvider>
        <NavBar />
        Hello World!!!!
        <Footer />
      </CrowdfundingProvider>
    </>
  );
}

export default page;
