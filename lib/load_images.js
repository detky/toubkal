/*  load_images.js
    
    ----
    
    Copyright (C) 2013, Connected Sets

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
"use strict";

( function( exports ) {
  var XS;
  
  if ( typeof require === 'function' ) {
    XS = require( './pipelet.js' ).XS;
    
    require( './code.js'     );
    require( './selector.js' );
    require( './order.js'    );
  } else {
    XS = exports.XS;
  }
  
  var xs      = XS.xs
    , log     = XS.log
    , extend  = XS.extend
    , Code    = XS.Code
    , Pipelet = XS.Pipelet
  ;
  
  /* -------------------------------------------------------------------------------------------
     de&&ug()
  */
  var de = true;
  
  function ug( m ) {
    log( "xs load_images, " + m );
  } // ug()
  
  /* -------------------------------------------------------------------------------------------
     Load_Images( dom_node, options )
     
     image object:
       id           : image ID
       src          : image source
       title*       : image title
       description* : image description
       style*       : custom css classes
       
       ( * ) : optional attributes
     
  */
  function Load_Images( dom_node, options ) {
    Pipelet.call( this, options );
    
    this.set_node( dom_node );
    
    return this;
  } // Load_Images()
  
  /* -------------------------------------------------------------------------------------------
     .load_images( dom_node, options )
  */
  Pipelet.build( 'load_images', Load_Images, {
    set_node: function( node ) {
      if( XS.is_DOM( node ) ) {
        this.node = node;
      } else {
        throw( "the node is not a DOM element" );
      }

      return this;
    }, // set_node()
    
    add: function( added, options ) {
      var l = added.length;
      
      if( l === 0 ) return this;
      
      this.load_image( -1, added );
      
      return this;
    }, // add()
    
    remove: function( removed, options ) {
      var l = removed.length;
      
      if( l === 0 ) return this;
      
      var node       = this.node
        , containers = node.childNodes
      ;
      
      for( var i = containers.length; i; ) {
        var container = containers[ --i ], id = container.id;
        
        for( var j = l; j; ) if( removed[ --j ].id == id ) node.removeChild( containers[ j ] );
      }
      
      return this;
    }, // remove()
    
    update: function( updates, options ) {
      var l = updates.length;
      
      if( l === 0 ) return this;
      
      return this;
    }, // update()
    
    load_image: function( i, values ) {
      var container   = document.createElement( 'div' )
        , image       = document.createElement( 'img' )
        , title       = document.createElement(  'h3' )
        , description = document.createElement(  'p'  )
        , that        = this
        , value       = values[ ++i ]
        , dom_node    = this.node;
      ;
      
      if( ! value ) return;
      
      if( value.src ) {
        image.src = value.src;
      } else {
        throw( "image source is not defined" );
      }
      
      if( value.id ) {
        container.setAttribute( "image_id", value.id );
      } else {
        throw( "image ID is not defined" );
      }
      
      if( value.title ) {
        title.innerHTML = value.title;
        image.title     = value.title;
      }
      
      if( value.description ) description.innerHTML = value.description;
      
      container.appendChild(    image    );
      container.appendChild(    title    );
      container.appendChild( description );
      
      dom_node.insertBefore( container, null );
      
      image.onload = function() {
        that.load_image( i, values );
      };
      
      return this;
    } // load_image()
  } ); // Load_Images instance methods
  
  /* -------------------------------------------------------------------------------------------
     module exports
  */
  eval( XS.export_code( 'XS', [ 'Load_Images' ] ) );
  
  de&&ug( "module loaded" );
} )( this ); // load_images.js