const lendData = require('./data/lend.json');
const err = require('./data/err.json');

/**
 * @description: 设置延时，可用来测试接口超时
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  'GET /api/lend/v2/trial': async (req, res) => {
    await wait(1000);
    res.status(200);
    res.send({
      ...lendData,
    });
    // res.status(500);
    // res.send(err);
  },
}