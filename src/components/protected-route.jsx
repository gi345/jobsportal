import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

 export const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // Redirect to the sign-in page if the user is not signed in
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // Redirect to onboarding if the user role is missing and not already on "/onboarding"
  if (isLoaded && user && !user.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // If all conditions pass, render the children components
  return children;
};

