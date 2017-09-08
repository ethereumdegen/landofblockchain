
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

        const files = [
      {
        path: '/public/sample_land_file.json'
      }
    ]

    node.files.add(files, function (err, files) {
      // 'files' will be an array of objects
      console.log('meep1')
        console.log(files)
    })



    node.files.cat("QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn", function (err, filestream) {
      console.log(err)
          console.log('mee2')
        console.log(filestream)

        console.log(os.tmpdir())


        if (!fs.existsSync(os.tmpdir() + '/lobc_cache')){
          fs.mkdirSync(os.tmpdir() + '/lobc_cache');
        }

        var wstream =  fs.createWriteStream(os.tmpdir() + '/lobc_cache/'+'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn');



        result   = '';


        wstream.on('data', function(data) {
            data += data;
          });

          wstream.on('finish', function() {
           console.log('Written ' + wstream.bytesWritten + ' ' + wstream.path);
          });

          filestream.on('data', function(chunk) {
            result += chunk;
                console.log(result );
          });

          filestream.on('end', function () {
          // do something with "result"
          console.log(result)
          });


                filestream.pipe(wstream);

                wstream.end();
  // file will be a stream containing the data of the file requested
    })

  // stopping a node
  node.stop(() => {
    // node is now 'offline'
  })
})


node.on('start', () => {

  console.log('NODE START')
})
