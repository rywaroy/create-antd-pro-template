const Router = require('koa-router');
const create = require('./create');

const router = new Router();

// router.get('*', async (ctx, next) => {
//     if (ctx.response.status === 404 && ctx.request.path.indexOf('api') === -1) {
//         ctx.response.redirect('/');
//     } else {
//         next();
//     }
// });

router.use('/api/create', create.routes());

module.exports = router;
