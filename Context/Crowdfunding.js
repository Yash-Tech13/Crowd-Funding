import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
const {ethers, JsonRpcProvider} =  require('ethers');

// Internal imports
import { crowdfundingAddress, crowdfundingABI } from "./constants";

// ---Fetching smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(crowdfundingAddress, crowdfundingABI, signerOrProvider);

export const CrowdfundingContext = React.createContext();
export const CrowdfundingProvider = ({ children }) => {
  const titleData = "Crowdfunding Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  
  const createCampaign = async (campaign) => {
    const {title, description, amount, deadline} = campaign;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = await fetchContract(signer);

    console.log(currentAccount);
    try {
      const transaction = await contract.createCampaign(
        currentAccount, //owner
        title, //title
        description, //description
        ethers.parseUnits(amount, 18),
        Math.floor(new Date(deadline).getTime()/1000) //deadline
      );
      console.log(deadline);
      console.log(new Date(deadline));
      await transaction.wait();
      console.log("contract call success", transaction);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const provider = new JsonRpcProvider();
    const contract = await fetchContract(provider);

    const campaigns = await contract.getCampaigns();
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.formatEther(campaign.target.toString()),
      deadline: (Number(campaign.deadline) * 1000).toString(),
      // campaign.deadline.toString(),
      amountCollected: ethers.formatEther(
        campaign.amountCollected.toString()
      ),
      pid: i,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const provider = new JsonRpcProvider();
    const contract = await fetchContract(provider);

    const campaigns = await contract.getCampaigns();

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const currentUser = accounts[0];

    const filteredCampaigns = campaigns.filter(
      (campaign) => 
        (campaign.owner.toLowerCase() === currentUser.toLowerCase())
    );
    
    const userData = filteredCampaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.formatEther(campaign.target.toString()),
      deadline: (Number(campaign.deadline) * 1000).toString(),
      // campaign.deadline.toString(),
      amountCollected: ethers.formatEther(
        campaign.amountCollected.toString()
      ),
      pid: i,
    }));
    return userData;
  };

  const donate = async (pId, amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    const campaignData = await contract.donateToCampaign(pId, {
      value: ethers.parseEther(amount),
    });

    await campaignData.wait();
    location.reload();

    return campaignData;
  };

  const getDonations = async (pId) => {
    const provider = new JsonRpcProvider();
    const contract = await fetchContract(provider);

    const donations = await contract.getDonors(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donor: donations[0][i],
        donation: ethers.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  //---Check if Wallet is connected
  const checkIfWalletConnected = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        return console.log("Install Metamask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("account not found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting to wallet");
    }
  };

  

  //----Connect Wallet Function
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install Metamask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Something went wrong while connecting to wallet");
    }
  };

  return (
    <CrowdfundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        connectWallet,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};
