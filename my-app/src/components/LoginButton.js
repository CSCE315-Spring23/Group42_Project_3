import jwt_decode from "jwt-decode";
import {useEffect, useState} from 'react';

//Main App documentation with all the different pages available
function LoginButton() {
    const [user, setUser] = useState({});
    function handleCallbackResponse(response) {
      var userObject = jwt_decode(response.credential);
      console.log(userObject);
      setUser(userObject);
      document.getElementById("signIn").hidden = true;
    }
  
    useEffect(()=> {
      /* global google */
      google.accounts.id.initialize({client_id: "351186300287-tmd28ore2cgjrc3j3mjcmrr29mel2ssa.apps.googleusercontent.com",
      callback: handleCallbackResponse});
  
      google.accounts.id.renderButton(
        document.getElementById("signIn"),
        {theme: "outline", size: "large"}
      );
    }, []);
  
    return (
      <>
        <div className = "App">
          <div id="signIn"></div>
          { user && 
          <div>
            <img src={user.picture}></img>
            <h3>{user.email}</h3>
            
            </div>
          }
        </div>
        </>
    );
  }
  
  export default LoginButton;
  