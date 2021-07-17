console.log( module );

function getDate() 
{
        //Determine the current date
        let today = new Date();

        //Sending options to the date
        let options = 
        {
            weekday: "long" ,
            day: "numeric" ,
            month: "long" ,
           // year: "numeric" ,
        };
    
        let currentDay = today.toLocaleDateString("en-US", options);
        return currentDay;
}