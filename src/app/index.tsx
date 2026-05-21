import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button, { CalculateButton, DeleteButton } from '../components/Button';
import MyInput, { MyInputRef } from '../components/MyInput';

// 4. Main component demonstrating targeting specific instances
export default function MyKeyboard() {
  // Create unique refs for two separate instances of MyInput
  const inputInstanceA = useRef<MyInputRef>(null);
  const [history, setHistory] = useState<string[]>([]);

  const addHistoryEntry = (entry: string) => {
    setHistory((prev) => [...prev, entry]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.historyTitle}>History</Text>
      <View style={styles.historyWindow}>
        <ScrollView contentContainerStyle={styles.historyContent}>
          {history.map((entry, index) => (
            <Text key={`${entry}-${index}`} style={styles.historyItem}>
              {entry}
            </Text>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.clearButtonContainer} onPress={clearHistory}>
        <Text style={styles.clearButton}>Clear History</Text>
      </TouchableOpacity>
      {/* --- INSTANCE A SECTION --- */}
      <Text style={styles.sectionTitle}>Input Instance A</Text>
      <MyInput ref={inputInstanceA} onClear={addHistoryEntry} />
      
      <View style={styles.keyboardRow}>
        <Button char="+" inputTarget={inputInstanceA} />
        <Button char="-" inputTarget={inputInstanceA} />
        <Button char="1" inputTarget={inputInstanceA} />
        <Button char="2" inputTarget={inputInstanceA} />
        <Button char="3" inputTarget={inputInstanceA} />
      </View>
      <View style={styles.keyboardRow}>
        <Button char="×" inputTarget={inputInstanceA} />
        <Button char="÷" inputTarget={inputInstanceA} />
        <Button char="4" inputTarget={inputInstanceA} />
        <Button char="5" inputTarget={inputInstanceA} />
        <Button char="6" inputTarget={inputInstanceA} />
      </View>
      <View style={styles.keyboardRow}>
        <Button char="(" inputTarget={inputInstanceA} />
        <Button char=")" inputTarget={inputInstanceA} />
        <Button char="7" inputTarget={inputInstanceA} />
        <Button char="8" inputTarget={inputInstanceA} />
        <Button char="9" inputTarget={inputInstanceA} />
      </View>
      <View style={styles.keyboardRow}>
        <Button char="0" inputTarget={inputInstanceA} />
        <DeleteButton inputTarget={inputInstanceA} />
        <CalculateButton inputTarget={inputInstanceA} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, justifyContent: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  historyWindow: {
    height: 180,
    width: '100%',
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  historyContent: {
    paddingBottom: 8,
  },
  historyItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  clearButtonContainer: {
    marginBottom: 20,
  },
  clearButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  separator: {
    height: 2,
    backgroundColor: '#eee',
    marginVertical: 25,
  },
});