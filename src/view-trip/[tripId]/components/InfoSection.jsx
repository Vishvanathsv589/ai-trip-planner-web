import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {

    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[1].name);

            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <div>
            <img
                src={photoUrl || "/placeholder.png"}className="h-[340px] w-full object-cover rounded-xl"/>

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location?.label || 'No Location'}
                    </h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text—xs md:text-md">
                            🗓️ {trip?.userSelection?.noOfDays || 'N/A'} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text—xs md:text-md">
                            💵 {trip?.userSelection?.budget || 'N/A'} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text—xs md:text-md">
                            🥂 No. Of Traveler: {trip?.userSelection?.traveler || 'N/A'}
                        </h2>
                    </div>
                </div>
                <Button className="ml-4" aria-label="Send">
                    <IoIosSend />
                </Button>
            </div>
        </div>
    );
}

export default InfoSection;
