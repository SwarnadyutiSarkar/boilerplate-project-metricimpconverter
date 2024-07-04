const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // Test 1: Convert a valid input such as 10L: GET request to /api/convert.
  test('Convert a valid input such as 10L', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnUnit, 'gal');
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        done();
      });
  });

  // Test 2: Convert an invalid input such as 32g: GET request to /api/convert.
  test('Convert an invalid input such as 32g', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  // Test 3: Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  test('Convert an invalid number such as 3/7.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  // Test 4: Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  // Test 5: Convert with no number such as kg: GET request to /api/convert.
  test('Convert with no number such as kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnUnit, 'lbs');
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        done();
      });
  });
});
