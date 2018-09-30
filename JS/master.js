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
      newcell.style.color = "rgb(48, 43, 47)";
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
  document.getElementById("startrandom").style.visibility = "hidden";
  document.getElementById("divnumuscito").style.animationPlayState = "running";
  document.getElementById("divnumuscito").classList.add("move");
  timeoutnumber = 0;
  setTimeout(function(){
    document.getElementById("divnumuscito").classList.remove("move");
    document.getElementById("startrandom").style.visibility = "visible";
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
    let cell = document.getElementById(id);
    cell.style.color = "black";
    cell.style.backgroundColor = "rgb(14, 217, 246)";
    document.getElementById("divnumuscito").innerText = id;
    oldnumber[oldid] = id;
    oldid++;
    //console.log(oldnumber);
    //console.log(oldid);
    numout();
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

function deactivenumber() {
  let cell = document.getElementById(id);
  cell.style.color = "rgb(48, 43, 47)";
  cell.style.backgroundColor = "black";
}
/***************************CLEAN TABLE****************************************/
function eraseall() {
  for (let i = 1; i <= 90; i++) {
    oldnumber[i] = 0;
    let cell = document.getElementById(i);
    cell.style.color = "rgb(48, 43, 47)";
    cell.style.backgroundColor = "rgba(105, 161, 209, 0.07)";
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
    Azzera();
  }
  let GpioIn2= document.getElementById("GpioOut2").innerText;
  if ((GpioIn2 == 0) && (timeoutnumber == 1))
  {
    callnumber();
  }
}, 500);
