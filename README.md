*This repository is a mirror of the [component](http://component.io) module [anchorjs/querystring](http://github.com/anchorjs/querystring). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/anchorjs-querystring`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# Anchor/Query String

The query string module provides utilities for dealing with query strings.

## Install

##### component

    $ component install anchorjs/querystring

##### volo

    $ volo add anchorjs/querystring

## Usage

#### Stringify

Serialize an object to a query string. Optionally override the default separator
('&') and assignment ('=') characters.

```javascript
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
// returns
'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
// returns
'foo:bar;baz:qux'
```

#### Parse

Deserialize a query string to an object. Optionally override the default
separator ('&') and assignment ('=') characters.

```javascript
querystring.parse('foo=bar&baz=qux&baz=quux&corge')
// returns
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
```

## Compatibility

##### component

This module uses the [AMD](https://github.com/amdjs/amdjs-api) format.  To
include in component builds, use [component-amd](https://github.com/jaredhanson/component-amd):

    component build -u component-amd

##### Node

This module implements the interface exported by Node's [Query String](http://nodejs.org/api/querystring.html)
module.

## Tests

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari
    
Headless tests can be executed directly from a terminal:
    
    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>  
Copyright Joyent, Inc. and other Node contributors.
