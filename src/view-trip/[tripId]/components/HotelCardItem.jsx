import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function HotelCardItem({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div
            className="hover:scale-105 transition-all cursor-pointer"
            onClick={() =>
                window.open(
                    `https://www.google.com/maps/search/?api=1&query=` +
                    encodeURIComponent(hotel.hotelName + ", " + hotel.hotelAddress),
                    "_blank"
                )
            }
        >
            <img
                src={photoUrl || "/placeholder.jpg"}
                alt={hotel.hotelName || "Hotel"}
                className="rounded-lg w-full h-48 object-cover"
            />
            <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                <h2 className="text-sm">💵 {hotel?.price}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
                <h2 className="text-xs text-gray-500">
                    Amenities: {hotel?.amenities?.join(", ")}
                </h2>
            </div>
        </div>
    );
}

export default HotelCardItem;
