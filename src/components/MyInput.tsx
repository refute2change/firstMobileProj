import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// 1. Define the interface for what a "MyInput Instance" can do
export interface MyInputRef {
  insertChar: (c: string) => void;
  deleteChar: () => void;
}

// 2. Wrap MyInput in forwardRef to allow external control of its instance
const MyInput = forwardRef<MyInputRef, {}>((props, ref) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  const insertChar = (c: string) => setText((prev) => prev + c);
  const deleteChar = () => setText((prev) => prev.slice(0, -1));

  // Expose specific methods to the parent component holding the ref
  useImperativeHandle(ref, () => ({
    insertChar,
    deleteChar,
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