var particle = {
        
    name : "litemessage",    
        
    // url
    url : "http://litemessage.herokuapp.com/${quark}.${action}.json",
    
    dataType: "json",
        
    // quark list    
    quark : [
        "auth",
        "user",
        "message"
    ],
    
    lang : [
        "en",
        "ja"
    ],
    
    init : [
        "auth.confirm"
    ]
};




