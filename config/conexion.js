const mysql = require('mysql');
const conexion = mysql.createConnection({
    host:'aws-sa-east-1.connect.psdb.cloud',
    user:'di4jw1cioehnxvfrv7j7',
    password:'pscale_pw_I1ZzjtiKr4gG2Wuf3ygzQQXIckAeCaah1huEsq8bSEN',
    database:'presupuesto',
    ssl: {}
});

conexion.connect((err)=>{
    if (err) {
        console.log('ha ocurrido un error'+ err)
    } else {
        console.log('la base de datos se conecto')
    }
});

module.exports = conexion;