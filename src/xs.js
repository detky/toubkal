// xs.js

( function( exports ) {
  /* -------------------------------------------------------------------------------------------
     nil_function()
  */
  function nil_function() {}
  
  /* -------------------------------------------------------------------------------------------
     extend( destination, source [, source_1 ... ] )
  */
  function extend( d ) {
    var l = arguments.length;
    
    for ( var i = 0; ++i < l; ) {
      var s = arguments[ i ];

      for ( var p in s ) if ( s.hasOwnProperty( p ) ) d[ p ] = s[ p ];
    }
    
    return d;
  } // extend()
  
  /* -------------------------------------------------------------------------------------------
     log( message )
  */
  var log;
  
  if ( typeof console != "object" || typeof console.log != "function" ) {
    // Browsers that do not have a console.log()
    log = nil_function;
    log.s = nil_function;
  } else {
    log = function( message ) {
      var date = new Date
        , year     = "" + date.getFullYear()
        , month    = "" + ( date.getMonth() + 1 )
        , day      = "" + date.getDate()
        , hour     = "" + date.getHours()
        , minutes  = "" + date.getMinutes()
        , seconds  = "" + date.getSeconds()
        , ms       = "" + date.getMilliseconds()
      ;
      
      if ( month  .length < 2 ) month    = "0" + month
      if ( day    .length < 2 ) day      = "0" + day;
      if ( hour   .length < 2 ) hour     = "0" + hour;
      if ( minutes.length < 2 ) minutes  = "0" + minutes;
      if ( seconds.length < 2 ) seconds  = "0" + seconds;
      
      switch( ms.length ) {
        case 2: ms =  "0" + ms; break;
        case 1: ms = "00" + ms; break;
      }
      
      console.log( year + '/' + month + '/' + day
        + ' ' + hour + ':' + minutes + ':' + seconds + '.' + ms
        + ' - ' + message
      );
    } // log()
    
    log.s = JSON.stringify;
  }
  
  /* -------------------------------------------------------------------------------------------
     subclass( base, f )
  */
  function subclass( base, f ) {
    return ( f.prototype = Object.create( base.prototype ) ).constructor = f;
  } // subclass()
  
  /* -------------------------------------------------------------------------------------------
     export_code( namespace, exports )
     
     Generate pretty code to export public attributes
  */
  function export_code( namespace, exports ) {
    var max = Math.max.apply( Math, exports.map( function( v ) { return v.length } ) );
    
    for ( var s = '', i = -1; ++i < max; ) s += ' ';
    
    exports.unshift(
      '\n  var ' + namespace + ' = exports.' + namespace + ' = ' + namespace + ' || {};\n'
    );
    
    var export_code = exports.reduce(
      function( r, f ) {
        return r + '\n  XS.' + ( f + s ).substr( 0, max ) + " = " + f + ';'
      }
    );
    
    de&&ug( "exports:" + export_code );
    
    return export_code;
  } // export_code()
  
  /* -------------------------------------------------------------------------------------------
     de&&ug()
  */
  var de = true;
  
  function ug( m ) {
    log( "xs, " + m );
  } // ug()
  
  /* -------------------------------------------------------------------------------------------
     Pretty JavaScript code generator
  */
  function Code( name ) {
    this.name = name;
    this.code = '';
    this.indent = '  ';
    this.blocs = [];
    
    return this;
  } // Code()
  
  Code.decompile = function( f ) {
    if ( typeof f !== 'function' ) return f;
    
    var s = f.toString();
    
    var parsed = /function\s*\((.*)\)\s*{\s*(.*)\s*return\s*(.*);\s*}/.exec( s );
    
    if ( f ) {
      parsed = { parameters: parsed[ 1 ], code: parsed[ 2 ], condition: parsed[ 3 ], f: f };
      
      de&&ug( 'Code.decompile(), parsed:' + log.s( parsed ) + ', function: ' + s );
      
      return parsed;
    }
    
    return f;
  } // Code.decompile()
  
  extend( Code.prototype, {
    get: function() {
      de&&ug( "Code:\n" + this.code );
      
      return this.code;
    }, // get()
    
    eval: function() {
      de&&ug( "Code.eval: name: " + this.name + ', code:\n' + this.code );
      
      return eval( this.code );
    }, // eval()
    
    line: function( line, new_lines ) {
      if ( line !== undefined ) this.code += this.indent + line + '\n';
      
      if ( new_lines ) while( new_lines-- ) this.code += '\n';
      
      return this;
    }, // add()
    
    add: function( statement, new_lines ) {
      return this.line( statement + ';', new_lines );
    }, // add()
    
    comment: function( comment ) {
      return this.line( '// ' + comment );
    }, // comment()
    
    begin: function( code ) {
      this.line( code + ' {' );
      
      this.blocs.push( code );
      
      this.indent += '  ';
      
      return this;
    }, // begin()
    
    end: function( comment ) {
      var code = this.blocs.pop();
      
      if ( code === undefined ) throw new Code.Syntax_Error( "Missing matching opening block" );
      
      this.indent = this.indent.substr( 2 );
      
      if ( comment === true ) {
        comment = '// ' + code;
      } else if ( comment ) {
        comment = '// ' + comment;
      } else {
        comment = '';
      }
      
      return this.line( '} ' + comment, 1 );
    }, // end()
    
    function: function( lvalue, name, parameters ) {
      var code = '';
      
      if ( lvalue ) code += lvalue + ' ';
      
      code += 'function';
      
      if ( name ) code += ' ' + name;
      
      code += '( ' + parameters.join( ', ' ) + ' )';
      
      return this.begin( code );
    }, // function()
    
    var: function( v ) {
      return this.add( 'var ' + v, 1 );
    }, // var()
    
    vars: function( vars ) {
      return this.add( 'var ' + vars.join( ', ' ), 1 );
    }, // vars()
    
    vars_from_object: function( object, attributes ) {
      if ( typeof attributes !== "object" || ! attributes instanceof Array ) throw new Code.Error( "Missing attributes" );
      
      var l = attributes.length;
      
      if ( ! l ) return this;
      
      var vars = [];
      
      for( var i = -1; ++i < l; ) {
        var a = attributes[ i ];
        
        vars.push( '_' + a + ' = ' + object + '.' + a );
      }
      
      return this.vars( vars );
    }, // vars_from_object()
    
    loop: function( init, condition, step ) {
      return this.begin( 'for( ' + ( init || '' ) + '; ' + ( condition || '' ) + '; ' + ( step || '' ) + ' )' );
    }, // loop()
    
    unfolded_while: function( first, inner, last, count ) {
      inner || ( inner = first );
      count || ( count = 200 / inner.length >> 0 );
      
      if ( inner.charAt( inner.length - 1 ) === ';' ) {
        var inner_is_statement = true;
      }
      
      if ( count > 1 ) {
        var indent = '\n  ' + this.indent;
        
        this
          .var( 'ul = l - l % ' + count + ' - 1' )
          
          .begin( 'while( i < ul )' );
          
            if ( inner_is_statement ) {
              this
                .line( first )
                .repeat( count - 1, inner )
                .line( last )
              ;
            } else {
              this.add( first + repeat( count - 1, inner, indent + '  ' ) + indent + ( last || '' ) );
            }
            
          this
          .end()
          
          .add( 'ul = l - 1' )
        ;
      } else {
        this.var( 'ul = l - 1' );
      }
      
      this
        .begin( 'while( i < ul )' )
          [ inner_is_statement ? 'line' : 'add' ]( first + ( last ? ' ' + last : '' ) )
        .end()
      ;
      
      return this;
      
      function repeat( count, code, indent ) {
        var c = '';
        
        for ( var i = -1; ++i < count; ) c += indent + code;
        
        return c;
      }
    }, // unfolded_loop()
    
    repeat: function( count, code ) {
      for ( var i = -1; ++i < count; ) this.line( code );
      
      return this;
    } // repeat()
  } );
  
  /* -------------------------------------------------------------------------------------------
     Set( a [, options] )
  */
  function Set( a, options ) {
    this.a = a = a || [];
    this.options = options = options || {};
    this.connections = [];
    this.key = options.key || [ "id" ];
    
    de&&ug( "New Set, name: " + options.name + ", length: " + a.length );
    
    return this;
  } // Set()
  
  var push = Array.prototype.push;
  
  /* -------------------------------------------------------------------------------------------
     Set instance methods
  */
  extend( Set.prototype, {
    get: function() {
      return this.a;
    }, // get()
    
    add: function( objects, dont_notify ) {
      push.apply( this.a, objects );
      
      return dont_notify? this: this.connections_add( objects );
    }, // add()
    
    update: function( objects, dont_notify ) {
      for ( var i = -1, l = objects.length, updated = []; ++i < l; ) {
        var o = objects[ i ]
          , p = this.index_of( o[ 0 ] )
        ;
        
        if ( p === -1 ) continue;
        
        this.a[ p ] = o[ 1 ];
        
        updated.push( o );
      }
      
      return dont_notify? this: this.connections_update( updated );
    }, // update()
    
    remove: function( objects, dont_notify ) {
      for ( var i = -1, l = objects.length, removed = []; ++i < l; ) {
        var o = objects[ i ]
          , p = this.index_of( o )
          , a = this.a
        ;
        
        if ( p === 0 ) {
          a.shift();
        } else if ( p === a.length - 1 ) {
          a.pop();
        } else if ( p !== -1 ) {
          a.splice( p, 1 );
        } else {
          continue;
        }
        
        removed.push( o ); 
      }
      
      return dont_notify? this: this.connections_remove( removed );
    }, // remove()
    
    index_of: function( o ) {
      return this.make_index_of().index_of( o ); 
    }, // index_of()
    
    make_index_of: function() {
      var key = this.key, l = key.length;
      
      var vars = [ 'a = this.a', 'l = a.length', 'i = -1' ];
      
      var first, inner, last;
      
      if ( l > 1 ) {
        vars.push( 'r' );
        
        var tests = [];
        
        for( var i = -1; ++i < l; ) {
          var field = key[ i ];
          
          tests.push( ( i === 0 ? '( r = a[ ++i ] ).' : 'r.' ) + field + ' === _' + field );
        }
        
        first = 'if ( ' + tests.join( ' && ' ) + ' ) return i;';
      } else {
        var field = key[ 0 ]
          , test = 'a[ ++i ].' + field + ' === _' + field
        ;
        
        first = 'if ( ' + test;
        inner = '|| ' + test;
        last  = ') return i';
      }
      
      var code = new Code( 'index_of' )
        .function( 'this.index_of =', null, [ 'o' ] )
          .vars( vars )
          .vars_from_object( 'o', key ) // Local variables for key
          .unfolded_while( first, inner, last )
          .add( 'return -1' )
        .end( 'index_of()' )
        .get()
      ;
      
      eval( code );
      
      return this;
    }, // make_index_of()
    
    notify: function( transaction ) {
      var l = transaction.length;
      
      for ( var i = -1; ++i < l; ) {
        var a = transaction[ i ].action;
        
        if ( ! this[ a ] ) throw( new Unsuported_Method( a ) );
      }
      
      for ( var i = -1; ++i < l; ) {
        var a = transaction[ i ];
        
        this[ a.action ]( a.objects, true );
      }
      
      return this.notify_connections( transaction );
    }, // notify()
    
    notify_connections: function( transaction ) {
      var connections = this.connections, l = connections.length;
      
      for ( var i = -1; ++i < l; ) connections[ i ].notify( transaction );
      
      return this;
    }, // notify_connections()
    
    connections_add: function( added ) {
      var connections = this.connections, l = connections.length;
      
      for ( var i = -1; ++i < l; ) connections[ i ].add( added );
      
      return this;
    }, // connections_add()
    
    connections_update: function( updated ) {
      var connections = this.connections, l = connections.length;
      
      for ( var i = -1; ++i < l; ) connections[ i ].update( updated );
      
      return this;
    }, // connections_update()
    
    connections_remove: function( removed ) {
      var connections = this.connections, l = connections.length;
      
      for ( var i = -1; ++i < l; ) connections[ i ].remove( removed );
      
      return this;
    }, // connections_remove()
    
    connect: function( connection ) {
      this.connections.push( connection );
      
      return this;
    }, // connect()
    
    filter: function( filter ) {
      var f = new Filter( this, filter );
      
      return f.out;
    } // filter()
  } ); // Set instance methods
  
  /* -------------------------------------------------------------------------------------------
     Connection()
  */
  function Connection( options ) {
    this.options = options = options || {};
    
    return this;
  } // Connection()
  
  /* -------------------------------------------------------------------------------------------
     Connection instance methods
  */
  extend( Connection.prototype, {
    connect_to: function( set ) {
      set.connect( this );
      
      this.add( set.get() );
      
      return this;
    }, // connect_to() 
    
    notify: function( transaction ) {
      var l = transaction.length;
      
      for ( var i = -1; ++i < l; ) {
        var a = transaction[ i ].action;
        
        if ( ! this[ a ] ) throw( new Unsuported_Method( a ) );
      }
      
      for ( var i = -1; ++i < l; ) {
        var a = transaction[ i ];
        
        this[ a.action ]( a.objects );
      }
      
      return this;
    } // notify()
  } );
  
  /* -------------------------------------------------------------------------------------------
     Filter()
  */
  function Filter( set, filter, options ) {
    Connection.call( this, options );
    
    this.filter = filter;
    
    this.out = new Set( [], { key: set.key } );
    
    this.connect_to( set );
    
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
        .function( 'this.add =', null, [ 'objects' ] )
          .vars( vars )
          
          .unfolded_while( first )
          
          .add( 'added.length && this.out.add( added )', 1 )
          
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
        .function( 'this.remove =', null, [ 'objects' ] )
          .vars( [ 'i = -1', 'l = objects.length', 'filter = this.filter', 'removed = []', 'o' ] )
          
          .unfolded_while( first )
          
          .add( 'removed.length && this.out.remove( removed )', 1 )

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
        // follow-through
        
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
            
            removed.length && this.out.remove( removed );
            updated.length && this.out.update( updated );
            added  .length && this.out.add   ( added   );
            
            return this;
          };
          
          return this.update( updates );
        break;
      }
    } // update()
  } ); // Filter instance methods
  
  /* -------------------------------------------------------------------------------------------
     CXXX(): template for Connection
  */
  function CXXX( set, options ) {
    Connection.call( this, options );
    
    this.out = new Set( [], { key: set.key } );
    
    this.connect_to( set );
    
    return this;
  } // CXXX()
  
  subclass( Connection, CXXX );
  
  extend( CXXX.prototype, {
    add: function( objects ) {
      return this;
    }, // add()
    
    remove: function( objects ) {
      return this;
    }, // remove()
    
    update: function( objects ) {
      return this;
    } // update()
  } ); // CXXX instance methods
  
  /* -------------------------------------------------------------------------------------------
     module exports
  */
  eval( export_code( 'XS', [ 'Set', 'Connection', 'Filter', 'Code', 'extend', 'log', 'subclass', 'export_code' ] ) );
  
  de&&ug( "module loaded" );
} )( this ); // xs.js
