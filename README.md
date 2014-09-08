# grunt-acetate

> Grunt plugin for the Acetate static site builter.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-acetate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-acetate');
```

## The "acetate" task

### Overview
In your project's Gruntfile, add a section named `acetate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  acetate: {
    build: {
      config: 'acetate.conf.js'
    },
  },
});
```

### Options

@TODO

### Usage Examples

#### Simple

A simple example that will build your entire project on `grunt acetate`.

```js
grunt.initConfig({
  acetate: {
    build: {
      config: 'acetate.conf.js'
    },
  }
});
```

#### Rebuild Project When Files Change

Integrate with the grunt-contrib-watch plugin to watch files and rebuild the whole Acetate project when files change.

```js
grunt.initConfig({
  acetate: {
    build: {
      config: 'acetate.conf.js'
    },
  },
  watch: {
    acetate: {
      files: ['src/**/*'],
      tasks: ['acetate:build'],
    }
  },
});
```

#### Watching and Rebuilding Single Files

This example shows using the Acetate watcher with `grunt-concurrent`. This example is more robust and will only rebuild the files that have changed and is more efficent for development.

```js
grunt.initConfig({
  acetate: {
    build: {
      config: 'acetate.conf.js'
    },
    watch: {
      config: 'acetate.conf.js',
      watch: true
    }
  },
  concurrent: {
    dev: ['acetate:watch'],
  }
});
```

#### Overriding Config Options

@TODO

#### Passing Arguments

@TODO

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

_(Nothing yet)_
