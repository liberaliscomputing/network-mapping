/**
 * Created by openhtml on 9/1/16.
 */
// set the height of the visualisation as responsive
var h = window.innerHeight * 0.95;
$("#vis").css("height", h);

// initializing tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
