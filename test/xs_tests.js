// Generated by CoffeeScript 1.4.0
(function() {
  var XS, chai, clone;

  clone = function(o) {
    var p, r;
    if (typeof o !== 'object' || o === null) {
      return o;
    }
    r = o instanceof Array ? [] : {};
    for (p in o) {
      if (o.hasOwnProperty(p)) {
        r[p] = clone(o[p]);
      }
    }
    return r;
  };

  describe('clone():', function() {
    var bar, foo;
    foo = {
      id: 10,
      array: [
        1, 2, "a", "b", 3, {
          x: 10,
          y: void 0,
          z: null
        }
      ],
      obj: {
        coordinate: 1,
        label: "Coordinate",
        values: [24, null, void 0]
      }
    };
    bar = clone(foo);
    return it('foo should be deep equal to bar', function() {
      return bar.should.be.eql(foo);
    });
  });

  XS = typeof require !== "undefined" && require !== null ? (require('../src/xs.js')).XS : this.XS;

  if (typeof require !== "undefined" && require !== null) {
    chai = require('chai');
  }

  if (chai != null) {
    chai.should();
  }

  describe('XS test suite:', function() {
    it('XS should be defined:', function() {
      return XS.should.be.exist;
    });
    return describe('XS.extend():', function() {
      var extend, o1, o2, o3, _o2, _o3;
      extend = XS.extend;
      it('extend() should be a function', function() {
        return extend.should.be.a('function');
      });
      o1 = {
        id: 1,
        name: 'khalifa'
      };
      o2 = {
        email: 'knassik@gmail.com'
      };
      _o2 = clone(o2);
      o3 = {
        country: 'Morocco',
        name: 'khalifa nassik',
        email: 'khalifan@gmail.com'
      };
      _o3 = clone(o3);
      it('extend( object ) should be equal to object', function() {
        var result;
        result = extend(o1);
        return result.should.be.eql(o1);
      });
      it('extend( object1, object2 ) should be equal to object', function() {
        var result;
        result = extend(o1, o2);
        return result.should.be.eql({
          id: 1,
          name: 'khalifa',
          email: 'knassik@gmail.com'
        });
      });
      it('o2 should be deep equal to _o2', function() {
        return o2.should.be.eql(_o2);
      });
      it('extend( object1, object2, object3 ) should be equal to object', function() {
        var result;
        result = extend(o1, o2, o3);
        return result.should.be.eql({
          id: 1,
          name: 'khalifa nassik',
          email: 'khalifan@gmail.com',
          country: 'Morocco'
        });
      });
      it('o2 should be deep equal to _o2', function() {
        return o2.should.be.eql(_o2);
      });
      return it('o3 should be deep equal to _o3', function() {
        return o3.should.be.eql(_o3);
      });
    });
  });

}).call(this);
