/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { BoardingPassContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

  constructor() {
    this.stub = sinon.createStubInstance(ChaincodeStub);
    this.clientIdentity = sinon.createStubInstance(ClientIdentity);
    this.logging = {
      getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
      setLevel: sinon.stub(),
    };
  }

}

describe('BoardingPassContract', () => {

  let contract;
  let ctx;

  beforeEach(() => {
    contract = new BoardingPassContract();
    ctx = new TestContext();
    ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"boarding pass 1001 value"}'));
    ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"boarding pass 1002 value"}'));
  });

  describe('#boardingPassExists', () => {

    it('should return true for a boarding pass', async () => {
      await contract.boardingPassExists(ctx, '1001').should.eventually.be.true;
    });

    it('should return false for a boarding pass that does not exist', async () => {
      await contract.boardingPassExists(ctx, '1003').should.eventually.be.false;
    });

  });

  describe('#createBoardingPass', () => {

    it('should create a boarding pass', async () => {
      await contract.createBoardingPass(ctx, '1003', 'boarding pass 1003 value');
      ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"boarding pass 1003 value"}'));
    });

    it('should throw an error for a boarding pass that already exists', async () => {
      await contract.createBoardingPass(ctx, '1001', 'myvalue').should.be.rejectedWith(/The boarding pass 1001 already exists/);
    });

  });

  describe('#readBoardingPass', () => {

    it('should return a boarding pass', async () => {
      await contract.readBoardingPass(ctx, '1001').should.eventually.deep.equal({ value: 'boarding pass 1001 value' });
    });

    it('should throw an error for a boarding pass that does not exist', async () => {
      await contract.readBoardingPass(ctx, '1003').should.be.rejectedWith(/The boarding pass 1003 does not exist/);
    });

  });

  describe('#updateBoardingPass', () => {

    it('should update a boarding pass', async () => {
      await contract.updateBoardingPass(ctx, '1001', 'boarding pass 1001 new value');
      ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"boarding pass 1001 new value"}'));
    });

    it('should throw an error for a boarding pass that does not exist', async () => {
      await contract.updateBoardingPass(ctx, '1003', 'boarding pass 1003 new value').should.be.rejectedWith(/The boarding pass 1003 does not exist/);
    });

  });

  describe('#deleteBoardingPass', () => {

    it('should delete a boarding pass', async () => {
      await contract.deleteBoardingPass(ctx, '1001');
      ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
    });

    it('should throw an error for a boarding pass that does not exist', async () => {
      await contract.deleteBoardingPass(ctx, '1003').should.be.rejectedWith(/The boarding pass 1003 does not exist/);
    });

  });

});