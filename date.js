//Export what we wanna use
exports.getDate = function () 
{
    //Determine the current date
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
}