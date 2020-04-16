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

  async queryAll(ctx) {

    let queryString = {
      selector: {}
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }

  async queryWithQueryString(ctx, queryString) {

    console.log('query String');
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let res = await resultsIterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};

        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;

        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }

        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await resultsIterator.close();
        console.info(allResults);
        console.log(JSON.stringify(allResults));
        return JSON.stringify(allResults);
      }
    }
  }
}

module.exports = PassengerContract;
