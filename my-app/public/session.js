var oldID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
console.log("old cookie: " + oldID)
EndSession(oldID);
const randomString = 'user_' + Math.random().toString(36).substr(2, 9);
document.cookie = "sessionId=" + randomString;
console.log("new cookie: " + randomString);
CreateSession(randomString);

async function CreateSession(myID) {
  const response = await fetch(`http://localhost:3001/checkSession/${myID}`);
  const data = await response.json();
  return data;
}

async function EndSession(myID) {
  const response = await fetch(`http://localhost:3001/endSession/${myID}`);
  const data = await response.json();
  return data;
}
