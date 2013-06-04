###
    xs_load_images_tests.coffee

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

###

mocha.setup 'bdd' if typeof mocha isnt 'undefined'

# ----------------------------------------------------------------------------------------------
# Asynchrnous tests exception catcher
# -----------------------------------

check = ( done, test ) ->
  try
    test()

    done()
  catch e
    done e


# include modules
XS = if require? then ( require '../lib/xs.js' ).XS else this.XS
expect = if require? then ( require 'expect.js' ) else this.expect

if require?
  require '../lib/load_images.js'

xs = XS.xs

describe 'Load Images test suite:', ->
  dom_node       = document.getElementById 'images'
  images_dataset = xs.set [], { auto_increment: true, name: 'Images dataset' }
  images         = images_dataset.load_images document.getElementById 'images'
  
  it 'expect images.fetch_all() to be empty', ->
    expect( images.fetch_all() ).to.be.empty()
  
  it 'after images_dataset.add( objects ), expect images.fetch_all() to be equal to result', ( done ) ->
    images_dataset.add [
      { title: 'Villa Marrakech 1' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/01.jpg' }
      { title: 'Villa Marrakech 2' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/02.jpg' }
      { title: 'Villa Marrakech 3' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/03.jpg' }
      { title: 'Villa Marrakech 4' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/04.jpg' }
      { title: 'Villa Marrakech 5' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/05.jpg' }
      { title: 'Villa Marrakech 7' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/07.jpg' }
      { title: 'Villa Marrakech 8' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/08.jpg' }
      { title: 'Villa Marrakech 9' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/09.jpg' }
      #{ title: 'Villa Marrakech 12', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg' }
      #{ title: 'Villa Marrakech 13', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg' }
    ]
    
    images.fetch_all ( values ) -> check done, () ->
      expect( values ).to.be.eql [
        { id: 1 , title: 'Villa Marrakech 1' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/01.jpg' }
        { id: 2 , title: 'Villa Marrakech 2' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/02.jpg' }
        { id: 3 , title: 'Villa Marrakech 3' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/03.jpg' }
        { id: 4 , title: 'Villa Marrakech 4' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/04.jpg' }
        { id: 5 , title: 'Villa Marrakech 5' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/05.jpg' }
        { id: 6 , title: 'Villa Marrakech 7' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/07.jpg' }
        { id: 7 , title: 'Villa Marrakech 8' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/08.jpg' }
        { id: 8 , title: 'Villa Marrakech 9' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/09.jpg' }
        #{ id: 9 , title: 'Villa Marrakech 12', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg' }
        #{ id: 10, title: 'Villa Marrakech 13', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg' }
      ]
  
  it 'after images_dataset.remove( object ), expect images.fetch_all() to be equal to result', ( done ) ->
    images_dataset.remove [
      { id: 3, title: 'Villa Marrakech 3', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/03.jpg' }
    ]
    
    images.fetch_all ( values ) -> check done, () ->
      expect( values ).to.be.eql [
        { id: 1 , title: 'Villa Marrakech 1' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/01.jpg' }
        { id: 2 , title: 'Villa Marrakech 2' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/02.jpg' }
        { id: 4 , title: 'Villa Marrakech 4' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/04.jpg' }
        { id: 5 , title: 'Villa Marrakech 5' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/05.jpg' }
        { id: 6 , title: 'Villa Marrakech 7' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/07.jpg' }
        { id: 7 , title: 'Villa Marrakech 8' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/08.jpg' }
        { id: 8 , title: 'Villa Marrakech 9' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/09.jpg' }
        #{ id: 9 , title: 'Villa Marrakech 12', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg' }
        #{ id: 10, title: 'Villa Marrakech 13', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg' }
      ]
  
  it 'after images_dataset.add( objects ), expect images.fetch_all() to be equal to result', ( done ) ->
    images_dataset.add [
      { title: 'Villa Marrakech 12', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg' }
      { title: 'Villa Marrakech 13', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg' }
    ]
    
    images.fetch_all ( values ) -> check done, () ->
      expect( values ).to.be.eql [
        { id: 1 , title: 'Villa Marrakech 1' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/01.jpg' }
        { id: 2 , title: 'Villa Marrakech 2' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/02.jpg' }
        { id: 4 , title: 'Villa Marrakech 4' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/04.jpg' }
        { id: 5 , title: 'Villa Marrakech 5' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/05.jpg' }
        { id: 6 , title: 'Villa Marrakech 7' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/07.jpg' }
        { id: 7 , title: 'Villa Marrakech 8' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/08.jpg' }
        { id: 8 , title: 'Villa Marrakech 9' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/09.jpg' }
        { id: 9 , title: 'Villa Marrakech 12', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg' }
        { id: 10, title: 'Villa Marrakech 13', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg' }
      ]
  
  it 'after images_dataset.update( objects ), expect images.fetch_all() to be equal to result', ( done ) ->
    images_dataset.update [
      [
        { id: 9 , title: 'Villa Marrakech 12', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg' }
        { 
          id         : 9
          title      : 'Lotus Club 1'
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sapien ipsum, quis sollicitudin mi. Pellentesque habitant morbi tristique fames ac turpis egestas'
          src        : 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg'
        }
      ]
      [
        { id: 10, title: 'Villa Marrakech 13', src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg' }
        {
          id         : 10
          title      : 'Lotus Club 2'
          description: 'Nullam bibendum, augue ac elementum commodo, nibh sapien laoreet metus, et sollicitudin arcu lectus in elit. Nam non est ipsum'
          src        : 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg'
        }
      ]
    ]
    
    images.fetch_all ( values ) -> check done, () ->
      expect( values ).to.be.eql [
        { id: 1 , title: 'Villa Marrakech 1' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/01.jpg' }
        { id: 2 , title: 'Villa Marrakech 2' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/02.jpg' }
        { id: 4 , title: 'Villa Marrakech 4' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/04.jpg' }
        { id: 5 , title: 'Villa Marrakech 5' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/05.jpg' }
        { id: 6 , title: 'Villa Marrakech 7' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/07.jpg' }
        { id: 7 , title: 'Villa Marrakech 8' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/08.jpg' }
        { id: 8 , title: 'Villa Marrakech 9' , src: 'https://raw.github.com/ConnectedSets/castorcad/master/images/09.jpg' }
        { 
          id         : 9
          title      : 'Lotus Club 1'
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sapien ipsum, quis sollicitudin mi. Pellentesque habitant morbi tristique fames ac turpis egestas'
          src        : 'https://raw.github.com/ConnectedSets/castorcad/master/images/12.jpg'
        }
        {
          id         : 10
          title      : 'Lotus Club 2'
          description: 'Nullam bibendum, augue ac elementum commodo, nibh sapien laoreet metus, et sollicitudin arcu lectus in elit. Nam non est ipsum'
          src        : 'https://raw.github.com/ConnectedSets/castorcad/master/images/13.jpg'
        }
      ]
  
