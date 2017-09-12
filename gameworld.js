
const IPFS = require('ipfs')
const path = require('path')
const os = require('os')
const fs = require('fs')



let assetModelPaths = []
let localTiles = [[]]

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


        assetModelPaths = findAssetModelPaths()



        localTiles = [[]] // a double array.. x and y coordinates





          initWorld(localTiles,assetModelPaths);



  }
}



function findAssetModelPaths()
{

        let assets_path = path.resolve(__dirname, '.', 'assets');

        let models_path = assets_path + "/" + "models"

        const { lstatSync, readdirSync } = require('fs')
        const { join } = require('path')

        const isDirectory = source => lstatSync(source).isDirectory()
        const getDirectories = source =>
          readdirSync(source).map(name => join(source, name)).filter(isDirectory)

        let directory_list = getDirectories(models_path);


        return directory_list;
}


const timeout = ms => new Promise(res => setTimeout(res, ms))


async function initWorld(localTiles,assetModelPaths)
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

await timeout(1000) //hacky


  console.log('waterfallz ')
    await(loadSampleTileData(node,localTiles));


    console.log('starting game world ')
   var socketServ = await(initSocketServer( localTiles , assetModelPaths ));

}


async function loadSampleTileData(ipfs_node,localTiles)
{



  //entity_list.push({entity_id:0, geometry:"primitive: box",material:"color:red",position:"-1 0.5 -3", rotation:"0 45 0"})

  localTiles[1] = []

  var has_file_cached = hasJSONFileCachedLocally("QmaF9f8ifiRbefogmdnpvTsjWQ9oMaoPnEJWUaVBjaJbuu")

  console.log('has files cached')
  console.log(has_file_cached)

  if(!has_file_cached)
  {
    var downloaded_file = await(downloadAndCacheIPFSFile(ipfs_node,"QmaF9f8ifiRbefogmdnpvTsjWQ9oMaoPnEJWUaVBjaJbuu"));
  }

    var parsed_data = await( parseJSONFileFromCache("QmaF9f8ifiRbefogmdnpvTsjWQ9oMaoPnEJWUaVBjaJbuu") )

      console.log("load ipfs tile ")
     var sample_tile_data = parsed_data;
  //  var sample_tile_data = await (loadSampleLandTile(ipfs_node,"Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R"));
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


async function downloadAndCacheIPFSFile(ipfs_node,multihash,callback)
{

    var result;


console.log(multihash)


//when the file isnt on IPFS this causes an  unhandled promise error- we should properly handle it 
var wstream =  fs.createWriteStream(os.tmpdir() + '/lobc_cache/'+multihash);

var promise = ipfs_node.files.cat(multihash, function (err, filestream) {
    console.log('err')
    console.log(err)

    wstream.on('error', function() {
     console.log('w error');
       wstream.close() ;
    });

    wstream.on('finish', function() {
     console.log('Written ' + wstream.bytesWritten + ' ' + wstream.path);
       wstream.close() ;
    });

     filestream.pipe(wstream);



})


/*
  let sha1sum = await prom.catch(function(reason) {
     console.log('promise catch')
     console.log(reason)
  });
  */

  console.log('result')
  console.log(result)



    return result;


}

async function loadSampleLandTile()
{
  var fs = require('fs');
  var obj;

  var file_path = "./public/sample_land_file.json"


    return JSON.parse(fs.readFileSync(file_path, 'utf8'));


}


 function hasJSONFileCachedLocally(multihash)
{

    let temp_dir = (os.tmpdir() + '/lobc_cache/');
      let filename = (temp_dir + multihash );

    var fs = require('fs');
    if (fs.existsSync(filename)) {
      return true
    }

    return false

}


async function parseJSONFileFromCache(multihash)
{
  let temp_dir = (os.tmpdir() + '/lobc_cache/');
  let filename = (temp_dir + multihash );

  let result = require('fs').readFileSync(filename, 'utf8');

  console.log('my result ')
  console.log(result)

  let data  = JSON.parse(result);

  return data;

}

/*
async function getFilesFromDirectory(multihash)
{

  let temp_dir = (os.tmpdir() + '/lobc_cache/');

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  })


}


function downloadAndCacheIPFSFile(multihash)
{

  let temp_dir = (os.tmpdir() + '/lobc_cache/');

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  })


}*/




function initSocketServer( localTiles, assetModelPaths )
{
  var server = require('http').createServer();
  var io = require('socket.io')(server);
  io.on('connection', function(client){
    client.emit('connect', { hello: 'world' });

    console.log(localTiles[1][2])


    assetModelPaths.forEach(function(element)
    {
      client.emit('registerModel', element)
    });


    let entities_count = localTiles[1][2].tile_data.entities.length;

    localTiles[1][2].tile_data.entities.forEach(function(element)
    {
      client.emit('spawnEntity', element  );

    });


    client.on('event', function(data){
      console.log(data)
    });
    client.on('disconnect', function(){});
  });
  server.listen(3010);

}


module.exports = GameWorld;
