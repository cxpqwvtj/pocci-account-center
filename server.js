'use strict';
var koa = require('koa');

var logger = require('koa-logger');
var serve = require('koa-static');
var router = require('koa-router')();
var user = require('./controllers/user');
var bodyParser = require('koa-body-parser');

var app = module.exports = koa();

router
  .post(`${process.env.APP_BASE_URL}/search`, user.search)
  .post(`${process.env.APP_BASE_URL}/login`, user.login)
  .post(`${process.env.APP_BASE_URL}/save`, user.save)
  .post(`${process.env.APP_BASE_URL}/del`, user.del);

app
  .use(logger())
  .use(bodyParser())
  .use(serve('public'))
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(process.env.USER_APP_PORT || 9898);
}
