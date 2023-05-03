import React, { useEffect } from "react";
/**
 * Component to render Google Translate element in the application
 * @return {JSX.Element} GoogleTranslate component
 */
const GoogleTranslate = () => {
    useEffect(() => {
      // Create and append the Google Translate script tag to the body of the document
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
  
      // Define the callback function for when the script is loaded
      window.googleTranslateElementInit = () => {
        // Create and initialize the Google Translate element with pageLanguage set to "en"
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );  
      };
  
      // Remove the script tag and cleanup the callback function when the component is unmounted
      return () => {
        document.body.removeChild(script);
        delete window.googleTranslateElementInit;
      };
    }, []);
  
    return (
      // Render the div with id "google_translate_element" for the Google Translate element to be inserted
      <div id="google_translate_element"></div>
    );
  };
  
  export default GoogleTranslate;
  