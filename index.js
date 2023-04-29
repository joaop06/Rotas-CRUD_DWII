const express = require("express")
const app = express()
const pool = require("./data/data")

app.use(express.json());

// Inicialização do servidor local
app.listen(8080, () => {
    console.log("Servidor local ativo! Porta: 8080")
})

app.get("/users", async (req, res) => {
    try {
        const client = await pool.connect()
        const { rows } = await client.query("SELECT * FROM Users")
        console.table(rows)
        res.status(200).send(rows)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro de conexão com o servidor")
    }
})


app.post('/users', async (req, res) => {
    try{
        const {id, nome} = req.body;
        const client = await pool.connect()
        const user = await client.query(`INSERT INTO Users VALUES (${id}, '${nome}')`)
        console.log(user)
        res.status(200).send(user)
    } catch (error){
        console.error(error)
        res.status(500).send("Erro de conexão com o servidor")
    }
})

app.put('/users/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {nome} = req.body;
        const client = await pool.connect()
        const user = await client.query(`UPDATE Users SET nome = '${nome}' WHERE id = ${id}`)
        console.log(user)
        res.status(200).send(user)
    } catch (error){
        console.error(error)
        res.status(500).send("Erro de conexão com o servidor")
    }
})

app.delete('/users/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const client = await pool.connect()
        const user = await client.query(`DELETE FROM Users WHERE id = ${id}`)
        console.log(user)
        res.status(200).send(user)
    } catch (error){
        console.error(error)
        res.status(500).send("Erro de conexão com o servidor")
    }
})