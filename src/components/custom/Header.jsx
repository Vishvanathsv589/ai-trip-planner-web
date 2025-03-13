import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

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
      window.location.reload();
    })
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="Logo.png" alt="logo" style={{ width: '250px', height: 'auto' }} />

      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href="/create-trip" className="no-underline text-black" >
              <Button variant='outline' className='rounded-full'>+ Create Trip</Button>
            </a>
            <a href="/my-trips" className="no-underline text-black" >
              <Button variant='outline' className='rounded-full'>My Trips</Button>
            </a>

            {/* ✅ Fix: Used "asChild" to prevent extra styling on the image */}
            <Popover>
              <PopoverTrigger asChild>
                <img 
                  src={user?.picture} 
                  className='h-[35px] w-[35px] rounded-full cursor-pointer' 
                  alt="User Profile"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="Logo.png" alt="logo" style={{ width: '250px', height: 'auto' }} />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in with Google Authentication securely</p>

              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
