const { initDatabase } = require('../database/index');
const client = initDatabase();


module.exports = {
    async list(req, res) {
        client.query('SELECT * FROM assuntos', (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }
            return res.json({ assuntos: result.rows, status: 200 });
        })
    },

    async create(req, res) {
        const { nome, grau_dificuldade, tempo_necessario } = req.body;

    client.query(`INSERT INTO assuntos (nome, grau_dificuldade, tempo_necessario)
    VALUES ('${nome}', ${grau_dificuldade}, ${tempo_necessario})`, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        return res.json({
            assuntos: result.rows[0],
            message: 'Assunto registrado com sucesso.',
            status: 200
        })
    })
    },

    async detail(req, res) {
        const { id } = req.params;
    client.query(`SELECT * FROM assuntos WHERE id=${id}`, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message:'error running query'});
        }

        return res.json({ assunto: result.rows[0], status: 200 })
    })
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, grau_dificuldade, tempo_necessario } = req.body;
       
        client.query(`UPDATE assuntos SET nome='${nome}', grau_dificuldade=${grau_dificuldade}, tempo_necessario=${tempo_necessario} WHERE id=${id}`, (err, result) => {
            if(err) {
                console.log(err)
                return res.status(401).json({message:'error running query'});
            }

            return res.json({ aluno: result.rows[0], message: 'Assunto atualizado com sucesso.', status: 200 })
        })
        },

        async delete(req, res) {
            const { id } = req.params;

            client.query(`DELETE FROM assuntos WHERE id=${id}`, (err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(401).json({message:'error running query'});
                }
    
                return res.json({ aluno: result.rows[0], message: 'Assunto removido com sucesso.', status: 200 })
            })
        }
}