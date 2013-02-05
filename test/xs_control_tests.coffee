###
    xs_control_tests.coffee

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

# ----------------------------------------------------------------------------------------------
# xs control unit test suite
# ------------------------

# include modules
XS = if require? then ( require '../lib/xs.js' ).XS else this.XS

if require?
  require '../lib/code.js'
  require '../lib/pipelet.js'
  require '../lib/filter.js'
  require '../lib/ordered_set.js'
  require '../lib/aggregator.js'
  require '../lib/table.js'
  require '../lib/control.js'

chai = require 'chai' if require?
chai?.should()

Set         = XS.Set
Table       = XS.Table
Ordered_Set = XS.Ordered_Set
Control     = XS.Control

organizer       = [ { id: "id" } ]
options         = { label: "Charts" }
checkbox_source = new Ordered_Set [], organizer, { name: "Checkbox Source" }
checkbox        = checkbox_source.checkbox document.getElementById( "checkbox_control" ), organizer, options

checkbox_group_source = new Set [], { name: "Checkbox Group Source" }
checkbox_group  = checkbox_group_source.checkbox_group document.getElementById( "checkbox_group_control" ), organizer, {}

radio_source = new Set [], { name: "Radio Source" }
radio        = radio_source.radio document.getElementById( "radio_control" ), organizer, { default_value: { id: 1, label: "Islam" } }

describe 'Checkbox():', ->
  it 'checkbox should be empty', ->
    checkbox.get().should.be.empty
  
  describe 'add():', ->
    it 'after checkbox_source.add( object ), checkbox_source should be equal to [ { id: true, label: "Label True" } ]', ->
      checkbox_source.add [ { id: true, label: "Label True" } ]
      
      checkbox_source.get().should.be.eql [ { id: true, label: "Label True" } ]
    
    it 'after checkbox_source.add( object ), checkbox should be equal to [ { id: true, label: "Label True" } ]', ->
      checkbox.get().should.be.eql [ { id: true, label: "Label True" } ]
    
    it 'after checkbox_source.add( object ), checkbox should be equal to [ { id: false, label: "Label False" }, { id: true, label: "Label True" } ]', ->
      checkbox_source.add [ { id: false, label: "Label False" } ]
      
      checkbox.get().should.be.eql [ { id: true, label: "Label True" } ]
    
  describe 'update():', ->
    it 'after checkbox_source.update( objects ) checkbox should be equal to [ { id: false, label: "Charts" }, { id: true, label: "Charts" } ]', ->
      checkbox_source.update [
        [ { id: true, label: "Label True" }, { id: true, label: "Charts" } ]
        [ { id: false, label: "Label False" }, { id: false, label: "Charts" } ]
      ]
      
      checkbox.get().should.be.eql [ { id: true, label: "Charts" } ]
  
  describe 'remove():', ->
    it 'after checkbox_source.remove( object ), checkbox should be equal to [ { id: true, label: "Charts" } ]', ->
      checkbox_source.remove [ { id: false, label: "Charts" } ]
      
      checkbox.get().should.be.eql [ { id: true, label: "Charts" } ]
    
    it 'after checkbox_source.remove( object ), checkbox should be empty', ->
      checkbox_source.remove [ { id: true, label: "Charts" } ]
      
      checkbox.get().should.be.empty

describe 'Checkbox_Group():', ->
  it 'checkbox_group should be empty', ->
    
    checkbox_group.get().should.be.empty
  
  it 'after checkbox_group_source.add( objects ), checkbox_group should be equal to result', ->
    checkbox_group_source.add [
      { id: 1, label: "Photography"            , checked: true }
      { id: 2, label: "Fishing"                                }
      { id: 3, label: "Playing Computer Games"                 }
      { id: 4, label: "Traveling"              , checked: true }
      { id: 5, label: "Cooking"                                }
      { id: 6, label: "Stamp / Coin Collection", checked: true }
    ]
    
    checkbox_group.get().should.be.eql [
      { id: 1, label: "Photography"            , checked: true }
      { id: 4, label: "Traveling"              , checked: true }
      { id: 6, label: "Stamp / Coin Collection", checked: true }
    ]
  
  it 'after checkbox_group_source.remove( objects ), checkbox_group should be equal to result', ->
    checkbox_group_source.remove [
      { id: 3, label: "Playing Computer Games"                }
      { id: 4, label: "Traveling"             , checked: true }
    ]
    
    checkbox_group.get().should.be.eql [
      { id: 1, label: "Photography"            , checked: true }
      { id: 6, label: "Stamp / Coin Collection", checked: true }
    ]
  
  it 'after checkbox_group_source.add( object ), checkbox_group should be equal to result', ->
    checkbox_group_source.add [ { id: 7, label: "Pottery", checked: true }, { id: 8, label: "Gardening" } ]
    
    checkbox_group.get().should.be.eql [
      { id: 1, label: "Photography"            , checked: true }
      { id: 6, label: "Stamp / Coin Collection", checked: true }
      { id: 7, label: "Pottery"                , checked: true }
    ]
  
  it 'after checkbox_group_source.update( objects ), checkbox_group should be equal to result', ->
    checkbox_group_source.update [
      [ { id: 3, label: "Playing Computer Games" }, { id: 3, label: "Playing Video Games" } ]
      [ { id: 7, label: "Pottery", checked: true }, { id: 7, label: "Pottery", checked: false } ]
      [ { id: 8, label: "Gardening" }, { id: 8, label: "Gardening and Plants", checked: true } ]
    ]
    
    checkbox_group.get().should.be.eql [
      { id: 1, label: "Photography"            , checked: true }
      { id: 6, label: "Stamp / Coin Collection", checked: true }
      #{ id: 7, label: "Pottery"                , checked: true }
      { id: 8, label: "Gardening and Plants"   , checked: true }
    ]

describe 'Radio():', ->
  it 'radio should be empty', ->
  
    radio.get().should.be.empty
  
  it 'after radio_source.add( objects ), radio should be equal to [ { id: 1, label: "Islam", checked: true } ]', ->
    radio_source.add [
      { id: 1, label: "Islam"       , checked: true }
      { id: 2, label: "Christianity" }
      { id: 3, label: "Judaism"      }
      { id: 4, label: "Buddhism"     }
      { id: 5, label: "Hinduism"     }
      { id: 6, label: "Satanism"     }
      { id: 7, label: "Atheism"      }
      { id: 8, label: "Rastafari"    }
    ]
    
    radio.get().should.be.eql [ { id: 1, label: "Islam", checked: true } ]
  
  it 'after radio_source.remove( objects ), radio should be equal to [ { id: 1, label: "Islam", checked: true } ]', ->
    radio_source.remove [ { id: 5, label: "Hinduism" } ]
    
    radio.get().should.be.eql [ { id: 1, label: "Islam", checked: true } ]
  
  it 'after radio_source.update( objects ), radio should be equal to [ { id: 8, label: "Rastafari", checked: true } ]', ->
    radio_source.update [
      [ { id: 6, label: "Satanism" }, { id: 6, label: "Hinduism" } ]
      [ { id: 8, label: "Rastafari" }, { id: 8, label: "Rastafari", checked: true } ]
      [ { id: 1, label: "Islam", checked: true }, { id: 1, label: "Islam", checked: false } ]
    ]
    
    radio.get().should.be.eql [ { id: 8, label: "Rastafari", checked: true } ]
  