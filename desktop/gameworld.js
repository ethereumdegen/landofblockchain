
class GameWorld
{

  //game world tiles and their inner contents


  /*
    Each tile has properties: {x, y, owner_address}
      Each tile has many entities

    Each entity has the following properties: {id, class, light, geometry, material}

  */

  constructor()
  {

        let localTiles = [[]] // a double array.. x and y coordinates

        localTiles = generateSampleData()
        console.log('starting game world ')

        initSocketServer( localTiles );
  }
}


function generateSampleData()
{
  let result = [[]]

  let entity_list = []

  entity_list.push({geometry:"primitive: box",material:"color:red",position:"-1 0.5 -3", rotation:"0 45 0"})

  result[1] = []
  result[1][2] = {x:1,y:2,entity_list}

  return result;
}

function initSocketServer( localTiles )
{

  var server = require('http').createServer();
  var io = require('socket.io')(server);
  io.on('connection', function(client){
    client.emit('connect', { hello: 'world' });
    client.on('event', function(data){
      console.log(data)
    });
    client.on('disconnect', function(){});
  });
  server.listen(3000);

}


module.exports = GameWorld;
