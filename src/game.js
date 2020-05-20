var timerId;
var game_stopped;

function callgame() {
    var selected_level = parseInt(document.getElementById('level').value);
    var selected_num_balloons = parseInt(document.getElementById('num_balloons').value);

    window.location = 'game.html?level=' + selected_level + '&numballoons=' + selected_num_balloons;
}

function start_game() {

    var timerId = null;
    var total_time = null;
    var chosen_level = parseInt(getParam('level'));
    var chosen_numballoons = parseInt(getParam('numballoons'));

    if (document.getElementById('b1') == null || game_stopped) {

        game_stopped = false;

        // check choosen_level
        switch (chosen_level) {
            case 1:
                total_time = 120;
                break;
        
            case 2:
                total_time = 90;
                break;
        
            case 3:
                total_time = 30;
                break;
        
            default:
                alert('Choose a correct level !');
                break;
        }

        // check chosen_numballoons
        if(chosen_numballoons > 0) {
        } else {alert('Choose a correct nº of balloons !'); return false;}

        // fill the painel blanks
        document.getElementById('num_ballons').innerHTML = chosen_numballoons;
        document.getElementById('num_ballons_popped').innerHTML = 0;
        document.getElementById('timer').innerHTML = total_time;

        // check if it's a second or + round, if Y remove old balloons
        if (document.getElementById('b1') !== null) {
            remove_images(chosen_numballoons, 'parent_imageId');
        }

        // create little balloons images
        insert_images(chosen_numballoons, '../assets/images/balao_azul_pequeno.png', 'parent_imageId');

        timer_count(total_time + 1);
    }
}

function timer_count(seconds){

	seconds = seconds - 1;

    if (check_end() == true || check_game_over() == true) {
        return;
    }

	document.getElementById('timer').innerHTML = seconds;

	timerId = setTimeout("timer_count("+seconds+")", 1000);
}


function pop(e){

    var id_balloon = e.id;

    if (document.getElementById(id_balloon).popped == true) {
        return false;
    }

	document.getElementById(id_balloon).src = '../assets/images/balao_azul_pequeno_estourado.png';
    document.getElementById(id_balloon).popped = true;

	score(-1);
}

function score(points) {

    document.getElementById('num_ballons').innerHTML = parseInt(document.getElementById('num_ballons').innerHTML) + points;
    document.getElementById('num_ballons_popped').innerHTML = parseInt(document.getElementById('num_ballons_popped').innerHTML) - points;

    // check_end();
}

function check_game_over() {
    if( parseInt(document.getElementById('timer').innerHTML) == 0 ) {
        alert('Your time is over!');
        stop_game();
        return true;
    }
    return false;
}

function check_end() {
    if( parseInt(document.getElementById('num_ballons').innerHTML) == 0) {
        alert('Congratulations !!!');
        stop_game();
        return true;
    }
    return false;
}

function stop_game() {
    clearTimeout(timerId);
    game_stopped = true;
}


// --------------- library --------------- 
function getParam(index) {

    // console.table(getParams(window.location.href));
    let paramsArray = [];
    paramsArray = getParams(window.location.href);
    
    return(paramsArray[index]);
}

var getParams = function (url) {

	var params = [];
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};


function insert_images(quantity, source, parent_imageId){

	for(var i = 1; i <= quantity; i++){

		var image = document.createElement("img");
		image.src = source;
		image.style.margin = '15px';
        image.id = 'b'+i;
        image.popped = false;
		image.onclick = function(){ pop(this); };

		document.getElementById(parent_imageId).appendChild(image);
	}
}

function remove_images(quantity, parent_imageId){

    var child = document.getElementById(parent_imageId).lastElementChild;
    while (child) { 
        document.getElementById(parent_imageId).removeChild(child); 
        child = document.getElementById(parent_imageId).lastElementChild; 
    } 
}