import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role }, // Fixed typo
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/job");
      })
      .catch((err) => {
        console.error("Error updating role:", err); // Fixed typo in "console.error"
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/jobs"); // Fixed logic
    }
  }, [user, navigate]); // Added `navigate` to the dependency array

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-35">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am ...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue" // Fixed typo
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")} // Fixed role
        >
          Candidate
        </Button>
        <Button
          variant="destructive" // Fixed typo
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")} // Fixed role
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};
