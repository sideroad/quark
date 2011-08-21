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
        rendered : function( data, root ){
            if( data.status == "success" ) {
                return "message.complete";
            } else {
                return "message.close";
            }
            
        }
    },
    complete : {
        execute : function(){},
        rendered : function(){
            return "message.close";
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