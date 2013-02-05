/*  table.js

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
    XS = require( './xs.js' ).XS;
  } else {
    XS = exports.XS;
  }
  
  var log         = XS.log
    , subclass    = XS.subclass
    , extend      = XS.extend
    , Code        = XS.Code
    , Pipelet     = XS.Pipelet
    , Set         = XS.Set
    , Ordered_Set = XS.Ordered_Set
  ;
  
  /* -------------------------------------------------------------------------------------------
     de&&ug()
  */
  var de = true;
  
  function ug( m ) {
    log( "xs table, " + m );
  } // ug()
  
  /* -------------------------------------------------------------------------------------------
     Table_Columns()
  */
  function Table_Columns( columns, table, options ) {
    Pipelet.call( this, options );
    
    this.table   = table;
    
    return this.set_source( this.columns = columns );
  } // Table_Colunns()
  
  subclass( Pipelet, Table_Columns );
  
  extend( Table_Columns.prototype, {
    add: function( objects ) {
      var table      = this.table
        , a          = table.get() || []
        , header_row = table.header.getElementsByTagName( "tr" )[ 0 ]
        , body_rows  = table.body  .getElementsByTagName( "tr" )
        , l          = objects.length
        , al         = a.length
      ;
      
      for( var i = -1; ++i < l; ) {
        var c     = objects[ i ]
          , th    = document.createElement( "th" )
          , align = c.align
        ;
        
        th.innerHTML = c.label || c.id;
        th.setAttribute( "column_id", c.id );
        
        header_row.appendChild( th );
        
        for( var j = al; j; ) _add_cell( body_rows[ --j ].insertCell( -1 ), a[ j ][ c.id ], align );
      }
      
      return this;
    }, // add()
    
    remove: function( objects ) {
      var table        = this.table
        , header_row   = table.header.getElementsByTagName( "tr" )[ 0 ]
        , body_rows    = table.body  .getElementsByTagName( "tr" )
        , header_cells = header_row.cells
        , a            = table.get() || []
        , l            = objects.length
        , al           = a.length
      ;
      
      for( var i = l; i; ) {
        for( var j = header_cells.length, o = objects[ --i ]; j; ) {
          if( header_cells[ --j ].getAttribute( "column_id" ) !== o.id ) continue;
          
          header_row.deleteCell( j );
          
          for( var k = al; k; ) body_rows[ --k ].deleteCell( j );
        }
        
      }
      
      return this;
    }, // remove()
    
    update: function( updates ) {
      var table        = this.table
        , header_row   = table.header.getElementsByTagName( "tr" )[ 0 ]
        , body_rows    = table.body  .getElementsByTagName( "tr" )
        , header_cells = header_row.cells
        , columns      = this.columns.get()
        , a            = table.get() || []
        , l            = updates.length
        , al           = a.length
        , cl           = columns.length
      ;
      
      for( var i = l; i; ) {
        var u     = updates[ --i ]
          , u0    = u[ 0 ]
          , u1    = u[ 1 ]
          , align = u1.align
        ;
        
        for( var j = cl; j; ) {
          var header_cell = header_cells[ --j ];
          
          var u0_label = u0.label || u0.id
            , u1_label = u1.label || u1.id
          ;
          
          if(  u0_label !== u1_label && header_cell.innerHTML === u0_label ) header_cell.innerHTML = u1_label;
          
          if(  u0.id === u1.id || header_cell.getAttribute( "column_id" ) !== u0.id ) continue;
          
          header_cell.setAttribute( "column_id", u1.id );
          
          for( var k = al; k; ) _add_cell( body_rows[ --k ].cells[ j ], a[ k ][ u1.id ], align );
          /*{
            var v = a[ --k ][ u1.id ] || "";
            
            body_rows[ k ].cells[ j ].innerHTML = v;
          }*/
        }
      }
      
      return this;
    } // update()
  } ); // Table Columns instance methods
  
  /* -------------------------------------------------------------------------------------------
     Table()
  */
  Pipelet.prototype.table = function( node, columns, organizer, options ) {
    return new Table( node, columns, organizer, extend( { key: this.key }, options ) ).set_source( this );
  };
  
  function Table( node, columns, organizer, options ) {
    this.process_options( options );
    this.set_node( node );
    this.init();
    
    this.columns = new Table_Columns( columns, this, options );
    
    Ordered_Set.call( this, [], organizer, options );
    
    return this;
  } // Table()
  
  subclass( Ordered_Set, Table );
  
  extend( Table.prototype, {
    set_node: function( node ) {
      if( is_DOM( node ) ) {
        this.node = node;
      } else {
        throw( "the given node is not a DOM element" );
      }
      
      return this;
    }, // set_node()
    
    // process and set the default options
    process_options: function( options ) {
      this.options = options = extend( {}, options );
      
      return this;
    }, // process_options
    
    init: function() {
      var table   = document.createElement( "table" )
        , header  = this.header = table.createTHead()
        , body    = this.body   = document.createElement( "tbody" )
        , options = this.options
      ;
      
      table.appendChild( body );
      table.setAttribute( "class", "xs_table" );
      table.createCaption();
      
      header.insertRow( 0 );
      
      this.node.appendChild( table );
      
      if( options.caption ) this.set_caption( options.caption );
      
      return this;
    }, // init()
    
    // set the table caption
    set_caption: function( caption ) {
      this.node.getElementsByTagName( "table" )[ 0 ].caption.innerHTML = caption;
      
      return this;
    }, // set_caption()
    
    add: function( objects ) {
      var body      = this.body
        , columns   = this.columns.columns
        , locations = this.locate( objects )
        , l         = locations.length
      ;
      
      if ( columns instanceof Set ) columns = columns.get();
      
      for( var i = -1, cl = columns.length; ++i < l; ) {
        var o = objects[ i ]
          , r = body.insertRow( locations[ i ].insert + i )
        ;
        
        for( var j = -1; ++j < cl; ) {
          var c     = columns[ j ];
          
          _add_cell( r.insertCell( -1 ), objects[ i ][ c.id ], c.align );
        }
      }
      
      Ordered_Set.prototype.add.call( this, objects );
      
      return this;
    }, // add()
    
    remove: function( objects ) {
      var body      = this.body
        , locations = this.locate( objects )
        , l         = locations.length
      ;
      
      for( var i = -1; ++i < l; ) body.deleteRow( locations[ i ].insert - i - 1 );
      
      Ordered_Set.prototype.remove.call( this, objects );
      
      return this;
    }, // remove()
    
    update: function( updates ) {
      var rows      = this.body.getElementsByTagName( "tr" )
        , locations = this.locate( updates )
        , columns   = this.columns.columns
        , l         = locations.length
      ;
      
      if ( columns instanceof Set ) columns = columns.get();
      
      for( var i = l, cl = columns.length; i; ) {
        var cells  = rows[ locations[ --i ].insert - 1 ].cells
          , update = updates[ i ]
          , u0     = update [ 0 ]
          , u1     = update [ 1 ]
        ;
        
        for( var j = cl; j; ) {
          var c = columns[ --j ];
          
          if( u0[ c.id ] !== u1[ c.id ] ) _add_cell( cells[ j ], u1[ c.id ], c.align );
        }
      }
      
      Ordered_Set.prototype.update.call( this, updates );
      
      return this;
    } // update()
    /*
    sort: function( organizer ) {
      // var a = this.get(), copy = []; for( var i = -1; ++i < a.length; ) copy.push( a[ i ] );
      
      Ordered_Set.prototype.sort.call( this, organizer );
      
      var locations = this.locate( a );
      
      var rows = this.body.getElementsByTagName( "tr" );
      
      
      for( var i = locations.length; i; ) {
        var insert = locations[ --i ].insert;
        
        console.log( insert );
      }
      
      console.log( locations );
      
      return this;
    } // order()
    */
  } ); // Table instance methods
  
  /* -------------------------------------------------------------------------------------------
     module exports
  */
  eval( XS.export_code( 'XS', [ 'Table' ] ) );
  
  // Test if it's a DOM element    
  function is_DOM( node ){
    return (
         typeof HTMLElement === "object" ? node instanceof HTMLElement : node
      && typeof node === "object" && node.nodeType === 1 && typeof node.nodeName === "string"
    );
  } // is_DOM()
  
  // add cell
  function _add_cell( td, v, align ) {
    switch( typeof v ) {
      case "undefined":
        v = "";
      break;
      
      case "boolean":
        if( ! align ) align = "center";
      break;
      
      case "number":
        if( ! align ) align = "right";
      break;
      
      case "string":
      break;
      
      default: return;
    }
    
    if ( align ) td.style.textAlign = align;
    
    td.innerHTML = v;
  } // _add_cell()
  
  de&&ug( "module loaded" );
} )( this ); // table.js