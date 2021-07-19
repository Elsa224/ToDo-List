//Require modules we use
const express = require( "express" );
const bodyParser = require( "body-parser" );
const date = require( `${__dirname}/date.js` ); //Personal module 

//Constant variables
const API_PORT = 3000;

//Creating an app constant and use EJS as its view engine
const app = express();
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );

//app using modules (express.static to load local files on the server, bodyParser)
app.use( express.static( `publicFiles` ) );

//Variables to contain the toDos
const items = [ ];
const workItems = [ ];

//GET requests
app.get( "/", ( req, res ) => {
<<<<<<< HEAD
=======
    //Using EJS to send the current day of the week
    res.render( "list", { listTitle: date.getDate, userToDos: items } ); //TODO A revoir plus tard
>>>>>>> 92159c16e50199889810c812c2411dd3439cd1f5

    //Calling the function to get the current day
    let currentDay = date.getDate();

    //Using EJS to send the current day of the week to the ejs file
    res.render( "list", { listTitle: currentDay, userToDos: items } );
} );

app.get( "/work", ( req, res ) => {
    res.render( "list", { listTitle: "Work List", userToDos: workItems } );
} )

app.get( "/about", ( req, res ) => {
    res.render( "about" );
} )

//POST requests
app.post( "/", ( req, res ) => {
    let toDoItem = req.body.toDoItem;   //parsed the toDoItem 
    if ( req.body.listButton === "Work" ) 
        { workItems.push( toDoItem ); res.redirect( "/work" ); }
    else
        { items.push( toDoItem ); res.redirect( "/" ); }
} );

//Spin up the server
app.listen( API_PORT, () => {
    console.log( `Server is running on port ${ API_PORT }...\n` );
} );