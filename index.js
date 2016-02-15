'use strict';

/*
*   Only our entry point needs to use the 'require' pattern
*   Everything after babel-register will be able to use ES6!
*/
require("babel-register");
require('./app');
