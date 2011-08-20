var qu = {};

(function( $ ){
    var that = this,
        core = that.quark.core,
        isOpened = {};
    
    qu = quark.util = {
            
        // Dialog control
        dialog : function( root, setting ){
            var options = {},
                id = root.attr("id"),
                width = root.data("dialogWidth") || "auto",
                height = root.data("dialogHeight") || "auto",
                close,
                isIntercepted = false;
            
            setting = $.extend(true, {
                singleton : true,
                focus : false,
                close : false
            }, setting);
            
            // Avoid conflicting dialog for singleton
            if ( isOpened[ id ] && setting.singleton) {
                return;
            }
            
            // Close intercepter
            close = setting.close;
            if( close ) {
                core.intercept( close, function(){
                    isIntercepted = true;
                    if( root.dialog( "isOpen" ) ) {
                        root.dialog( "close" );
                    }
                } );
            }
            
            options = {
                modal : (setting.singleton) ? true : false,
                draggable : (setting.singleton) ? false : true,
                resizable : (setting.singleton) ? false : true,
                width : width,
                height : height,
                beforeClose : function(){
                    isOpened[ id ] = false;
                    if( close && !isIntercepted ) {
                        core.call( close );
                        return false;                        
                    }
                }
            };
            
            isOpened[ id ] = true;
            root.dialog(options);
            
        },
        
        // Validate
        validate : function( options ){
            var id = "",
                option,
                elem;
            
            for( id in options){
                option = options[ id ];
                
                // Item
                $("#"+id)
                    .data("validate", option)
                    .bind("focus blur keyup",function(){
                        $(this).validate();
                    });
                
                // Message
                elem = $("#"+id+"-validate");
                if( !elem.hasClass("invalid-message") ) {
                    elem
                        .css( "display", "none" )
                        .addClass("invalid-message ui-state-error ui-corner-all")
                        .children()
                        .prepend('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>');
                }
                
            }
        },
        
        // Button
        button : function( root ){
            root.find("input[type=button]").button();
        }
    };
    
    $(function(){
        
    });
    

        
})(jQuery);
