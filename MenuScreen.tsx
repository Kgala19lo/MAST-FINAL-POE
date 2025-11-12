// screens/MenuScreen.tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export default function MenuScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.location}>GAUTENG, SA</Text>

        {/* use img2 as the menu header / small preview */}
        <Image source={require('../assets/img2.png')} style={styles.logo} />

        <SafeAreaView style={styles.tabsRow}>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Starter')}>
            <Text style={styles.tabText}>STARTER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Main')}>
            <Text style={styles.tabText}>MAIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Dessert')}>
            <Text style={styles.tabText}>DESSERT</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 20 },
  location: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  logo: { width: 220, height: 80, resizeMode: 'contain', marginBottom: 18 },
  tabsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  tab: { backgroundColor: '#ff3b30', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, marginHorizontal: 6, elevation: 3 },
  tabText: { color: '#fff', fontWeight: '700' },
});
