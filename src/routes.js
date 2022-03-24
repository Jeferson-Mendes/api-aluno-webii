const express = require('express');

const AlunoRouter = require('./routes/Aluno');

const router = express.Router();

router.use('/alunos', AlunoRouter);

module.exports = router;