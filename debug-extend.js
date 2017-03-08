'use strict'

var Debug = require('debug')

//Level select
var level = 5
Debug.level = function(n){
    level = Math.min(5,Math.max(0,n|0))
}

//Initial defined level
//Detect if we are using debug in browser
if (Debug.storage) {
    try {
        var userLevel = Debug.storage.getItem('debug-level')
        if (userLevel){
            Debug.level(userLevel)
        }
    } catch(e) {}
}else{
    if (process.env.DEBUG_LEVEL){
        Debug.level(process.env.DEBUG_LEVEL)
    }
}


//Filter legacy debug as level 4
var _log = Debug.log
Debug.log = function(){
    if (level < 4 && !/(ERROR|WARN|INFO|VERBOSE)(%c|$)/.test(arguments[0]) )
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
    args.unshift('ERROR')
    if (level>=1)
        this.apply(this,args)
}

function _warn(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift('WARN')
    if (level>=2)
        this.apply(this,args)
}

function _info(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift('INFO')
    if (level>=3)
        this.apply(this,args)
}

function _verbose(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift('VERBOSE')
    if (level>=5)
        this.apply(this,args)
}



module.exports = Debug