const { Router } = require('express');
const AssuntoController = require('../controllers/AssuntoController');
const authMiddleware = require('../middlewares/auth');

const AssuntoRouter = Router();

AssuntoRouter.use(authMiddleware);

AssuntoRouter.get('/', AssuntoController.list)
AssuntoRouter.get('/:id', AssuntoController.detail)
AssuntoRouter.put('/atualizar/:id', AssuntoController.update)
AssuntoRouter.post('/', AssuntoController.create)
AssuntoRouter.delete('/excluir/:id', AssuntoController.delete)


module.exports = AssuntoRouter;