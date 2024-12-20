import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

export const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();

  useEffect(()=>{
    if(search.get('sign-in')){
      setShowSignIn(true)
    }
  }, [search]);

  // Close the SignIn modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false); 
      setSearch({});
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hireed Logo" />
        </Link>

        {/* Navigation Buttons */}
        <div className="flex gap-8">
          {/* SignedOut: Show Login Button */}
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          {/* SignedIn: Show Post a Job Button and User Avatar */}
          <SignedIn>
           
              <Button variant="destructive" className="rounded-full flex items-center">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
              <Link to="/post-job"></Link>
            <UserButton appearance={{
              elements:{
                avatarBox:"w-10 h-10"
              },
            }}>
           <UserButton.MenuItems>
            <UserButton.Link
            label="My Jobs"
            labelIcon={<BriefcaseBusiness size={15} />}
            hrefrf="/my-job"
            />
             <UserButton.Link
            label="Saved Jobs"
            labelIcon={<Heart size={15} />}
            hrefrf="saved-jobs"
            />
           </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* Sign-In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick} // Fixed typo here
        >
          <div className="bg-white p-4 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </>
  );
};
