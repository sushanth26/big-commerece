window.onload = function() {
    // this should probably some rest call to a server
    $.getJSON('./data.json', function(data) {
        if (data.showWelcomeMessage) {
            $.get('./templates/welcomeMsg.mst', function(template) {
                var rendered = Mustache.render(template, data);
                $('#cards').append(rendered)
            })
        }
        if (data.books && data.books.length) {
            $.get('./templates/books.mst', function(template) {
                var rendered = Mustache.render(template, data);
                $('#cards').append(rendered)
            })
        }
        if (data.feeds && data.feeds.length) {
            $.get('./templates/feeds.mst', function(template) {
                var rendered = Mustache.render(template, data);
                $('#cards').append(rendered)
            })
        }
    })
}

 function myFunction () {
    document.getElementById("welcome").remove();
}

var showForm = function() {
    $('#main').addClass('hidden');
    $('#newBook').removeClass('hidden');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$('#addNewBook').on('click', function(e) {
    e.preventDefault();
    var data = {};
    $("form").serializeArray().map(function(x){data[x.name] = x.value;});
    var newBook = {
        id: getRandomInt(100, 200),
        title: data.name,
        author: {
            firstName: data.author.split(' ')[0],
            lastName: data.author.split(' ')[1]
        },
        cover: {
            img: "http://placehold.it/100x165/2222CC/EEE"
        }
    }
    $.get('./templates/books.mst', function(template) {
        var rendered = Mustache.render(template, {books: [newBook]});
        $('#cards').append(rendered);
        $('#main').removeClass('hidden');
        $('#newBook').addClass('hidden');
    })
});