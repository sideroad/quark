/*!
 * Quark Util File v1.0.1
 * http://sideroad.secret.jp/quark/
 *
 * Copyright 2011, sideroad
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends
 *   jquery.upload.js
 */
(function( $, q ){
    var qut = q.util,
        that = this;

    // File upload
    // TODO override quark.core ajax process.
    // current  fileupload => execute => ajax => callback => rendered
    // future execute => fileupload => callback => rendered
    qut.list.push( "file" );
    qut.file = function( root ){
            var part = that.particle,
                selector = '[data-quark-event^="file"]',
                target = root.find( selector ) || [];
            
            
            if( root.is( selector ) ){
                target.push( root );
            }
            
            target.each(function(){
                var elem = $( this ),
                    data = elem.data( "quarkEvent" ).replace(/\s/, "").match( /^file-([^\.]+)\.([^\?]+)(\?.+|)$/ ),
                    name = data[ 1 ],
                    action = data[ 2 ],
                    query = data[ 3 ],
                    callName = name+"."+action,
                    url = part.url.replace( "${quark}", name ).replace( "${action}", action );
                
                file = $('<input type="file" name="file" style="position:absolute;visibility:hidden;" >').change(function(){
                    $(this).upload( url + query, function(res) {
                        console.log( "file uploaded" );
                        qc.call( callName, res );
                    }, 'json');
                });
                elem.after( file );
                elem.click(function(){
                    file.click();
                });
                
            });
             
    };
    

        
})( jQuery, quark );
