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
        rendered : function(){
            return "message.close";
        }
    },
    close : {
        execute: function(){}
    }
};