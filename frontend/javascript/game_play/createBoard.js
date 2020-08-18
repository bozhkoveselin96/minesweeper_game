function _createBoardInHTML(board) {
    let board_HTML = '';
    board_HTML += '<table>';
    for (let row of board) {
        board_HTML += '<tr>';
        for (let column of row) {
            board_HTML += '<td class="fa fa-square mask">';
            board_HTML += '<span class="hidden">' + column + '</span>';
            board_HTML += '</td>';
        }
        board_HTML += '</tr>';
    }
    board_HTML += '</table>';
    document.getElementById('board').innerHTML = board_HTML;
    const all_td_in_the_table = document.getElementsByTagName("td");
    _addIdNumbers(all_td_in_the_table);
}

function _addIdNumbers(tags_arr) {
    let click = {'number' : 0};
    for (let id = 0; id < tags_arr.length; id++) {
        tags_arr[id].setAttribute('id', id);
        tags_arr[id].firstChild.setAttribute('id', 'icon-' + id);
        let td = document.getElementById(id.toString());
        td.addEventListener("click", function () {
            const coordinates = _takeCoordinates(id);
            showHiddenValue(id, coordinates, click);
        });
    }
}

function _takeCoordinates(id) {
    let coordinates = [];
    switch (id) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            coordinates['x'] = 0;
            coordinates['y'] = id;
            break;
        default:
            coordinates['x'] = Math.floor(id / 10);
            coordinates['y'] = id % 10;
    }
    return coordinates;
}

function _showBombsInThisLevel(level) {
    let mines = 0;
    switch (level) {
        case 'beginner':
            mines = 15;
            break;
        case 'intermediate':
            mines = 25;
            break;
        case 'expert':
            mines = 35;
            break;
    }
    return mines;
}

function _changeNumberBombsColor(mines_value) {
    if (mines_value <= 0) {
        document.getElementById('num-mines').innerHTML = '-';
    } else if (mines_value <= 15) {
        document.getElementById('num-mines').style.color = 'green';
    } else if (mines_value <= 25 && mines_value > 15) {
        document.getElementById('num-mines').style.color = 'blue';
    } else if (mines_value <= 35 && mines_value > 25) {
        document.getElementById('num-mines').style.color = 'red';
    }
}

function _startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    window.interval = setInterval(function () {
        if (minutes > 59) {
            timer = duration;
        }
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (++timer < 0) {
            timer = duration;
        }
    }, 1000);
}
