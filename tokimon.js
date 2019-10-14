async function addtokimon(tokimon, client){
  const text = 'INSERT INTO Tokimon VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
  const values = [tokimon.name,tokimon.height,tokimon.weight,tokimon.fly,tokimon.fight,tokimon.fire,tokimon.water,tokimon.electric,tokimon.frozen,tokimon.total,tokimon.trainer_name]
  return client.query(text, values, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}

async function changetokimon(tokimon, tokimon_id ,client){
  let querystring = 'UPDATE Tokimon SET '
  for (const key in tokimon){
    querystring = querystring + key + '=' + `'` + tokimon[key] + `'` + ','
  }
  querystring = querystring.substring(0,(querystring.length-1))
  querystring = querystring + ' WHERE name = ' + `'` + tokimon_id + `'` + ';'
  console.log(querystring)
  return client.query(querystring, (err,res) => {
    if (err) {
      console.log(err)
    }
  })
}

async function deletetokimon(tokimon_id, client){
  const text = 'DELETE FROM Tokimon WHERE name = $1'
  const values = [tokimon_id]
  return client.query(text, values, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = {addtokimon, changetokimon, deletetokimon}
