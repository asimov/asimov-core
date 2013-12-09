asimov-core
===========

> This is the core api for Asimov. It's responsible to managing the underlying settings, as well as the [Grunt](http://gruntjs.com) based build process for all Asimov components.

### Dependencies

asimov-core and all it's components has the following dependencies:
- Node.js >= 0.8.0
- Bower >= 1.2.6
- Grunt >= 0.4.1
- Sass >= 3.3.0.rc2

# Getting started

asimov-core requires [Grunt](http://gruntjs.com), [Bower](http://bower.io) and [Bundler](http://bundler.io/).

_Grunt which requires Node.js `>= 0.8.0`_
_Bundler & SASS require ruby `>= 1.9.3`_

## Installing Grunt

Grunt is used by asimov-core to compile asimov's css and js as well fun things like generating the docs and running file system watcher tasks. Install Grunt globally by running the following command

```
npm install -g grunt-cli
```

This will put the `grunt` command in your system path, allowing it to be run from any directory.
For more information installing Grunt refer the projects [getting stated guide](http://gruntjs.com/getting-started).

## Installing bower

Bower is used by the asimov project for managing the asimov components you want in your project, as well as helping Grunt find those components so they can be compiled. Install Bower globally by running the following command

```
npm install -g bower
```

This will put the `bower` command in your system path, allowing it to be run from any directory.
For more information installing Bower refer the projects [getting stated guide](http://bower.io).

## Installing bundler

Bundler is used by asimov's ruby dependencies to manage versions & dependencies. Install it by running the following command:

```
gem install bundler
```

This will put the `bundle` command in yours system path.

## Installing asimov-core

To install asimov-core you just need to checkout the git repo, and install it's dependencies by running the following commands

```
git checkout https://github.com/asimov/asimov-core.git
bower install
npm install
bundle install --path bundle_components  # Installs gems into a subdirectory, rather than globally
```

# Compiling asimov-core

Compiling asimov-core, and any of it's components, is done via Grunt. The grunt configuration is inherited as a basis for Asimov components so they all share the same build API.

`default` is the main Grunt task. It validates, tests, compiles, and builds the docs.

`dev` does the same as `default` as well as starts the docs server on port 9001 and the filesystem watch task.

# The API

The asimov-core api is responsible for managing the underlying settings at heart of all Asimov components. Asimov's settings is a complex nested Sass Map _(link to sass map documentation when it's live)_.

**set($key[, $value])**

> Sets `$key` setting to `$value` overwriting `$key` if is already exists. This is essentially the same as `$key: $value`. If `$key` is a Map then it is merged with the existing settings.

`$key`: `String` or `Map`
`$value`: `Literal`

Returns:
- if `$key` is a `String` it's new value is returned.
- if `$key` is a `Map` the update settings map is returned.

**set-default($key[, $value])**

> Sets `$key` setting to `$value` only if `$key` doesn't already exists or is `null`. This is essentially the same as `$key: $value !default`. If `$key` is a Map then it is merged with the existing settings.

`$key`: `String` or `Map`
`$value`: `Literal`

Returns:
- if `$key` is a `String` it's new value is returned.
- if `$key` is a `Map` the update settings map is returned.

**get($key)**

> Gets `$key` from the settings. In order to allow easy access to a nest Sass Map as a String we use `/` to denote tree traversal. So to access `(foo: (bar: (baz: 'yay')))` you would use `get("foo/bar/baz")`.

Returns:
- if `$keys` location is a leaf then it's `Literal` value is returned.
- if `$keys` location isn't a leaf, then it's child `Map` is returned
- otherwise `null` is returned.

# TODO

- document Sass dependency + installation
- document the docs and server
- document settings + aliases
