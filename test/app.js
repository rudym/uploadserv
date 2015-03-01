var request = require('supertest');
var cheerio = require('cheerio');
var app = require('../app.js');


describe('GET /', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('POST /subscribe', function() {
  it('should subscribe', function(done) {
    request(app)
      .get('/')
      .end(function(err, res){
        $ = cheerio.load(res.text);
        var csrf = $('input[name=_csrf]').val();
        
        request(app)
          .post('/subscribe')
          .set('cookie', res.headers['set-cookie'])
          .send({ 
            _csrf: csrf,
            email: 'test@email.com'
          })
          .expect(200, 'OK')
          .end(function(err, res){
            if(err) {
              done(err);
            } else {
              done();
            }
          });
      });
  });
});

/*describe('GET /login', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /api', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('GET /contact', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});*/

describe('GET /random-url', function() {
  it('should return 404', function(done) {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});