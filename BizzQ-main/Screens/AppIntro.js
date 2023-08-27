import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';



const AppIntro = () => {

  const navigation = useNavigation()

  const [step, setStep] = useState(0);
  const onboardingData = [
    {
      title: 'Create Profile',
      subtitle: 'Sign in and create your professional QR code to your \n own website and show off your skills',
      image: 'https://images-ext-1.discordapp.net/external/pMGCzDwntdCbJOP263E9IsbV8NvPLLVPeTqMUYaByOg/https/cdni.iconscout.com/illustration/premium/thumb/qr-code-payment-8044275-6369987.png?width=900&height=900',
    },
    {
      title: 'Connect with others',
      subtitle: 'Look through different peoples cards and connect \n with the people who you need',
      image: 'https://i.ibb.co/G3b0trv/Untitled-design-2.png',
    },
    {
      title: 'Share Your Profile',
      subtitle: 'Take Your QR code anywhere and connect with \n others wherever you are',
      image: 'https://i.ibb.co/Pm1BbyD/Share-Your-Profile.png',
    },
  ];

  const handleNext = () => {
    if (step + 1 == onboardingData.length) {
      navigation.replace("Login");
    }
    else {
      setStep(step + 1);
    }
  };


  return (
    <View className="bg-[#EEF6FF] items-center justify-center">
      <Text className="mt-32 font-light text-6xl">BizzQ</Text>
      <View className="mt-28 items-center justify-center">
        <Image style={{ width: 200, height: 200 }} source={{ uri: onboardingData[step].image }} />
        <Text className="font-bold text-[32px]">{onboardingData[step].title}</Text>
        <Text className=" mt-4 font-light text-[16%] text-center">{onboardingData[step].subtitle}</Text>
      </View>
      <View className="mt-40">
        {step < onboardingData.length - 1 ? (
          <TouchableOpacity onPress={handleNext}  className='rounded-md p-6 w-48 bg-[#DD9A82] mb-60'>
            <Text className="text-center color-white">Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNext} className='rounded-md p-6 w-48 bg-[#DD9A82] mb-60'>
            <Text className="text-center color-white">Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


export default AppIntro;
