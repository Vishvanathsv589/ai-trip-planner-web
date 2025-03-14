import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState("/placeholder.png");

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        if (!trip?.userSelection?.location?.label) return;

        try {
            const data = { textQuery: trip.userSelection.location.label };
            const response = await GetPlaceDetails(data);
            const photos = response?.data?.places?.[0]?.photos;

            if (photos?.length > 0) {
                const photoName = photos[0].name; // Use the first available image
                const formattedUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(formattedUrl);
            } else {
                setPhotoUrl(getDefaultLandmarkImage(trip.userSelection.location.label)); // Use fallback
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setPhotoUrl("/fallback-image.jpg"); // Default fallback if API fails
        }
    };

    // Function to get a default landmark image if API fails
    const getDefaultLandmarkImage = (location) => {
        const landmarks = {
            "Paris": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Eiffel_Tower_at_night_2014_%28cropped%29.jpg",
            "New York": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Statue_of_Liberty%2C_NY.jpg",
            "London": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Big_Ben%2C_London%2C_UK.jpg",
            "Tokyo": "https://upload.wikimedia.org/wikipedia/commons/0/02/Tokyo_Tower_and_Tokyo_Sky_Tree_2019.jpg"
        };
        return landmarks[location] || "/fallback-image.jpg"; // Default image
    };

    return (
        <div>
            <img src={photoUrl} className="h-[340px] w-full object-cover rounded-xl" alt="Trip Location" />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location?.label || 'No Location'}
                    </h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🗓️ {trip?.userSelection?.noOfDays || 'N/A'} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💵 {trip?.userSelection?.budget || 'N/A'} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🥂 No. Of Travelers: {trip?.userSelection?.traveler || 'N/A'}
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
