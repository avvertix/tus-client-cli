#!/usr/bin/env node
'use strict';

const program = require('commander');
const Log = require('./helpers/log');
const Package = require('../package.json');

// commands
const UploadCommand = require('./commands/upload');

program.version(Package.version).
    on('--help', function() {
        // add the what's new section to the --help output
        Log.comment('  What\'s new in', program.version(), ':');
        Log.comment();
        Log.comment('   - Changed chunk size handling');
        Log.comment();
        Log.comment('   - Allow custom headers');
        Log.comment();
    });

program.
    command('upload <file> <server>').
    description('Upload a <file> to the Tus <server>').
    option('--meta [data]', 'Add a custom metadata to the upload. Is a key value map comma separated, e.g. "token=hello,request_id=counter"').
    option('--headers [data]', 'Add a custom headers to the requests. Is a key value map comma separated, e.g. "authorization=bearer token,x-foo=bar"').
    action(UploadCommand).
    on('--help', function() {
        Log.text('  Arguments:');
        Log.text();
        Log.text('    <file> the file to upload (required)');
        Log.text('    <server> the Tus server endpoint (required)');
        Log.text();
    });

program.parse(process.argv);

// output the help if no command is specified
if (!program.args.length) program.help();
