import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { isValidMathExpression } from '../calculations/calculations';

// 1. Define the interface for what a "MyInput Instance" can do
export interface MyInputRef {
  insertChar: (c: string) => void;
  deleteChar: () => void;
  clearInput: () => void;
}

export interface MyInputProps {
  onClear?: (value: string) => void;
}

// 2. Wrap MyInput in forwardRef to allow external control of its instance
const MyInput = forwardRef<MyInputRef, MyInputProps>(({ onClear }, ref) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const isResultRef = useRef(false);

  const insertChar = (c: string) => {
    if (!isResultRef.current) {
      setText((prev) => prev + c);
    } else {
      setText(c);
      isResultRef.current = false;
    }
  };

  const deleteChar = () => setText((prev) => prev.slice(0, -1));

  const clearInput = () => {
    const result = isValidMathExpression(text);
    if (result !== false) {
      onClear?.(text);
      setText(result.toString());
      isResultRef.current = true;
    }
  };

  // Expose specific methods to the parent component holding the ref
  useImperativeHandle(ref, () => ({
    insertChar,
    deleteChar,
    clearInput,
    // You could also expose standard actions like focusing:
    focus: () => inputRef.current?.focus(),
  }));

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Type here"
        editable={false}
      />
    </View>
  );
});

export default MyInput;

const styles = StyleSheet.create({
    container: { paddingVertical: 10 },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});