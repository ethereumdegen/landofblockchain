![](https://decentraland.org/favicon.ico)

# Decentraland ReVolt ⚡ Alternate Client

These centralized websites were taken down.
- World Viewer: https://decentraland.org/app
- Builder: https://decentraland.org/builder


This alternate client uses the same underlying land data and smartcontracts for Decentraland. This desktop-based (Electron) open-source client will include AFrame and more modern web technologies in order to allow landowners to build content more seamlessly in a more light-weight format that does not depend on Unity.


## Bronze Age Client Information 

The bronze age client is just a closed source (pre-compiled??) Unity scenegraph with no desktop client and no local networking.

## Revolt Client Spec 

The Revolt client will be desktop based, using Electron, and it will use AFrame to render the AFrame script that has been associated to each plot of land on IPFS (and/or other mediums such as bittorrent and centrally hosted land nodes).  

## Running the Desktop Client   

To clone and run this repository you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:

   First, clone the repo with 
 
   ```
   https://github.com/admazzola/decentraland-revolt-web
   ```
   
   Then, enter the directory for the Electron app, install required packages, and start the Node.js app
   
   ```
   cd desktop
   npm install
   npm start
   ```
    
## Server Node 

Please see the server node codebase at:

https://github.com/admazzola/decentraland-revolt-node

