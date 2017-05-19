var buttons = ["happy", "excited", "angry", "sad", "surprised", "grossed out", "love"];

function createButtons() {
	$(".panel-body").empty();

	for (i = 0; i < buttons.length; i++) {	
	var newButton = $("<button>");
	newButton.attr("class", "emotionId btn btn-default");

	newButton.attr("data-emotion", buttons[i]);
	newButton.text(buttons[i]);

	$(".panel-body").prepend(newButton);
	}
}

function printGif() {
	var q = $(this).attr("data-emotion");
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + q + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";
	console.log(this);

	$.ajax({
          url: queryUrl,
          method: "GET"
        })
	.done(function(response) {
		console.log(response);

		var results = response.data;

		for (i = 0; i < 10; i++) {
			var still = results[i].images.fixed_height_still.url;
			var gif = results[i].images.fixed_height.url;
			var rating = results[i].rating;

			var newDiv = $("<div>");
			var newGif = $("<img>");
			var newRating = $("<p>");

			newDiv.attr("class", "gifDiv");

			newGif.attr("src", still);
			newGif.attr("alt", "gifs");
			newGif.attr("data-state", "still");
			newGif.attr("data-still", still)
			newGif.attr("data-animate", gif);
			newGif.attr("class", "gif");
			newGif.attr("data-toggle", "tooltip");
			newGif.attr("data-placement", "bottom");
			newGif.attr("title", "Rating: " + rating);

			// newRating.text("Rating: " + rating);

			newDiv.append(newGif);
			// newDiv.append(newRating);

			$("#gifBox").prepend(newDiv);	
			$("#instruction").empty();
		}

	});

}


function makeNewButton() {
	event.preventDefault();

	var newEmotion = $("#addedEmotion").val().trim();
	buttons.push(newEmotion);

	createButtons(newEmotion);
}

function pause() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		      $(this).attr("data-state", "animate");
		$(function () {
 			 $('[data-toggle="tooltip"]').tooltip()
		})      
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		      $(this).attr("data-state", "still");
	}

}


$(document).on("click", ".emotionId", printGif);
$(document).on("click", ".gif", pause);
$(document).on("click", "#submitButton", makeNewButton);


createButtons();
