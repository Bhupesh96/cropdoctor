import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors  from '../theme/colors';  

const Button = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: colors.primary, padding: 10 }}>
    <Text style={{ color: colors.white }}>{title}</Text>
  </TouchableOpacity>
);

export default Button;