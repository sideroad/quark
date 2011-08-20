quark.mock = {
    "auth.signin" : function( req ){
        var res = { 
                status: "success", 
                token: "1234567890123456789012345678901234567890", 
                id : "test",
                name : "TestMan",
                img : "0",
                info : "Im test-man!\ntest! test! test!"
            };
        return res;
    },
    "user.search" : function( req ){
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
             name = req.userSearch.toLowerCase(),
             matches = [];
        
        for( i = 0; i < length; i++ ){
            if(users[i].toLowerCase().match( name )){
                matches.push( {name : users[i], img:"0", id:users[i].toLowerCase().replace(/\s/g,"")} );
            }
        }
        
        var res = {
                status : "success",
                users : matches
            };
        return res;
    },
    "message.send" : function( res ){
        return {status : "success"};
    }
};
