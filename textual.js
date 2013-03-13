
// textual.js
// version : 0.1.0
// author : Michael Storgaard
// license : MIT

(function() {

    /************************************
     Constants
     ************************************/

    var numeral,
        VERSION = '0.1.0',
    // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
     Constructors
     ************************************/

    // Textual prototype object
    function Textual(string) {
        this._s = string;
    }

    /************************************
     Top Level Functions
     ************************************/

    var textual = function(string) {
        return new Textual(string);
    };

    // version number
    textual.version = VERSION;

    /************************************
     Helpers
     ************************************/



    /************************************
     Textual Prototype
     ************************************/


    textual.fn = Textual.prototype = {

        clone: function() {
            return textual(this._s);
        },

        toString: function() {
            return this._s;
        },

        append: function(value) {
            this._s = this._s + value;
        },

        prepend: function(value) {
            this._s = value + this._s;
        },

        length: function() {
            return this._s.length;
        },

        equals: function(value, ignoreCase) {
            if (ignoreCase) {
                return this._s.toLowerCase() == value.toLowerCase();
            }
            return this._s == value;
        },

        isEmpty: function() {
            return this._s.isEmpty();
        },

        split: function(value) {
            return this._s.split(value);
        },

        startsWith: function(value) {
            return this._s.substring(0, value.length) == value;
        },

        endsWith: function(value) {
            return this._s.substring(this._s.length - value.length) == value;
        },

        trim: function() {
            return this._s.trim();
        },

        substring: function(begin, length) {
            return this._s.substring(begin, length);
        },

        substr: function(begin, length) {
            return this.substring(begin, length);
        },

        toUpperCase: function() {
            return this._s.toLocaleUpperCase();
        },

        toLowerCase: function() {
            return this._s.toLocaleLowerCase();
        },

        replace: function(from, to) {
            while (this._s.indexOf(from) != -1) {
                this._s = this._s.replace(from, to);
            }
            return this._s;
        }

    };

    /************************************
     Exposing Numeral
     ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `textual` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['textual'] = textual;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return textual;
        });
    }
}).call(this); 