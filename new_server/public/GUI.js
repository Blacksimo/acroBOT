var elapsed_time;
var max_time_per_round;

var center_right_left = 90;
var center_top_bottom = 40;

var right_left = 15;
var top_bottom = 15;
var left_col = right_col = null;

var positions = ["center", "top_center", "bottom_center", "right_center", "left_center", "top_left", "top_right", "bottom_left", "bottom_right"];
var level = 3;
//var square = document.getElementById("square");
//var circle = document.getElementById("circle");

var round_per_match = 5;
var round = 1;

var knees_positions = ["center", "bottom_center", "right_center", "left_center"];
var wrists_positions = ["top_center", "bottom_center", "right_center", "left_center", "top_left", "top_right", "bottom_right", "bottom_left"];


function countdown() {

	// Set the date we're counting down to
	var count_down = 3;
	document.getElementById("countdown").innerHTML = count_down;
	// Update the count down every 1 second
	setInterval(function() {

	  // Find the distance between now and the count down date
	  count_down -= 1;
	    
	  // Output the result in an element with id="demo"
	  document.getElementById("countdown").innerHTML = count_down;
	    
	  // If the count down is over, write some text 
	  if (count_down <= 0) {
	    //clearInterval(x);
	    coundown_text = document.getElementById("countdown");
	    coundown_text.style.left = '40%';
	    coundown_text.style.right = '60%';
	    coundown_text.innerHTML = 'Time' + '&nbsp;' + 'up';
	  }
	}, 1000);

}


function incrementingRound(current_round) {

	document.getElementById("round").innerHTML = 'Round' + '&nbsp;' + current_round.toString();
	$("#round").fadeIn(1000);
	$("#round").fadeOut(3000);
	current_round += 1;

	return current_round;
}
//document.getElementById("line0").innerHTML = "REMEMBER:" + '&nbsp;color&nbsp;represents&nbsp;the&nbsp;RIGHT';

function gamesRules(level, our_figures, right_col, left_col) {

	document.getElementById("line1").innerHTML = right_col.substring(1, right_col.length).toUpperCase() + '&nbsp;color&nbsp;represents&nbsp;the&nbsp;RIGHT';
	document.getElementById("line2").innerHTML = left_col.substring(1, left_col.length).toUpperCase() + '&nbsp;color&nbsp;represents&nbsp;the&nbsp;LEFT';

	if (level <= 2) {

		document.getElementById("line3").innerHTML = 'WRISTS&nbsp;are&nbsp;represented&nbsp;as&nbsp;' + our_figures[0].replace("1", "") + "s";

	} else if (level == 3) {

		document.getElementById("line3").innerHTML = 'WRISTS&nbsp;are&nbsp;represented&nbsp;as&nbsp;' + our_figures[0].replace("1", "") + "s";
		document.getElementById("line4").innerHTML = 'KNEES&nbsp;are&nbsp;represented&nbsp;as&nbsp;' + our_figures[2].replace("1", "") + "s";

	}

	document.getElementById("lineHint").innerHTML =  'Knees&nbspare&nbspPURPLE&nbsp(use&nbspyour&nbspfavorite)';

	$("#rules").fadeIn(0);
	$("#rules").fadeOut(12000);

}


