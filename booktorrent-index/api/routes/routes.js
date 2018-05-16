module.exports = function(app) {
    var bookcontroller = require('../controllers/bookcontroller');
    
    app.route('/books')
        .get(bookcontroller.get_books)
    
    app.route('/books/:id')
        .get(bookcontroller.get_account_number)
};