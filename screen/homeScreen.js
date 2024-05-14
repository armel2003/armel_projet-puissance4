import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Ajout de l'importation
import Puissance4 from '../components/puissance4';

const HomeScreen = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const navigation = useNavigation(); // Obtention de l'objet de navigation

  const startGame = () => {
    if (player1Name && player2Name) {
      setGameStarted(true);
      // Naviguer vers l'écran du jeu
      navigation.navigate('Puissance4');
    } else {
      alert('Veuillez entrer le nom des deux joueurs pour commencer le jeu.');
    }
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View>
          <Text style={styles.title}>Entrez les prénoms des joueurs :</Text>
          <TextInput
            style={styles.input}
            placeholder="Joueur 1"
            onChangeText={text => setPlayer1Name(text)}
            value={player1Name}
          />
          <TextInput
            style={styles.input}
            placeholder="Joueur 2"
            onChangeText={text => setPlayer2Name(text)}
            value={player2Name}
          />
          {/* Utiliser startGame pour commencer le jeu */}
          <Button
          title="Commencer le jeu"
          onPress={() => navigation.navigate('Puissance4')}
          />
        </View>
      ) : (
        <Text>Écran du jeu...</Text>
        // Ici, vous pouvez afficher l'écran du jeu
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default HomeScreen;
