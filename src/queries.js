const Pool = require('pg').Pool
const pool = new Pool({
    user: 'arduinoUser',
    host: '192.168.1.250',
    database: 'Arduino',
    password: 'arduinoPassword',
    port: 5432,
})

const insertData = (tabella, valore) => {
    pool.query(['insert into ', tabella, ' (valore,data_inserimento) values (', valore, ',CURRENT_TIMESTAMP)'].join(''), (error, result) => {
        if (error) {
            console.log('Errore %s: %s', tabella, error);
        }
        //else
        //    console.log('inserito %s ', tabella);
    })
}
const insertData2 = (tabella) => {
    pool.query(['insert into ', tabella, ' (data_inserimento) values (CURRENT_TIMESTAMP)'].join(''), (error, result) => {
        if (error) {
            console.log('Errore %s: %s', tabella, error);
        }
        //else
        //console.log('inserito %s', tabella);
    })
}
const insertAltitude = (valore) => {
    insertData("altitudine", valore);
}
const insertPression = (valore) => {
    insertData("pressione", valore);
}
const insertRain = (valore) => {
    insertData("pioggia", valore);
}
const insertHumidity = (valore) => {
    insertData("umidita", valore);
}
const insertTemperature = (valore) => {
    insertData("temperatura", valore);
}
const insertActivity = (valore) => {
    insertData2("attivita");
}

module.exports = {
    insertAltitude, insertActivity, insertHumidity, insertRain, insertPression, insertTemperature
}