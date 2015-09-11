var koa = require('koa');
var serve = require('koa-static');
var json = require('koa-json');
var router = require('koa-router')();
var mongo = require('koa-mongo');

var app = koa();

app.use(serve(__dirname));
app.use(json());

app.use(mongo({
  uri: 'mongodb://localhost:27017/thai',
  max: 100,
  min: 1,
  timeout: 30000,
  log: false
}));

router.get('/words.json', function *(){
  this.body = yield this.mongo.db('thai').collection('words').find().toArray()
});
app.use(router.routes());
//app.use(function *(){
  //this.body = yield this.mongo.db('thai').collection('words').find().toArray()
//});

app.listen(3000);
