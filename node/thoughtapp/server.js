var mysql = require('mysql');
// Let’s make node/socketio listen on port ;3000
var io = require('socket.io').listen(3010);
// Define our db creds
var db = mysql.createConnection({
    host: '68.178.143.96',
    user: 'thoughtdb',
    password: "Emac!2014",
    database: 'thoughtdb'
});
 
// Log any errors connected to the db
db.connect(function(err){
    if (err) console.log(err);
});
 
// Define/initialize our global vars

var socketCount = 0;
var thoughts = null;

io.sockets.on('connection', function(socket){
    // Socket has connected, increase socket count
    socketCount++;
    // Let all sockets know how many are connected
    io.sockets.emit('users connected', socketCount);
 
    socket.on('disconnect', function() {
        // Decrease the socket count on a disconnect, emit
        socketCount--;
        io.sockets.emit('users connected', socketCount);
    });
 /*
    socket.on('new note', function(data){
        // New note added, push to all sockets and insert into db
        thoughts.push(data)
        io.sockets.emit('new note', data)
        // Use node's db injection format to filter incoming data
    })
*/ 
    // Check to see if initial query/thoughts are set
        // Initial app start, run db query
 });

function checkforthoughts() {
    thoughts = null; // reset thoughts 
    db.query('SELECT * FROM thought WHERE 1 ORDER BY thoughtdate DESC LIMIT 1,10')
        .on('result', function(data){
            // Push results onto the thoughts array
            thoughts = data;
        })
        .on('end', function(){
            // Only emit thoughts after query has been completed
            io.sockets.emit('thoughts', thoughts);
        });

    setTimeout(function() {
        checkforthoughts();
    }, 10000);
}

checkforthoughts();