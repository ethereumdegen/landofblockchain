
const IPFS = require('ipfs')
const path = require('path')
const os = require('os')


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





          initWorld(localTiles);



  }
}

const timeout = ms => new Promise(res => setTimeout(res, ms))


async function initWorld(localTiles)
{

  const node = new IPFS({
    repo: path.join(os.tmpdir() + '/' + new Date().toString()),
        config: {
            Addresses: {
                Swarm: [
                    '/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss'
                ]
            }
        }
    })
    var running_node = await(node.on('start', () => {}));
      console.log('waterfalls ')
var running_node = await(node.on('ready', () => {}));

await timeout(8000) //hacky


  console.log('waterfallz ')
    await(loadSampleData(node,localTiles));


    console.log('starting game world ')
   var socketServ = await(initSocketServer( localTiles ));



}


async function loadSampleData(ipfs_node,localTiles)
{



  //entity_list.push({entity_id:0, geometry:"primitive: box",material:"color:red",position:"-1 0.5 -3", rotation:"0 45 0"})

  localTiles[1] = []

      console.log("load ipfs tile ")
    //  var sample_tile_data = await (loadIPFSLandTile(ipfs_node,"Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R"));
    var sample_tile_data = await (loadSampleLandTile(ipfs_node,"Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R"));
   localTiles[1][2] = sample_tile_data




    console.log("VOLACNO")
      console.log(sample_tile_data)

    return localTiles;



}


function apiOn(parent,event) {
  return new Promise(resolve => {
    parent.on(event, response => resolve(response));
  });
}


async function loadIPFSLandTile(ipfs_node,multihash)
{

    var result;


console.log(multihash)

/*
try {


  ipfs_node.files.get(multihash, function (err, stream) {
  console.log('whale')

    stream.on('data', (file) => {
      // write the file's path and contents to standard out
      console.log(file.path)
      file.content.pipe(process.stdout)
    })
  })

} catch(e) {
  throw e.message;
}*/


console.log("cat1")



  var prom = ipfs_node.files.get(multihash,function (err, stream){
    console.log('whale1')


    stream.on('data', (file) => {
     // write the file's path and contents to standard out
     console.log(file.path)
     console.log('getting data of file ')
     file.content.pipe(process.stdout)


   }),
    stream.on('end', (file) => {

      console.log('final output ' + file);

      result = file;
      return result;
   })


  });
  console.log(prom) //this is a promise with a stream inside






  let sha1sum = await prom;
  console.log('result')
  console.log(result)

/*
    var cat =   await ipfs_node.files.cat(multihash, function (err, stream) {
         stream.on('data', (file) => {
          // write the file's path and contents to standard out
          console.log(file.path)
          console.log('getting data of file ')
          file.content.pipe(process.stdout)


        }),
         stream.on('end', (file) => {

           console.log('final output ' + file);

           result = file;
        }
    )
  })*/

    return result;


}

async function loadSampleLandTile()
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
