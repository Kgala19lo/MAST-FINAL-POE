// screens/HomeScreen.tsx
import React from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';
import type { MenuItem } from '../navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const imageMap: Record<string, any> = {
  img2: require('../assets/img2.png'),
  img3: require('../assets/img3.png'),
  img4: require('../assets/img4.png'),
};

export default function HomeScreen({ navigation }: Props) {
  const { items } = useMenu();

  const grouped = {
    Starter: items.filter(i => i.course === 'Starter'),
    Main: items.filter(i => i.course === 'Main'),
    Dessert: items.filter(i => i.course === 'Dessert'),
  } as Record<string, MenuItem[]>;

  const renderList = (title: string, list: MenuItem[]) => (
    <View style={{ width: '100%', marginTop: 12 }}>
      <Text style={{ fontWeight: '800', fontSize: 16 }}>{title}</Text>
      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={imageMap[item.imageKey ?? 'img2'] ?? imageMap['img2']} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text>
              <Text numberOfLines={1}>{item.description}</Text>
            </View>
            <Text style={{ fontWeight: '700' }}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Full Menu</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuEditor')} style={styles.headerBtn}>
            <Text style={{ color: '#fff' }}>Chef Editor</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={[styles.headerBtn, { backgroundColor: '#444', marginLeft: 8 }]}>
            <Text style={{ color: '#fff' }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderList('Starters', grouped.Starter)}
      {renderList('Mains', grouped.Main)}
      {renderList('Desserts', grouped.Dessert)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBtn: { backgroundColor: '#ff3b30', padding: 8, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  thumb: { width: 64, height: 48, resizeMode: 'cover', marginRight: 12, borderRadius: 6 },
});