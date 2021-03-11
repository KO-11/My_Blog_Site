const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const BlueBird = require('bluebird');

chai.use(chaiHttp);

describe('blog server', () => {

  it('should return index.html file', async () => {
      const response = await chai.request('http://localhost:3000').get('/')
      response.should.have.status(200);
      response.type.should.eql('text/html');
  });

});