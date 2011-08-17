quark.user = {
        
    /**
     * Initialize function ( Omittable )
     *   call after the quark loaded
     */
    init : function( ){
        quark.core.call( "user.open" );
    },
    
    /**
     * Execute function ( Required )
     *   Define the function which called first step
     */
    execute : {
        open : function(){},
        close : function(){},
        login : function(){},
        display : function(){}
    },
    
    /**
     * Callback function ( Omittable )
     *   Define the callback function which called after processed ajax.
     */
    callback : {
        login : function( res, req ){
            return res; 
        }
    },
    
    /**
     *  Render setting ( Omittable )
     *   Define the render setting
     */
    render : {
        open : true,
        display : true
    },
    
    /**
     * Rendered function ( Omittable )
     *   Define the rendered function which called after processed render
     */
    rendered : {
        login : function( res ){
            if( res.status == "success" ) {
                return "success"; // Call success chain
            } else {
                return "error"; // Call error chain
            }
        }
    },
    
    /**
     * Chain setting ( Omittable )
     */
    chain : {
        login : {
            success : "user.display",
            error : "user.close"
        }
    },
    
    /**
     * Dialog setting ( Omittable ) - QuarkUtil
     *   Define the dialog setting which using render element.
     *   
     *  @param singleton : Boolean ( default is false )
     *                use modal singleton dialog.
     *                
     *  @param focus : String
     *                ID of focus element after the dialog opened.
     * 
     */
    dialog : {
        open : {
            singleton : true,
            focus : "userId",
            close : "user.close"
         }
    },
    
    /**
     * Root setting ( Omittable )
     *   Customize the root element id for render.
     *   When you omit this setting, rendering element append to "${quark_name}-${execute_name}" id
     */
    root : {
    }
    
};