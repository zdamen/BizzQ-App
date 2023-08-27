import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';

const CreationOptions = ({ onChange }) => {

    const [activeButton, setActiveButton] = useState(null);

    const handlePress = (buttonNumber) => {
      setActiveButton(buttonNumber);
      onChange(buttonNumber);
    };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{ flex: 1, backgroundColor: '#EEF6FF', padding: 30}}
      onPress={() => handlePress(1)}
      >
        <Text className="text-lg" style={{ color: 'white', textAlign: 'center' }}>🔗</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1, backgroundColor: '#EEF6FF', padding: 30}}
      onPress={() => handlePress(2)}
      >
        <Text className="text-lg" style={{ color: 'white', textAlign: 'center' }}>📂</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1, backgroundColor: '#EEF6FF', padding: 30}}
      onPress={() => handlePress(3)}
      >
        <Text className="text-lg" style={{ color: 'white', textAlign: 'center' }}>📸</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreationOptions

const styles = StyleSheet.create({})