function fromJointToFigure(level) {

	var percentage = Math.random()*100;
	var wrist_figure1 = "";
	var wrist_figure2 = "";
	var knee_figure = "";
	var dict = {};

	if (percentage < 50) {

		if (level == 1) {

			wrist_figure1 = "square1";
			dict["square1Wrist"] = [];
			return [wrist_figure1];

		} else if (level == 2) {

			wrist_figure1 = "square1";
			wrist_figure2 = "square2";
			dict["square1Wrist"] = [];
			dict["square2Wrist"] = [];
			return [wrist_figure1, wrist_figure2, dict];

		} else if (level == 3) {

			wrist_figure1 = "square1";
			wrist_figure2 = "square2";
			knee_figure = "circle1";
			dict["square1Wrist"] = [];
			dict["square2Wrist"] = [];
			dict["circle1Knee"] = [];
			return [wrist_figure1, wrist_figure2, knee_figure, dict];
		}	

	} else {

		if (level == 1) {

			wrist_figure1 = "circle1";
			dict["circle1Wrist"] = [];
			return [wrist_figure1, dict];

		} else if (level == 2) {

			wrist_figure1 = "circle1";
			wrist_figure2 = "circle2";
			dict["circle1Wrist"] = [];
			dict["circle2Wrist"] = [];
			return [wrist_figure1, wrist_figure2, dict];

		} else if (level == 3) {

			wrist_figure1 = "circle1";
			wrist_figure2 = "circle2";
			knee_figure = "square1";
			dict["circle1Wrist"] = [];
			dict["circle2Wrist"] = [];
			dict["square1Knee"] = [];
			return [wrist_figure1, wrist_figure2, knee_figure, dict];
		}

	}

	return [wrist_figure1, wrist_figure2, knee_figure, dict];

} 

function settingRightLeftColors () {

	
	var color_percentage = Math.random()*100;

	if (color_percentage <= 50) {
		right_col = "#red";
		left_col = "#blue";
	} else {
		right_col = "#blue";
		left_col = "#red";
	}
}


function shuffle(array, level) {
  var currentIndex_wrists = wrists_positions.length;//, randomIndex;
  var currentIndex_knees = knees_positions.length;//, randomIndex;
  var randomIndex;



  var array_aux_wrists = wrists_positions.slice();
  var array_aux_knees = knees_positions.slice();
  var reduced_sorted_array = new Array();
  var elem_collected = 1;


  while (elem_collected <= level) {

  	if ( (elem_collected == 1) || (elem_collected == 2) ) {

  		// Pick a remaining element...
  		randomIndex = Math.floor(Math.random() * currentIndex_wrists);
  		
		  var elem = array_aux_wrists[randomIndex];
		  
  		if (reduced_sorted_array.indexOf(elem) >= 0) {

  			//array_aux_wrists.splice(randomIndex, 1);
  			continue;

  		}

  		currentIndex_wrists -= 1;


		  reduced_sorted_array.push(elem);

		  
  		array_aux_wrists.splice(randomIndex, 1);

  		elem_collected += 1;

  	} else if ( (elem_collected == 3) ) {

		  // Pick a remaining element...

		  
  		randomIndex = Math.floor(Math.random() * currentIndex_knees);



  		var elem = array_aux_knees[randomIndex];

  		// Avoiding to place two wrists on the same area:
  		if (reduced_sorted_array.indexOf(elem) >= 0) {

  			array_aux_wrists.splice(randomIndex, 1);
  			continue;

  		}

  		// AVoiding to place knee and wrist on the same position:
  		if (array_aux_wrists.indexOf(elem) >= 0) {
  			
  			array_aux_wrists.splice(randomIndex, 1);
  			continue;
  		}

  		currentIndex_wrists -= 1;


  		reduced_sorted_array.push(array_aux_knees[randomIndex]);

  		array_aux_knees.splice(randomIndex, 1);

  		elem_collected += 1;

	}
  
  }

  return reduced_sorted_array;

}

//var wrist1_color, wrist2_color, knee_color;

function pickColor() {

	color_percentage = Math.random()*100;
	var red = "#ff0000";
	var blue = "#0000ff";
	var purple = "#800080";

	if (color_percentage < 50) {

		var wrist1_color = red;
		var wrist2_color = blue;

	} else {
		
		var wrist1_color = blue;
		var wrist2_color = red;

	}

	
	var knee_color = purple;
	var knee_color = purple;		


	return [wrist1_color, wrist2_color, knee_color];
}

// The following function avoid to generate 'impossible' position (e.g. 'right elbow on top-left corner and right wrist on bottom left corner'):


