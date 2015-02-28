var chai = require('chai');
var should = chai.should();
var Subscribe = require('../models/Subscribe');

describe('Subscribe Model', function() {
  it('should create a new subscription', function(done) {
    var subscription = new Subscribe({
      email: 'test@gmail.com'
    });
    subscription.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should not create a subscription with the unique email', function(done) {
    var subscription = new Subscribe({
      email: 'test@gmail.com',
      password: 'password'
    });
    subscription.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find subscription by email', function(done) {
    Subscribe.findOne({ email: 'test@gmail.com' }, function(err, subscription) {
      if (err) return done(err);
      subscription.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a subscription', function(done) {
    Subscribe.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});