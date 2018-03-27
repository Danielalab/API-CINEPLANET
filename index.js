
const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.log(`Error a la Conexion de la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida')    

    app.listen(config.port, () => {
        console.log(`api rst corriendo en http://localhost:${config.port}`);
    })
})