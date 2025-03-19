import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { chatSession } from '@/service/AiModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all the details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString()
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID
    });
    setLoading(false);
    navigate('/view-trip/' + docID)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px32 lg:px-56 xl:px-72 px-5 mt-10 relative'>
      {/* Blur Effect Box */}
      <div className='bg-white/20 backdrop-blur-lg rounded-2xl p-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
        <p className='mt-3 text-gray-800 text-xl'>
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>
  
        <div className='mt-20 flex flex-col gap-10'>
          {/* Destination Input */}
          <div>
            <h2 className='text-xl my-3 font-bold'>What is destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange('location', v);
                },
              }}
            />
          </div>
  
          {/* Number of Days Input */}
          <div>
            <h2 className='text-xl my-3 font-bold'>How many days are you planning your trip?</h2>
            <Input
              placeholder={'Ex.3'}
              type='number'
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>
        </div>
  
        {/* Budget Section */}
        <div className='my-10'>
          <h2 className='text-xl my-3 font-bold'>What is Your Budget?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition duration-300
                  bg-black/50 backdrop-blur-md text-white hover:bg-black/70
                  ${formData?.budget === item.title && 'shadow-lg border-black bg-black/70'}
                `}
              >
                <h2 className='text-4xl mb-2'>{item.icon}</h2>
                <h2 className='text-lg font-bold mb-1'>{item.title}</h2>
                <h2 className='text-sm text-gray-300'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
  
        {/* Traveler Section */}
        <div className='my-10'>
          <h2 className='text-xl my-3 font-bold'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition duration-300
                  bg-black/50 backdrop-blur-md text-white hover:bg-black/70
                  ${formData?.traveler === item.people && 'shadow-lg border-black bg-black/70'}
                `}
              >
                <h2 className='text-4xl mb-2'>{item.icon}</h2>
                <h2 className='text-lg font-bold mb-1'>{item.title}</h2>
                <h2 className='text-sm text-gray-300'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
  
        {/* Generate Trip Button */}
        <div className='my-10 justify-end flex w-full'>
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
            ) : (
              'Generate Trip'
            )}
          </Button>
        </div>
      </div>
  
      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='Logo.svg' alt='logo' style={{ width: '250px', height: 'auto' }} />
              <h2 className='font-bold text-lg mt-7'>Sign in with Google </h2>
              <p>Sign in with Google Authentication securely</p>
  
              <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7' />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default CreateTrip
