function restartGame() {
    clearInterval(interval);
    document.getElementById('my-modal').style.display = 'none';
    document.getElementById('board').style.margin = 'auto';
    document.getElementById('flag-mine').style.margin = 'auto';
    document.getElementById('new-game').className = 'hidden';
    document.getElementById('flag-mine').className = 'hidden';
    document.getElementById('board').className = 'hidden';
    document.getElementById('level-buttons').className = '';
    document.getElementById('time').innerHTML = '00:00';
}

function showHiddenValue(id, coordinates , click) {
    let flag_status = document.getElementById('flag-status').value;
    let square_class = document.getElementById(id).getAttribute('class');
    if (flag_status === 'off' && square_class === 'fa fa-square mask') {
        let number = document.getElementById(`icon-${id}`);
        switch (number.innerHTML) {
            case '*':
                click.number++;
                if (click.number === 1) {
                    _changeMinePosition(coordinates);
                    break;
                }
                _gameOver(number.id);
                break;
            case '0':
                _checkTheNeighbors(coordinates['x'], coordinates['y'], false);
                click.number++;
                break;
            case '1':
                _setColorAndHideSquare(number, id, _getColor(number));
                click.number++;
                break;
            case '2':
                _setColorAndHideSquare(number, id, _getColor(number));
                click.number++;
                break;
            case '3':
                _setColorAndHideSquare(number, id, _getColor(number));
                click.number++;
                break;
            case '4':
                click.number++;
                _setColorAndHideSquare(number, id, _getColor(number));
                break;
            case '5':
                click.number++;
                _setColorAndHideSquare(number, id, _getColor(number));
                break;
            case '6':
                click.number++;
                _setColorAndHideSquare(number, id, _getColor(number));
                break;
            case '7':
                click.number++;
                _setColorAndHideSquare(number, id, _getColor(number));
                break;
            case '8':
                click.number++;
                _setColorAndHideSquare(number, id, _getColor(number));
                break;
            case '#':
                click.number++;
        }
        if (_checkWin()) {
           _youWin();
        }
    } else if (flag_status === 'on' && square_class !== 'fa') {
        if (square_class === 'fa skull flag-added') {
            document.getElementById(id).className = 'fa fa-square mask';
            let mines_value = document.getElementById('num-mines');
            if (mines_value.innerHTML === '-') {
                mines_value.innerHTML = 0;
            }
            _changeNumberMinesColor(++mines_value.innerHTML);
            return;
        }
        _addFlag(id);
    }
}

function _setColorAndHideSquare(number, id, color) {
    number.style.color = color;
    document.getElementById('icon-' + id).className = 'visible';
    document.getElementById(id).className = 'fa';
    if (number.innerHTML === '0') {
        number.innerHTML = '#';
    }
}

function _checkTheNeighbors(x, y, corner) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
        return;
    }
    let id;
    if (x !== 0) {
        id = `${x}${y}`;
    } else  {
        id = `${y}`;
    }

    if (document.getElementById(id).className === 'fa skull flag-added') {
        return;
    }

    let number = document.getElementById('icon-' + id);
    if (number === null){
        return;
    }
    if (number.innerHTML !== '0' && number.innerHTML !== '*') {
        _setColorAndHideSquare(number, id, _getColor(number));
        return;
    }
    if (corner === true) {
        return;
    }
    _setColorAndHideSquare(number, id, _getColor(number));

    _checkTheNeighbors(x + 1, y,false);
    _checkTheNeighbors(x, y + 1,false);
    _checkTheNeighbors(x - 1, y,false);
    _checkTheNeighbors(x, y - 1,false);

    _checkTheNeighbors(x - 1, y - 1,true);
    _checkTheNeighbors(x + 1, y + 1,true);
    _checkTheNeighbors(x - 1, y + 1,true);
    _checkTheNeighbors(x + 1, y - 1,true);
}

function _changeMinePosition(coordinates) {
    let changed = false;
    let new_position_x = 0;
    let new_position_y = 0;
    while (changed !== true) {
        let new_cell;
        let current_cell;

        if (new_position_y === (new_position_x * new_position_y) + 9) {
            new_position_x++;
            new_position_y = 0;
        }
        new_cell = _checkRow(new_position_x, new_position_y).innerHTML;
        if (new_cell !== '*') {
            current_cell = 0;
            new_cell = _checkRow(coordinates['x'], coordinates['y']).innerHTML;

            _checkRowAndSetNewValue(coordinates['x'], coordinates['y'], current_cell);
            _checkRowAndSetNewValue(new_position_x, new_position_y, new_cell);
            _changeTheValuesOfTheNeighbors(coordinates['x'], coordinates['y'], new_position_x, new_position_y);
            changed = true;
        }
        new_position_y++;
    }
}

