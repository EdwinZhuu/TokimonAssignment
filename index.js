const express = require('express')
const path = require('path')
const {addtokimon, changetokimon, deletetokimon} = require('./tokimon')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});


express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
	.get('/test', async (req, res) => {
		const client = await pool.connect()
		const tokiresult = await client.query('SELECT * FROM Tokimon');
		const tokiresults = { 'tokiresults': (tokiresult) ? tokiresult.rows : null};
		res.render('pages/test', tokiresults)
		client.release();
	})
  .post('/test', async (req, res) => {
    const client = await pool.connect()
    await addtokimon(req.body,client)
    res.send('ok')
    client.release();
  })
	.patch('/test/:id', async (req, res) => {
		const client = await pool.connect()
		await changetokimon(req.body, req.params.id, client)
		res.send('ok')
		client.release();
	})
	.delete('/test/:id', async (req, res) => {
		const client = await pool.connect()
		await deletetokimon(req.params.id, client)
		res.send('ok')
		client.release();
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
