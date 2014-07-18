"use strict";
let Hapi = require("co-hapi");
let supertest = require("co-supertest");
describe("models", function(){
  let server;
  before(function*(){
    server = Hapi.createServer("localhost", 3001);
    yield server.pack.register(require(".."));
  });
  describe("models.register", function(){
    it("should be part of server.methods", function*(){
      (typeof server.methods.models.register === "function").should.be.true;
    });

    it("should register 1 or some models in collection", function*(){
      yield server.methods.models.register("model1", {});
      yield server.methods.models.register({
        "model2": {},
        "model3": {}
      });
      let models = server.plugins["co-hapi-models"].models;
      models.model1.should.be.ok;
      models.model2.should.be.ok;
      models.model3.should.be.ok;
    });
  });
  describe("models.get", function(){
    it("should be part of server.methods", function*(){
      (typeof server.methods.models.get === "function").should.be.true;
    });

    it("should return model by name or all models", function*(){
      yield server.methods.models.register({
        "model1": {name: "model1"},
        "model2": {name: "model2"},
        "model3": {name: "model3"}
      });
      let model = yield server.methods.models.get("model1");
      model.name.should.equal("model1");
      let models = yield server.methods.models.get();
      Object.keys(models).length.should.equal(3);
      (!!(yield server.methods.models.get("unknown_model"))).should.be.false;
    });
  });
  describe("request.models", function(){
    it("should provide access to models from any request", function*(){
      yield server.methods.models.register({
        "model1": {name: "model1"},
        "model2": {name: "model2"},
        "model3": {name: "model3"}
      });
      server.route({
        method: "GET",
        path: "/",
        handler: function*(request){
          request.models.should.be.ok;
          request.models.model1.name.should.equal("model1");
          return "";
        }
      });
      yield server.start();
      try{
        yield supertest(server.listener).get("/").expect(200).end();
      }
      finally{
        yield server.stop();
      }
    });
  });
});
