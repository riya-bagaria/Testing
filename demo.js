var timeTableArray=[
    {day:"Monday",details:[]},
    {day:"Tuesday",details:[]},
    {day:"Wednesday",details:[]},
    {day:"Thrusday",details:[]},
    {day:"Friday",details:[]}
    
];
var timeTable=[];
function DayDetails(data){
    return `
        ${data.details.map(x => `
        <div class="col">
            <div><strong>Time</strong>:${x.StartingTime}-${x.FinishTime}</div> 
            <div><strong>Subject:</strong> ${x.subject}</div> 
            <div><strong>LT: </strong>${x.LT}</div> 
            <div><strong>Faculty:</strong>${x.faculty}</div>
        </div>`).join("")}      
   `;
}
function Comparison(finish,start,current){
    var f = finish.split(":");
    var s = start.split(":");
    var c = current.split(":");
    var finishTime=f[0]*60*60+f[1]*60+f[2];
    var startTime=s[0]*60*60+s[1]*60+s[2];
    var currentTime=c[0]*60*60+c[1]*60+c[2];
    if(finishTime>currentTime && currentTime>=startTime){
        return true;
    }
    else return false;
}
function checkingUpcoming(finish,start,current){
    var f = finish.split(":");
    var s = start.split(":");
    var c = current.split(":");
    var finishTime=f[0]*60*60+f[1]*60+f[2];
    var startTime=s[0]*60*60+s[1]*60+s[2];
    var currentTime=c[0]*60*60+c[1]*60+c[2];
    if(finishTime>currentTime && currentTime<=startTime){
        return true;
    }
    else return false;
}
function NextClass(){
    var flag=0;
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
   var dayNo=new Date().getDay();
   //var dayNo=1;
   if(dayNo==0 || dayNo==6){
       return`<div>Next Class is on Monday ${timeTable[0].details[0].subject} LT ${timeTable[0].details[0].LT} ${timeTable[0].details[0].StartingTime}</div>`
   }
   var storeKey;
    for (var key in timeTable) {
      var x = timeTable[key];
      if(x.day===days[dayNo]){
      // console.log(key);
            storeKey=key;
            var currentTime =new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
            //var currentTime="17:29:00";
            var length=(timeTable[key].details).length;
            for(var data in timeTable[key].details){
                if(Comparison(timeTable[key].details[data].FinishTime,timeTable[key].details[data].StartingTime,currentTime)){
                    flag=1;
                    var nextData=parseInt(data)+1;
                    if(length!=parseInt(data)+1){
                        return`
                            <div>Currently running ${timeTable[key].details[data].subject} class in LT ${timeTable[key].details[data].LT}</div>
                            <div>Next class ${timeTable[key].details[nextData].subject} in LT ${timeTable[key].details[nextData].LT} at ${timeTable[key].details[nextData].StartingTime}
                        `
                    }
                    else{
                        nextkey=parseInt(key)+1;
                        if(nextkey==5){
                            return`<div>Currently running ${timeTable[key].details[data].subject} class in LT ${timeTable[key].details[data].LT} at ${timeTable[key].details[data].StartingTime}</div>

                            <div>Next class is on <span class="black-bold">${timeTable[0].day} </span>of ${timeTable[0].details[0].subject} in LT ${timeTable[0].details[0].LT} at ${timeTable[0].details[0].StartingTime}`
                        }
                        else{
                            return`<div>Currently running ${timeTable[key].details[data].subject} class in LT ${timeTable[key].details[data].LT} at ${timeTable[key].details[data].StartingTime}</div>
                            <div>Next class is on  ${timeTable[nextkey].day} of ${timeTable[nextkey].details[0].subject} in LT ${timeTable[nextkey].details[0].LT} at ${timeTable[nextkey].details[0].StartingTime}`
                        }
                    }
                }  
                else if(checkingUpcoming(timeTable[key].details[data].FinishTime,timeTable[key].details[data].StartingTime,currentTime)){
                    return`<div>No current Lecture running</div>
                    <div>Next class is ${timeTable[key].details[data].subject} in LT ${timeTable[key].details[data].LT} at ${timeTable[key].details[data].StartingTime}`
                }              
            }
            
        }  
        
    }
    storeKey=parseInt(storeKey)+1;
    if((storeKey)==5){
        return`<div>Next Class is on Monday of ${timeTable[0].details[0].subject} in ${timeTable[0].details[0].LT} at ${timeTable[0].details[0].StartingTime}</div>`
    }
    else{
        
        console.log(storeKey);
        return`<div>Next Class is on ${timeTable[storeKey].day} </div><div>Subject: ${timeTable[storeKey].details[0].subject}</div><div>LT: ${timeTable[storeKey].details[0].LT}</div><div>Timing: ${timeTable[storeKey].details[0].StartingTime}</div>` 
    }
  // console.log(dayNo);
}


function init(){
    if(localStorage.TimeTableRecord){
        studentsArray=JSON.parse(localStorage.TimeTableRecord);
        timeTable=studentsArray;
        console.log(timeTable);
        document.getElementById("app").innerHTML = `
${NextClass()}
`;
    }
    else{
    console.log("No data in Time Table");
    }
}
function onSubmitPressed(){
    var startTime=document.getElementById("startTime").value;
    var endTime=document.getElementById("endTime").value;
    var subject=document.getElementById("subject").value;
    var LT=document.getElementById("LT").value;
    var faculty=document.getElementById("faculty").value;
    var day= document.getElementById("day").value;
    var timeTableObj={StartingTime:startTime,FinishTime:endTime,subject:subject,LT:LT,faculty:faculty};
    for(var key in timeTableArray){
        if(timeTableArray[key].day==day){
           timeTableArray[key].details.push(timeTableObj);
           break;
        }
    }
    localStorage.TimeTableRecord=JSON.stringify(timeTableArray);
    //localStorage.clear();
    console.log(localStorage.TimeTableRecord);
    document.getElementById("startTime").value="";
    document.getElementById("endTime").value="";
    document.getElementById("subject").value="";
    document.getElementById("LT").value="";
    document.getElementById("faculty").value="";
    document.getElementById("day").value="";
}