quark.auth = {

    open : {
        execute : function(){},
        render : true,
        rendered : function(){},
        button : true,
        dialog : {
            singleton : true,
            focus : "userId",
            width : 500,
            close : "auth.close"
        },
        validate : {
            userId : {
                require : true,
                pattern : /^[a-zA-Z0-9_\.]{4,32}$/
            },
            password : {
                require : true,
                pattern : /^.{6,32}$/
            }
        }
    },
    
    signin : {
        execute : function(){},
        callback : function(){},
        rendered : function( arg ){
            qc.data( "user", arg.res );
            return { call : "auth.close" }; // Call error chain
            
        }
    },
    
    close : {
        execute: function(){},
        rendered : function(){
            var user = qc.data("user");
            if( !user ) {
                qc.data("user",{
                    id : "guest",
                    name : "Guest",
                    info : "Please login.",
                    img : "0"
                });
            }
            return { call : "user.display", data : qc.data( "user" ) };
        }
    }
    
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
     *   Define the rendered function which called after processed render
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