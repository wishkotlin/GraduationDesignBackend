/**
 * 主要功能是处理今日热点
 * @since 2020/03/12
 */
const Axios = require('axios')
const Cheerio = require('cheerio');
const vm = require('vm');
const process = require('process');
const fs = require('fs-extra')


const url = 'http://m.cnxox.com/';
async function getData(){
    let response = await Axios.get(url);
    let html = await response.data;
    let $ = Cheerio.load(html);
    let obj = []
  //   document.querySelector('.content').querySelectorAll('.excerpt-one').forEach(item => {
  //     const href = item.querySelector('h2 a').href
  //     const title = item.querySelector('h2 a').title
  //     const content = item.querySelector('.note').innerHTML
  //     const img = item.querySelector('.focus .thumb-span img').src
  //     obj.push({href,title,content,img})
  // })
    $('.content .excerpt-one').each((i,item) => {
        let temp = Cheerio.load(item)
        const href = temp('h2 a').attr('href')
        const title = temp('h2 a').attr('title')
        const content = temp('.note').text()
        const img = temp('.focus .thumb').attr('data-original')
        obj.push({href,title,content,img})
    })
    return obj
}

async function main(){
    let data = await getData()||{};
    console.log(data);
    try {
        let cache = await fs.readJSON('data/funny.json');
        if(cache){
            let keys = Object.keys(cache);
            for(let i = 0; i < keys.length; i++){
                let key = keys[i];
                //测试中发现数据源可能会产生丢失部分数据的问题，如果缺少某项数据，复用缓存数据
                data[key] = data[key] || cache[key];
            }
        }  
    } catch (error) {
        console.log(error);
    }
    await fs.writeJSON('data/funny.json',data)//保存数据
    // try {
    //     await CountryMap.getCountryMap();//更新全国分布地区
    // } catch (error) {
    //     console.log(error);
    // }
}

main().catch((error) => {
    console.log(error);
    process.exit();
});