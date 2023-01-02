// import { ArrayOfEvents } from "./data";

var k = 0;
var idd;
var count = 0;
var eventArray = [];
let newData;
const currUSER = document.getElementById("currUSER").textContent;

// const fetchData = async ()=> {
    try{
  const res = await fetch(`http://localhost:3000/events/all-events`)
    let data = await res.json();

    newData= data
   // console.log(newData)
    newData.forEach((element) => {
        //console.log(element.name)
        if (element.ownerEmail.trim() == currUSER) {
 makeEvent(element.name, element.location, element.stime, element.etime,element._id);}

  });}
  catch(e){
console.log(e)
  }







  try{
    const res = await fetch(`http://localhost:3000/allevents/all-events`)
      let data = await res.json();
  
      newData= data
     // console.log(newData)
      newData.forEach((element) => {
          //console.log(element.name)
          if (element.ownerEmail.trim() == currUSER) {
            makeAlldy(element.name, element.location,element._id);}
  
    });}
    catch(e){
  console.log(e)
    }






function makeAlldy(name, loc,eid) {
  var link= "/allevents/del/"+eid
  var uplink="/allevents/update/"+eid
  var allDayEvt = document.createElement("div");

  allDayEvt.setAttribute("class", "allevent");

  let AllTime = document.createElement("h1");
  AllTime.innerHTML = "ALL DAY-";


 let update = document.createElement("a");

  update.innerHTML = "update";

  
  
  
  update.setAttribute("href", uplink);


  let allEname = document.createElement("p");
  allEname.innerHTML = name;

 let del = document.createElement("a");

  del.innerHTML = "delete";

  del.setAttribute("class", "del-button1");

  update.setAttribute("class", "update-button1");


  del.setAttribute("href", link);

  let allEloc = document.createElement("p");
  allEloc.innerHTML = loc;

  allDayEvt.setAttribute("id", "evt");
  AllTime.setAttribute("id", "gray");
  allEloc.setAttribute("id", "allDayLoc");

  allDayEvt.appendChild(AllTime);
  allDayEvt.appendChild(allEname);
  allDayEvt.appendChild(allEloc);
  allDayEvt.appendChild(del);
  allDayEvt.appendChild(update);

  var elall = document.getElementById("daily");
  elall.appendChild(allDayEvt);
}

//MAKE EVENT FUNCTION TO CONVERT TIME TO 24 HRS FORMAT

function makeEvent(name, loc, sTime, Etime,id) {
   // console.log(id)
  var timeToDisplay = sTime;
  if (sTime.includes("12")) {
    sTime = sTime.split("p")[0];
    sTime = sTime.split(":");
    var a = parseInt(sTime[0]) + 0;
    if (sTime[1] == "30") {
      var b = 0.5;
      sTime = a + b;
    } else {
      sTime = a;
    }
  } else if (sTime.includes("pm")) {
    sTime = sTime.split("p")[0];
    sTime = sTime.split(":");
    var a = parseInt(sTime[0]) + 12;
    if (sTime[1] == "30") {
      var b = 0.5;
      sTime = a + b;
    } else {
      sTime = a;
    }
  } else {
    sTime = sTime.split("a")[0];
    sTime = sTime.split(":");
    var a = parseInt(sTime[0]) + 0;
    // console.log(a)
    if (sTime[1] == "30") {
      var b = 0.5;
      sTime = a + b;
    } else {
      sTime = a;
    }
  }

  /////////////////////////////////////////////////////////////////

  if (Etime.includes("12")) {
    Etime = Etime.split("p")[0];
    Etime = Etime.split(":");
    var c = parseInt(Etime[0]) + 0;
    // console.log(a)
    if (Etime[1] == "30") {
      var d = 0.5;
      Etime = c + d;
    } else {
      Etime = c;
    }
  } else if (Etime.includes("pm")) {
    Etime = Etime.split("p")[0];
    Etime = Etime.split(":");
    var c = parseInt(Etime[0]) + 12;
    // console.log(a)
    if (Etime[1] == "30") {
      var d = 0.5;
      Etime = c + d;
    } else {
      Etime = c;
    }
  } else {
    Etime = Etime.split("a")[0];
    Etime = Etime.split(":");
    var c = parseInt(Etime[0]) + 0;
    // console.log(a)
    if (Etime[1] == "30") {
      var d = 0.5;
      Etime = c + d;
    } else {
      Etime = c;
    }
  }

  if (Etime <= sTime) {
    alert("PLEASE ENTER VALID TIME");
    return;
  }

  /////////////////////////////////////////////////////////

  var event = {
    Ename: name,
    loc: loc,
    sTime: sTime,
    eTime: Etime,
    nametodisp: timeToDisplay,
    eventId:id
  };

  var etname = `event${count}`;

  etname = event;

  eventArray.push(etname);
}

//SETALLDay function to set evnts for all day

function setAllDay(newLoc, newEvent) {
  var loc1 = document.getElementById("allDayLoc");
  var alEvent = document.getElementById("itemsample");
  loc1.innerHTML = newLoc;
  alEvent.innerHTML = newEvent;
}

//FUNCTION CREATE EVENTS CREATE EVENT BY DOM MANUPLATION TO RENDER IT OWN SCREEN

function createEvent(eventName, loc, time, endtime, disp,eid) {
    console.log(eid)
    var link= "/events/del/"+eid
    var uplink="/events/update/"+eid
  var tag = document.createElement("div");
 
  tag.classList.add("event");

// console.log("/events/del/"+eid)
  idd = k.toString();
  tag.id = idd;
  tag.style.height = calculateheigh(endtime, time);
  var ti = document.createElement("h3");
  ti.innerHTML = disp + "-";
  //ti.href = "/events/del"
  var name = document.createElement("h3");
  name.innerHTML = eventName;
  var location = document.createElement("h3");

  location.innerHTML = loc;

  var del = document.createElement("a");

  del.innerHTML = "delete";



  del.setAttribute("href", link);


/******************* */
var update = document.createElement("a");

update.innerHTML = "update";


del.setAttribute("class", "del-button");

update.setAttribute("class", "update-button");


update.setAttribute("href", uplink);
  
  location.style.color = "#269326";
  ti.style.color = "#c7c7c7";
  update.style.marginTop="30px"
  tag.appendChild(ti);
  tag.appendChild(name);
  tag.appendChild(location);
  tag.appendChild(del);
  tag.appendChild(update);
  var element = document.getElementById(time);
  element.appendChild(tag);
  k++;

  if (tag.style.height > "8rem") {
    tag.style.WebkitFlexDirection = "row";
  } else if (tag.style.height < "4rem") {
    tag.style.WebkitFlexDirection = "column";
  }

  return tag;
}

//CALCULATE HEIGHT FOR EACH EVENT DIV USED IN CREATENCTION
function calculateheigh(a, b) {
  var c = ((a - b) * 4 * 2).toString() + "rem";
  return c;
}

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

var renderArray = [];
eventArray.forEach((element) => {
  var m = createEvent(
    element.Ename,
    element.loc,
    element.sTime,
    element.eTime,
    element.nametodisp,
    element.eventId
  );
  renderArray.push(m);
});

for (let i = 0; i < renderArray.length; i++) {
  for (let j = i + 1; j < renderArray.length; j++) {
    //console.log(z[i])
    if (elementsOverlap(renderArray[i], renderArray[j])) {
      var a = renderArray[i].parentElement;
      var h = ((a.id - eventArray[j].sTime) * -4 * 2).toString() + "rem";
      a.appendChild(renderArray[j]);

      renderArray[j].style.marginTop = h;
    }
  }
}