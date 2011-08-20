quark.user = {
    display : {
        execute: function(){
            var data = qc.data( "user" );
            data.info = data.info.replace(/\n/g,"<br/>");
            return data;
        },
        render : true,
        rendered : function(){
            return "user.form";
        }
    },
    
    form : {
        execute: function(){},
        render : true,
        button : true,
        validate : {
            userSearch : {
                require : true
            }
        }
    },
    
    search : {
        execute : function(){},
        callback : function(){},
        render : true
    }
    
};