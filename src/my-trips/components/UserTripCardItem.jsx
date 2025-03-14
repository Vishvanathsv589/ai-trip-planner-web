import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
          
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[5].name);
            setPhotoUrl(PhotoUrl);
        })
    }

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className= 'hover:scale-105 translate-all'>
        <img src={photoUrl || "/placeholder.png"} className="object-cover rounded-xl h-[225px] w-full "/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip.userSelection.noOfDays} Days trip with {trip.userSelection.budget} Budget. </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem