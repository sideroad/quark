var qu = {};

(function( $ ){
    var that = this,
        core = that.quark.core,
        isOpened = {};
    
    qu = quark.util = {
            
        // Dialog control
        // TODO Multi-instance dialog close control
        dialog : function( root, setting ){
            var options = {},
                id = root.attr("id"),
                suffix = new Date().getTime() + "" + parseInt( Math.random() * 10000, 10 ),
                close,
                isIntercepted = false,
                singleton;
            
            setting = $.extend(true, {
                singleton : true,
                focus : false,
                close : false
            }, setting);
            singleton = setting.singleton;
            
            // Avoid conflicting dialog for singleton
            if ( isOpened[ id ] && setting.singleton) {
                return;
            }
            
            // Multi-instance dialog
            if( !setting.singleton ){
                root.find( "[id]" ).each(function(){
                    this.id = this.id + suffix;
                });
                root.find( "[data-quark-event]" ).each(function(){
                    var elem = $( this ),
                        events = elem.data( "quarkEvent" ).replace(/\s/, "").split(","),
                        length = events.length,
                        event,
                        reg = /^[^-]+-[^\.]+\.[^\:]+\:.+$/,
                        newEvents = [],
                        newEvent = "",
                        i;
                    
                    for( i = 0; i < length; i++ ){
                        event = events[ i ];
                        if( reg.test( event ) ) {
                            event = event + suffix;
                        }
                        newEvents.push( event );
                    }
                    newEvent = newEvents.join( ", " );
                    elem.data( "quarkEvent", newEvent ).attr( "data-quark-event", newEvent );
                });
                root.addClass( id );
                root.attr( "id", id + suffix );
                
            }
            
            // Close intercepter
            close = setting.close;
            if( close ) {
                core.intercept( close, ( singleton ) ? function(){
                    isIntercepted = true;
                    root.dialog( "close" );
                } : function(){
                    isIntercepted = true;
                    root.dialog( "close" ).remove();
                });
            }
            
            options = {
                modal : (singleton) ? true : false,
                draggable : (singleton) ? false : true,
                resizable : (singleton) ? false : true,
                width : (setting.width) ? setting.width : "auto",
                height : (setting.height) ? setting.height : "auto",
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
                option.messageElem = $( "#" + id + "-validate" );
                
                // Item
                $("#"+id)
                    .data("validate", option)
                    .bind("blur keyup",function(){
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
        },
        
        // FloatingMessage
        floatingMessage : function( root, setting ){
            root.floatingMessage( setting );
            
        }
    };
    
    $(function(){
        
    });
    

        
})(jQuery);
