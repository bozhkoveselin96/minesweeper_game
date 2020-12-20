let bombsInLevel = null;
function getDataFromBackend(level) {
    const timerAtTheBegging = 1,
        display = document.querySelector('#time');
    switch (level) {
        case 'beginner':
            bombsInLevel = 10;
            _makeRequest(level);
            _startTimer(timerAtTheBegging, display);
            break;
        case 'intermediate':
            bombsInLevel = 15;
            _makeRequest(level);
            _startTimer(timerAtTheBegging, display);
            break;
        case 'expert':
            bombsInLevel = 20;
            _makeRequest(level);
            _startTimer(timerAtTheBegging, display);
            break;
        default:
            alert('error');
    }
}

function _makeRequest(level) {
    const requestData = { level: level };
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const board = JSON.parse(this.response);
            let mines;
            _createBoardInHTML(board);
            mines = _showMinesInThisLevel(level);
            document.getElementById('board').className = '';
            document.getElementById('level-buttons').className = 'hidden';
            document.getElementById('flag-mine').className = 'flex';
            document.getElementById('new-game').className = '';
            document.getElementById('num-mines').innerHTML = mines;
            let minesValue = document.getElementById('num-mines');
            _changeNumberMinesColor(minesValue.innerHTML);
        }
    };
    xmlhttp.open("POST", "http://localhost/minesweeper_game/backend/index.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(requestData));
}
