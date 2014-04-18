var codexStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var codexInt = [];
for(var i = 0; i < 256; i++) {
  var idx = codexStr.indexOf(String.fromCharCode(i));
  codexInt[i] = idx;
}
var Base64 =
{
    // assuming that the input string encodes a number of bytes divisible by 3
    decode : function (input)
    {
        var output = new Array(input.length*3/4);
        var inLength = input.length;
        var outIndex = 0;
        for (var i = 0; i < inLength; i += 4) {
            var enc1 = codexInt[input.charCodeAt(i)];
            var enc2 = codexInt[input.charCodeAt(i+1)];
            var enc3 = codexInt[input.charCodeAt(i+2)];
            var enc4 = codexInt[input.charCodeAt(i+3)];

            var chr1 = (enc1 << 2) | (enc2 >> 4);
            var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var chr3 = ((enc3 & 3) << 6) | enc4;
            

            output[outIndex] = chr1;
            output[outIndex+1] = chr2;
            output[outIndex+2] = chr3;
            outIndex += 3;
        }

        return output;
    }
}
function addListener(domobject, eventname, func) {
  if (domobject.attachEvent) {
    domobject.attachEvent('on' + eventname, func);
  } else {
    domobject.addEventListener(eventname, func, false);
  }
}

function ZigPluginLoaded() {

    var pluginObj = document.getElementById("ZigPlugin");
    i = 0;
    var handleFrameNoLabel = function(u) { i++; drawDM(pluginObj);drawIM(pluginObj); };
    var handleFrame = function(u) { i++; drawDM(pluginObj);drawIM(pluginObj);drawLM(pluginObj); };
    var hasLabelmap = false;
    try{
      pluginObj.requestStreams(true, true, false);
    } catch(e) {
      console.log('new style plugin');
      pluginObj.requestStreams({updateDepth: true, updateImage: true, updateLabelMap : true});
      hasLabelmap = true;
    }
    if (!hasLabelmap) {
      addListener(pluginObject, "NewFrame", handleFrameNoLabel);
    } else {
      addListener(pluginObj, "NewFrame", handleFrame);
      document.getElementById('labelCan').style.cssText = '';
    }

  }
function drawDM(plugin) {
    var dm = plugin.depthMap;
    if (dm.length == 0) return;
    var canv = document.getElementById('depth');
    var ctx = canv.getContext('2d');
    var pix = ctx.createImageData(160,120);
    var data = pix.data;
    var srcData = Base64.decode(dm);
    for(var i = 0; i < 160*120; i++) {
      data[i*4 + 1] = srcData[i*2];
      data[i*4 + 2] = srcData[i*2 + 1] << 3;
      data[i*4 + 3] = 255;
    }
    ctx.putImageData(pix, 0, 0);
  }
  function drawIM(plugin) {
    var im = plugin.imageMap;
    if (im.length == 0) return;
    var canv = document.getElementById('image');
    var ctx = canv.getContext('2d');
    var pix = ctx.createImageData(160,120);
    var data = pix.data;
    var srcData = Base64.decode(im);

    for(var i = 0; i < 160*120; i++) {
      data[i*4] = srcData[i*5];
      data[i*4 + 1] = srcData[i*3 + 1];
      data[i*4 + 2] = srcData[i*3 + 2];
      data[i*4 + 3] = 255;
    }
    ctx.putImageData(pix, 0, 0);
  }

  function drawLM(plugin) {
        var lm = plugin.labelMap;
        if (lm.length == 0) return;
        var canv = document.getElementById('labelMap');
        var ctx = canv.getContext('2d');
        var pix = ctx.createImageData(160,120);
        var data = pix.data;
        var srcData = Base64.decode(lm);
        var pixel = 0;
        var col = 0;
        for(var i = 0; i < 160*120; i++) {
            pixel = srcData[i*2] | (srcData[i*2 + 1] << 3);
            if (pixel != 0) {
                data[i*4] = 255;
                col = pixel % 16;
                data[i*4 + 1] = col*16;
                data[i*4 + 2] = ((col+8) % 16)*16;
                
            }
            data[i*4 + 3] = 255;
            
        }
        ctx.putImageData(pix, 0, 0);
    }

var socket;
var host;

var currentRoomName = localStorage.getItem("currentRoomName");
if (null == currentRoomName) currentRoomName = "[ZigFu Demo]";  

function roomStarted(roomData) {
  host.on('goto', function(data) { goto(data); });
}



//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
