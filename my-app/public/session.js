const randomString = 'user_' + Math.random().toString(36).substr(2, 9);
//console.log("cookie setting");
//var sessionId = uuid();
//localStorage.setItem('sessionId', sessionId);
document.cookie = "sessionId=" + randomString;
//console.log("cookie: ", sessionId);
