window.onload = function() {
  let maxcolum = 10;
  let maxrow = 9;
  let number = 1;
  for (let i = 0; i < maxrow; i += 1) {
    let newrow = document.createElement("tr");
    document.getElementById("table").appendChild(newrow);
    for (let c = 0; c < maxcolum; c += 1) {
      let newcell = document.createElement("td");
      newcell.id = number;
      newcell.style.fontSize = "50px";
      newcell.innerHTML = number++;
      newrow.appendChild(newcell);
    }
  }
}

var oldnumber = [];
var oldid = 0;
var count;
var int;
var timeoutnumber = 1;

/***************************NUMBER OUT PRESENTEER*****************************/
function numout()
{
  document.getElementById("titolo").style.visibility = "hidden";
  document.getElementById("divnumuscito").style.animationPlayState = "running";
  document.getElementById("divnumuscito").classList.add("move");
  timeoutnumber = 0;
  setTimeout(function(){
    document.getElementById("divnumuscito").classList.remove("move");
    document.getElementById("titolo").style.visibility = "visible";
    timeoutnumber = 1;
  }, 20000);
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function callnumber() {
  let check = 0;
  let id = getRndInteger(1, 90);
  id = checknumber(id);
  if (id == 0) {
    eraseall();
  } else {
    let cell = document.getElementById(id); //Modifica cella richiamata
    cell.style.color = "darkred";
    cell.style.borderColor = "darkred";
    cell.style.backgroundColor = "orange";
    cell.style.boxShadow =  "1px 1px 2px black, 0 0 25px orange, 0 0 5px darkorange";
    document.getElementById("divnumuscito").innerText = id; //scrive numero su tabellone mobile
    oldnumber[oldid] = id;
    oldid++;
    //console.log(oldnumber);
    //console.log(oldid);
    numout(); // Attivo animazione
  }
}

function checknumber(id) {
  if ((oldnumber[90] == 0) || oldnumber.length < 90) {
    for (let i = 0; i < oldnumber.length; i++) {
      if (oldnumber[i] == id) {
        console.log(`Doppio ${oldnumber[i]}`);
        id = getRndInteger(1, 90);
        i = 0;
      }
    }
    console.log(`Numero che esce ${id}`);
    return id;
  } else {
    return 0;
  }
}

/***************************CLEAN TABLE****************************************/
function eraseall() {
  for (let i = 1; i <= 90; i++) {
    oldnumber[i] = 0;
    let cell = document.getElementById(i);
    cell.style.color = "rgba(6, 6, 6, 0.38)";
    cell.style.backgroundColor = "rgba(105, 161, 209, 0.07)";
    cell.style.borderColor = "rgba(255, 156, 4, 0.62)";
    cell.style.boxShadow = "none";
  }
  oldid = 0;
}

/**************************POLLING GPIO***************************************/
setInterval(function(){
  $("#GpioOut1").load('/PHP/gpio1.php');
  $("#GpioOut2").load('/PHP/gpio2.php');
  let GpioIn1= document.getElementById("GpioOut1").innerText;
  if ((GpioIn1 == 0) && (timeoutnumber == 1))
  {
    eraseall();
  }
  let GpioIn2= document.getElementById("GpioOut2").innerText;
  if ((GpioIn2 == 0) && (timeoutnumber == 1))
  {
    callnumber();
  }
}, 500);
