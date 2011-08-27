quark.user = {
    display : {
        execute: function( arg ){
            var data = arg.data;
            data.info = data.info.replace(/\n/g,"<br/>");
            return data;
        },
        render : true,
        rendered : function(){
            qc.call( "user.form" );
        }
    },
    
    form : {
        execute: function(){},
        render : true,
        rendered : function(){
            $("#userSearch").focus();
        },
        button : true,
        validate : {
            userSearch : {
                require : true
            }
        },
    },
    
    search : {
        execute : function(){},
        callback : function(){},
        render : true
    },
    
    imageUpload : {
        execute : function(){},
        rendered : function(){}
    }
    
};