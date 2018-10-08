/**
 * Tus Client CLI.
 * A command line based Tus.io protocol client
 * 
 * @author Alessio Vertemati <alessio@oneofftech.xyz>
 */
/* global process */
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
    });

program.
    command('upload <file> <server>').
    description('Upload a <file> to the Tus <server>').
    option('--meta [data]', 'Add a custom metadata to the upload. Is a key value map comma separated, e.g. "token=hello,request_id=counter"').
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
