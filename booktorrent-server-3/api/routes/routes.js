module.exports = function(app) {
    var bookcontroller = require('../controllers/bookcontroller');
    
    app.route('/books')
        .get(bookcontroller.get_all_books)

    app.route('/book/:bookID')
        .get(bookcontroller.get_book)

    app.route('/book')
        .post(bookcontroller.insert_book)
};