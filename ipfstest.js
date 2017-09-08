
const IPFS = require('ipfs')
const path = require('path')
const os = require('os')
const fs = require('fs')

console.log('ipfs test ')


var mhash = "Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R";


// Create the IPFS node instance
const node = new IPFS()

node.on('ready', () => {

  // Your node is now ready to use \o/


    console.log('NODE READY')

  /*
        const files = [
      {
        path: '/public/sample_land_file.json',
        content:  fs.readFileSync( path.join(__dirname, '.', '/public/sample_land_file.json') ) // Buffer.from('some data')
      }
    ]

  node.files.add(files, function (err, files) {
      // 'files' will be an array of objects
      console.log('meep1')
        console.log(files)
    })*/


/*
THIS WORKS
    var test_rstream = fs.createReadStream( path.join(__dirname, '.', '/public/sample_land_file.json') )
    var wstream =  fs.createWriteStream(os.tmpdir() + '/lobc_cache/'+'Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R');


      wstream.on('finish', function() {
       console.log('Written ' + wstream.bytesWritten + ' ' + wstream.path);
         test_rstream.close()
      });

       test_rstream.pipe(wstream);

*/






  // stopping a node
  node.stop(() => {
    // node is now 'offline'
  })
})


node.on('start', () => {

  console.log('NODE START')

  node.files.cat("Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R", function (err, filestream) {
      console.log('err')
      console.log(err)



        console.log('WHY ISNT CAT FIRING ')
      console.log(filestream)


/*
      console.log(os.tmpdir())


      if (!fs.existsSync(os.tmpdir() + '/lobc_cache')){
        fs.mkdirSync(os.tmpdir() + '/lobc_cache');
      }

      var wstream =  fs.createWriteStream(os.tmpdir() + '/lobc_cache/'+'Qmc5LfkMVAhvzip2u2RjRBRhgVthtSokHsz4Y5bgaBCW2R');



      result   = '';


        wstream.on('finish', function() {
         console.log('Written ' + wstream.bytesWritten + ' ' + wstream.path);
           filestream.close()
        });


              filestream.pipe(wstream);
          */
  })



})
