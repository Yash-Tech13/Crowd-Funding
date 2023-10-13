import React, { useState } from 'react';

const Hero = ({ titleData, createCampaign }) => {
    const [campaign, setCampaign] = useState({
        title:"",
        description:"",
        amount:"",
        deadline:""
    });

    const createNewCampaign = async(e) => {
        e.preventDefault();
        try {
            const data = await createCampaign(campaign);
        } catch(error) {
            console.log(error);
        }
    };
    
    return(
        <>
            Hero
        </>
    );
};

export default Hero;