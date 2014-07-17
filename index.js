"use strict";
let path = require("path");
module.exports.register = function*(plugin){
  let models = {};
  plugin.ext("onRequest", function*(request){
    request.models = models;
  });
  plugin.expose("models", models);
  plugin.method("models.get", function*(name){
    if(!name){
      return models;
    }
    else{
      return models[name];
    }
  });
  plugin.method("models.register", function*(name, model){
    if(typeof name === "string"){
      models[name] = model;
    }
    else if(typeof name === "object"){
      for(let n in name){
        models[n] = name[n];
      }
    }
  });
};

module.exports.register.attributes = {
  pkg: require("./package.json")
};