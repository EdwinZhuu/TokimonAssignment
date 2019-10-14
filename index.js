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
	.get('/mainpage', async (req, res) => {
		const client = await pool.connect()
		const tokiresult = await client.query('SELECT name FROM Tokimon');
		const tokiresults = { 'tokiresults': (tokiresult) ? tokiresult.rows : null};
		res.render('pages/mainpage', tokiresults)
		client.release();
	})
  .post('/mainpage', async (req, res) => {
    const client = await pool.connect()
    await addtokimon(req.body,client)
    res.send('ok')
    client.release();
  })
	.patch('/mainpage/:id', async (req, res) => {
		const client = await pool.connect()
		await changetokimon(req.body, req.params.id, client)
		res.send('ok')
		client.release();
	})
	.delete('/mainpage/:id', async (req, res) => {
		const client = await pool.connect()
		await deletetokimon(req.params.id, client)
		res.send('ok')
		client.release();
	})
	.get('/mainpage/:id', async (req, res) => {
		const client = await pool.connect()
		const text = 'SELECT * FROM Tokimon WHERE name = $1'
		const value = [req.params.id]
		const specific = await client.query(text, value)
		const results = {'results': specific.rows};
		res.render('pages/specificTokimon', results)
		client.release();
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
