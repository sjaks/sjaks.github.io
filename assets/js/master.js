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


$.get("https://jaks.fi/github-latest-events/", function(data) {
    if (!data.error) {
        $.each(data.events, function(i, val) {
            $("#git-view").append(
                  "<a href='" + val.url + "' target='_BLANK'>"
                + "<span class='git-repo'>[" + val.repo + "]</span> "
                + "<span class='git-clause'>" + val.clause + "</span></a>"
                + "<span class='git-clause-right'>" + val.timestamp + "</span>"
                + "<span class='git-info'><br>" + val.info + "</span><hr>"
            )
        });
    } else {
        $("#git-view").append("Git info not available.");
    }
}).fail(function() {
    $("#git-view").append("Git info not available.");
});