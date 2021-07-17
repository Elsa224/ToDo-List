//Require modules we use
const express = require( "express" );
const bodyParser = require( "body-parser" );

//Constant variables
const API_PORT = 3000;
const API_URL = `http://localhost:${ API_PORT }`;

//Creating an app constant and use EJS as its view engine
const app = express();
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );

//Variables

//GET requests
app.get( "/", ( req, res ) => {

    //Determine the current date
    var today = new Date();

    //Sending options to the date
    var options = 
    {
        weekday: "long" ,
        day: "numeric" ,
        month: "long" ,
        year: "numeric" ,
    };

    var currentDay = today.toLocaleDateString("en-US", options);

    //Using EJS to send the current day of the week
    res.render( "list", { kindOfDay: currentDay, userToDo: toDoItem } );

} );

//POST requests
app.post( "/", ( req, res ) => {
    var toDoItem = req.body.toDoItem;   //parsed the toDoItem 
    console.log( `The user entered : ${toDoItem}` );
    res.redirect( "/" );

} );

//Spin up the server
app.listen( API_PORT, () => {
    console.log( `Server is running on port ${ API_PORT }...\n` );
} );