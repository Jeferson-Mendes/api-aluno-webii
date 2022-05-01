const { Router } = require('express');
const AssuntoController = require('../controllers/AssuntoController');
const authMiddleware = require('../middlewares/auth');

const AssuntoRouter = Router();

AssuntoRouter.get('/', AssuntoController.list)
AssuntoRouter.get('/:id', AssuntoController.detail)
AssuntoRouter.put('/atualizar/:id', authMiddleware, AssuntoController.update)
AssuntoRouter.post('/', authMiddleware, AssuntoController.create)
AssuntoRouter.delete('/excluir/:id', authMiddleware, AssuntoController.delete)


module.exports = AssuntoRouter;