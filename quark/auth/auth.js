quark.auth = {
    confirm : {
        execute : function(){
            if ( ! $.cookie( "token" ) ) {
                qc.call( "auth.open" );
            } else {
                qc.call( "user.load" );
            }
        }
    },

    open : {
        render : true,
        button : true,
        dialog : {
            singleton : true,
            width : 500,
            close : "auth.close"
        },
        validate : {
            userId : /^[a-zA-Z0-9_\.]{4,32}$/,
            password : /^.{6,32}$/
        }
    },
    
    signout : {
        execute: function(){
            $.cookie( "token", null );
            location.reload();
        }
    },
    
    signin : {
        href : "https://litemessage.herokuapp.com/auth.signin.json", // Server set a auth token.
        execute : function(){}
    },
    
    close : {
        execute: function(){
            var user = qc.data("user");
            if( !user ) {
                qc.data("user",{
                    id : "guest",
                    name : "Guest",
                    info : "Please login.",
                    img : "0"
                });
            }
        }
    },
    
    signupOpen : {
        execute : function(){
            qc.call( "auth.close" );
        },
        render : function(){},
        button : true,
        dialog : {
            singleton : true,
            width : 500,
            close : "auth.signupClose"
        },
        validate : {
            userId : /^[a-zA-Z0-9_\.]{4,32}$/,
            password : /^.{6,32}$/,
            name : /^.{4,32}$/
        },
        file : true
    },
    
    signup : {
        href : "https://litemessage.herokuapp.com/auth.signup.json", // Server set a auth token.
    },

    signupClose : {
        execute: function(){
            qc.call( "auth.open" );
        }
    },
    
    /**
     * Execute function ( Required )
     *   Define the function which called first step
     *  @param {Object} data
     *  @param {jQueryElement} target
     */
    
    /**
     * Callback function ( Omittable )
     *   Define the callback function which called after processed ajax.
     *  @param {Object} req
     *  @param {Object} data
     *  @param {jQueryElement} target
     */
    
    /**
     *  Render setting ( Omittable )
     *   Define the render setting
     *  @param {Boolean} is render?
     */
    
    /**
     * Rendered function ( Omittable )
     *   Define the render function which called after processed render
     *  @param {Object} res
     *  @param {Object} req
     *  @param {Object} data
     *  @param {jQueryElement} target
     */
    
    /**
     * Chain setting ( Omittable )
     */
    
    /**
     * Dialog setting ( Omittable ) - QuarkUtil
     *   Define the dialog setting which using render element.
     *   
     *  @param {Boolean} singleton ( default is false )
     *                use modal singleton dialog.
     *                
     *  @param {String} focus
     *                ID of focus element after the dialog opened.
     * 
     */
    
    /**
     * Root setting ( Omittable )
     *   Customize the root element id for render.
     *   When you omit this setting, rendering element append to "${quark_name}-${execute_name}" id
     */
    
};