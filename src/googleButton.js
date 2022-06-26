import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleButton = () => {
  return (
    <GoogleLogin
      clientId='949494480652-2ktsrfdkssgpdh621p4ba0ih48oij9mq.apps.googleusercontent.com'
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
