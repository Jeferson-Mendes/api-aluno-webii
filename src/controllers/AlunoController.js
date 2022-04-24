const { initDatabase } = require('../database/index');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const bcrypt = require('bcrypt');
const client = initDatabase();

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400 // one day
    })
}

module.exports = {
    async list(req, res) {
        client.query('SELECT * FROM alunos', (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }
            return res.json({ alunos: result.rows, status: 200 });
        })
    },

    async login(req, res) {
        const { email, senha } = req.body;

        client.query(`SELECT * FROM alunos WHERE email='${email}'`, async (err, result) => {
            if(err) {
                console.log(err)
                return res.status(400).json({ message: 'error running query' });
            }

            const aluno = result.rows[0]; 
            if(!aluno) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            const comparePassword = await bcrypt.compare(senha, aluno.senha);

            if (!comparePassword) {
                return res.status(404).json({ message: 'Senha inválida.' })
            }

            return res.json({
                aluno,
                token: generateToken({id: aluno.id, nome: aluno.nome}),
            })
            
        })
    },

    async create(req, res) {
        const { nome, curso, semestre, email, senha, telefone } = req.body;

        const hashPassword = await bcrypt.hash(senha, 10);

    client.query(`INSERT INTO alunos (nome, curso, semestre, email, senha, telefone)
    VALUES ('${nome}', '${curso}', ${semestre}, '${email}', '${hashPassword}', '${telefone}')`, (err, result) => {
        if(err) {
            if (err.code == '23505') {
                return res.status(401).json({error: 'error', message:'Email já está sendo utilizado.'}); 
            }
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        return res.json({
            aluno: result.rows[0],
            // token: generateToken({id: result.rows[0].id, nome: result.rows[0].nome}),
            message: 'Aluno registrado com sucesso.',
            status: 200
        })
    })
    },

    async detail(req, res) {
        const { id } = req.params;
    client.query(`SELECT * FROM alunos WHERE id=${id}`, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        return res.json({ aluno: result.rows[0], status: 200 })
    })
    },

    async update(req, res) {
        const { id } = req.params;
        const authAlunoId = req.alunoId;
        const { nome, curso, semestre, telefone } = req.body;

        if (Number(authAlunoId) !== Number(id)) {
            return res.status(401).json({message:'Usuário não tem permissão para acessar esse recurso.'});
        }
        client.query(`UPDATE alunos SET nome='${nome}', curso='${curso}', semestre=${semestre}, telefone='${telefone}' WHERE id=${id}`, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }

            return res.json({ aluno: result.rows[0], message: 'Aluno atualizado com sucesso.', status: 200 })
        })
        },

        async delete(req, res) {
            const { id } = req.params;
            const authAlunoId = req.alunoId;

            if (Number(authAlunoId) !== Number(id)) {
                return res.status(401).json({message:'Usuário não tem permissão para acessar esse recurso.'});
            }

            client.query(`DELETE FROM alunos WHERE id=${id}`, (err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(401).json({message:'error running query'});
                }
    
                return res.json({ aluno: result.rows[0], message: 'Aluno removido com sucesso.', status: 200 })
            })
        }
}