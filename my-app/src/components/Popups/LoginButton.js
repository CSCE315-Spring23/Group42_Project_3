import jwt_decode from "jwt-decode";
import {useEffect, useState} from 'react';
import "./Popup.css"

/**
  * Component for rendering a login button that uses Google Sign-In to authenticate users.
  * @component
  * @param {Function} onUserUpdate - A callback function that takes in the user object as a parameter and updates the user state in the parent component.
  * @returns {JSX.Element} A login button component that uses Google Sign-In.
*/
function LoginButton({onUserUpdate}) {
  
    const [user, setUser] = useState({});
    /**
    *  Callback function to handle the response from Google Sign-In. Decodes the JWT token returned by Google and updates the user state using the setUser function. Calls the onUserUpdate function to update the user state in the parent component.
    * @param {Object} response - The response object returned by Google Sign-In.
    */
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
          <div id="signIn">
        <button type="button" className="loginWithGoogleButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          <div className= "logintxt">Login in with Google</div>
        </button>
        </div>
        </div>
        </>
    );
  }

  export {LoginButton};
