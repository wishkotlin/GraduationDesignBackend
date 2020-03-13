'use strict';
const AbstractController = require('./abstract');

class OneService extends AbstractController {
  async proxyOneRequest() {
    const { url } = this.ctx.query;
    if (!url) return this.paramsError();
    try {
      const r = await this.ctx.service.one.proxyOneRequest(url);
      const { origin } = this.ctx.request.header
      this.ctx.response.set('Access-Control-Allow-Origin', origin);
      this.ctx.body = r;
    } catch (error) {
      return this.serverError(error);
    }
  }
  async usePost() {
    const { url } = this.ctx.request.body;
    if (!url) return this.paramsError();
    try {
      const r = await this.ctx.service.one.proxyOneRequest(url);
      this.ctx.body = r;
    } catch (error) {
      return this.serverError(error);
    }
  }
  async proxyDaily() {
    
    const { url } = this.ctx.request.body;
    
    if (!url) return this.paramsError();
    try {
      const r = await this.ctx.service.one.proxyDaily(url);
      this.ctx.body = r;
      const { origin } = this.ctx.request.header
      this.ctx.response.set('Access-Control-Allow-Origin', origin);
    } catch (error) {
      return this.serverError(error);
    }
  }
  async activation() {
    const data = this.ctx.request.body;
    console.log(data);
    let msg = ['激活码不存在', '激活码已被使用', '激活码已过期', '激活失败']
    let i = Math.floor(Math.random() * 4)
    const success = {
      msg: '激活成功',
      name: data.name,
      success: true
    }
    const err = {
      msg: msg[i],
      name: data.name,
      success: false
    }
    const r = [success, err]
    const index = Math.round(Math.random() * 1)
    this.ctx.body = r[index];
  }
}

module.exports = OneService;
