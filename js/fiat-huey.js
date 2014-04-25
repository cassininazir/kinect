// kinect

var _ = function(){};
_.removeFromArray = function(array, item) {
  var index = array.indexOf(item);

  if (index > -1) {
    array.splice(index, 1);
  }
};
var usedids = [];

function loaded() {
  var u = 0;
  var radardiv = $('#radar')[0]; 

  var radar = {

    onuserfound: function (user) {
      var userdiv = document.createElement('div');
      userdiv.className = 'user';
      user.radarelement = userdiv; // add the radarelement property to the user object
      radardiv.appendChild(user.radarelement);
      u++; //increment each time new user is found
      $("#total span").html(u); //tell us how many users
      // get thoughts via json file
      var newfound = null;
      var thought = null;
   //   var newfoundtotal = 0;
      

      function getthought() {
         for (i=0; i < tobeprojected.length; i++) {
          var item = tobeprojected[i].id;
          if (usedids.indexOf(item) == -1) {
            newfound = tobeprojected[i];
            console.log('new' +newfound);
          break;
          }
        }

        if (newfound) {
          thought = newfound.thoughttext;
          socket.emit('huey', newfound.id);
          usedids.push(newfound.id);
//          $('#alert').html('<span class="newfoundtotal">'+newfoundtotal+'</span>');
          newfound = null;
        } 
        else {
          if (tobeprojected.length > 0 ){
            var randomthought = Math.round(Math.random() * (tobeprojected.length-1));
            thought = tobeprojected[randomthought].thoughttext;
          }
        }
      }

      if (currentprojected[1].thought == null ){
        getthought(); 
      }
      else {
        var toberemoved = [];
        for (i=0; i < tobeprojected.length; i++) {
          var item = tobeprojected[i].id;

          if (currentprojected[1].thought == item){
            toberemoved.push(tobeprojected[i]);
          }
        }
        for (i=0; i < toberemoved.length; i++) {
          _.removeFromArray(tobeprojected, toberemoved[i]);
        }
        getthought();
      }
     var wrapper = '<li id="uuid'+user.id+'"><div class="th" style="z-index:'+(100000+u)+'"><p>'+thought+'</p></div><iframe src="bubbles/medium.html" allowTransparency="true" scrolling="no" style="z-index:'+(99999+u)+'"></iframe></li>';
     $("#blur").append((wrapper));
    },


    onuserlost: function (user) {
      $("#uuid"+user.id+" iframe").addClass("fadeitout").delay(4100).queue(function() {
        $(this).remove();
       // $(this).dequeue();
      });
      $("#uuid"+user.id +" .th").delay(800).addClass("fade");
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
        var zpos = user.skeleton[zig.Joint.Head].position[2];

        var yfactor = 1400;
        var xfactor = null;
        var zfactor = 4000;
        
        console.log(zpos);
        // x factor -- reset coordinates to absolute positioning
        if (xpos < 0) {
           xfactor = (Math.abs(xpos)) + 1450
        } else {
          xfactor = Math.abs(xpos-1450)
        }
        
        yfactor = ((zpos-4600)/2000)*-100;

        

        // create some blur
       // (ypos < 0) ? ypos = ypos * -1 : ypos = ypos * 2;
       // (xpos < 0) ? xpos = xpos * -1 : xpos = xpos * 2;
        
        //console.log(yfactor);
        //str = str.substring(0, str.length - 2);

          
          //console.log(blurfactor*.1);
          var blurfactor = (yfactor * .1);
          console.log(blurfactor);
          var amt = "-webkit-filter:blur("+blurfactor*.1+"px)";
          var ycoord = "top:" +(yfactor-20)+"%; ";
          var xcoord = "left:" + ((xfactor / 3400) * 100) +"%; ";
          //console.log(xcoord);
          var coords = "position: absolute; " + ycoord + xcoord + "-webkit-filter:blur("+(blurfactor-2)*.7+"px)";
          $("#uuid"+user.id+" iframe").attr("style", amt)
          $("#uuid"+user.id).attr("style", coords);
      }
    }
  };
  zig.verbose = true;
  zig.addListener(radar);
  updatenotification();
}

function updatenotification() {
  var total = 0;
  for (i=0; i < tobeprojected.length; i++) {
    var item = tobeprojected[i].id;
    if (usedids.indexOf(item) == -1) {
      total++;
    }
  }  
  $('#alert').html('<span class="newfoundtotal">'+total+'</span>');  
  setTimeout(function() {
    updatenotification();
  }, 10000);
}
document.addEventListener('DOMContentLoaded', loaded, false);
