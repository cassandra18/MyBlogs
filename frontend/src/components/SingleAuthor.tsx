import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';

interface Admin {
    image: string;
    username: string;
    email: string;
    bio: string;
}

const SingleAuthor: React.FC = () => {
    const { adminId } = useParams();
    const [admin, setAdmin] = useState<Admin | null>(null);

    useEffect(() => {
        const fetchAuthorDeails = async () => {
        try {
            const response = await fetch(`https://cassys-web.onrender.com/api/admin/get-admin/${adminId}`);
            const data :Admin= await response.json()
            setAdmin(data);
        
        } catch (error) {
            console.error('Error fetching author details:', error);
        }
    }
        fetchAuthorDeails();
}, [adminId]);

    return (
        <div className='md:max-w-7xl mx-auto mt-24 md:mb-64'>
            { admin ? (
                <div>
                <div className='md:inline-flex md:gap-12 my-10 mx-auto'>
                    <img src={admin.image} alt="" loading='lazy'
                    className='rounded-md w-1/2 h-auto mb-4 ml-2'/>
                    <div>
                    <h2 className='font-bold text-xl text-orange-500 mb-4'> Meet {admin.username}</h2>
                   
                    <p className='text-gray-600'>{admin.bio}. vue voluptatibus ex mollitia, quasi enim sed aliquid quos doloremque, ut ad odit unde consequatur quis itaque, omnis sequi quo officia?</p>
                    <br></br>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, deleniti? Assumenda doloremque id ipsum quia ex. Eveniet asperiores saepe eum molestias quo perferendis quaerat debitis. Aliquam praesentium libero possimus! Architecto.</p>
                    <br></br>
                    <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ipsam quis, veniam facere eaque est enim consequatur quasi exercitationem inventore, quisquam repellendus aperiam sed, beatae velit perferendis magni excepturi sequi.</p>
                    
                    </div>
                </div>
                <p className='mt-12 text-xl text-center px-2 animated-text '>Reach out to me on:</p>
                    <p className='font-serif px-2 text-center'>{admin.email}</p>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
           
        </div>
    );
}


export default SingleAuthor;