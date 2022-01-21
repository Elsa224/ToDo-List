//Require modules we use 
const express = require( "express" );
const bodyParser = require( "body-parser" );
const mongoose = require( "mongoose" );
const _ = require( "lodash" );
//const date = require( `${ __dirname }/date.js` ); //Personal module 

//Constant variables
const APP_PORT = 3000;

//Creating an app constant and use EJS as its view engine
const app = express(  );
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );

//app using modules ( express.static to load local files on the server, bodyParser )
app.use( express.static( `${ __dirname }/public` ) );

//Replace the arrays by a database
mongoose.connect( "mongodb://localhost:27017/todolistDB" )

//Schema
const itemSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [ true, "No name specified !" ]
    }
} );

const listSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [ true, "No name specified !" ]
    },
    items: [ itemSchema ]
} )

//Model
const Item = mongoose.model( "Item", itemSchema );

const List = mongoose.model( "List", listSchema );

//Document
const item1 = new Item( {
    name: "Welcome to your ToDolist"
} );

const item2 = new Item( {
    name: "Hit the + button to add a new todo"
} );

const item3 = new Item( {
    name: "<--- Hit this to delete a todo"
} );

const defaultItems = [ item1, item2, item3 ] ;

//Calling the function to get the current day

//GET requests
app.get( "/", ( req, res ) => {

    Item.find( {}, ( error, items ) => {

        if ( items.length === 0 ) {
            //Insert Many document
            Item.insertMany( defaultItems, ( error ) => {
                if ( error )
                    console.log( error );
                else
                    console.log( "Successfully inserted the documents " );
            } );
            res.redirect( "/" )
        } else {
            // console.log(  items  );
            // Using EJS to send the current day of the week to the ejs file
            res.render( "list", { listTitle: "Today", userToDos: items } );
        }

    } );

});

app.get( "/:customListName", ( req, res ) => {
    const customListName = _.capitalize( req.params.customListName );

    // Test if the customListName already exists
    List.findOne( { name: customListName }, ( error, foundList ) => {
        if ( !error ) { // if there is no error
            if ( !foundList ) {
                // console.log( "Doesn't exist :( " );
                // Create a new list
                const list = new List( {
                    name: customListName,
                    items: defaultItems
                } )

                list.save(  );

                res.redirect( "/" + customListName );

            } else {
                // console.log( "Yesss ! That document already exists !" );
                // Show an existing list
                res.render( "list", { listTitle: foundList.name, userToDos: foundList.items } )
                //console.log(  foundList  );  
            }
        }

    } );




} )


app.get( "/work", ( req, res ) => {
    res.render( "list", { listTitle: "Work List", userToDos: workItems } );
} )

app.get( "/about", ( req, res ) => {
    res.render( "about" );
} )

//POST requests
app.post( "/", ( req, res ) => {
    const itemName = req.body.toDoItem;
    const list_name = req.body.listButton;

    const todo = new Item( {
        name: itemName
    });

    if ( list_name !== "Today" ) {
         // Test if the customListName already exists or not
        List.findOne( { name: list_name }, ( error, foundList ) => {
            if ( !error ) { // if there is no error
                if ( !foundList ) {
                    // Create a new list
                    const list = new List( {
                        name: list_name,
                        items: defaultItems
                    } )

                    // Save the new todo and save the new list
                    list.items.push( todo );
                    list.save(  );
                } else { 
                    foundList.items.push( todo );
                    foundList.save();
                }
                res.redirect( "/" + list_name );  
            } 
        } ) ;
    } else {
        todo.save();
        res.redirect("/");
    }

});

app.post( "/delete", ( req, res ) => {
        const checkedItemId = req.body.checkbox;
        const listName = req.body.listName;

        if ( listName !== "Today" ) {
            List.findOneAndUpdate( { name: listName }, { $pull: { items: { _id: checkedItemId } } }, ( error, foundList ) => {
                if ( !error )
                    res.redirect( "/" + listName );
                else
                    console.log( error );   
            } );
            
        } else {
            Item.findByIdAndRemove( checkedItemId, ( error ) => {
                if ( error )
                    console.log( error );
                else { 
                    console.log( "Successfully deleted the document with id " + checkedItemId );
                    res.redirect( "/" );
                }
            } );
        }
} );

    //Spin up the server
app.listen( APP_PORT, (  ) => {
    console.log( `Server is running on port ${ APP_PORT }...\n` );
} );