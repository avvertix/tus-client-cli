# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/0.3.0/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.3.0] - 2018-10-08

### Changed

- Chunk size calculation, now is 5MB or 1/10th of the file, if bigger than 5MB

## [0.2.0] - 2017-09-06

### Fixed

- File size is now transferred as string in the tus headers

### Changed

- Chunk size changed to `size_of_video/50`

## [0.1.1] - 2017-08-30

### Fixed 

- Restore mime type package in the final executable

## [0.1.0] - 2017-08-30

### Added

- Upload command for file upload to a Tus.io server
