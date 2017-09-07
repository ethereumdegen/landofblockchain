
let localPlayer = {}

  spawnPlayer(localPlayer)

  var socket = io('http://localhost:3000');
  socket.on('connect', function (data) {
    console.log(data);
    socket.emit('event', { player: localPlayer });
  });

  socket.on('spawnEntity', function (data) {
    console.log('spawning entity');
    console.log(data);
  });



  function spawnPlayer(p)
  {
    console.log('spawning player')

    var spawnLoc = getSpawnLoc();
    p.x = spawnLoc.x;
    p.y = spawnLoc.y;
  }

  function getSpawnLoc()
  {
    return {x: 5.0, y: 5.0}
  }
