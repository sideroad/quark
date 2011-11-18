(function( q ){
	var c = q.controller;
		
	c.define( "auth", {
		confirm: function(){
			if (!$.cookie("token")) {
				c.call("auth.open");
			}
			else {
				c.call("user.load");
			}
		},
		
		open:  function(arg){
			arg.render(arg.data);
		},
		
		signout: function(){
			$.cookie("token", null);
			location.reload();
		},
		
		signin: function(arg){
			auth.signin( arg.data );
		},
		
		close: function(){
			if (!$.cookie("token")) {
				$.cookie("token", "guest:cd0c4b3ff5ad386da76d6d0b8e4a1d60ef8c6e00");
				location.reload();
			}

		},
		
		signupOpen: function(arg){
			c.call("auth.close");
			arg.render();
		},
		
		signup: function(arg){
			auth.signup( arg.data );
		},
		
		signupClose : function(){
			c.call("auth.open");
		}
	});

})( quark );
    
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
    
