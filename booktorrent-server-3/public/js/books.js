var bookArr = [];

var getBooksServer1 = "https://booktorrent-server-1.mybluemix.net/books";

$.ajax({
    url: getBooksServer1,
    type: 'GET',
    success: function(res1) {
        for(i in res1){
            bookArr.push(res1[i]);
        }

        var getBooksServer2 = "https://booktorrent-server-2.mybluemix.net/books";

        $.ajax({
            url: getBooksServer2,
            type: 'GET',
            success: function(res2) {
                for(i in res2){
                    bookArr.push(res2[i]);
                }

                // var getBooksServer3 = "https://booktorrent-server-3.mybluemix.net/books";

                // $.ajax({
                //     url: getBooksServer3,
                //     type: 'GET',
                //     success: function(res3) {
                //         for(i in res3){
                //             bookArr.push(res3[i]);
                //         }

                //         console.log(bookArr);
                //     }
                // });

                if(bookArr.length <= 1){
                    var noBooksTag = document.createElement("h6");
                    noBooksTag.innerHTML = "There are no books to load.";
                    document.getElementsByClassName('.list-group').appendChild(noBooksTag);
                }else{
                    bookArr.forEach(function(book){
                        var bookDetails = book.title + " by " + book.author;
                        var button = document.createElement("button");
                        button.className = "list-group-item";
                        button.innerHTML = bookDetails;
                        button.id = book.id;
                        button.setAttribute('key', book.keys);
                        button.setAttribute('server', book.server);
                        document.querySelector('.list-group').appendChild(button);
                    });

                    var btns = document.getElementsByClassName('list-group-item');

                    console.log(btns);


                   Array.from(btns).forEach(function(btn){
                        btn.addEventListener('click', function(event){

                            var serverNumber = btn.attributes.item(3).nodeValue;
                            if(serverNumber === "1"){
                                accountNumber = "ffdbafdd-6cf1-450a-8567-3d001def235e";
                            }else if(serverNumber === "2"){
                                accountNumber = "73797990-0575-4320-b4d9-f37cedb6eb92";
                            }else{
                                accountNumber = "93c96188-9392-40fb-b9af-1813b74fb972";                       
                            }

                            var id = btn.attributes.item(1).nodeValue;
                            var key = btn.attributes.item(2).nodeValue;

                            console.log("serverNumber: " + serverNumber);
                            console.log("accountNumber: " + accountNumber);
                            console.log("id:" + id);
                            console.log("key:" + key);

                            var dbDURL = "https://" + accountNumber + "-bluemix.cloudant.com/index/" + id + "/" + key;

                            document.location.href = dbDURL;
                        });
                    });
    
                }
            }
        });
    }
});

    
