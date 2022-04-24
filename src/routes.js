const express = require('express');

const AlunoRouter = require('./routes/Aluno');
const AssuntoRouter = require('./routes/Assunto');

const router = express.Router();

router.use('/alunos', AlunoRouter);
router.use('/assuntos', AssuntoRouter);

module.exports = router;