<?php
require_once 'controller/BoardController.php';
require_once 'defines.php';

$request = file_get_contents('php://input');
$dataJson = json_decode($request);
$level = $dataJson->level;
$numberMines = null;

switch ($level) {
    case 'beginner':
        $numberMines = BEGINNER_MINES;
        break;
    case 'intermediate':
        $numberMines = INTERMEDIATE_MINES;
        break;
    case 'expert':
        $numberMines = EXPERT_MINES;
        break;
    default:
        //some error
}
if ($level === 'number_mines') {
    echo json_encode($numberMines);
    return;
}
$board = new BoardController(DEFAULT_ROWS,DEFAULT_COLUMNS);
$board->createBoard();
$board->putMines($numberMines);
echo json_encode($board->getBoard());
