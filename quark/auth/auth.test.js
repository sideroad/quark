quark.test.auth = {
    open : function(  ){
       qt.test({
           call : "auth.open",
           data : { },
           test : function( arg ){
               ok( arg.elem.dialog( "isOpen" ) );
           }
       });
    }
};