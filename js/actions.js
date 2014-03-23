function loaded() {
    var radardiv = $("radar");

    var rardar = {
    	onuserfound: function (user) {
    		console.log('running onnewuser user');
    		var userdiv = document.createElement('div');
            userdiv.className = 'user';
            user.radarelement = userdiv; // add radarelement as a property of the user
            radardiv.appendChild(user.radarelement);
    		var userdiv = $("radar").append("<div class='user'></div>");
    	},
    	onuserlost: function (user) {
    		console.log('running onlostuser in radar')
    	},
    	ondataupdate: function (zig) {
    		for (var user in zigdata.users) {
    			var user = zigdata.users[userid];
    			var post = user.position;
    			var el = user.radarelement;
    			var parentElement = el.parentNode;
    			var zrange = 4000;
    			var xrange = 4000;
    			var pixelwidth = parentElement.offsetWidth;
	        var pixelheight = parentElement.offsetHeight;
	        var heightscale = pixelheight / zrange;
	        var widthscale = pixelwidth / xrange;
	        el.style.left = (((pos[0] / xrange) + 0.5) * pixelwidth - (el.offsetWidth / 2)) + "px";
	        el.style.top = ((pos[2] / zrange) * pixelheight - (el.offsetHeight / 2)) + "px";
    		}
    	}
    }
    zig.addListener(radar);
}

document.addEventListener('DOMContentLoaded', loaded, false);