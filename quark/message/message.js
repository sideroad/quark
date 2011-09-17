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
            message : /^.+$/
        }
    },
    send : {
        execute: function(){},
        callback : function( arg ){
            if( arg.res.status == "success" ) {
                qc.call( "message.complete", { dialog : arg.target } );
            } else {
                qc.call( "message.close", {}, arg.elem );
            }
            
        }
    },
    complete : {
        execute : function(){ },
        render : function( arg ){
            qc.call( "message.close", {}, arg.data.dialog );
        },
        floatingMessage : {
            time : 2000,
            height: 25,
            position : "top-right"
        }
    },
    take : {
        execute : function(){},
        callback : function( arg ){
            var list = arg.res.list || [],
                length = list.length,
                i,
                mes = qc.data( "message" ) || {};
            
            for( i = 0; i < length; i++ ){
                (function( data, i ){
                    if ( mes[ data.mid ] ) return;
                    setTimeout(function(){
                        qc.call( "message.display", data );
                    }, 250*i);
                    mes[ data.mid ] = true;
                })(list[ i ], i);
            }
            qc.data( "message", mes );
        }
    },
    remove : {
        execute : function(){},
        callback : function(){}
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