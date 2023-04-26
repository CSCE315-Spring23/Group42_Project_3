const isLocalhost = window.location.hostname === 'localhost'; // Check if current hostname is localhost
const host = isLocalhost ? 'http://localhost:3001' : 'https://revs-american-grill-z267.onrender.com/'; // Set host based on current environment

if(localStorage.getItem("checkout") !== "true") { //not on the checkout page trying to reload
  var oldID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  console.log("old cookie: " + oldID);
  EndSession(oldID, host);
  const randomString = 'user_' + Math.random().toString(36).substr(2, 9);
  document.cookie = "sessionId=" + randomString;
  console.log("new cookie: " + randomString);
  CreateSession(randomString, host);
} else {
  localStorage.setItem("checkout", "false"); //if its true we turn it off again
}

async function CreateSession(myID, host) {
  const response = await fetch(`${host}/checkSession/${myID}`);
  const data = await response.json();
  return data;
}

async function EndSession(myID, host) {
  const response = await fetch(`${host}/endSession/${myID}`);
  const data = await response.json();
  return data;
}
