/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PassengerContract } = require('..');
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

describe('PassengerContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PassengerContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"passenger 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"passenger 1002 value"}'));
    });

    describe('#passengerExists', () => {

        it('should return true for a passenger', async () => {
            await contract.passengerExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a passenger that does not exist', async () => {
            await contract.passengerExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPassenger', () => {

        it('should create a passenger', async () => {
            await contract.createPassenger(ctx, '1003', 'passenger 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"passenger 1003 value"}'));
        });

        it('should throw an error for a passenger that already exists', async () => {
            await contract.createPassenger(ctx, '1001', 'myvalue').should.be.rejectedWith(/The passenger 1001 already exists/);
        });

    });

    describe('#readPassenger', () => {

        it('should return a passenger', async () => {
            await contract.readPassenger(ctx, '1001').should.eventually.deep.equal({ value: 'passenger 1001 value' });
        });

        it('should throw an error for a passenger that does not exist', async () => {
            await contract.readPassenger(ctx, '1003').should.be.rejectedWith(/The passenger 1003 does not exist/);
        });

    });

    describe('#updatePassenger', () => {

        it('should update a passenger', async () => {
            await contract.updatePassenger(ctx, '1001', 'passenger 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"passenger 1001 new value"}'));
        });

        it('should throw an error for a passenger that does not exist', async () => {
            await contract.updatePassenger(ctx, '1003', 'passenger 1003 new value').should.be.rejectedWith(/The passenger 1003 does not exist/);
        });

    });

    describe('#deletePassenger', () => {

        it('should delete a passenger', async () => {
            await contract.deletePassenger(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a passenger that does not exist', async () => {
            await contract.deletePassenger(ctx, '1003').should.be.rejectedWith(/The passenger 1003 does not exist/);
        });

    });

});