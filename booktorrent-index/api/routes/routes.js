module.exports = function(app) {
    var bookcontroller = require('../controllers/bookcontroller');
    
    app.route('/books')
        .get(bookcontroller.get_books)
};