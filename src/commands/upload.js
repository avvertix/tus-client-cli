/*eslint no-div-regex: "off"*/
'use strict';

const Log = require('../helpers/log');
const path = require('path');
const fs = require('fs');
const tus = require("tus-js-client");
const mime = require('mime');
const assignIn = require('lodash.assignin');


/**
 * Convert the expected meta option format into an object.
 * 
 * The meta options are key-values pair separated by a comma, like "key=value,key2=value2"
 * 
 * @param {string} data the string containing the metadata, in the form of key=value,key2=value2,...
 * @return {Object} the converted key/value pairs
 */
function metaToObject(data){

    if(data.length === 0){
        return {};
    }

    var obj = {};

    data.
        split(/,/).
        map(function(v){
            var split = v.split(/=/);
            if(split.length !== 2){
                return null;
            }

            return split;
        }).
        forEach(function(v){

            if(v!==null){
                obj[v[0]] = v[1];
            }

        });

    return obj;
}

/**
 * Upload a file to a server via the Tus.io protocol
 * 
 * @param {string} file the file to upload
 * @param {string} server the Tus server endpoint
 * @param {Object} command the command being executed (e.g. to get options)
 * @return {void}
 */
module.exports = function(file, server, command){
    
    try {

        var metaOption = metaToObject(command.meta || "");
        
        if(!fs.existsSync(file)){
            throw new Error(`File ${file} do not exists`);
        }

        var fileStream = fs.createReadStream(file);
        
        var meta = assignIn({
            filename: path.basename(file),
            filesize: "" + fs.statSync(file).size.toString(),
            filetype: mime.lookup(file),
            upload_request_id: "request-" + (new Date()).getTime(),
        }, metaOption);

        Log.comment('Uploading', `${meta.filename} (${meta.filetype}, ${meta.filesize})`, 'to', server, '...');
        
        var options = {
            endpoint: server,
            retryDelays: [0, 1000/*, 3000, 5000*/],
            chunkSize: Math.max(1000, Math.round(meta.filesize/10)),
            uploadSize: meta.filesize,
            metadata: meta,
            onError: function(error) {
                Log.error('upload failed:', error.message);
                
                fileStream.close();
            },
            onChunkComplete: function(chunkSize, bytesUploaded, bytesTotal) {
                var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                Log.info(`${bytesUploaded} / ${bytesTotal}`, percentage + "%");
            },
            onSuccess: function() {
                Log.success('Upload completed.');
                
                fileStream.close();
                
            }
        }
        
        var upload = new tus.Upload(fileStream, options);
        
        upload.start();
        
    }
    catch (error) {
        Log.error(error.message);
    }

}
