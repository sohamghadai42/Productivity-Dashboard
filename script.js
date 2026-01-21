function openFeature() {
  var allElems = document.querySelectorAll(".elem");
  var allFullElems = document.querySelectorAll(".fullElems");
  var Back = document.querySelectorAll(".fullElems .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "block";
    });
  });
  Back.forEach(function (back) {
    back.addEventListener("click", function () {
      allFullElems[back.id].style.display = "none";
    });
  });
}

openFeature();

function Todolist() {
  let taskForm = document.querySelector("form");
  let taskinp = document.querySelector(".addtask form #task-inp");
  let taskdetails = document.querySelector(".addtask form #task-details");
  let taskcheckbox = document.querySelector(".addtask form #check-box");
  var currenttasks = [];

  if (localStorage.getItem("currenttasks")) {
    currenttasks = JSON.parse(localStorage.getItem("currenttasks"));
  } else {
    console.log("TaskList is empty");
  }

  function rendertask() {
    let allTask = document.querySelector(".alltask");
    let sum = "";

    currenttasks.forEach(function (elem, idx) {
      sum += `<div class="task">
                        <h5>${elem.task} <span class="${elem.imp}">imp</span></h5>
                        <button id="${idx}">Task Completed</button>
                    </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currenttasks", JSON.stringify(currenttasks));
    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currenttasks.splice(btn.id, 1);
        rendertask();
      });
    });
  }
  rendertask();

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    currenttasks.push({
      task: taskinp.value,
      details: taskdetails.value,
      imp: taskcheckbox.checked,
    });

    rendertask();
    taskcheckbox.checked = false;
    taskinp.value = "";
    taskdetails.value = "";
  });
}
Todolist();

function dailyplannerpage() {
  var dayplanner = document.querySelector(".day-planner");
  var dayplannerData = JSON.parse(localStorage.getItem("dayplannerData")) || {};
  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );
  var wholeday = "";
  hours.forEach(function (elem, idx) {
    var savehuadata = dayplannerData[idx] || "";
    wholeday += `<div class="planner-time">
                  <p>${elem}</p>
                  <input id="${idx}" type="text" placeholder="..." value="${savehuadata}">
                 </div>`;
  });
  dayplanner.innerHTML = wholeday;

  var dayplannerinp = document.querySelectorAll(".day-planner input");
  dayplannerinp.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayplannerData[elem.id] = elem.value;
      localStorage.setItem("dayplannerData", JSON.stringify(dayplannerData));
    });
  });
}
dailyplannerpage();

function motivationpage() {
  var quote = document.querySelector(".motivation-1 h1");
  var author = document.querySelector(".motivation-2 h3");
  async function fetchquote() {
    let response = await fetch("https://api.api-ninjas.com/v2/randomquotes", {
      method: "GET",
      headers: {
        "X-Api-Key": "pFqF9XZmw5OVA5FgQnofOun1nC7QFYDz0uPYCPhG",
      },
    });
    let data = await response.json();
    quote.innerHTML = `"${data[0].quote}"`;
    author.innerHTML = "- " + data[0].author;
  }
  fetchquote();
}
motivationpage();

function pomodoro_fullpage() {
  let currentmode = "pomodoro";
  var timer = document.querySelector(".pomo-timer h1");
  var startbtn = document.querySelector(".pomo-timer .start");
  var pausebtn = document.querySelector(".pomo-timer .pause");
  var resetbtn = document.querySelector(".pomo-timer .reset");
  var worksession = document.querySelector(".worksession");
  var interval = null;
  let totalseconds = 25 * 60;

  function updatetimer() {
    let minutes = Math.floor(totalseconds / 60);
    let seconds = totalseconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  function starttimer() {
    clearInterval(interval);

    interval = setInterval(() => {
      if (totalseconds > 0) {
        totalseconds--;
        updatetimer();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  function pausetimer() {
    clearInterval(interval);
  }
  function resettimer() {
    clearInterval(interval);
    if (currentmode === "pomodoro") {
      totalseconds = 25 * 60;
    } else if (currentmode === "shortbreak") {
      totalseconds = 5 * 60;
    } else if (currentmode === "longbreak") {
      totalseconds = 15 * 60;
    }
    updatetimer();
  }

  startbtn.addEventListener("click", starttimer);
  pausebtn.addEventListener("click", pausetimer);
  resetbtn.addEventListener("click", resettimer);

  function short_break_fnc() {
    currentmode = "shortbreak";
    timer.style.color = "#4CAF50";
    totalseconds = 5 * 60;
    updatetimer();
  }

  var shortbreak = document.querySelector(".short-break");
  shortbreak.addEventListener("click", short_break_fnc);

  function pomodoro_fnc() {
    currentmode = "pomodoro";
    timer.style.color = "var(--tri4)";
    totalseconds = 25 * 60;
    updatetimer();
  }
  var pomodoro_btn = document.querySelector(".timer");
  pomodoro_btn.addEventListener("click", pomodoro_fnc);

  function long_break_fnc() {
    currentmode = "longbreak";
    timer.style.color = "#3B82F6";
    totalseconds = 15 * 60;
    updatetimer();
  }

  var longbreak = document.querySelector(".long-break");
  longbreak.addEventListener("click", long_break_fnc);
}
pomodoro_fullpage();


function mainsection(){
var city = "noida";
var apikey = "19bb5f2cf083fafef2eefe1136e1c70e";
var data = null;

var header1time = document.querySelector(".header-1 h2");
var header1date = document.querySelector(".date");
var header2temp = document.querySelector(".header-2 h2");
var header2expression = document.querySelector(".header-2 h3");
var header2humidity = document.querySelector(".header-2 .humidity");
var header2wind = document.querySelector(".header-2 .wind");
var header2feels = document.querySelector(".header-2 .feels");

async function wheather() {
  var response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
  );
  data = await response.json();
  header2temp.innerHTML = `${data.main.temp}°C`;
  header2expression.innerHTML = `${data.weather[0].main}`;
  header2humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  header2wind.innerHTML = `Wind: ${data.wind.speed} km/h`;
  header2feels.innerHTML = `Feels Like: ${data.main.feels_like}°C`;
  console.log(data);
}
wheather();


function timedate(){
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  var date = new Date();
  var daysofweek = week[date.getDay()];
  var hours = date.getHours();
  var timemin = date.getMinutes();
  var timesec = date.getSeconds();
  var tarik = date.getDate();
  var month = monthNames[date.getMonth()];
  var year = date.getFullYear();
  
  header1date.innerHTML = `${tarik} ${month}, ${year} `

  if(hours>=12){
    header1time.innerHTML = `${daysofweek}, ${String(hours).padStart(2, "0")}:${String(timemin).padStart(2, "0")}:${String(timesec).padStart(2, "0")} pm`;
  }else{
    header1time.innerHTML = `${daysofweek}, ${String(hours).padStart(2, "0")}:${String(timemin).padStart(2, "0")}:${String(timesec).padStart(2, "0")} am`
  }
}
setInterval(() => {
  timedate();
}, 1000);
}
mainsection();

var theme = document.querySelector(".changetheme");
var rootElement = document.documentElement;
var flag = 0;
theme.addEventListener("click",function(){
  if(flag == 0){
    rootElement.style.setProperty("--pri", "#fcf9ea");
    rootElement.style.setProperty("--sec", "#badfdb");
    rootElement.style.setProperty("--tri1", "#ffa4a4");
    rootElement.style.setProperty("--tri2", "#ffbdbd");
    rootElement.style.setProperty("--tri3", "#feeac9");
    rootElement.style.setProperty("--tri3-2", "#ebd6b7");
    rootElement.style.setProperty("--tri4", "#fd7979");
    flag = 1;
  }else if(flag == 1){
    rootElement.style.setProperty("--pri", "#84e3c8");
    rootElement.style.setProperty("--sec", "#a8e6cf");
    rootElement.style.setProperty("--tri1", "#dcedc1");
    rootElement.style.setProperty("--tri2", "#ffd3b6");
    rootElement.style.setProperty("--tri3", "#ffaaa5");
    rootElement.style.setProperty("--tri3-2", "#ff8b94");
    rootElement.style.setProperty("--tri4", "#ff7480");
    flag = 2;
  }else if(flag == 2){
    rootElement.style.setProperty("--pri", "#0ad2ff");
    rootElement.style.setProperty("--sec", "#2962ff");
    rootElement.style.setProperty("--tri1", "#9500ff");
    rootElement.style.setProperty("--tri2", "#ff0059");
    rootElement.style.setProperty("--tri3", "#ff8c00");
    rootElement.style.setProperty("--tri3-2", "#b4e600");
    rootElement.style.setProperty("--tri4", "#0fffdb");
    flag = 0;
  }
})
// https://api.openweathermap.org/data/2.5/weather?q=noida&appid=19bb5f2cf083fafef2eefe1136e1c70e&units=metric
