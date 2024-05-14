import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ROWS = 6;
const COLS = 7;

const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

const Puissance4 = () => {
  
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY)));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
  const [winner, setWinner] = useState(null);
 

  const handleColumnClick = (col) => {
    if (winner) return; // Game is already won
    const newBoard = [...board];
    let row = ROWS - 1;
    while (row >= 0 && newBoard[row][col] !== EMPTY) {
      row--;
    }
    if (row >= 0) {
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      checkWinner(row, col);
      setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
    }
  };

  console.log("ok");

  const checkWinner = (row, col) => {
    if (
      checkDirection(row, col, 0, 1) ||
      checkDirection(row, col, 1, 0) ||
      checkDirection(row, col, 1, 1) ||
      checkDirection(row, col, 1, -1)
    ) {
      setWinner(currentPlayer);
    }
  };

  const checkDirection = (row, col, rowDelta, colDelta) => {
    const player = board[row][col];
    let count = 1;
    let r, c;

    // Check in one direction
    r = row + rowDelta;
    c = col + colDelta;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += rowDelta;
      c += colDelta;
    }

    // Check in opposite direction
    r = row - rowDelta;
    c = col - colDelta;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r -= rowDelta;
      c -= colDelta;
    }

    return count >= 4;
  };

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    let backgroundColor = 'green';
    if (cellValue === PLAYER1) backgroundColor = 'red';
    else if (cellValue === PLAYER2) backgroundColor = 'yellow';
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[styles.cell, { backgroundColor }]}
        onPress={() => handleColumnClick(col)}
      />
    );
  };

  const renderBoard = () => {
    const cells = [];
    for (let row = 0; row < ROWS; row++) {
      const rowCells = [];
      for (let col = 0; col < COLS; col++) {
        rowCells.push(renderCell(row, col));
      }
      cells.push(
        <View key={row} style={styles.row}>
          {rowCells}
        </View>
      );
    }
    return cells;
  };
  

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY)));
    setWinner(null);
    setCurrentPlayer(PLAYER1);
  };

  return (
    <View style={styles.container}>
      <Text>Puissance 4</Text>
      
      <View style={styles.board}>{renderBoard()}</View>
      {winner && <Text>Le joueur {winner} a gagné !</Text>}
      {!winner && (
        <Text>
          C'est au joueur {currentPlayer === PLAYER1 ? "1 (rouge)" : "2 (jaune)"} de jouer.
        </Text>
      )}
      <TouchableOpacity onPress={resetGame}>
        <Text>Nouvelle partie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  backgroundColor: 'white',
  
  },
  board: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
  },
});


export default Puissance4;

