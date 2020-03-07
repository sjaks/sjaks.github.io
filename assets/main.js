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