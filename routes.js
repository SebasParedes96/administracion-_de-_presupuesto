const router = require('express').Router()
const conexion = require('./config/conexion')

// routes

//get 10 operations for type

router.get('/:id_usser/operations/:type', (req, res) => {
    const { id_usser, type } = req.params
    let sql = `select
    operations.id as id,
    concept as concept,
    date_format(date, "%Y-%m-%d") as date,
    amount as amount,
    type_operations.description as type,
    id_category as id_category,
    categories.description as category
    from operations 
    inner join type_operations on type_operations.id = operations.id_type_operation
    inner join categories on categories.id = operations.id_category 
    where id_usser =  ? 
    AND id_type_operation = ( case when ? = 0 then id_type_operation else ? end) 
    AND leavingDate is null ORDER BY date desc limit 10`
    conexion.query(sql, [id_usser, type,type], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})


//get categories

router.get('/categories', (req, res) => {
    let sql = `select * from categories`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//get type_operations

router.get('/types', (req, res) => {
    let sql = `select * from type_operations`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//get balance

router.get('/:id_usser', (req, res) => {
    const { id_usser } = req.params
    let sql = `select 
    sum(case when id_type_operation = 1 then amount else - amount end) as balance 
    from operations where id_usser = ? AND leavingDate is null`
    conexion.query(sql, [id_usser], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//add operation

router.post('/', (req, res) => {
    const { concept, amount, date, category, type, usser } = req.body
    let sql = `insert into operations
    (concept, amount, date, id_category, id_type_operation, id_usser) 
    values('${concept}','${amount}','${date}','${category}','${type}','${usser}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'Added operation!' })
        }
    })
})

//add user

router.post('/register', (req, res) => {
    const { name,  lastName, email, password } = req.body
    let sql = `insert into ussers(name,lastName,email,password) 
    values('${name}','${lastName}','${email}','${password}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'Added operation!' })
        }
    })
})

//auth

router.post('/auth', (req, res) => {
    const { email, password } = req.body
    let sql = `select id from ussers where email = '${email}' and password ='${password}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            if (rows.length === 0) {
                res.json(false)
            } else {
                res.json(rows)
            }
        }
    })
})

// modify operation

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { concept, amount, date, id_category } = req.body

    let sql = `update operations set
    concept = '${concept}',
    amount = '${amount}',
    date = '${date}',
    id_category = '${id_category}'
    where id = '${id}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            throw err
        } else {
            res.json({ status: 'Modified operation!' })
        }
    })
})


// delete operation

router.delete('/:id', (req, res) => {
    const { id } = req.params

    let sql = `update operations set
    leavingDate = now()
    where id = '${id}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            throw err
        } else {
            res.json({ status: 'Deleted operation!' })
        }
    })
})

// -------------------

module.exports = router;