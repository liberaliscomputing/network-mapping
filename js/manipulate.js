/**
 * Created by openhtml on 9/1/16.
 */
// set the height of the visualisation as responsive
//var w = window.innerWidth;
var h = window.innerHeight;
$("#vis").css("height", h);

// initialize flip
$("#card").flip();
$("#card").css({ "height": h, "background": "#fff" });

// initialize tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
