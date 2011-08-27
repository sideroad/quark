quark.mock.auth = {
    signin : function( arg ){
        var res =  { 
                status: "success", 
                token: "1234567890123456789012345678901234567890", 
                id : "test",
                name : "TestMan",
                img : "0",
                info : "Im test-man!\ntest! test! test!"
            };
        return res;
    }
};
