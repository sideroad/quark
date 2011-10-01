quark.mock.user = {
    load : function( req ){
        var res =  { 
                status: "success",
                id : "test",
                name : "TestMan",
                img : "0.png",
                info : "Im test-man!\ntest! test! test!"
            };
        return res;    
    },
    find : function( req ){
        var users = [
                "Vice President",
                "George Washington",
                "John Adams",
                "Federalist",
                "Thomas Jefferson",
                "Aaron Burr",
                "George Clinton",
                "James Madison",
                "George Clinton",
                "Elbridge Gerry",
                "James Monroe",
                "John Quincy Adams",
                "National",
                "Republican",
                "Andrew Jackson",
                "Democratic",
                "Martin Van Buren",
                "Richard Mentor Johnson"
             ],
             length = users.length,
             i,
             name = req.name.toLowerCase(),
             matches = [],
             res;
        
        for( i = 0; i < length; i++ ){
            if(users[i].toLowerCase().match( name )){
                matches.push( {name : users[i], img:"0.png", id:users[i].toLowerCase().replace(/\s/g,"")} );
            }
        }
        
        res = {
            status : "success",
            users : matches
        };
        return res;
    },
    upload : function( req ){
        return {};
    }
};
