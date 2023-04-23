var oldID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
console.log("old cookie: " + oldID)
EndSession(oldID);
const randomString = 'user_' + Math.random().toString(36).substr(2, 9);
document.cookie = "sessionId=" + randomString;
console.log("new cookie: " + randomString);
CreateSession(randomString);
const isLocalhost = window.location.hostname === 'localhost'; // Check if current hostname is localhost
const host = isLocalhost ? 'http://localhost:3001' : 'https://revs-american-grill-z267.onrender.com/'; // Set host based on current environment

async function CreateSession(myID) {
  const response = await fetch(`${host}/${myID}`);
  const data = await response.json();
  return data;
}

async function EndSession(myID) {
  const response = await fetch(`${host}/${myID}`);
  const data = await response.json();
  return data;
}
