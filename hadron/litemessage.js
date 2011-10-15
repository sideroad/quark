var hadron = {
    
	body : $(document.body) ,   
	
    name : "litemessage",    
        
    // url
    url : "http://litemessage.herokuapp.com/${quark}.${method}.json",
    
    dataType: "json",
        
    // controllers    
    controller : [
        "auth",
        "user",
        "message"
    ],
	
	model : [
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
    ],
	
	mock : false
	
};




