
function renderButtons() {
    $("#celeb-button-area").empty();
    for (var i = 0; i < theCelebs.length; i++) {
        var a = $("<button class='btn btn-secondary'>");
        a.addClass("celeb");
        a.attr("data-name", theCelebs[i]);
        a.text(theCelebs[i]);
        $("#celeb-button-area").append(a);
        limit = $("#celeb-limit").val();


        $("#celeb-input").val('');
        $("#celeb-gif-rating").val('');

    }
}
$(document.body).on("click", "#add-celeb", function (event) {

    event.preventDefault();
    var newCeleb = $("#celeb-input").val().trim();
    theCelebs.push(newCeleb);
    renderButtons();
});
// 1w0DveqYgV39GL8AP8i2kLnuRMvLVh57
$(document.body).on("click", "button", function () {

    for(var i=0;i<16;i++){
        $(`#${i + 1}`).empty();
    };
    var search = $(this).attr("data-name");
    var limit = $("#celeb-limit").val();
    var xhr = $.get("https://api.giphy.com/v1/gifs/search?" + "q=" + search + "&api_key=dc6zaTOxFJmzC&limit=" + limit + "&rating=G");
    xhr.then(function (response) {
        console.log("success got data", response);
        for (var i = 0; i < limit; i++) {
            $(`#${i + 1}`).empty();
            var gifCountID = i + 1;
            var rowOne = $("<row class='tag-row d-flex justify-content-center'>");
            var rowTwo = $("<row class = 'gif-row d-flex justify-content-center'>");
            var rowThree = $("<row class = 'fav-button-row d-flex justify-content-center'>");
            var widthCheck = response.data[i].images.fixed_height_still.width;
            var gifStill = response.data[i].images.fixed_height_still.url;
            var gifAnimate = response.data[i].images.fixed_height.url;
            var smallGifStill = response.data[i].images.fixed_height_small_still.url;
            var smallGifAnimate = response.data[i].images.fixed_height_small.url;
            var rating = response.data[i].rating;
            var title = response.data[i].title;
            var newGif = $("<div class='d-block gif-area'>");
            rowOne.html(`
                <p> Rating: ${rating} </p>
                `);

            newGif.append(rowOne);
            console.log(widthCheck);
            if (widthCheck > 400) {
                var img = $("<img>")
                img.attr("src", smallGifStill);
                img.attr("data-animate", smallGifAnimate);
                img.attr("data-state", "still");
                img.attr("data-still", smallGifStill);
                img.attr("class", "gif");
                img.attr("id", "gif-" + gifCountID);
                img.attr("data-fav", gifAnimate);
            } else {
                var img = $("<img>")
                img.attr("src", gifStill);
                img.attr("data-animate", gifAnimate);
                img.attr("data-state", "still");
                img.attr("data-still", gifStill);
                img.attr("class", "gif border border-dark");
                img.attr("data-fav", gifAnimate);
            }
            img.attr("id", "gif-" + gifCountID);

            rowTwo.append(img);
            newGif.append(rowTwo);
            rowOne.html(`
                <p> Rating: ${rating} </p>
                `);

            newGif.append(rowOne);
            var favoriteButton = $("<button>");
            favoriteButton.attr("data-gif-to-favorite", gifCountID);
            favoriteButton.addClass("favorite-gif");
            favoriteButton.text("Favorite this GIF");
            rowThree.append(favoriteButton);
            newGif.append(rowThree);



            $(`#${i + 1}`).append(newGif);
        }
    });
});

$(document.body).on("click", ".gif", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

$(document.body).on("click", ".favorite-gif", function () {

    console.log("clicked");

    if (!$(this).attr("data-favorited")) {

        var gifNumber = $(this).attr("data-gif-to-favorite");


        var gifImage = $("#gif-" + gifNumber).attr("data-fav");
        console.log(gifImage);
        var favImage = $("<img>").attr("src", gifImage);

        $("#favorite-section").prepend(favImage);
        $(this).attr("data-favorited", true);
        window.stop();
    }
    else {
        window.stop();
    }
});


var theCelebs = ["Tom Hardy", "Henry Cavil", "Micheal B. Jordan", "Matthew McConaughey", "Ryan Gosling", "Denzel Washington", "Letitia Wright", "Jason Bateman", "Dave Chappelle", "Mark Walhberg", "Daniel Kaluuya", "Tom Cruise"];

renderButtons();

























