function calculatetotal(variable){
  var x = variable.parentElement.parentElement.children
  child = x[0].childNodes
  console.log(child)
  fly = child[10].valueAsNumber
  fight = child[13].valueAsNumber
  fire = child[16].valueAsNumber
  water = child[19].valueAsNumber
  electric = child[22].valueAsNumber
  frozen = child[25].valueAsNumber
  total = child[28]
  total.valueAsNumber = fly+fight+fire+water+electric+frozen
}

function add(){
  var x = document.getElementsByTagName("input");
  let tokimon = {name:x[0].value, height:x[1].value, weight:x[2].value, fly:x[3].value, fight:x[4].value, fire:x[5].value, water:x[6].value, electric:x[7].value, frozen:x[8].value, total:x[9].value, trainer_name:x[10].value};
  console.log(tokimon)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp.open("POST", '/mainpage', true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(tokimon));
}
