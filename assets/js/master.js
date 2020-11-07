/*
      _       _        
 ___ (_) __ _| | _____  sjaks@github
/ __|| |/ _` | |/ / __| jaks.fi
\__ \| | (_| |   <\__ \ ------------
|___// |\__,_|_|\_\___/ sjaks
   |__/                

BRIEF:
My homepage source code
*/

function getTimeStamp(actionTime) {
    let msMinute = 60 * 1000;
    let msHour = msMinute * 60;
    let msDay = msHour * 24;
    let msMonth = msDay * 30;
    let msYear = msDay * 365;
    let elapsed = Date.now() - actionTime;

    if (elapsed < msMinute) {
        let timeStamp = Math.round(elapsed / 1000);
        if (timeStamp == 1)
            return timeStamp + " second ago";   
        else
            return timeStamp + " seconds ago";   
    }
    else if (elapsed < msHour) {
        let timeStamp = Math.round(elapsed / msMinute);
        if (timeStamp == 1)
            return timeStamp + " minute ago";
        else
            return timeStamp + " minutes ago";
    }
    else if (elapsed < msDay ) {
        let timeStamp = Math.round(elapsed / msHour );
        if (timeStamp == 1)
            return timeStamp + " hour ago";
        else
            return timeStamp + " hours ago";
    }
    else if (elapsed < msMonth) {
        let timeStamp = Math.round(elapsed / msDay);
        if (timeStamp == 1)
            return timeStamp + " day ago";
        else
            return timeStamp + " days ago";
    }
    else if (elapsed < msYear) {
        let timeStamp = Math.round(elapsed / msMonth);
        if (timeStamp == 1)
            return timeStamp + " month ago";
        else
            return timeStamp + " months ago";
    }
    else {
        let timeStamp = Math.round(elapsed / msYear );
        if (timeStamp == 1)
            return timeStamp + " year ago";
        else
            return timeStamp + " years ago";
    }
}


function enableToggleMenus() {
    let togglePosts = document.getElementsByClassName("toggle-log")[0];
    let toggleGitHistory = document.getElementsByClassName("toggle-log")[1];
    let toggleKeys = document.getElementsByClassName("toggle-log")[2];

    togglePosts.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;

        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            revealPosts(content);
        } 
    });

    toggleGitHistory.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;

        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            showGitInfo("https://jaks.fi/git", content);
        }
    });

    toggleKeys.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;

        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}


function initLoops() {
    let ageField = document.getElementById("toto-age");
    let cookieField = document.getElementById("toto-biscuit");

    setInterval(function() {
        /* use a predefined birth day epoch time (12PM GMT) to get the age in ms */
        ageField.innerHTML = ((Date.now() - 1574596800000) / 2.628e+9).toFixed(8);
        cookieField.innerHTML = ((Date.now() - 1574596800000) / 8.64e+7).toFixed(0);
    }, 200);
}


function showGitInfo(url, wrapper)  {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function() { 
        wrapper.innerHTML = "<br>";
        if (http.readyState == 4) {
            if (http.status == 200) {
                let gitResponse = JSON.parse(http.responseText);
                let events = gitResponse.events;

                if (gitResponse.error) {
                    wrapper.innerHTML = "Git info not available.";
                    return;
                }

                for (let i in events) {
                    let gitLink = document.createElement("a");
                    let gitRepo = document.createElement("span");
                    let gitClause = document.createElement("span");
                    let gitTimestamp = document.createElement("span");
                    let gitBr = document.createElement("br");

                    gitLink.className = "git-link";
                    gitRepo.className = "git-repo";
                    gitClause.className = "git-clause";
                    gitTimestamp.className = "git-timestamp tag tech";

                    gitLink.href = events[i].url;
                    gitRepo.innerHTML = "[" + events[i].repo + "]";
                    gitClause.innerHTML = events[i].clause;
                    gitTimestamp.innerHTML = getTimeStamp(events[i].timestamp);

                    gitLink.appendChild(gitRepo);
                    gitLink.appendChild(gitClause);
                    gitLink.appendChild(gitTimestamp);
                    wrapper.appendChild(gitLink);
                    wrapper.appendChild(gitBr);
                }

                wrapper.style.maxHeight = wrapper.scrollHeight + "px";
            } else {
                wrapper.innerHTML = "Git info not available.";
            } 
        }
    }

    http.open("GET", url, true);
    http.send(null);
}


function revealPosts(wrapper) {
    for (let i in wrapper.childNodes) {
        for (let j in wrapper.childNodes[i].childNodes) {
            let postChild = wrapper.childNodes[i].childNodes[j];
            if (postChild.tagName == "IMG") {
                postChild.src = postChild.getAttribute('lazysrc');
            }
        }
    }
    wrapper.style.maxHeight = wrapper.childNodes.length * 320;
}


enableToggleMenus();
initLoops();
