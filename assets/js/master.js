$(document).ready(function() {
    function getTimeStamp(actionTime) {
        var msMinute = 60 * 1000;
        var msHour = msMinute * 60;
        var msDay = msHour * 24;
        var msMonth = msDay * 30;
        var msYear = msDay * 365;
        var elapsed = Date.now() - actionTime;
    
        if (elapsed < msMinute) {
            var timeStamp = Math.round(elapsed / 1000);
            if (timeStamp == 1)
                return timeStamp + " second ago";   
            else
                return timeStamp + " seconds ago";   
        }
        else if (elapsed < msHour) {
            var timeStamp = Math.round(elapsed / msMinute);
            if (timeStamp == 1)
                return timeStamp + " minute ago";
            else
                return timeStamp + " minutes ago";
        }
        else if (elapsed < msDay ) {
            var timeStamp = Math.round(elapsed / msHour );
            if (timeStamp == 1)
                return timeStamp + " hour ago";
            else
                return timeStamp + " hours ago";
        }
        else if (elapsed < msMonth) {
            var timeStamp = Math.round(elapsed / msDay);
            if (timeStamp == 1)
                return timeStamp + " day ago";
            else
                return timeStamp + " days ago";
        }
        else if (elapsed < msYear) {
            var timeStamp = Math.round(elapsed / msMonth);
            if (timeStamp == 1)
                return timeStamp + " month ago";
            else
                return timeStamp + " months ago";
        }
        else {
            var timeStamp = Math.round(elapsed / msYear );
            if (timeStamp == 1)
                return timeStamp + " year ago";
            else
                return timeStamp + " years ago";
        }
    }

    var ageField = document.getElementById("toto-age");
    var cookieField = document.getElementById("toto-biscuit");
    
    setInterval(function() {
        /* use a predefined birth day epoch time (12PM GMT) to get the age in ms */
        ageField.innerHTML = ((Date.now() - 1574596800000) / 2.628e+9).toFixed(8);
        cookieField.innerHTML = ((Date.now() - 1574596800000) / 8.64e+7).toFixed(0);
    }, 200);
    
    
    var coll = document.getElementsByClassName("toggle-log");
    
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
    
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
    
    
    $.get("https://jaks.fi/git/", function(data) {
        if (!data.error) {
            $.each(data.events, function(i, val) {
                $("#git-view").append(
                      "<a href='" + val.url + "' target='_BLANK'>"
                    + "<span class='git-repo'>[" + val.repo + "]</span> "
                    + "<span class='git-clause'>" + val.clause + "</span></a>"
                    + "<span class='git-clause-right tag tech'>" + getTimeStamp(val.timestamp) + "</span>"
                    + "<br>"
                )
            });
        } else {
            $("#git-view").append("Git info not available.");
        }
    }).fail(function() {
        $("#git-view").append("Git info not available.");
    });
})
