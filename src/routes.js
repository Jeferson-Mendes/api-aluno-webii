const express = require('express');

const AlunoRouter = require('./routes/Aluno');
const AssuntoRouter = require('./routes/Assunto');
const EncontroRouter = require('./routes/Encontro');

const router = express.Router();

router.use('/alunos', AlunoRouter);
router.use('/assuntos', AssuntoRouter);
router.use('/encontros', EncontroRouter);

module.exports = router;