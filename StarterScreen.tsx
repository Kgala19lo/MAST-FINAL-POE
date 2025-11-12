// screens/StarterScreen.tsx
import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Starter'>;

export default function StarterScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* full screen preview of the starter mockup */}
      <Image source={require('../assets/img2.png')} style={styles.image} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  back: { padding: 12 },
  backText: { color: '#111', fontWeight: '600' },
  image: { flex: 1, width: '100%', height: undefined, resizeMode: 'contain' },
});
