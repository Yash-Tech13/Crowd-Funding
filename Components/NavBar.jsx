import React, { useState, useContext } from "react";

//INTERNAL IMPORT
import { CrowdfundingContext } from "@/Context/Crowdfunding";
import { Logo } from "../Components/index";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdfundingContext);

  const menuList = ["White Paper", "Project", "Donation", "Members"];

  return (
    <div className="backgroundMain">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex item-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Company
              </span>
            </a>
            <ul className="flex items-center hidden space-x-8 lg:flex">
                {menuList.map((elem, i) => (
                    <li key={i+1}>
                        <a
                            href="/"
                            aria-label="Our Product"
                            title="Our Product"
                            className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >{elem}</a>
                    </li>
                ))}
            </ul>
          </div>
          {!currentAccount && (
            <ul className="flex items-center hidden span-x-8  lg:flex">
                <li>
                    <button
                        onClick={()=> connectWallet()}
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                        aria-label="Sign Up"
                        title="Sign Up"
                    >
                        Connect Wallet
                    </button>
                </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
