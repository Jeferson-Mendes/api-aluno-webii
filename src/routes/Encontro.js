const { Router } = require('express');
const EncontroController = require('../controllers/EncontroController');
const authMiddleware = require('../middlewares/auth');

const EcontroRouter = Router();


EcontroRouter.get('/', EncontroController.list)
EcontroRouter.get('/:id', EncontroController.detail)
EcontroRouter.put('/atualizar/:id', authMiddleware, EncontroController.update)
EcontroRouter.post('/', authMiddleware, EncontroController.create)
EcontroRouter.post('/add/aluno', authMiddleware, EncontroController.addAlunoToEncontro)

EcontroRouter.delete('/excluir/:id', authMiddleware, EncontroController.delete)


module.exports = EcontroRouter;