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