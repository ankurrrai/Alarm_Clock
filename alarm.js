

// For adding dropdown for minutes

const hourlist=document.getElementById('select-hour')
const minlist=document.getElementById('select-min')

function setMinutes(){
  var min = 59;
  var lengthval=0
  var optiontab;
  for (let i = 0; i <=min; i++) {

    lengthval=i.toString().length

    if (lengthval === 1) {

        optiontab=document.createElement('option')
        optiontab.innerHTML='0' + i.toString()
        optiontab.setAttribute("value", '0' + i.toString());
        minlist.append(optiontab)

    } else {
        optiontab=document.createElement('option')
        optiontab.innerHTML=i
        optiontab.setAttribute("value", i);
        minlist.append(optiontab)
    }
    
  }
  
}

// For adding dropdown for hours
function sethours(){
  var hour = 12;
  var lengthval=0
  var optiontab;
  for (let i = 1; i <=hour; i++) {
    lengthval=i.toString().length

    if (lengthval === 1) {
        optiontab=document.createElement('option')
        optiontab.innerHTML='0' + i.toString()
        optiontab.setAttribute("value", '0' + i.toString());
        hourlist.append(optiontab)
    } else {
        optiontab=document.createElement('option')
        optiontab.innerHTML=i
        optiontab.setAttribute("value", i);
        hourlist.append(optiontab)
    }
    
  }
  
}

function minHourOption () {
    sethours();
    setMinutes();
}



// Date updation
var currentTimeTag=document.getElementById('timestam');
function dateUpdation () {
    setTimeout("dateUpdation()",1000)
    var time=new Date()
    var exactTime=time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    var splitTime=exactTime.split(":")
    var hour=splitTime[0]
    if (hour.length==1) {
        hour='0'+hour
    }
    currentTimeTag.innerHTML=hour + ":" + splitTime[1]
}

// Set Alarm configuration
let tasks=[];
const alarmsList = document.getElementById('list');
const setAlarm = document.getElementById('btn-alarm-btn');
const alarmscount = document.getElementById('alarm-count');

// set alarm
function SteAlarmfunction (e) {
    // const target=e.target
    let text=''
    const hour=document.getElementById("select-hour")
    const min=document.getElementById("select-min")
    const meridiem=document.getElementById("select-AM-PM")
    
    text=hour.item(hour.selectedIndex).value + ":" + min.item(min.selectedIndex).value +" " + meridiem.item(meridiem.selectedIndex).value
    
    const task={
        text:text,
        id:Date.now().toString(),
        done:false
    };
    
    addTask(task)
    
}

// add Task
function addTask (task) {
    if (task) {
        tasks.push(task);
         renderList(); //Calling renderList
         showNotification("Task added successfully!");
         return;
        };
    showNotification("Task not added.");
    return;
}


// show notifiacation
function showNotification(text) {
    
    // alert(text);
    console.log(text);
}

function showNotification_alarm(text,task) {
    if (task.done==false) {
        alert(text);
        task.done=true
        // setTimeout(task.done=false,70000)
    }
    
    
}


// delete the alarm
function deleteAlarm(e) {
    const target=e.target;
    if(target.className=='delete') {
        const taskId=target.dataset.id;  //data-id used if we used data-event then dataset.event we can get the id
        deleteTask(taskId);
        return;
    }
}

function deleteTask (taskId) {
    const newTask=tasks.filter(function (task) {
        return task.id!=taskId;
    });
    tasks=newTask;
    renderList(); //calling renderList
    showNotification("Task Deleted Successfully!")
    return;
    
}

//renderList
function renderList () {
    alarmsList.innerHTML=''
    for (let i=0;i<tasks.length;i++) {
        addTaskToDOM(tasks[i]);
    }
    alarmscount.innerHTML=tasks.length
}

// add the list to DOM

function addTaskToDOM(task) {
    const li=document.createElement('li')
    li.innerHTML=`
    <label for="${task.id}">${task.text}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />`
    alarmsList.append(li);
}


// Alarm notification to ring



function ringBell() {
    setTimeout("ringBell()",1000);
    var text=''
    for (let i=0;i<tasks.length;i++) {
        text=tasks[i].text;
        if (text==currentTimeTag.innerHTML) {
            showNotification_alarm("Ringing Alarm",tasks[i])
        }
            

    }
}


minHourOption();
dateUpdation();
setAlarm.addEventListener('click',SteAlarmfunction);
document.addEventListener('click',deleteAlarm);
ringBell();


