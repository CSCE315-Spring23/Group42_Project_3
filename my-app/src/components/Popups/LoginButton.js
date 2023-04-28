import jwt_decode from "jwt-decode";
import {useEffect, useState} from 'react';

//Main App documentation with all the different pages available
function LoginButton({onUserUpdate}) {
    const [user, setUser] = useState({});
    function handleCallbackResponse(response) {
      //console.log("callback running");
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      //console.log("btn user data: " + JSON.stringify(userObject));
      //document.getElementById("signIn").hidden = true;
      onUserUpdate(userObject);
    }

    useEffect(()=> {
      /* global google */
      google.accounts.id.initialize({client_id: "351186300287-tmd28ore2cgjrc3j3mjcmrr29mel2ssa.apps.googleusercontent.com", callback: handleCallbackResponse});

      onUserUpdate(user);

      //login and stuff
      google.accounts.id.renderButton(
        document.getElementById("signIn"),
        {theme: "outline", size: "large"}
      );
    }, []);

    return (
      <>
        <div className = "App">
          <div id="signIn"></div>
        </div>
        </>
    );
  }

  export {LoginButton};
