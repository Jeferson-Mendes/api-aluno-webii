const pg = require('pg');

const initDatabase = () => {
    const client = new pg.Client(process.env.ELEPHANT_URI)
client.connect((error) => {
    if(error) {
        return console.error('could not connect to postgres', err);
    }
    })
    return client
}

module.exports = { initDatabase }