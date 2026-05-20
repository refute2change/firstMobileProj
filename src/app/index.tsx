import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MyInput = () => {
  const [text, setText] = useState('');

  const insertChar = (c = 'A') => setText(prev => prev + c);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText} // Updates state on every keystroke
        value={text} // Binds the input value to state
        placeholder="Type here..."
      />
      <Button insertChar={insertChar} char="A" />
      <Button insertChar={insertChar} char="B" />
      <Button insertChar={insertChar} char="C" />
    </View>
  );
};

const Button = ({ insertChar, char = 'A' }: { insertChar: (c: string) => void; char?: string }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => insertChar(char)}>
      <Text style={styles.buttonText}>{char}</Text>
    </TouchableOpacity>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});