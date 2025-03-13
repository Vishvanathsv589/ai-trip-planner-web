import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    console.log("Itinerary Data:", trip.tripData?.itinerary);

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Places to Visit</h2>

            <div>
                {trip.tripData?.itinerary &&
                    Object.entries(trip.tripData.itinerary)
                        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
                        .map(([day, plans]) => (
                            <div className='mt-5' key={day}>
                                <h2 className="font-bold text-lg uppercase">{day.replace('day', 'DAY ')}</h2>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    {Array.isArray(plans.activities) && plans.activities.map((plan, index) => (
                                        <div key={index}>
                                            <h2 className='font-medium text-sm text-orange-600'>{plan.bestTimeToVisit}</h2>
                                            <PlaceCardItem place={plan} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;