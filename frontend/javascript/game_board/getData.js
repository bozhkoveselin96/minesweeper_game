function getDataFromBackend(level) {
    switch (level) {
        case 'beginner':
        case 'intermediate':
        case 'expert':
            _makeRequest(level);
            const timerAtTheBegging = 1,
                display = document.querySelector('#time');
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
