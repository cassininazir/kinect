// kinect
function loaded() {
  var u = 0;
  var radardiv = $('#radar')[0]; 
  var timer = 0;
  var radar = {

    onuserfound: function (user) {
      var userdiv = document.createElement('div');
      userdiv.className = 'user';
      user.radarelement = userdiv; // add the radarelement property to the user object
      radardiv.appendChild(user.radarelement);
      u++; //increment each time new user is found
      $("#total span").html(u); //tell us how many users
      // get thoughts via json file
     $.ajax({
        url: 'data.json',
        dataType: 'json',
        type: 'GET',
        success: function(json) {
          var totalthoughts = json.thought.length;
          for (var i = 0; i < json.thought.length; i++) {
            var thought = json.thought[u].thoughttext;
          };
            var len = thought.length;
            var wrapper = '<li id="uuid'+user.id+'"><div class="th">'+thought+'</div><iframe src="bubbles/small.html" allowTransparency="true" scrolling="no"></iframe></li>';
          $("#blur").append((wrapper));
        },
        error: function () {
          alert("I am sorry, But I can't fetch that feed");
        }
      });
    },


    onuserlost: function (user) {
      $("#uuid"+user.id+" iframe").addClass("fadeitout");
      $("#uuid"+user.id).delay(800).addClass("fadeitout");
      radardiv.removeChild(user.radarelement);
      timer = 0;
    },
    
    ondataupdate: function (zigdata) {
      for (var userid in zigdata.users) {
        var user = zigdata.users[userid];
        var pos = user.position;
        var el = user.radarelement;
        var parentElement = el.parentNode;
        var zrange = 8000;
        var xrange = 8000;
        var pixelwidth = parentElement.offsetWidth;
        var pixelheight = parentElement.offsetHeight;
        var heightscale = pixelheight / zrange;
        var widthscale = pixelwidth / xrange;
        el.style.left = (((pos[0] / xrange) + 0.5) * pixelwidth - (el.offsetWidth / 2)) + "px";
        el.style.top = ((pos[2] / zrange) * pixelheight - (el.offsetHeight / 2)) + "px";

        var ypos = user.skeleton[zig.Joint.Head].position[1];
        var xpos = user.skeleton[zig.Joint.Head].position[0];
        // create some blur
       // (ypos < 0) ? ypos = ypos * -1 : ypos = ypos * 2;
       // (xpos < 0) ? xpos = xpos * -1 : xpos = xpos * 2;
        
        //console.log(xpos);
        var str = parseInt(el.style.top);
        //str = str.substring(0, str.length - 2);
        if (str>0) {
          var blurfactor = Math.abs((str/(1))-2);
          //console.log(blurfactor*.1);
          var amt = "-webkit-filter:blur("+blurfactor*.1+"px)";
          var ycoord = "top:"+ypos+"px; ";
          var xcoord = "left:"+xpos/10+"px; ";
          var coords = "position: absolute; " + ycoord + xcoord;
          $("#uuid"+user.id+" iframe").attr("style", amt)
          $("#uuid"+user.id).attr("style", coords);
        }
      }
    }
  };
  zig.addListener(radar);
}
document.addEventListener('DOMContentLoaded', loaded, false);
