import { Text, View, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import BusinessCardDesign1 from '../components/BusinessCardDesign1'
import Modal from "react-native-modal";
import CreationOptions from '../components/CreationOptions';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import IntermediaryComponent from '../components/IntermediaryComponent';
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';


const CardCreation = ({ route }) => {
    const [formData, setFormData] = useState({ name: '', occupation: '', email: '', phone: '', address: '', website: '', design: '', links: [], files: [], Images: [], qr: '' });
    const [LinkData, setLinkData] = useState({});
    const db = getFirestore();
    const [PictureData, setPictureData] = useState({});
    const [image, setImage] = useState({});
    const [file, setFile] = useState({});
    const [data, setdata] = useState(null);
    const [Qr, setQr] = useState(null);
    
    const navigation = useNavigation()

    useEffect(() => {
        setdata(route.params);
    }, [data])


    const [selectedButton, setSelectedButton] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});

        if (!result.cancelled) {
            setFile(result);
        }
    };

    const createPost = async (post) => {
        try {
          const response = await fetch('https://your-api-url/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post }),
          });
          setQr(await response.json());
          console.log(data); // log the response from the server
        } catch (error) {
          console.error(error);
        }
      };
      

    const handleButtonChange = (buttonNumber) => {
        console.log(buttonNumber);
        setSelectedButton(buttonNumber);
    };

    const handleChangeText = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
          // saving error
        }
      }
      
      
    const addCard = () => {
        createPost(formData)
        setFormData({ ...formData, qr: Qr });
        setFormData({ ...formData, design: data.design });
        try {
            const docRef = addDoc(collection(db, "users", data.uid, "cards"), {
                formData
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          storeData(formData); 

          navigation.navigate("Home", {formData});
    
    }
    
    const handleSubmit = () => {
        console.log(formData); // Do something with the form data
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };


    const AddLink = () => {
        setFormData({ ...formData, links: [...formData.links, LinkData] });
        setLinkData({})
        setSelectedButton(null);
        setIsModalVisible(!isModalVisible);

    }
    const AddImage = () => {
        setFormData({ ...formData, Images: [...formData.Images, image] });
        setSelectedButton(null);
        setPictureData({});
        setIsModalVisible(!isModalVisible);
    }

    const AddFile = () => {
        setFormData({ ...formData, files: [...formData.files, file] });
        setSelectedButton(null);
        setFile({});
        setIsModalVisible(!isModalVisible);
    }
    useEffect(() => console.log(formData), [formData]);

    return (
        <View className="bg-[#EEF6FF] items-center justify-center pt-28">
            <IntermediaryComponent

                designType={route.params.design}
                name={formData.name ? formData.name : "name"}
                occupation={formData.occupation ? formData.occupation : "occupation"}
                email={formData.email ? formData.email : "email"}
                phone={formData.phone ? formData.phone : "phone"}
                address={formData.address ? formData.address : "address"}
                website={formData.website ? formData.website : "website"}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                    <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 4, textAlign: 'center', backgroundColor: '#EEF6FF' }}>
                        {selectedButton !== null ? (
                            <View>
                                {selectedButton === 1 ? (
                                    <View className="items-center justify-center">
                                        <TextInput
                                            placeholder="Link Name"
                                            value={LinkData.name}
                                            onChangeText={(value) => setLinkData({ ...LinkData, name: value })}
                                            className='text-center p-4 m-2 w-[232px] rounded-full bg-[#FFFFFF]'
                                        />
                                        <TextInput
                                            placeholder="Link"
                                            value={LinkData.link}
                                            onChangeText={(value) => setLinkData({ ...LinkData, link: value })}
                                            className='text-center p-4 m-2 w-[232px] rounded-full bg-[#FFFFFF]'
                                        />
                                        <TouchableOpacity onPress={AddLink} className='rounded-full mt-4 p-2 w-8 bg-[#FFFFFF]'>
                                            <Text className="text-center">+</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : selectedButton === 2 ? (

                                    <View className="items-center justify-center">
                                        <TextInput
                                            placeholder="Document Name"
                                            value={file.name}
                                            onChangeText={(value) => setFile({ ...file, name: value })}
                                            className='text-center p-4 w-[232px] rounded-full bg-[#FFFFFF]'
                                        />
                                        <Button title="Pick a file" onPress={pickDocument} />
                                        <TouchableOpacity onPress={AddFile} className='rounded-full mt-4 p-2 w-8 bg-[#FFFFFF]'>
                                            <Text className="text-center">+</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : selectedButton === 3 ? (
                                    <View className="items-center justify-center">
                                        <TextInput
                                            placeholder="Image Name"
                                            value={image.name}
                                            onChangeText={(value) => setImage({ ...image, name: value })}
                                            className='text-center p-4 w-[232px] rounded-full bg-[#FFFFFF]'
                                        />
                                        <Button title="Pick an image" onPress={pickImage} />
                                        <TouchableOpacity onPress={AddImage} className='rounded-full mt-4 p-2 w-8 bg-[#FFFFFF]'>
                                            <Text className="text-center">+</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        ) : (
                            <View>
                                <Text>Please select an option</Text>
                                <CreationOptions onChange={handleButtonChange} />
                            </View>
                        )}
                    </View>
                </Modal>
            </View>
            <ScrollView className="pb-[200px]">
                <TextInput
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(value) => setFormData({ ...formData, name: value })}
                    className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'
                />

                <TextInput
                    placeholder="Occupation"
                    value={formData.occupation}
                    onChangeText={(value) => setFormData({ ...formData, occupation: value })}
                    className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'
                />

                <TextInput
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => setFormData({ ...formData, email: value })}
                    className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'
                />

                <TextInput
                    placeholder="Phone"
                    value={formData.phone}
                    onChangeText={(value) => setFormData({ ...formData, phone: value })}
                    className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'
                />

                <TextInput
                    placeholder="Address"
                    value={formData.address}
                    onChangeText={(value) => setFormData({ ...formData, address: value })}
                    className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'
                />

                <TextInput
                    placeholder="Website"
                    value={formData.website}
                    onChangeText={(value) => setFormData({ ...formData, website: value })}
                    className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'
                />
                {formData.links.map((linkObj, index) => (
                    <TouchableOpacity className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'>
                        <Text className='text-center' key={index.toString()}>{linkObj.name}</Text>
                    </TouchableOpacity>

                ))}
                {formData.Images.map((linkObj, index) => (
                    <TouchableOpacity className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'>
                        <Text className='text-center' key={index.toString()}>{linkObj.name}</Text>
                    </TouchableOpacity>

                ))}
                {formData.files.map((linkObj, index) => (
                    <TouchableOpacity className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'>
                        <Text className='text-center' key={index.toString()}>{linkObj.name}</Text>
                    </TouchableOpacity>

                ))}
                <TouchableOpacity onPress={toggleModal} className='text-center p-4 m-2 w-[343px] rounded-full bg-[#FFFFFF]'>
                    <Text className="text-center">+</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={addCard} className='rounded-md mt-4 p-4 w-[200px] bg-[#FFFFFF] mb-60'>
                <Text className="text-center">Finish Card</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CardCreation;