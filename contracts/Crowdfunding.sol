// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        uint256 deadline;
        address[] donors;
        uint256[] donations;
    }

    mapping(uint256 => campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 target, uint256 deadline) public returns(uint256) {
        campaign storage camp = campaigns[numberOfCampaigns];

        require(deadline > block.timestamp, "Deadline should be a date in the future");

        camp.owner = _owner;
        camp.title = _title;
        camp.description = _description;
        camp.target = target;
        camp.deadline = deadline;
        camp.amountCollected = 0;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        campaign storage camp = campaigns[_id];

        camp.donors.push(msg.sender);
        camp.donations.push(amount);

        (bool sent, ) = payable(camp.owner).call{value: amount}("");

        if(sent) {
            camp.amountCollected += amount;
        }

    }

    function getDonors(uint _id) public view returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donors, campaigns[_id].donations);
    }

    function getCampaigns() public view returns(campaign[] memory) {
        campaign[] memory allCampaigns = new campaign[](numberOfCampaigns);

        for(uint i=0; i<numberOfCampaigns; i++) {
            campaign storage camp = campaigns[i];

            allCampaigns[i] = camp;
        }

        return allCampaigns;
    }
}