
const IPFS = require('ipfs')
const path = require('path')
const os = require('os')
const fs = require('fs')

console.log('ipfs test ')


//var mhash = "QmRZZJ7soUkzFhFPEtgXgjh7WyMfHTrQz8vaCS57rXorma";


// Create the IPFS node instance
const node = new IPFS()

node.on('ready', () => {

  // Your node is now ready to use \o/


    console.log('NODE READY')

    const files = [
  {
    path: '/public/sample_land_file.json',
    content:  fs.readFileSync( path.join(__dirname, '.', '/public/sample_land_file.json') ) // Buffer.from('some data')
  }
]

let add_file = true

if(add_file)
{

  node.files.add(files, function (err, files) {
    // 'files' will be an array of objects
    console.log('meep1')
      console.log(files)
  })


}


var wstream =  fs.createWriteStream(os.tmpdir() + '/lobc_cache/'+'QmaF9f8ifiRbefogmdnpvTsjWQ9oMaoPnEJWUaVBjaJbuu');

node.files.cat("QmaF9f8ifiRbefogmdnpvTsjWQ9oMaoPnEJWUaVBjaJbuu", function (err, filestream) {
    console.log('err')
    console.log(err)



      console.log('WHY ISNT CAT FIRING ')
    console.log(filestream)


    wstream.on('finish', function() {
     console.log('Written ' + wstream.bytesWritten + ' ' + wstream.path);
       wstream.close() ;
    });

     filestream.pipe(wstream);



})



  // stopping a node
  node.stop(() => {
    // node is now 'offline'
  })
})


node.on('start', () => {

  console.log('NODE START')


})
