quark.mock.auth = {
    signin : function( req ){
        
        $.cookie( "token", "123456789", true );
        location.reload();
        
        return { status : "success" };
    },
    signup : function( req ){

        location.reload();
        
        return { status : "success" };
    }
};
