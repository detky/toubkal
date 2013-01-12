// filter.js

( function( exports ) {
  var XS;
  
  if ( typeof require === 'function' ) {
    XS = require( './xs.js' ).XS;
    
    require( './code.js' );
    require( './connection.js' );    
  } else {
    XS = exports.XS;
  }
  
  var log        = XS.log
    , extend     = XS.extend
    , subclass   = XS.subclass
    , Code       = XS.Code
    , Connection = XS.Connection
    , Set        = XS.Set
  ;
  
  var push = Array.prototype.push
  ;
  
  /* -------------------------------------------------------------------------------------------
     de&&ug()
  */
  var de = true;
  
  function ug( m ) {
    log( "xs filter, " + m );
  } // ug()
  
  /* -------------------------------------------------------------------------------------------
     Filter()
  */
  Connection.prototype.filter = function( filter, options ) {
    var f = new Filter( this, filter, extend( { key: this.key }, options ) );
    
    return f.out; // ToDo: Filter should not build a set
  } // filter()
  
  function Filter( set, filter, options ) {
    Connection.call( this, options );
    
    this.filter = filter;
    
    this.connect( this.out = new Set( [], { key: set.key } ) );
    
    set.connect( this );
    
    return this;
  } // Filter()
  
  subclass( Connection, Filter );
  
  extend( Filter.prototype, {
    add: function( objects ) {
      var filter = this.filter = Code.decompile( this.filter )
        , vars = [ 'i = -1', 'l = objects.length', 'added = []', 'o' ]
        , first
      ;
      
      switch( typeof filter ) {
        case 'function':
          vars.push( 'f = filter' );
          
          first = 'if ( f( o = objects[ ++i ] ) ) added.push( o );';
        break;
        
        case 'object': // { parameters: [], code: '', condition: '' }
          first = 'o = objects[ ++i ]; ' + filter.code + ' if ( ' + filter.condition + ' ) added.push( o );'
        break;
      }
      
      eval( new Code()
        ._function( 'this.add', null, [ 'objects' ] )
          ._var( vars )
          
          .unrolled_while( first )
          
          .add( 'added.length && this.connections_add( added )', 1 )
          
          .add( 'return this' )
        .end( 'Filter.add()' )
        .get()
      );
      
      return this.add( objects );
    }, // add()
    
    remove: function( objects ) {
      var filter = this.filter = Code.decompile( this.filter )
        , vars = [ 'i = -1', 'l = objects.length', 'removed = []', 'o' ]
        , first
      ;
      
      switch( typeof filter ) {
        case 'function':
          vars.push( 'f = filter' );
          
          first = 'if ( f( o = objects[ ++i ] ) ) removed.push( o );'
        break;
        
        case 'object':
           first = 'o = objects[ ++i ]; ' + filter.code + ' if ( ' + filter.condition + ' ) removed.push( o );'
        break;
      }
      
      eval( new Code()
        ._function( 'this.remove', null, [ 'objects' ] )
          ._var( 'i = -1', 'l = objects.length', 'filter = this.filter', 'removed = []', 'o' )
          
          .unrolled_while( first )
          
          .add( 'removed.length && this.connections_remove( removed )', 1 )

          .add( 'return this' )
        .end( 'Filter.remove()' )
        .get()
      );
      
      return this.remove( objects );
    }, // remove()
    
    update: function( updates ) {
      var filter = this.filter;
      
      switch( typeof filter ) {
        case 'object':
          filter = filter.f;
        // fall-through
        
        case 'function':
          this.update = function( updates ) {
            var l = updates.length, f = filter, removed = [], updated = [], added = [];
            
            for ( var i = -1; ++i < l; ) {
              var u = updates[ i ];
              
              if ( f( u[ 0 ] ) ) {
                if ( f( u[ 1 ] ) ) {
                  updated.push( u );
                } else {
                  removed.push( u[ 0 ] );
                }
              } else if ( f( u[ 1 ] ) ) {
                added.push( u[ 1 ] );
              }
            }
            
            removed.length && this.connections_remove( removed );
            updated.length && this.connections_update( updated );
            added  .length && this.connections_add   ( added   );
            
            return this;
          };
          
          return this.update( updates );
        break;
      }
    } // update()
  } ); // Filter instance methods
  
  /* -------------------------------------------------------------------------------------------
     module exports
  */
  eval( XS.export_code( 'XS', [ 'Filter' ] ) );
  
  de&&ug( "module loaded" );
} )( this ); // filter.js