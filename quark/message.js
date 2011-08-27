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
                qc.call( "message.complete", { dialog : arg.target } );
            } else {
                qc.call( "message.close", {}, arg.elem );
            }
            
        }
    },
    complete : {
        execute : function(){ },
        rendered : function( arg ){
            qc.call( "message.close", {}, arg.data.dialog );
        },
        render : true,
        floatingMessage : {
            time : 2000,
            height: 25 
        }
    },
    take : {
        execute : function(){},
        callback : function( arg ){
            var list = arg.res.list || [],
                length = list.length,
                i;
            
            for( i = 0; i < length; i++ ){
                (function( data, i ){
                    setTimeout(function(){
                        qc.call( "message.display", data );
                    }, 250*i);
                })(list[ i ], i);
            }
        }
    },
    display : {
        execute : function( ){},
        render : true,
        floatingMessage : {
            height: 75 
        }
    },
    close : {
        execute: function(){}
    }
};