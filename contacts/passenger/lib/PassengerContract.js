/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const Passenger = require('./Passenger')

class PassengerContract extends Contract {

  async passengerExists(ctx, passengerId) {
    const buffer = await ctx.stub.getState(passengerId);
    return (!!buffer && buffer.length > 0);
  }

  async createPassenger(ctx, args) {
    const passenger = Passenger.fromJson(args)
    const buffer = Buffer.from(passenger.toJsonString);
    await ctx.stub.putState(passenger.id, buffer);
  }

  async readPassenger(ctx, passengerId) {
    const exists = await this.passengerExists(ctx, passengerId);
    if (!exists) {
      throw new Error(`The passenger ${passengerId} does not exist`);
    }
    const buffer = await ctx.stub.getState(passengerId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }

  async updatePassenger(ctx, passengerId, newValue) {
    const exists = await this.passengerExists(ctx, passengerId);
    if (!exists) {
      throw new Error(`The passenger ${passengerId} does not exist`);
    }
    const asset = { value: newValue };
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(passengerId, buffer);
  }

  async deletePassenger(ctx, passengerId) {
    const exists = await this.passengerExists(ctx, passengerId);
    if (!exists) {
      throw new Error(`The passenger ${passengerId} does not exist`);
    }
    await ctx.stub.deleteState(passengerId);
  }

}

module.exports = PassengerContract;
