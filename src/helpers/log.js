/* eslint no-console: 0 */
'use strict';

const clc = require('cli-color');

/**
 * Log module
 */
module.exports = {

    /**
     * Write text in bright yellow
     * 
     * @return {void}
     */
    comment: function(...args){

        var txt = args.map(function (el) {
            return clc.yellowBright(el);
        })

        console.log(txt.join(" "));
    },
    
    /**
     * Write a warning message.
     * 
     * @return {void}
     */
    warning: function(...args){

        var txt = args.map(function (el) {
            return clc.yellowBright(el);
        })

        console.log(txt.join(" "));
    },
    
    /**
     * Writes an informational message on stdout
     * 
     * @return {void}
     */
    info: function(...args){

        console.log(args.join(" "));
    },
    
    /**
     * Writes a text, without formatting on stdout
     * 
     * @return {void}
     */
    text: function(...args){

        console.log(args.join(" "));
    },

    /**
     * Write an error message on stderr. By default text is colored in red
     * 
     * @return {void}
     */
    error: function(...args){

        var txt = args.map(function (el) {
            return clc.red(el);
        })

        console.error(txt.join(" "));
    },
    
    /**
     * Write a success message. The selected color is green
     * 
     * @return {void}
     */
    success: function(...args){

        var txt = args.map(function (el) {
            return clc.green(el);
        })

        console.log(txt.join(" "));
    }
    
};

