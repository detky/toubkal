###
    json.coffee

    Copyright (C) 2013, 2014, Reactive Sets

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
# rs test utils
# -------------

utils = require( './tests_utils.js' ) unless this.expect?

expect = this.expect || utils.expect
check  = this.check  || utils.check
log    = this.log    || utils.log
rs     = this.rs     || utils.rs

RS      = rs.RS
extend  = RS.extend
clone   = extend.clone
uuid_v4 = RS.uuid_v4

slice = Array.prototype.slice

# ----------------------------------------------------------------------------------------------
# Check sorted pipelet content
# ----------------------------

check_set_content = ( done, source, values ) ->
  source._fetch_all ( _values ) ->
    check done, () ->
      expect( _values.sort ( a, b ) -> a.id - b.id ).to.be.eql values
  
# ----------------------------------------------------------------------------------------------
# Require tested modules
# ----------------------

unless rs.json_parse?
  require '../../lib/core/json.js'

Pipelet = RS.Pipelet
Set     = RS.Set

# ----------------------------------------------------------------------------------------------
# rs json test suite
# ------------------

describe 'json.js', ->
  books = [
    { operation: "add", content: { id:  1, title: "A Tale of Two Cities"                    , author_id:  1, author_name: "Charles Dickens"         } }
    { operation: "add", content: { id:  8, title: "The Hobbit"                              , author_id:  2, author_name: "J. R. R. Tolkien"        } }
    { operation: "add", content: { id:  2, title: "The Lord of the Rings"                   , author_id:  2, author_name: "J. R. R. Tolkien"        } }
  ]
  
  book_operations = rs.set books
  
  books_stringified = book_operations.json_stringify()
  
  books_parsed = books_stringified.json_parse().set()
  
  it 'json_stringify() should stringify content attributes', ( done ) ->
    books_stringified._fetch_all ( books ) ->
      check done, () ->
        expect( books ).to.be.eql [
          { operation: "add", content: '{"id":1,"title":"A Tale of Two Cities","author_id":1,"author_name":"Charles Dickens"}' }
          { operation: "add", content: '{"id":8,"title":"The Hobbit","author_id":2,"author_name":"J. R. R. Tolkien"}' }
          { operation: "add", content: '{"id":2,"title":"The Lord of the Rings","author_id":2,"author_name":"J. R. R. Tolkien"}' }
        ]

  it 'json_parse() should parse stringified content', ( done ) ->
    books_parsed._fetch_all ( _books ) ->
      check done, () ->
        expect( _books ).to.be.eql books
