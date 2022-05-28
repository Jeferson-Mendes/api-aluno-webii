const { initDatabase } = require('../database/index');
const client = initDatabase();


module.exports = {
    async list(req, res) {
        const sql = `select encontros.id,
                            encontros.assunto_id,
                            encontros.data,
                            assuntos.nome,
                            assuntos.grau_dificuldade,
                            assuntos.tempo_necessario
                    from encontros
                    inner join assuntos ON encontros.assunto_id=assuntos.id`

        client.query(sql, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        return res.json({ encontros: result.rows, status: 200 })
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

        let alunos = [];
        const alunoSql = `select alunos.id as alunoId,
                alunos.nome,
                alunos.curso,
                alunos.semestre,
                alunos.email,
                alunos.telefone,
                aluno_encontro.encontro_id
                        from alunos
                        inner join aluno_encontro ON ${id}=aluno_encontro.encontro_id and aluno_encontro.aluno_id=alunos.id`

        client.query(alunoSql, (err, result) => {
            alunos.push(result.rows);
        })

        const sql = `select encontros.id as encontroId,
                            encontros.assunto_id,
                            encontros.data,
                            assuntos.nome,
                            assuntos.grau_dificuldade,
                            assuntos.tempo_necessario
                    from encontros
                    inner join assuntos ON encontros.assunto_id=assuntos.id
                    where encontros.id=${id}
                    `;
        client.query(sql, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }

            if (!result.rows.length) {
                return res.status(400).json({message:'Grupo não encontrado'})
            }

            // console.log(result.rows)

            const encontro = result.rows.map(encontro => ({
                id: encontro.encontroid,
    			data: encontro.data,
    			assunto_id: encontro.assunto_id
            }))

            const assunto = {
                nome: result.rows[0].nome,
    			grau_dificuldade: result.rows[0].grau_dificuldade,
    			tempo_necessario: result.rows[0].tempo_necessario,
            }

            const serializedUser = Object.assign(encontro[0], { assunto: assunto }, { alunos: alunos[0] })

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