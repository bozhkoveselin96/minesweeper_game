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
    let flagStatus = document.getElementById('flag-status').value;
    let squareClass = document.getElementById(id).getAttribute('class');
    if (flagStatus === 'off' && squareClass === 'fa fa-square mask') {
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
    } else if (flagStatus === 'on' && squareClass !== 'fa') {
        if (squareClass === 'fa skull flag-added') {
            document.getElementById(id).className = 'fa fa-square mask';
            let minesValue = document.getElementById('num-mines');
            if (minesValue.innerHTML === '-') {
                minesValue.innerHTML = 0;
            }
            _changeNumberMinesColor(++minesValue.innerHTML);
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
    let newPositionX = 0;
    let newPositionY = 0;
    while (changed !== true) {
        let newCell;
        let currentCell;

        if (newPositionY === (newPositionX * newPositionY) + 9) {
            newPositionX++;
            newPositionY = 0;
        }
        newCell = _checkRow(newPositionX, newPositionY).innerHTML;
        if (newCell !== '*') {
            currentCell = 0;
            newCell = _checkRow(coordinates['x'], coordinates['y']).innerHTML;

            _checkRowAndSetNewValue(coordinates['x'], coordinates['y'], currentCell);
            _checkRowAndSetNewValue(newPositionX, newPositionY, newCell);
            _changeTheValuesOfTheNeighbors(coordinates['x'], coordinates['y'], newPositionX, newPositionY);
            changed = true;
        }
        newPositionY++;
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

function _changeTheValuesOfTheNeighbors(currentCellX, currentCellY, newCellX, newCellY) {
    let mineCell = _checkRow(currentCellX, currentCellY);
    _getAllNeighbors(currentCellX, currentCellY, 'minus', mineCell);
    _getAllNeighbors(newCellX, newCellY, 'plus', mineCell);
    _changeMineCellValueAndColor (mineCell);
}

function _getAllNeighbors(cellCoordinateX, cellCoordinateY, sign, mineCell) {
    let allIdNumbers = [];

    let upperLeftDiagonalId = (cellCoordinateX - 1) + '' + (cellCoordinateY - 1);
    let overId = (cellCoordinateX - 1) + '' + cellCoordinateY;
    let upperRightDiagonalId = (cellCoordinateX - 1) + '' + (cellCoordinateY + 1);
    let rightId = cellCoordinateX + '' + (cellCoordinateY + 1);
    let lowerRightDiagonalId = ((cellCoordinateX + 1) + '' + (cellCoordinateY + 1));
    let underId = (cellCoordinateX + 1) + '' + cellCoordinateY;
    let lowerLeftDiagonalId = (cellCoordinateX + 1) + '' + (cellCoordinateY - 1);
    let leftId = (cellCoordinateX + '' + (cellCoordinateY - 1));

    allIdNumbers.push(upperLeftDiagonalId);
    allIdNumbers.push(overId);
    allIdNumbers.push(upperRightDiagonalId);
    allIdNumbers.push(rightId);
    allIdNumbers.push(lowerRightDiagonalId);
    allIdNumbers.push(underId);
    allIdNumbers.push(lowerLeftDiagonalId);
    allIdNumbers.push(leftId);

    for (let key = 0; key < allIdNumbers.length; key++) {
        if (allIdNumbers[key].charAt(0) === '0' && parseInt(allIdNumbers[key].substring(1)) < 10) {
            allIdNumbers[key] = allIdNumbers[key].substring(1);
        }
    }
    for (let key = 0; key < allIdNumbers.length; key++) {
        _changeNeighborValue(`icon-${allIdNumbers[key]}`, sign, mineCell);
    }
}

function _changeMineCellValueAndColor(currentCell) {
    let cell_value = document.getElementById(currentCell.id).innerHTML;
    let squareId = currentCell.id.substring(5);
    squareId.toString();
    if (cell_value !== '*') {
        if (cell_value === '0') {
            showHiddenValue(squareId, _takeCoordinates(squareId), {'number': 1});
        } else {
            showHiddenValue(squareId, null, {'number': 1});
        }
    }
}

function _changeNeighborValue(id, sign, currentCell) {
    let cell = document.getElementById(id);
    if (cell !== null) {
        switch (sign) {
            case 'minus':
                if (cell.innerHTML !== '*' && id !== currentCell.id) {
                    cell.innerHTML--;
                } else if (cell.innerHTML === '*') {
                    currentCell.innerHTML++;
                }
                break;
            case 'plus':
                if (cell.innerHTML !== '*' && id !== currentCell.id) {
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
    let minesValue = document.getElementById('num-mines');
    if (minesValue.innerHTML >= 0) {
        let cell = document.getElementById(id);
        cell.className = 'fa skull flag-added';
        _changeNumberMinesColor(--minesValue.innerHTML);
        if (_checkWin()) {
            _youWin();
        }
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