function _checkRow(row, column) {
    if (row === 0) {
        return document.getElementById(`icon-${column}`);
    }
    return document.getElementById(`icon-${row}${column}`);
}

function _checkRowAndSetNewValue(row, column, new_value) {
    if (row === 0) {
        document.getElementById(`icon-${column}`).innerHTML = new_value;
        return;
    }
    document.getElementById(`icon-${row}${column}`).innerHTML = new_value;
}

function _changeTheValuesOfTheNeighbors(current_cell_x, current_cell_y, new_cell_x, new_cell_y) {
    let mine_cell = _checkRow(current_cell_x, current_cell_y);
    _getAllNeighbors(current_cell_x, current_cell_y, 'minus', mine_cell);
    _getAllNeighbors(new_cell_x, new_cell_y, 'plus', mine_cell);
    _changeMineCellValueAndColor (mine_cell);
}

function _getAllNeighbors(cell_coordinate_x, cell_coordinate_y, sign, mine_cell) {
    let all_id_numbers = [];

    let upper_left_diagonal_id = (cell_coordinate_x - 1) + '' + (cell_coordinate_y - 1);
    let over_id = (cell_coordinate_x - 1) + '' + cell_coordinate_y;
    let upper_right_diagonal_id = (cell_coordinate_x - 1) + '' + (cell_coordinate_y + 1);
    let right_id = cell_coordinate_x + '' + (cell_coordinate_y + 1);
    let lower_right_diagonal_id = ((cell_coordinate_x + 1) + '' + (cell_coordinate_y + 1));
    let under_id = (cell_coordinate_x + 1) + '' + cell_coordinate_y;
    let lower_left_diagonal_id = (cell_coordinate_x + 1) + '' + (cell_coordinate_y - 1);
    let left_id = (cell_coordinate_x + '' + (cell_coordinate_y - 1));

    all_id_numbers.push(upper_left_diagonal_id);
    all_id_numbers.push(over_id);
    all_id_numbers.push(upper_right_diagonal_id);
    all_id_numbers.push(right_id);
    all_id_numbers.push(lower_right_diagonal_id);
    all_id_numbers.push(under_id);
    all_id_numbers.push(lower_left_diagonal_id);
    all_id_numbers.push(left_id);

    for (let key = 0; key < all_id_numbers.length; key++) {
        if (all_id_numbers[key].charAt(0) === '0' && parseInt(all_id_numbers[key].substring(1)) < 10) {
            all_id_numbers[key] = all_id_numbers[key].substring(1);
        }
    }
    for (let key = 0; key < all_id_numbers.length; key++) {
        _changeNeighborValue(`icon-${all_id_numbers[key]}`, sign, mine_cell);
    }
}

function _changeMineCellValueAndColor(current_cell) {
    let cell_value = document.getElementById(current_cell.id).innerHTML;
    let square_id = current_cell.id.substring(5);
    square_id.toString();
    if (cell_value !== '*') {
        if (cell_value === '0') {
            showHiddenValue(square_id, _takeCoordinates(square_id), {'number': 1});
        } else {
            showHiddenValue(square_id, null, {'number': 1});
        }
    }
}

function _changeNeighborValue(id, sign, current_cell) {
    let cell = document.getElementById(id);
    if (cell !== null) {
        switch (sign) {
            case 'minus':
                if (cell.innerHTML !== '*' && id !== current_cell.id) {
                    cell.innerHTML--;
                } else if (cell.innerHTML === '*') {
                    current_cell.innerHTML++;
                }
                break;
            case 'plus':
                if (cell.innerHTML !== '*' && id !== current_cell.id) {
                    cell.innerHTML++;
                }
                break;
        }
    }
}

function changeFlag(status) {
    let off = document.getElementById('flag-off');
    let on = document.getElementById('flag-on');
    if (status === 'off') {
        on.className = 'hidden';
        off.className = 'flag-off';
        document.getElementById('flag-status').value = 'off';
    } else if (status === 'on') {
        off.className = 'hidden';
        on.className = 'flag-on';
        document.getElementById('flag-status').value = 'on';
    }
}

function _addFlag(id) {
    let mines_value = document.getElementById('num-mines');
    if (mines_value.innerHTML >= 0) {
        let cell = document.getElementById(id);
        cell.className = 'fa skull flag-added';
        _changeNumberMinesColor(--mines_value.innerHTML);
    }
}

function _getColor(number) {
    let color = 'transparent';
    switch (number.innerHTML) {
        case '1':
            color = 'blue';
            break;
        case '2':
            color = 'green';
            break;
        case '3':
            color = 'red';
            break;
        case '4':
            color = 'darkblue';
            break;
        case '5':
            color = 'brown';
            break;
        case '6':
            color = 'skyblue';
            break;
        case '7':
            color = 'yellow';
            break;
        case '8':
            color = 'darkgrey';
            break;
    }
    return color;
}

