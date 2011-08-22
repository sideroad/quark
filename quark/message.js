quark.message = {
    open : {
        execute: function(){},
        render: true,
        dialog : {
            singleton : false,
            close : "message.close"
        },
        button : true,
        validate: {
            message : {
                require : true
            }
        }
    },
    send : {
        execute: function(){},
        callback : function(){},
        rendered : function( arg ){
            if( arg.res.status == "success" ) {
                return { call : "message.complete", data : { dialog : arg.target } };
            } else {
                return { call : "message.close",  elem : arg.target  };
            }
            
        }
    },
    complete : {
        execute : function(){ },
        rendered : function( arg ){
            return { call : "message.close", elem : arg.data.dialog };
        },
        render : true,
        floatingMessage : {
            time : 2000,
            height: 25 
        }
    },
    close : {
        execute: function(){}
    }
};