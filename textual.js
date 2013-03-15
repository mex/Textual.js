
// textual.js
// version : 0.1.0
// author : Michael Storgaard
// license : MIT

(function() {

    /************************************
     Constants
     ************************************/

    var textual,
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

    // constants
    textual.PAD_BOTH = 'both';
    textual.PAD_LEFT = 'left';
    textual.PAD_RIGHT = 'right';

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
            return this._s + value;
        },

        prepend: function(value) {
            return value + this._s;
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
            if (begin < 0) {
                begin += this._s.length;
            }
            if (length) {
                if (length >= 0) {
                    length += begin;
                } else {
                    length += this._s.length;
                }
            }
            if (length < begin) {
                return false;
            }
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

        _replace: function(str, from, to) {
            while (str.indexOf(from) != -1) {
                str = str.replace(from, to);
            }
            return str;
        },

        replace: function(from, to) {
            if (Array.isArray(from)) {
                if (Array.isArray(to)) {
                    if (from.length != to.length) {
                        return this._s;
                    }
                }
                var str = this._s;
                for (var i = 0; i < from.length; i++) {
                    if (Array.isArray(to)) {
                        str = this._replace(str, from[i], to[i]);
                    } else {
                        str = this._replace(str, from[i], to);
                    }
                }
                return str;
            } else if (Array.isArray(to)) {
                return this._s;
            } else {
                return this._replace(this._s, from, to);
            }
        },

        _pad: function(length, string) {
            var str = '';
            for (var i = 0; i < length; i += string.length) {
                str += string;
            }
            return str.substring(0, length);
        },

        pad: function(length, string, type) {
            if (length <= this._s.length) {
                return this._s;
            }
            if (!string) {
                string = ' ';
            }
            var left = 0, right = 0;
            length -= this._s.length;
            if (type == 'left') {
                left = length;
            } else if (type == 'both') {
                left = Math.floor(length / 2);
                right = Math.ceil(length / 2);
            } else {
                right = length;
            }
            return this._pad(left, string) + this._s + this._pad(right, string);
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