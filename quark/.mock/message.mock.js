quark.mock.message = {
    send : function( req ){
        return { status : "success" };
    },
    take : function( req ){
        var res = {
                list : [
                        { id : "sideroad", name : "sideroad", img : "0.png", message : "Have a nice development!", mid : "1234567890" },
                        { id : "test", name : "test", img : "0.png", message : "Hello world!", mid : "0987654321" }
                    ]
                };
        return res;
    },
    remove : function( req ){
		return { status : "success" };
	}
};
