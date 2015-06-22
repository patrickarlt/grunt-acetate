# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.0] - 2015-06-21

- **BREAKING** [acetate@0.3.0](https://github.com/patrickarlt/acetate/releases/tag/v0.3.0) is now required.
- **BREAKING** * `server` and `watcher` options are deprecated. Now pass the `mode` option with a value of `'server'` `'watch' or `'build'`.

## [0.2.0] - 2015-04-25

### Changed
- **BREAKING** [acetate@0.2.0](https://github.com/patrickarlt/acetate/releases/tag/v0.2.0) is now required.
- **BREAKING** the `config` key in the target is no longer required. If you have a custom configuration file specify config in the `options`
- The `clean` option has been removed since it did not operate how most people would expect and other cleaning options exist

## [0.1.0] - 2015-04-17

### Changed
- **BREAKING** [acetate@0.1.0](https://github.com/patrickarlt/acetate/releases/tag/v0.1.0) is now required

## 0.0.14 - 2015-04-13

### Fixed
- Bug with config file path

[0.1.0]: https://github.com/patrickarlt/grunt-acetate/compare/d1dfaaf076e60c8498e282ddb009a5bf401d5593...v0.1.0
[0.2.0]: https://github.com/patrickarlt/grunt-acetate/compare/v0.1.0...v0.2.0
