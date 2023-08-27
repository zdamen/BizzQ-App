import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import BusinessCardDesign1 from '../components/BusinessCardDesign1';

import { useNavigation } from '@react-navigation/core'

const CardDesignSelction = ({ route }) => {
  const design7 = require('../assets/images/design7.png');

  const design6 = require('../assets/images/design6.png');

  const design5 = require('../assets/images/design5.png');

  const design4 = require('../assets/images/design4.png');


  const design2 = require('../assets/images/design2.png');
  const borderStyle = { borderColor: "#69B0FF", borderWidth: 4, borderRadius: 9 };
  const navigation = useNavigation()
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [data, setdata] = useState(null);

  
  const handlePress = (Design) => {
    if (Design === selectedDesign) {
      setSelectedDesign(null); // remove border if same item is pressed again
    } else {
      setSelectedDesign(Design); // set new item as selected
    }
  };
  const goNext = () => {

    setdata(route.params);
    console.log(selectedDesign);
    console.log(data);

    navigation.navigate("CardCreation", { 'design': selectedDesign, 'uid': route.params.uid });
  }


  return (
    <View className="flex-1 bg-[#EEF6FF] items-center justify-center">
      <Text className="text-2xl font-normal text-center pt-14 pb-"> Select A Design </Text>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => handlePress('design1')} className="pt-2 items-center justify-center">
            <BusinessCardDesign1 isPressed={selectedDesign === 'design1'}
              name="Name Holder"
              occupation="Occupation"
              email="hello@reallygreatsite.com"
              phone="+123-456-7890"
              address="123 Anywhere St,. Any City"
              website="www.reallygreatsite.com" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handlePress('design2')} className="pt-8 items-center justify-center">
            <Image source={design2} className="w-[358px] h-[167px]" style={selectedDesign === 'design2' ? borderStyle : null} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => handlePress('design4')} className="pt-8 items-center justify-center">
            <Image source={design4} className="w-[358px] h-[167px]" resizeMode="contain" style={selectedDesign === 'design4' ? borderStyle : null} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handlePress('design5')} className="pt-8 items-center justify-center">
            <Image source={design5} className="w-[358px] h-[167px]" resizeMode="contain" style={selectedDesign === 'design5' ? borderStyle : null} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handlePress('design6')} className="pt-8 items-center justify-center">
            <Image source={design6} className="w-[358px] h-[167px]" resizeMode="contain" style={selectedDesign === 'design6' ? borderStyle : null} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handlePress('design7')} className="pt-8 items-center justify-center">
            <Image source={design7} className="w-[358px] h-[167px]" resizeMode="contain" style={selectedDesign === 'design7' ? borderStyle : null} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity className="flex-0 safeAreaBottom z-20 m-[28px] mb-8 p-4 w-48 rounded-md  bg-[#FFFFFF]" onPress={goNext}>
        <Text className="text-center">Next</Text>
      </TouchableOpacity>
    </View>

  )
}



export default CardDesignSelction
