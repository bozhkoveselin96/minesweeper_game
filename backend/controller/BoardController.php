<?php

class BoardController {
    private $rows;
    private $columns;
    private $board = [];

    public function __construct(int $rows, int $columns) {
        $this->rows = $rows;
        $this->columns = $columns;
    }

    public function createBoard(): array {
        for ($row = 0; $row < $this->rows; $row++) {
            for ($column = 0; $column < $this->columns; $column++) {
                $this->board[$row][$column] = 0;
            }
        }
        return $this->board;
    }

    public function putMines(int $numberMines) {
        $currentNumberMines = 0;
        while ($currentNumberMines < $numberMines) {
            $randomCoordinateX = rand(0, $this->rows - 1);
            $randomCoordinateY = rand(0, $this->columns - 1);
            if ($this->board[$randomCoordinateX][$randomCoordinateY] !== MINE) {
                $this->board[$randomCoordinateX][$randomCoordinateY] = MINE;
                $currentNumberMines++;
            }
        }
        $this->updatingTheCellsAroundTheMines();
    }

    public function getBoard() {
        return $this->board;
    }

    private function updatingTheCellsAroundTheMines() {
        for ($row = 0; $row < $this->rows; $row++) {
            for ($column = 0; $column < $this->columns; $column++) {
                if ($this->board[$row][$column] === MINE) {
                    $this->checkExistsAndIncrement($this->board, $row,$column + 1);
                    $this->checkExistsAndIncrement($this->board,$row + 1, $column);
                    $this->checkExistsAndIncrement($this->board, $row,$column - 1);
                    $this->checkExistsAndIncrement($this->board,$row - 1, $column);
                    $this->checkExistsAndIncrement($this->board,$row + 1,$column + 1);
                    $this->checkExistsAndIncrement($this->board,$row - 1,$column - 1);
                    $this->checkExistsAndIncrement($this->board,$row - 1,$column + 1);
                    $this->checkExistsAndIncrement($this->board,$row + 1,$column - 1);
                }
            }
        }
    }

    private function checkExistsAndIncrement(array &$board, int $row, int $column) {
        if (isset($board[$row][$column])) {
            $board[$row][$column]++;
        }
    }
}
