'use strict'

var Debug = require('debug')

//Available levels
var levels = ['','ERROR','WARN','INFO','_DEBUG_','VERBOSE']

//Level select
var level = 5
Debug.level = function(n){
    level = Math.min(5,Math.max(0,n|0))
}

//Set level from env
if (process.env.DEBUG_LEVEL){
    Debug.level(process.env.DEBUG_LEVEL)
}


//Filter legacy debug as level 4
var _log = Debug.log
Debug.log = function(args){
    if (level < 4 && !/(ERROR|WARN|INFO|VERBOSE)$/.test(arguments[0]) )
        return
    _log.apply(this,arguments)
}

//Load new methods into init
var _init = Debug.init
Debug.init = function(debug){
    _init && _init(debug)
    initLevels(debug)
}


function initLevels(debug){
    debug.warn = _warn.bind(debug)
    debug.info = _info.bind(debug)
    debug.error = _error.bind(debug)
    debug.verbose = _verbose.bind(debug)
}

function _error(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift(levels[1])
    if (level>=1)
        this.apply(this,args)
}

function _warn(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift(levels[2])
    if (level>=2)
        this.apply(this,args)
}

function _info(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift(levels[3])
    if (level>=3)
        this.apply(this,args)
}

function _verbose(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift(levels[5])
    if (level>=5)
        this.apply(this,args)
}



module.exports = Debug