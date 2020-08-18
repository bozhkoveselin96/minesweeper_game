<?php
require_once 'controller/BoardController.php';
require_once 'defines.php';

$request = file_get_contents('php://input');
$data_json = json_decode($request);
$level = $data_json->level;
$number_mines = null;

switch ($level) {
    case 'beginner':
        $number_mines = BEGINNER_MINES;
        break;
    case 'intermediate':
        $number_mines = INTERMEDIATE_MINES;
        break;
    case 'expert':
        $number_mines = EXPERT_MINES;
        break;
    default:
        //some error
}
if ($level === 'number_mines') {
    echo json_encode($number_mines);
    return;
}
$board = new BoardController(DEFAULT_ROWS,DEFAULT_COLUMNS);
$board->createBoard();
$board->putMines($number_mines);
echo json_encode($board->getBoard());
