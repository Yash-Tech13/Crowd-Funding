import React from 'react';

const Footer = () => {
    const productList = ["Market", "ERC20 Token", "Donation"];
    const contactList = [
        "support@crytoking.com",
        "info@example.com",
        "Contact us"
    ];
    const usefulLink = ["Home","About us", "Company Bio"];
    return (
        <footer className='text-center text-white backgroundMain lg:text-left'>
            <div className='mx-6 py-10 text-center md:text-left'>
                <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
                    <div className=''>
                        <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>Crypto King</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate.</p>
                    </div>
                    <div className=''>
                        <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>Products</h6>
                        {productList.map((elem,i) => (
                            <p className='mb-4' key={i+1}>
                                <a href='#!'>{elem}</a>
                            </p>
                        ))}
                    </div>
                    <div className=''>
                        <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>Useful Links</h6>
                        {usefulLink.map((elem,i) => (
                            <p className='mb-4' key={i+1}>
                                <a href='#!'>{elem}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                    <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>Contact</h6>
                        {contactList.map((elem,i) => (
                            <p className='mb-4' key={i+1}>
                                <a href='#!'>{elem}</a>
                            </p>
                        ))}
                    </div>

                </div>
            </div>
            <div className='backgroundMain p-6 text-center'>
                <span>
                ©️ 2023 Copyright:
                </span>
                <a className='font-semibold' href='https://tailwind-elements.com/'>Crypto King</a>
            </div>
        </footer>
    );
};

export default Footer;