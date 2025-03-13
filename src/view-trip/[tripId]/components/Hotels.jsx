import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
    if (!trip || !trip.tripData || !trip.tripData.hotelOptions) {
        return (
            <div>
                <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
                <p>No hotel data available.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip.tripData.hotelOptions.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    );
}

export default Hotels;
