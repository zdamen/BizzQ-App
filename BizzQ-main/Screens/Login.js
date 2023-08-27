import { useNavigation } from '@react-navigation/core'
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button,StyleSheet,View, Image,Text,TouchableOpacity, StatusBar } from 'react-native';

// Initialize Firebase
initializeApp({
  apiKey: "AIzaSyCyRG9zbEv6MPMsLV_HXbyLJVkn_GFOB2E",
  authDomain: "gofork-1ed79.firebaseapp.com",
  projectId: "gofork-1ed79",
  storageBucket: "gofork-1ed79.appspot.com",
  messagingSenderId: "1034626028265",
  appId: "1:1034626028265:web:11efabe17fc8a92fea1678"
});

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const navigation = useNavigation()

  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '1034626028265-a7q2v5s9723houug79pb8so25tdntgqf.apps.googleusercontent.com',
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      
      navigation.navigate("Home");
    }
    const auth = getAuth();
  }, [response]);

  return (
    <View className="flex-1 pt-20 items-center bg-white">
      <Text className="text-5xl color-black">BizzQ</Text>
      <View>
        <View className='mt-40 items-center justify-center'>
          <Image source={{ uri: 'https://i.ibb.co/w0JByXb/Untitled-design-5.png' }}
            style={{ width: 200, height: 200 }} />
        </View>
        <TouchableOpacity className='mt-16 rounded-md	 p-4 w-64 bg-[#DD9A82]' onPress={() => { promptAsync(); }}>
          <Text className='text-center color-white '>Login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  button:{
    paddingVertical: 100
}
})
