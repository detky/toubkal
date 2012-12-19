# ----------------------------------------------------------------------------------------------
# deep clone of object
# --------------------

clone = ( o ) ->
  return o if typeof o isnt 'object' or o is null

  r = if o instanceof Array then [] else {}

  r[ p ] = clone o[ p ] for p of o when o.hasOwnProperty p

  return r


describe 'clone():', ->
  foo =
    id: 10
    array: [ 1, 2, "a", "b", 3, { x: 10, y: undefined, z: null } ]
    obj:
      coordinate: 1
      label: "Coordinate"
      values: [ 24, null, undefined ]

  bar = clone foo

  it 'foo should be deep equal to bar', ->
    bar.should.be.eql foo

# ----------------------------------------------------------------------------------------------
# xs unit test suite
# ------------------

# include modules
XS = if require? then ( require '../src/xs.js' ).XS else this.XS 

chai = require 'chai' if require?
chai?.should()

describe 'XS test suite:', ->
  it 'XS should be defined:', ->
    XS.should.exist
  
  describe 'XS.extend():', ->
    extend = XS.extend
    
    it 'extend() should be a function', ->
      extend.should.be.a 'function'
    
    o1 = 
      id: 1
      name: 'khalifa'
    
    o2 = 
      email: 'knassik@gmail.com'
    
    _o2 = clone o2
    
    o3 =
      country: 'Morocco'
      name: 'khalifa nassik'
      email: 'khalifan@gmail.com'

    _o3 = clone o3
    
    it 'extend( object ) should be equal to object', ->
      result = extend o1
      
      result.should.be.eql o1
    
    it 'extend( object1, object2 ) should be equal to object', ->
      result = extend o1, o2
      
      result.should.be.eql { id: 1, name: 'khalifa', email: 'knassik@gmail.com' }
    
    it 'o2 should be deep equal to _o2', ->
      o2.should.be.eql _o2
    
    it 'extend( object1, object2, object3 ) should be equal to object', ->
      result = extend o1, o2, o3
      
      result.should.be.eql { id: 1, name: 'khalifa nassik', email: 'khalifan@gmail.com', country: 'Morocco' }
     
    it 'o2 should be deep equal to _o2', ->
       o2.should.be.eql _o2
    
    it 'o3 should be deep equal to _o3', ->
      o3.should.be.eql _o3
    
  describe 'XS.subclass():', ->
    subclass = XS.subclass
    
    it 'subclass() should be a function', ->
      subclass.should.be.a 'function'
    
    Animal = ( name ) -> @name = name
    
    a = new Animal 'Sam'
    
    it 'a should be an instance of Animal', ->
      a.should.be.an.instanceof Animal
      
    Snake = ( name ) ->
    
    subclass( Animal, Snake );
    
    s = new Snake( "Barry the Snake" )
    
    it 's should be an instance of Snake', ->
      s.should.be.an.instanceof Snake
    
    it 's should be an instance of Animal', ->
      s.should.be.an.instanceof Animal
    
    it 'a should not be an instance of Snake', ->
      a.should.not.be.an.instanceof Snake
    
  describe 'XS.Code():', ->
    code = new XS.Code( 'Code Test' )
      .function( null, 'f', [] )
        .add( 'var i' )
        .loop( 'i = -1', ' ++i < 10' )
        .end()
        .add( 'return i' )
      .end()
      .get()
    
    eval code
    
    i = f()
    
    it 'f should be a function', ->
      f.should.be.a 'function'
    
    it 'i should be equal to 10', ->
      i.should.be.eql 10
  
  describe 'XS.Set():', ->
    Set = XS.Set
    
    set = new Set []
    
    it 'set should be a Set', ->
      set.should.be.an.instanceof Set
    
    cities = new Set [
      { id: 1, name: "Marrakech", country: "Morocco"  }
      { id: 2, name: "Mountain View", country: "USA", state: "California" }
      { id: 3, name: "Paris", country: "France" }
    ]
    
    cities.add [ { id: 4, name: "Berlin", country: "Germany" } ]
    
    it 'cities.add( object ) should be a Set', ->
      cities.should.be.an.instanceof Set
    
    result = new Set [
      { id: 1, name: "Marrakech", country: "Morocco"  }
      { id: 2, name: "Mountain View", country: "USA", state: "California" }
      { id: 3, name: "Paris", country: "France" }
      { id: 4, name: "Berlin", country: "Germany" }
    ]
    
    it 'cities.add( object ) should be equal to result', ->
      cities.should.be.eql result
    
    it 'set.index_of( { id: 2 } ) should be -1: empty set', ->
      set.index_of( { id: 2 } ).should.be.eql -1
    
    it 'cities.index_of( { id: 2 } ) should be 1', ->
      cities.index_of( { id: 2 } ).should.be.eql 1
    
    cars = new Set [
          { id: 1, brand: "Mercedes", model: "C Class" }
          { id: 2, brand: "Mercedes", model: "S Class" }
          { id: 3, brand: "BMW"     , model: "M Serie" }
        ]
      , { key: [ "id", "model" ] }
    
    it 'cars.index_of( { id: 2, model: "S Class" } ) should be 1', ->
      cars.index_of( { id: 2, model: "S Class" } ).should.be.eql 1
    
    it 'cars.index_of( { id: 3, model: "S Class" } ) should be -1: not found', ->
      cars.index_of( { id: 3, model: "S Class" } ).should.be.eql -1
    