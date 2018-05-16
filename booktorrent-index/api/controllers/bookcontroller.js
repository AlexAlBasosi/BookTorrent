var cloudantConnection = require('../models/models');
var request = require('request');

var db;
var cloudant;

var dbCredentials = {
  dbName: 'index'
};

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = cloudantConnection(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set
  
        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = cloudantConnection(fs.readFileSync("vcap-local.json", "utf-8"));
    }
  
    cloudant = require('cloudant')(dbCredentials.url);
  
    // check if DB exists if not create
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });
  
    db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();

exports.get_books = function(req, res){
    
    request({
        uri: "http://booktorrent-server-1.mybluemix.net/books",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
      }, function(error, response, body) {
        if(error){
            res.send(error);
        }else{
            res.send(body);
        }
      });
};

exports.get_account_number = function(req, res){
    var id = req.params.id;

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.header('Access-Control-Allow-Credentials', true); // If needed

    if(id === "1"){
        res.send("ffdbafdd-6cf1-450a-8567-3d001def235e");
    } else if(id === "2"){
        res.send("73797990-0575-4320-b4d9-f37cedb6eb92");
    } else if(id === "3"){
        res.send("93c96188-9392-40fb-b9af-1813b74fb972");
    }
};
