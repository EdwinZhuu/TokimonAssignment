CREATE TABLE Tokimon (
  name varchar(100) PRIMARY KEY,
  height int,
  weight int,
  fly int CHECK (fly >=0 AND fly <= 100),
  fight int CHECK (fight >= 0 AND fight <= 100),
  fire int CHECK (fire >= 0 AND fire <= 100),
  water int CHECK (water >= 0 AND water <= 100),
  electric int CHECK (electric >= 0 AND electric <= 100),
  frozen int CHECK (frozen >= 0 AND frozen <= 100),
  total int CHECK (total = fly + fight + fire + water + electric + frozen),
  trainer_name varchar(50)
);
