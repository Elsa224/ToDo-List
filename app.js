//Require modules we use
const express = require( "express" );
const bodyParser = require( "body-parser" );
const date = require( `${__dirname}/date.js` );

//Constant variables
const API_PORT = 3000;

//Creating an app constant and use EJS as its view engine
const app = express();
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );

//app using modules (express.static to load local files on the server, bodyParser)
app.use( express.static( `publicFiles` ) );

//Variables to contain the toDos
let items = [ ];
let workItems = [ ];

//GET requests
app.get( "/", ( req, res ) => {
    //Using EJS to send the current day of the week
    res.render( "list", { listTitle: date.getDate, userToDos: items } ); //TODO A revoir plus tard

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