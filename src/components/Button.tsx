import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// 1. Define the interface for what a "MyInput Instance" can do
export interface MyInputRef {
  insertChar: (c: string) => void;
  deleteChar: () => void;
}

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

export { DeleteButton };
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