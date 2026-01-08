import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors'; // Connect to theme

const Card = ({ title, children }) => (
  <View style={{ backgroundColor: colors.white, padding: 10, margin: 5, borderRadius: 5 }}>
    <Text style={{ fontSize: 18 }}>{title}</Text>
    {children}
  </View>
);

export default Card;