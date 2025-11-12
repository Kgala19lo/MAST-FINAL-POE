// screens/MenuEditorScreen.tsx
import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { useMenu } from './context/MenuContext';
import type { Course } from './navigation/types';

export default function MenuEditorScreen() {
  const { items, addItem, removeItem, clearAll } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [imageKey, setImageKey] = useState('img2');

  const onAdd = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Please enter a name and price');
      return;
    }
    await addItem({ name: name.trim(), description: description.trim(), price: price.trim(), course, imageKey });
    setName('');
    setDescription('');
    setPrice('');
  };

  const onRemove = (id: string) => {
    Alert.alert('Remove item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeItem(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Chef Menu Editor</Text>

      <View style={styles.formRow}>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />

        <View style={styles.courseRow}>
          <TouchableOpacity onPress={() => setCourse('Starter')} style={[styles.courseBtn, course === 'Starter' && styles.courseActive]}>
            <Text>Starter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCourse('Main')} style={[styles.courseBtn, course === 'Main' && styles.courseActive]}>
            <Text>Main</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCourse('Dessert')} style={[styles.courseBtn, course === 'Dessert' && styles.courseActive]}>
            <Text>Dessert</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onAdd} style={styles.addBtn}>
          <Text style={{ color: '#fff' }}>Add Menu Item</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => clearAll()} style={[styles.addBtn, { backgroundColor: '#999', marginTop: 8 }]}>
          <Text style={{ color: '#fff' }}>Clear All (danger)</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 12, fontWeight: '700' }}>Current Items</Text>

      <FlatList
        style={{ width: '100%' }}
        data={items}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700' }}>{item.name} — {item.course}</Text>
              <Text>{item.description}</Text>
              <Text style={{ marginTop: 4 }}>{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeBtn}>
              <Text style={{ color: '#fff' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  h1: { fontSize: 18, fontWeight: '800' },
  formRow: { width: '100%', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginTop: 8, borderRadius: 8 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  courseBtn: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', flex: 1, alignItems: 'center', marginHorizontal: 4 },
  courseActive: { backgroundColor: '#ffecec' },
  addBtn: { backgroundColor: '#ff3b30', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  itemRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  removeBtn: { backgroundColor: '#ff3b30', padding: 8, borderRadius: 8 },
});