/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class BoardingPassContract extends Contract {

  async boardingPassExists(ctx, boardingPassId) {
    const buffer = await ctx.stub.getState(boardingPassId);
    return (!!buffer && buffer.length > 0);
  }

  async createBoardingPass(ctx, boardingPassId, value) {
    const exists = await this.boardingPassExists(ctx, boardingPassId);
    if (exists) {
      throw new Error(`The boarding pass ${boardingPassId} already exists`);
    }
    const asset = { value };
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(boardingPassId, buffer);
  }

  async readBoardingPass(ctx, boardingPassId) {
    const exists = await this.boardingPassExists(ctx, boardingPassId);
    if (!exists) {
      throw new Error(`The boarding pass ${boardingPassId} does not exist`);
    }
    const buffer = await ctx.stub.getState(boardingPassId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }

  async updateBoardingPass(ctx, boardingPassId, newValue) {
    const exists = await this.boardingPassExists(ctx, boardingPassId);
    if (!exists) {
      throw new Error(`The boarding pass ${boardingPassId} does not exist`);
    }
    const asset = { value: newValue };
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(boardingPassId, buffer);
  }

  async deleteBoardingPass(ctx, boardingPassId) {
    const exists = await this.boardingPassExists(ctx, boardingPassId);
    if (!exists) {
      throw new Error(`The boarding pass ${boardingPassId} does not exist`);
    }
    await ctx.stub.deleteState(boardingPassId);
  }

}

module.exports = BoardingPassContract;
