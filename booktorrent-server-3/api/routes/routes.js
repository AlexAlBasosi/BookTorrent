module.exports = function(app) {
    var documentcontroller = require('../controllers/documentcontroller');

    app.route('/document')
        .post(documentcontroller.insert_document)
    
    app.route('/document/:documentID')
        .get(documentcontroller.get_document)
};