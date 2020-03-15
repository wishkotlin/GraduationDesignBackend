const funny = require('./funny');
const hot = require('./hot');
const zhihu = require('./zhihu');

async function main(params) {
  try {
    await funny()
    await hot()
    await zhihu()
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

main()
