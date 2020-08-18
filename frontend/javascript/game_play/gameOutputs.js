function _youWin() {
    let your_time = document.getElementById('time').innerHTML;
    clearInterval(interval);
    document.getElementById('my-modal').style.display = 'block';
    document.getElementById('board').style.margin = '0';
    document.getElementById('flag-mine').style.margin = '0';
    document.getElementById('time-info').style.display = 'block';
    document.getElementById('your-time').innerHTML = your_time;
    document.getElementById('game-result').innerHTML = 'YOU WIN';
}
function _gameOver(activated_mine_id) {
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
            }, 500);
        }
    }
    let activated_mine = document.getElementById(activated_mine_id);
    setInterval(function () {
        if (activated_mine.style.color === 'black') {
            activated_mine.style.color = 'red';
        } else {
            activated_mine.style.color = 'black';
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
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let square_id;
            if (row === 0) {
                square_id = document.getElementById(`${column}`);
            } else {
                square_id = document.getElementById(`${row}${column}`);
            }
            let square = document.getElementById(square_id.id);
            if (square === null || square.className === 'fa fa-square mask') {
                return false;
            }
        }
    }
    return true;
}
