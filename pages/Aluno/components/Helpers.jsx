// ── HELPERS ─────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../styles';

export const Loading = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#C70039" />
  </View>
);

export const Message = ({ text, color }) => (
  <View style={styles.center}>
    <Text style={{ color }}>{text}</Text>
  </View>
);
