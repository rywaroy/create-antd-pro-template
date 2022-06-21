const Router = require('koa-router');
const createController = require('../controller/create');

const router = new Router();

router.post('/project', createController.project);

module.exports = router;
