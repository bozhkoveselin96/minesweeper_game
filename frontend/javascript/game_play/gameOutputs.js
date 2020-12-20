function _youWin() {
    let yourTime = document.getElementById('time').innerHTML;
    clearInterval(interval);
    document.getElementById('my-modal').style.display = 'block';
    document.getElementById('board').style.margin = '0';
    document.getElementById('flag-mine').style.margin = '0';
    document.getElementById('time-info').style.display = 'block';
    document.getElementById('your-time').innerHTML = yourTime;
    document.getElementById('game-result').innerHTML = 'YOU WIN';
}
function _gameOver(activatedMineId) {
    document.getElementById('time-info').style.display = 'none';
    let rows = 10;
    let columns = 10;
    let keys = [];
    clearInterval(interval);
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (row === 0) {
                keys.push(column);
            } else {
                keys.push(`${row}${column}`);
            }
        }
    }
    for (let i = 0; i < keys.length; i++) {
        let number = document.getElementById(`icon-${keys[i]}`);
        let cell = document.getElementById(keys[i]);
        if (number.innerHTML === '*' && cell.className !== 'fa skull flag-added') {
            number.className = 'fa fa-bomb bomb';
            number.innerHTML = '';
            document.getElementById(keys[i]).className = 'fa';
        } else if (number.innerHTML !== '*' && cell.className === 'fa skull flag-added') {
            setInterval(function () {
                if (cell.style.color === 'black') {
                    cell.style.color = 'red';
                } else {
                    cell.style.color = 'black';
                }
            },500);
        }
    }
    let activatedMine = document.getElementById(activatedMineId);
    setInterval(function () {
        if (activatedMine.style.color === 'black') {
            activatedMine.style.color = 'red';
        } else {
            activatedMine.style.color = 'black';
        }
    }, 500);

    document.getElementById('my-modal').style.display = 'block';
    document.getElementById('board').style.margin = '0';
    document.getElementById('flag-mine').style.margin = '0';
    document.getElementById('game-result').innerHTML = 'GAME OVER';
}

function _checkWin() {
    let rows = 10;
    let columns = 10;
    let counterBombs = 0;
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let squareId;
            if (row === 0) {
                squareId = document.getElementById(`${column}`);
            } else {
                squareId = document.getElementById(`${row}${column}`);
            }
            let square = document.getElementById(squareId.id);
            let squareValue = document.getElementById(`icon-${squareId.id}`).innerText;
            if (square.className === 'fa skull flag-added' && squareValue === '*') {
                counterBombs++;
            }
        }
    }

    if (counterBombs === bombsInLevel) {
        _youWin();
        return true;
    }
    return false;
}
