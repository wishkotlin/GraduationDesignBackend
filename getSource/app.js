const funny = require('./funny');
const hot = require('./hot');

async function main(params) {
  try {
    await funny()
    await hot()
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

main()
