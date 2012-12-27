define(['querystring'],
function(querystring) {

  describe('querystring', function() {
  
    describe('.stringify()', function() {
    
      it('should stringify first Node example', function() {
        expect(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })).to.be.equal('foo=bar&baz=qux&baz=quux&corge=');
      });
      
      it('should stringify second Node example', function() {
        expect(querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')).to.be.equal('foo:bar;baz:qux');
      });
      
    });
    
    describe('.parse()', function() {
    
      it('should stringify first Node example', function() {
        var obj = querystring.parse('foo=bar&baz=qux&baz=quux&corge');
      
        expect(Object.keys(obj)).to.have.length(3);
        expect(obj.foo).to.be.equal('bar');
        expect(obj.baz).to.be.an.array;
        expect(obj.baz[0]).to.be.equal('qux');
        expect(obj.baz[1]).to.be.equal('quux');
        expect(obj.corge).to.be.equal('');
      });
      
    });
    
  });
  
  return { name: "test.querystring" }
});
