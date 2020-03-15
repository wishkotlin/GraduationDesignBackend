'use strict';
const AbstractController = require('./abstract');
const fs = require('fs-extra');

class GetSource extends AbstractController {
  async funny(params) {
    try {
      const r = await fs.readJSON('data/funny.json');
      const { origin } = this.ctx.request.header
      this.ctx.response.set('Access-Control-Allow-Origin', origin);
      this.ctx.body = r;
    } catch (error) {
      return this.serverError(error);
    }
  }
  async hot() {
    try {
      const r = await fs.readJSON('data/hot.json');
      const { origin } = this.ctx.request.header
      this.ctx.response.set('Access-Control-Allow-Origin', origin);
      this.ctx.body = r;
    } catch (error) {
      return this.serverError(error);
    }
  }
  async zhihu() {
    try {
      const r = await fs.readJSON('data/zhihu.json');
      const { origin } = this.ctx.request.header
      this.ctx.response.set('Access-Control-Allow-Origin', origin);
      this.ctx.body = r;
    } catch (error) {
      return this.serverError(error);
    }
  }
}

module.exports = GetSource;
