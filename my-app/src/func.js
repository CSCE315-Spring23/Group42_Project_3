
/**

This module connects to a SQL database and exports a test function that returns a string.
@module databaseConnection
*/
// Connecting to our database SQL
const database = require('./database');

/**

Returns a string "hiii".
@function test
@returns {string} - The string "hiii".
*/
module.exports = {
test: function() {
return "hiii";
}
};





