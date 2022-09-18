require('./config/conexion');

const express = require('express');
const port = (process.env.port || 3000)

const app = express();

//admitir tipos de datos

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();  
  });

// configurar puerto

app.set('port',port)

// rutas

app.use('/api',require('./routes'))



// init express
app.listen(app.get('port'),(error)=>{
    if (error) {
        console.log('Error starting server: '+ error)
    } else {
       console.log('Server started on port '+port) 
    }
})