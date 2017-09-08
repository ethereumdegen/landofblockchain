
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

        localTiles = loadSampleData()
        console.log('starting game world ')

        initSocketServer( localTiles );
  }
}


function loadSampleData()
{
  let result = [[]]

  let entity_list = []

  //entity_list.push({entity_id:0, geometry:"primitive: box",material:"color:red",position:"-1 0.5 -3", rotation:"0 45 0"})

  result[1] = []
  result[1][2] = {x:1,y:2,tile_data: loadSampleLandTile()}

  return result;
}

function loadSampleLandTile()
{
  var fs = require('fs');
  var obj;

  var file_path = "./public/sample_land_file.json"


    return JSON.parse(fs.readFileSync(file_path, 'utf8'));


}


function initSocketServer( localTiles )
{
  var server = require('http').createServer();
  var io = require('socket.io')(server);
  io.on('connection', function(client){
    client.emit('connect', { hello: 'world' });

    console.log(localTiles[1][2])
    client.emit('spawnEntity', localTiles[1][2].tile_data.entities[0]  );


    client.on('event', function(data){
      console.log(data)
    });
    client.on('disconnect', function(){});
  });
  server.listen(3000);

}


module.exports = GameWorld;
