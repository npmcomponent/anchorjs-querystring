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
  
  describe('querystring - Node implementation', function() {
  
    describe('tests cases', function() {
      // folding block, commented to pass gjslint
      // {{{
      // [ wonkyQS, canonicalQS, obj ]
      var qsTestCases = [
        ['foo=918854443121279438895193',
         'foo=918854443121279438895193',
         {'foo': '918854443121279438895193'}],
        ['foo=bar', 'foo=bar', {'foo': 'bar'}],
        ['foo=bar&foo=quux', 'foo=bar&foo=quux', {'foo': ['bar', 'quux']}],
        ['foo=1&bar=2', 'foo=1&bar=2', {'foo': '1', 'bar': '2'}],
        ['my+weird+field=q1%212%22%27w%245%267%2Fz8%29%3F',
         'my%20weird%20field=q1!2%22\'w%245%267%2Fz8)%3F',
         {'my weird field': 'q1!2"\'w$5&7/z8)?' }],
        ['foo%3Dbaz=bar', 'foo%3Dbaz=bar', {'foo=baz': 'bar'}],
        ['foo=baz=bar', 'foo=baz%3Dbar', {'foo': 'baz=bar'}],
        ['str=foo&arr=1&arr=2&arr=3&somenull=&undef=',
         'str=foo&arr=1&arr=2&arr=3&somenull=&undef=',
         { 'str': 'foo',
           'arr': ['1', '2', '3'],
           'somenull': '',
           'undef': ''}],
        [' foo = bar ', '%20foo%20=%20bar%20', {' foo ': ' bar '}],
        // FIXME: @jaredhanson: this test is failing
        /* ['foo=%zx', 'foo=%25zx', {'foo': '%zx'}], */
        ['foo=%EF%BF%BD', 'foo=%EF%BF%BD', {'foo': '\ufffd' }],
        // See: https://github.com/joyent/node/issues/1707
        // FIXME: @jaredhanson: this test is failing
        /* ['hasOwnProperty=x&toString=foo&valueOf=bar&__defineGetter__=baz',
          'hasOwnProperty=x&toString=foo&valueOf=bar&__defineGetter__=baz',
          { hasOwnProperty: 'x',
            toString: 'foo',
            valueOf: 'bar',
            __defineGetter__: 'baz' }], */
        // See: https://github.com/joyent/node/issues/3058
        ['foo&bar=baz', 'foo=&bar=baz', { foo: '', bar: 'baz' }]
      ];
      
      it('should parse as expected', function() {
        // test that the canonical qs is parsed properly.
        qsTestCases.forEach(function(testCase) {
          expect(testCase[2]).to.deep.equal(querystring.parse(testCase[0]));
        });
      });
    });
    
    describe('colon tests cases', function() {
      // [ wonkyQS, canonicalQS, obj ]
      var qsColonTestCases = [
        ['foo:bar', 'foo:bar', {'foo': 'bar'}],
        ['foo:bar;foo:quux', 'foo:bar;foo:quux', {'foo': ['bar', 'quux']}],
        ['foo:1&bar:2;baz:quux',
         'foo:1%26bar%3A2;baz:quux',
         {'foo': '1&bar:2', 'baz': 'quux'}],
        ['foo%3Abaz:bar', 'foo%3Abaz:bar', {'foo:baz': 'bar'}],
        ['foo:baz:bar', 'foo:baz%3Abar', {'foo': 'baz:bar'}]
      ];
      
      it('should parse as expected', function() {
        // test that the colon test cases can do the same
        qsColonTestCases.forEach(function(testCase) {
          expect(testCase[2]).to.deep.equal(querystring.parse(testCase[0], ';', ':'));
        });
      });
    });
  
  });
  
  return { name: "test.querystring" }
});
