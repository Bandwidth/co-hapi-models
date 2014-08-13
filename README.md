models
===========
[![Build](https://travis-ci.org/bandwidthcom/co-hapi-models.png)](https://travis-ci.org/bandwidthcom/co-hapi-models)
[![Dependencies](https://david-dm.org/bandwidthcom/co-hapi-models.png)](https://david-dm.org/bandwidthcom/co-hapi-models)

This is hapi plugins which adds collections `models` to each request. Use server method `server.methods.models.register(name, model)` to add model to such collection.
Use `yield server.methods.models.get()` or `yield server.methods.models.get("modelName")` to get all models or specified by name. Also you can get all models as `server.plugins["co-hapi-models"].models`.

You can use `request.models` from request handlers.

## Dependencies

Module `co-hapi` is required to use this plugin.
Node 0.11+ should be used with --harmony switch.
