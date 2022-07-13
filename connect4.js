"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(height = HEIGHT, width = WIDTH) {

  const rows = new Array(height);
  for (let i = 0; i < rows.length; i++) {
    board.push(rows[i] = new Array(width));
    for (let j = 0; j < rows[i].length; j++) {
      board[i][j] = null;
    }
  }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard(width = WIDTH, height = HEIGHT) {

  const htmlBoard = document.getElementById('board');


  // Create table row element, set id to column-top, and add event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);


  // set each headCell to id of x, and append headCell to top, then append top to htmlBoard
  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < height; y++) {

    const row = document.createElement('tr');
    for (let x = 0; x < width; x++) {

      const cell = document.createElement('td');

      // you'll use this later, so make sure you use y-x
      cell.id = `${y}-${x}`;

      row.append(cell);
    }

    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning
  //board[given x] x is not an array
  for(let y = board.length - 1; y >= 0; y--){
    if(board[y][x] === null){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {

  const playerPiece = document.createElement('div');
  playerPiece.classList = currPlayer === 1 ? 'p1 piece' : 'p2 piece';
  const tableCell = document.getElementById(`${y}-${x}`);
  tableCell.append(playerPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => !row.includes(null))) {
    endGame();
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();

makeHtmlBoard();
