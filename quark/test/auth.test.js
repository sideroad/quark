quark.mock.auth = {
    open : function( setting ){
        this.responseText =  { 
            status: "success", 
            token: "1234567890123456789012345678901234567890", 
            id : "test",
            name : "TestMan",
            img : "0",
            info : "Im test-man!\ntest! test! test!"
        };
    }
};

quark.test.auth = {
    open : function(  ){
       qt.test({
           call : "auth.open",
           data : { },
           test : function( arg ){
               ok( arg.elem.dialog( "isOpen" ) );
           }
       }) ;
    }
};