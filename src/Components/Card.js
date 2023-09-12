import React from 'react';
import { Platform, FlatList, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

// import {useAppContext} from '../Lib/UserContext';

export default function Cards(props) {
  return (
    <View>
      <Card style={props.style} onPress={props.onPress}>
        {props.children}
      </Card>
    </View>
  );
}
