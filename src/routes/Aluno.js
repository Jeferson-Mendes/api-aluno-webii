const { Router } = require('express');
const AlunoController = require('../controllers/AlunoController');
const authMiddleware = require('../middlewares/auth');

const AlunoRouter = Router();

AlunoRouter.get('/', AlunoController.list)
AlunoRouter.get('/:id', AlunoController.detail)
AlunoRouter.put('/atualizar/:id',authMiddleware, AlunoController.update)
AlunoRouter.post('/', AlunoController.create)
AlunoRouter.delete('/excluir/:id',authMiddleware, AlunoController.delete)

AlunoRouter.post('/login', AlunoController.login)

module.exports = AlunoRouter;