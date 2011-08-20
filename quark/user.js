quark.user = {
    display : {
        execute: function(){
            var data = qc.data( "user" );
            data.userInfo = data.userInfo.replace(/\n/g,"<br/>");
            return data;
        },
        render : true,
        rendered : function(){
            return "user.openBox";
        }
    },
    
    openBox : {
        execute: function(){},
        render : true,
        button : true
        
    }
    
};