function colorFigures(colors, current_position) {

	var chosen_color;
	//console.log(current_position);
	var left = current_position.indexOf("left");
	var right = current_position.indexOf("right");
	var center = current_position.indexOf("center");

	if (left >= 0) {

		chosen_color = colors[0];

	} else if (right >= 0) {

		chosen_color = colors[1];

	} else if (center >= 0) {

		chosen_color = colors[2];

	}

	return chosen_color;

}


var fig = fromJointToFigure(level);
figures_length = fig.length;
var dictionary_aux = fig[figures_length-1];

var figures = [];
var counter = 0;
for (counter; counter<figures_length-1; counter++) {

	figures.push(fig[counter]);

}

settingRightLeftColors();
gamesRules(level, figures, right_col, left_col)
//var colors = pickColor();


function placingFiguresANDSetingColors(right_col, left_col, positions) {
 
	var figure_index;
	var chosen_colors = pickColor(); // contain the colors for figures appearing respectively on the left, right and in the middle of the screen
	/* pickColor();
	var chosen_colors = new Array();//[wrist1_color, wrist2_color, knee_color];
	chosen_colors[0] = wrist1_color;
	chosen_colors[1] = wrist2_color;
	chosen_colors[2] = knee_color; */

	for (figure_index=0; figure_index<level; figure_index++) {
		
		var current_position = positions[figure_index];
		//console.log(positions)
		var figure_name = figures[figure_index];
		var figure = document.getElementById(figure_name);
		colorFigures(chosen_colors, current_position);
		var chosen_color = chosen_colors[figure_index]; 
		//var chosen_color = pickColor();

		if (current_position == "center") {
			
			figure.style.left = "45vw";
			figure.style.top = "45vh";
			figure.style.right = "";
			figure.style.bottom = "";

		} else if (current_position == "top_center") {

			figure.style.left = "45vw";
			figure.style.top = "5vh";
			figure.style.right = "";
			figure.style.bottom = "";

		} else if (current_position == "bottom_center") {
			
			figure.style.left = "45vw";
			figure.style.bottom = "5vh";
			figure.style.right = "";
			figure.style.top = "";

		} else if (current_position == "right_center") {
			
			figure.style.right = "15vw";
			figure.style.bottom = "45vh";
			figure.style.left = "";
			figure.style.top = "";

		} else if (current_position == "left_center") {
			
			figure.style.left = "15vw";
			figure.style.top = "45vh";
			figure.style.right = "";
			figure.style.bottom = "";

		} else if (current_position == "top_left") {
			
			figure.style.left = "15vw";
			figure.style.top = "5vh";
			figure.style.right = "";
			figure.style.bottom = "";

		} else if (current_position == "top_right") {
			
			figure.style.right = "15vw";
			figure.style.top = "5vh";
			figure.style.left = "";
			figure.style.bottom = "";

		} else if (current_position == "bottom_left") {
			
			figure.style.left = "15vw";
			figure.style.bottom = "5vh";
			figure.style.right = "";
			figure.style.top = "";

		} else if (current_position == "bottom_right") {
			
			figure.style.right = "15vw";
			figure.style.bottom = "5vh";
			figure.style.left = "";
			figure.style.top = "";

		}

		figure.style.background = chosen_color;
		figure.style.display = "block";
		
	}

}


