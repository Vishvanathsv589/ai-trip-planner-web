import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  /**
   * Used to get Trip Information from Firebase
   */
  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document:', docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log('No Such Document');
      toast('No trip Found!');
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-2 mt-10 relative'>
      {/* Blur Effect Box */}
      <div className='bg-white/20 backdrop-blur-lg rounded-2xl p-5'>
        {/* Information Section */}
        <InfoSection trip={trip} />

        {/* Recommended Hotels */}
        <div className='my-10'>
          <Hotels trip={trip} />
        </div>

        {/* Daily Plan */}
        <div className='my-10'>
          <PlacesToVisit trip={trip} />
        </div>

        {/* Footer */}
        <Footer trip={trip} />
      </div>
    </div>
  );
}

export default Viewtrip;
