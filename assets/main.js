/*
      _       _        
 ___ (_) __ _| | _____  sjaks@github
/ __|| |/ _` | |/ / __| s.jaks.fi
\__ \| | (_| |   <\__ \ ------------
|___// |\__,_|_|\_\___/ sjaks.github.io
   |__/                

BRIEF:
My homepage source code
*/

// Hide loader icon when site has loaded
function loaded() {
    setInterval(function() {
          document.getElementById("load-cover").style.opacity = 0.0;
          setInterval(function() {
                document.getElementById("load-cover").style.display = "none";
          }, 400);
    }, 100);
}

// Switch between light and dark theme
var light = false;
function themeswitch(btn) {
      if (light) {
            btn.className = "fas fa-moon";
            document.body.style.backgroundColor = "#f9f9f9";
            document.body.style.color = "#676767";
            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                  links[i].style.color = "#525252";
            }
            light = false;
      } else {
            btn.className = "fas fa-sun";
            document.body.style.backgroundColor = "#18191a";
            document.body.style.color = "#828687";
            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                  links[i].style.color = "#dbdbdb";
            }
            light = true;
      }
}