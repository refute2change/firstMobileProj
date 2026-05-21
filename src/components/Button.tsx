import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MyInputRef } from './MyInput';

interface ButtonProps {
  char: string;
  inputTarget: React.RefObject<MyInputRef | null>;
}

const Button = ({ char, inputTarget }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        // Safely call the method on the specific bound instance
        inputTarget.current?.insertChar(char);
      }}
    >
      <Text style={styles.buttonText}>{char}</Text>
    </TouchableOpacity>
  );
};

const DeleteButton = ({ inputTarget }: { inputTarget: React.RefObject<MyInputRef | null> }) => {
  return (
    <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF3B30' }]}
        onPress={() => {
            inputTarget.current?.deleteChar();
        }}
    >
        <Text style={styles.buttonText}>DEL</Text>
    </TouchableOpacity>
  );
}

const CalculateButton = ({ inputTarget }: { inputTarget: React.RefObject<MyInputRef | null> }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: '#34C759' }]} onPress={() => {
      // This is where you would implement the logic to evaluate the expression in MyInput
      // For demonstration, we'll just insert an "=" character
      inputTarget.current?.clearInput(); // Clear the input for demonstration
    }}>
      <Text style={styles.buttonText}>=</Text>
    </TouchableOpacity>
  );
}

export { CalculateButton, DeleteButton };
export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    // use a numeric weight that matches TextStyle.fontWeight union
    fontWeight: '700',
  },
});