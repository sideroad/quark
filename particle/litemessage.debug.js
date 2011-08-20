quark.mock = {
    "auth.signin" : function( req ){
        var res = { 
                status: "success", 
                token: "1234567890123456789012345678901234567890", 
                userId : "test",
                userName : "TestMan",
                userInfo : "Im test-man!\ntest! test! test!"
            };
        return res;
    }
};
