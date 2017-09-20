// This array will contain the subjects of the first four buttons.

var animals = ["Cats", "Dogs", "Fish", "Birds"]

// This function will loop through the array and create buttons for each animal name inside it.

function createButtons() {

	// To avoid repeating buttons, the div containing animal buttons will be emptied when this function is called.
	$("#gif-buttons").empty();

	for (var i = 0; i < animals.length; i++) {

		// Creating a new button element in html.
		var b = $("<button>");

		// Adding a class and data-attribute with a value of the animal the button corresponds to.
		b.addClass("animal");

		b.attr("data-name", animals[i]);

		// The text on the button will also be the name of the animal.
		b.text(animals[i])

		// Each new button will be appended to the "gif-buttons" div.
		$("#gif-buttons").append(b)
	};
}

// This function will call createButtons when the "add-animal" button is clicked.

$("#add-animal").on("click", function(event) {

	// This will prevent the webpage from restarting.
	event.preventDefault();

	// Storing the input from the "new-animal" form in a variable.
	var animalInput = $("#new-animal").val().trim();

	// When a user inputs a new animal name, it will be added to the "animals" array. Then a new button for that animal will be created.
	animals.push(animalInput)

	createButtons();

	$("#new-animal").val("")
})

	// Generating buttons for the initial array of animals.
	createButtons();

// This function will cause an animal button to bring up gifs of that animal from Giphy.

$(".animal").on("click", function(event) {

	// Storing the name of the animal on a given button in a variable.

	var animalType = $(this).attr("data-name")

	// Below are my Giphy API and the URL that will search Giphy for pictures of the animal in animalType.

	var giphyKey = "cb0e018da4bb492b89da79bdc13a1532"
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalType + "&api_key=" + giphyKey + "&limit=10"

	// This AJAX GET request will generate the gifs.

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {

		// The data returned by the API comes in the form of an array, which will be stored in the "results" variable.
		var results = response.data
		console.log(response)

		// Looping over the "results" array and looking for pics with a G or PG rating.
		for (var i = 0; i < results.length; i++) {
			
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

				// Creating a div to hold each gif.
				var gifHolder = $("<div class='animal-gif'>");

				var rating = results[i].rating;

				// Storing the rating of each gif in a variable, which will be added to a paragraph tag.
				var p = $("<p>").text("Rating: " + rating);

				var animalImage = $("<img>");

				// Creating an image tag and giving it the src of an image returned by the API. Note that this version of the image will be static and non-animated.
				animalImage.attr("src", results[i].images.fixed_height_still.url);

				// Appending the new image and paragraph to the "gifHolder" div.
				gifHolder.append(animalImage);
				gifHolder.append(p);

				// Each "gifHolder" div will be prepended to a div on the webpage.
				$("#gif-container").prepend(gifHolder)
			}
		};
	})

})