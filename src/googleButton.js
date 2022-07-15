import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleButton = () => {
  return (
    <GoogleLogin
      clientId='238118534743-6otm74l2gsvums0ptapl9dufm752fp1b.apps.googleusercontent.com'
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
      onSuccess={() => {
        console.log("success");
      }}
      onFailure={(e) => {
        console.log(e);
      }}
    />
  );
};

export default GoogleButton;