function associate_joints_to_colors(level, dictionary, position, first_elem) {

	var counter = 0;
	var dict =  {};

	for(counter; counter<level; counter++) {

		current_key1 = Object.keys(dictionary)[counter].substring(0, 7);
		//console.log( (document.getElementById(current_key1).style.background).toString() );
		
		if ( (document.getElementById(current_key1).style.background).toString() == "rgb(255, 0, 0)" ) {

			current_key1 = "red";

		} else {

			current_key1 = "blue";

		}

		//console.log(current_key1)

		current_key2 = Object.keys(dictionary)[counter].substring(7, dictionary.length);
		if ( current_key1 == left_col.substring(1, dictionary.length)) {

			//console.log("merda")
			
			if (first_elem == true) {
				
				dict[ current_key2.replace(current_key2[0], "left" + (current_key2[0]).toUpperCase()) ] = [position[counter]];

			} else {

				dict[ current_key2.replace(current_key2[0], "left" + (current_key2[0]).toUpperCase()) ] = position[counter];				

			}

		} else {

			if (first_elem == true) {
				
				dict[ current_key2.replace(current_key2[0], "right" + (current_key2[0]).toUpperCase()) ] = [position[counter]];

			} else {

				dict[ current_key2.replace(current_key2[0], "right" + (current_key2[0]).toUpperCase()) ] = position[counter];				

			}

		}

	}

	//console.log(dict)

	return dict;

}

function gameOver() {

	document.getElementById("line0").innerHTML = "";
	document.getElementById("line1").innerHTML = "GAME&nbsp;OVER";
	document.getElementById("line2").innerHTML = "Please wait . . . I am elaborating your score!";
	document.getElementById("line3").innerHTML = "";
	document.getElementById("line4").innerHTML = "";

	$("#rules").fadeIn(1000);
	$("#rules").fadeOut(7000);

}

var dictionary = {}; // --> It will store the joints as keys and the the array (which length equal to the number of the rounds) containing the related 'image areas' as values
settingRightLeftColors();

var current_round = 1;


setTimeout(function() {
	current_round = incrementingRound(current_round);

}, 10000);


var random_sorted_positions = shuffle(positions, level);
console.log(random_sorted_positions);

//console.log(dictionary)

setTimeout(function() {placingFiguresANDSetingColors(right_col, left_col, random_sorted_positions); dictionary = associate_joints_to_colors(level, dictionary_aux, random_sorted_positions, true);}, 13500);
setTimeout(function() {countdown();}, 22000);

var milliseconds = 25000;
var refresh_interval = setInterval(function() {

				document.getElementById("square1").style.display = 'none';
				document.getElementById("square2").style.display = 'none';
				document.getElementById("circle1").style.display = 'none';
				document.getElementById("circle2").style.display = 'none';
				document.getElementById("countdown").style.display = 'none';

				if (current_round <= 3) {

					if (current_round > 1) {

						milliseconds = 15000;

					}

					current_round = incrementingRound(current_round);
					//document.getElementById("round").style.display = 'block';
					random_sorted_positions = shuffle(positions, level);
					console.log(random_sorted_positions);
					setTimeout(function() 
								{
									placingFiguresANDSetingColors(right_col, left_col, random_sorted_positions);
									dict_to_append = associate_joints_to_colors(level, dictionary_aux, random_sorted_positions, false);
									var local_counter = 0;
									for (local_counter; local_counter<level; local_counter++) {

										dictionary[Object.keys(dictionary)[local_counter]].push(dict_to_append[Object.keys(dict_to_append)[local_counter]]);

									}

								}, 3500);
					//document.getElementById("round").style.display = 'none';
					setTimeout(function() {countdown();}, 10000);

				} else {

					var local_counter = 0;
					var rounds = current_round - 1;
					var round_scrolled = 0;
					var text = "";
					for (local_counter; local_counter<level; local_counter++) {

						var current_areas = ""; 
						for (round_scrolled; round_scrolled<rounds; round_scrolled++) {

							current_areas += " " + dictionary[Object.keys(dictionary)[local_counter]][round_scrolled];

						}

						text += Object.keys(dictionary)[local_counter] + current_areas + "\r\n";
						round_scrolled = 0;

					}

					filename = "actual_classes";
					text = text.split("\r\n")
					//console.log(text);
					$.post("/", {first_point: text[0], second_point: text[1], third_point: text[2]});
					clearInterval(refresh_interval);
					gameOver();

				}
}, milliseconds)
