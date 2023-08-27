import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import BusinessCardDesign1 from '../components/BusinessCardDesign1';
import CollapseCard from '../components/CollapseCard';
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, child, get } from "firebase/database";

const Home = ({ route }) => {
  const [data, setdata] = useState();
  const [Project, setProject] = useState();
  const [cardsData, setCardsData] = useState([]);

  const navigation = useNavigation()

  const handleNext = () => {
    navigation.navigate("CardDesignSelction", { 'uid': data?.currentUser.uid });
  };


  React.useEffect(() => {
    setdata(getAuth());
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        console.log(jsonValue);
        setCardsData(jsonValue);
      } catch (e) {
        // error reading value
      }
    }

    getData();
    setCardsData(route?.params?.formdata);
  }, []);

  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${data?.currentUser.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val() + 'penissss');
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error('penis');
  });

  return (
    <View className="bg-[#EEF6FF]">
      <Image className="shadow-xl mt-20 mb-4 ml-7 rounded-[16px]" source={{ uri: data?.currentUser?.photoURL }}
        style={{ shadowColor: "#000", width: 56, height: 56 }} />

      <View className="flex flex-row justify-between items-center ml-7 mb-6">
        <View className="flex justify-center items-center">
          <Text className="text-3xl font-bold">{data?.currentUser?.displayName}</Text>
        </View>
        <View className="flex flex-row items-center">
          <TouchableOpacity className='rounded-md p-4 mr-9 w-32 bg-[#FFFFFF]' onPress={handleNext}>
            <Text className="text-center">+ Add card</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="items-center justify-center">
        <ScrollView className="pt-6 pb-80">
          <CollapseCard
            title="Card 1"
            buttonComponent={<BusinessCardDesign1
              name="Ali Al-Jabur"
              occupation="batman"
              email="alialjabur24@gmail.com"
              phone="313-266-4102"
              address="7228 Drexel st"
              website="alialjabur.com"
              num="1"
            />}
          >

            <Image source={{ uri: 'https://i.ibb.co/8PxJDNC/qr.png' }}
              style={{ width: 148, height: 148 }} />
          </CollapseCard>
        </ScrollView>
      </View>
    </View>
  )
}

export default Home

