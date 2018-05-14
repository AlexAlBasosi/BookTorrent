var cloudantConnection = require('../models/models');

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

exports.get_document = function(req, res){
    var id = req.params.documentID;

    db.get(id, function(err, data){
        res.send(data);
    });
};

exports.insert_document = function(req, res){
    var name = req.query.name;
    var id = req.query.id;

    db.insert({
        name: name,
    }, id, function(err, doc){
        if(err){
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};
