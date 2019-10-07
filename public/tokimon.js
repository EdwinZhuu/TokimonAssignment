function createtable(toki){
  await toki.query('CREATE TABLE IF NOT EXISTS Tokimon (Name varchar(20), Weight int, Height int')
}
