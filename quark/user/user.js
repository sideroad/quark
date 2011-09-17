quark.user = {
    load : {
        execute: function(){},
        callback : function( arg ){
            var res = arg.res;
            res.info = res.info.replace(/\n/g,"<br/>");
            return res;
        },
        button : true,
        render : function(){
            qc.call( "user.form" );
            qc.call( "message.take" );
            setInterval(function(){
                qc.call( "message.take" );
            }, 5000);
        }
        
    },
    
    form : {
        execute: function(){},
        render : function(){
            $("#userSearch").focus();
        },
        button : true,
        validate : {
            userSearch : /^.+$/
        },
    },
    
    search : {
        execute : function(){},
        callback : function(){},
        render : true
    },
    
    updateOpen : {
        execute : function(){},
        render: true,
        button : true,
        file : true,
        dialog : {
            singleton : true,
            width : 500,
            close : "user.updateClose"
        },
        validate : {
            userId : /^[a-zA-Z0-9_\.]{4,32}$/,
            password : /^.{6,32}$/,
            name : /^.{4,32}$/
        }
    },
    
    update : {
        href : "https://litemessage.herokuapp.com/user.update.json", // Server set a auth token.
    },
    
    upload : {
        execute : function(){},
        render : true
    },
    
    updateClose : {}
    
};