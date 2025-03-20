import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      if (resp?.data?.places[0]?.photos?.length > 0) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setPhotoUrl(PhotoUrl);
      }
    });
  };

  return (
    <div
      className="hover:scale-105 transition-all bg-black/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:bg-black/70 cursor-pointer"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=` +
            encodeURIComponent(hotel.hotelName + ', ' + hotel.hotelAddress),
          '_blank'
        )
      }
    >
      <img
        src={photoUrl || '/placeholder.png'}
        alt={hotel.hotelName || 'Hotel'}
        className="rounded-lg w-full h-48 object-cover"
      />
      <div className="p-2">
        <h2 className="font-bold text-lg text-white">{hotel?.hotelName}</h2>
        <h2 className="text-xs text-gray-300">📍 {hotel?.hotelAddress}</h2>
        <h2 className="text-sm text-gray-300">💵 {hotel?.price}</h2>
        <h2 className="text-sm text-gray-300">⭐ {hotel?.rating}</h2>
        <h2 className="text-xs text-gray-300">
          Amenities: {hotel?.amenities?.join(', ') || 'N/A'}
        </h2>
      </div>
    </div>
  );
}

export default HotelCardItem;
