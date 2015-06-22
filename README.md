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
      options: {
        mode: 'build'
      }
    },
  },
});
```

### Options

| Option      | Default        | Description |
| ----------  | -------------- | ----------- |
| `config`    | `'acetate.conf.js'`    | The name of your configuration file.
| `root`    | `process.cwd()`    | The root directory where you are working. This shoudl contain your `src` and `dest` folders.
| `src`    | `'src'`    | The folder where pages are located in
| `dest`    | `'build'`    | The folder where pages will be built.
| `mode` | `build` | The task that Acetate will run. Should be one of `server`, `watch` or `build`.
| `port`      | `8000`         | Integer. The port on which the webserver will respond.
| `host`      | `'localhost'`  | The hostname to server the website on.
| `log`       | `'info'`       | Logging level to use. Should be one of `debug`, `verbose`, `info`, `success`, `warn`, `error`, `silent`.
| `args` | `{}` | Any additonal arguments you want to be available under `acetate.args` in your config file.

### Usage Examples

#### Simple Build

A simple example that will build your entire project.

```js
grunt.initConfig({
  acetate: {
    build: {
      options: {
        mode: 'build'
      }
    },
  }
});
```

#### Acetate Server + Grunt Watch

It is recommened that you use Acetate's built in server for development since it automatically enables both live reload when pages change and faster startup and build speeds. Run the `watch` task after Acetate to keep the task alive indefinitly.

```js
grunt.initConfig({
  acetate: {
    dev: {
      options: {
        mode: 'server'
      }
    },
  },
  watch: {
    ...
  },
});

grunt.registerTask('default', ['acetate:dev', 'watch']);
```

#### Acetate Watch + Grunt Watch

If you prefer to user your own server to serve files built by Acetate insteed of the built-in Acetate server you can use the built-in file watcher for Acetate.

```js
grunt.initConfig({
  acetate: {
    dev: {
      options: {
        mode: 'watch'
      }
    },
  },
  watch: {
    ...
  },
  connect: {
    ...
  }
});

grunt.registerTask('default', ['acetate:dev', 'connect', 'watch']);
```

#### Acetate Watch + Grunt Concurrent

If you are using [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) to run your tasks in parrallel with either the built-in Acetate server or watcher make sure you specify the `keepalive` option.

```js
grunt.initConfig({
  acetate: {
    watch: {
      options: {
        mode: 'watch',
        keepalive: true
      }
    }
  },
  watch: {
    ...
  },
  connect: {
    ...
  },
  concurrent: {
    dev: ['acetate:watch', 'connect', 'watch'],
  }
});

grunt.registerTask('default', ['concurrent:dev']);
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

_(Nothing yet)_
