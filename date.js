//Export what we wanna use
exports.getDate = function () 
{
    //Determine the current date
<<<<<<< HEAD
    const today = new Date();

    //Sending options to the date
    const options = 
    {
            weekday: "long" ,
            day: "numeric" ,
            month: "long" ,
            // year: "numeric" ,
    };

    return today.toLocaleDateString("en-US", options);
=======
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
>>>>>>> 92159c16e50199889810c812c2411dd3439cd1f5
}