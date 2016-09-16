/**
 * Created by openhtml on 9/1/16.
 */
// set the height of the visualisation as responsive
var w = window.innerWidth;
var h = window.innerHeight;

$("#vis").css({ "height": h, "width": w });

// initialize flip
//$("#leaders").flip();
//$(".card").css({ "height": h, "background": "#fff" });

/*
// initialize tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

// initialize scrollspy
$(document).ready(function(){
	$('body').scrollspy({target: ".navbar", offset: 50});
	$("#navbar a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				window.location.hash = hash;
			});
		}
	});
});
*/
