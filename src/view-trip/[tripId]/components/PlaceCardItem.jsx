import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: place.placeName };
      const result = await GetPlaceDetails(data);
      
      const photos = result.data.places[3]?.photos;
      if (photos && photos.length > 3) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[2].name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  if (!place) return null;

  const hasCoordinates = place.geoCoordinates?.latitude && place.geoCoordinates?.longitude;
  const mapLink = hasCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${place.placeName}`
    : "#";

  return (
    <Link
      to={mapLink}
      target={hasCoordinates ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="no-underline text-black"
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img
          src={photoUrl || "/placeholder.png"}
          className='w-[130px] h-[130px] rounded-xl object-cover'
          alt={place.placeName || "Place"}
          onError={(e) => e.target.src = "/placeholder.jpg"}
        />
        <div>
          <h2 className='font-bold text-lg text-black'>{place.placeName || "Unknown Place"}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails || "No details available."}</p>
          <h2 className='text-orange-600 font-medium'>{place.ticketPricing || "Pricing unavailable"}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
