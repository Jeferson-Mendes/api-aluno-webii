const { initDatabase } = require('../database/index');
const client = initDatabase();


module.exports = {
    async list(req, res) {
        client.query('SELECT * FROM encontros', (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }
            return res.json({ assuntos: result.rows, status: 200 });
        })
    },

    async create(req, res) {
        const { data, assunto_id } = req.body;

    client.query(`INSERT INTO encontros (data, assunto_id)
    VALUES ('${data}', ${assunto_id})`, (err, result) => {
        if(err) {
            if(err.code === '22008') {
                return res.status(401).json({message:'Formato da data inválida. YYYY/MM/DD'});    
            }
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        return res.json({
            assuntos: result.rows[0],
            message: 'Encontro registrado com sucesso.',
            status: 200
        })
    })
    },

    async detail(req, res) {
        const { id } = req.params;
    client.query(`select * from (select enc.id, enc.data, enc.assunto_id, alunos.nome as aluno_nome, alunos.curso, alunos.email, alunos.semestre from (SELECT encontros.id as id, encontros.assunto_id, encontros.data, aluno_encontro.aluno_id FROM
                (SELECT * FROM encontros WHERE id=${id}) as encontros
                INNER JOIN aluno_encontro ON encontros.id=aluno_encontro.encontro_id) as enc
                inner join alunos on enc.aluno_id=alunos.id) as e inner join assuntos as assunto on e.assunto_id=assunto.id`, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        const encontro = result.rows.map(encontro => ({
            id: encontro.id,
			data: encontro.data,
			assunto_id: encontro.assunto_id
        }))

        const assunto = {
            nome: result.rows[0].nome,
			grau_dificuldade: result.rows[0].grau_dificuldade,
			tempo_necessario: result.rows[0].tempo_necessario,
        }

        const encontroUser = result.rows.map(encontro => ({
            nome: encontro.aluno_nome,
			curso: encontro.curso,
			email: encontro.email,
			semestre: encontro.semestre,
        }))

        const serializedUser = Object.assign(encontro[0], { assunto: assunto }, { alunos: encontroUser })

        return res.json({ encontro: serializedUser, status: 200 })
    })
    },

    async update(req, res) {
        const { id } = req.params;
        const { data, assunto_id } = req.body;
       
        client.query(`UPDATE encontros SET data='${data}', assunto_id=${assunto_id} WHERE id=${id}`, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }

            return res.json({ encontro: result.rows[0], message: 'Encontro atualizado com sucesso.', status: 200 })
        })
        },

        async delete(req, res) {
            const { id } = req.params;

            client.query(`DELETE FROM encontros WHERE id=${id}`, (err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(401).json({message:'error running query'});
                }
    
                return res.json({ encontro: result.rows[0], message: 'Encontro removido com sucesso.', status: 200 })
            })
        },

        async addAlunoToEncontro(req, res) {
            const { aluno_id, encontro_id } = req.body;

            client.query(`INSERT INTO aluno_encontro (aluno_id, encontro_id) VALUES(${aluno_id}, ${encontro_id})`, (err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(401).json({ message: 'error running query' });
                }

                return res.json({ aluno_encontro: result.rows[0], message: 'Aluno incluso no encontro com sucesso.', status: 200 });
            })
        }
}