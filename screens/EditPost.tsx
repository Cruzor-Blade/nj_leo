import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { HomeStackParamsList } from '../global/types';
import { openPicker } from "react-native-image-crop-picker";
import { TextInput } from 'react-native-gesture-handler';


type DetailsPropsType = StackScreenProps<HomeStackParamsList, 'Details'>;

const EditPost = ({route}:DetailsPropsType) => {
    const {item} = route.params;
    const {width} = useWindowDimensions();
    const fontSize = 16;

    const imageDims = Image.resolveAssetSource(item.visuals[0].source);
    
    const [displayHeight, setDisplayHeight] = useState((width/imageDims.width)*imageDims.height);
    const [postTitle, setPostTitle] = useState(item.title);
    const [postDescription, setPostDescription] = useState('');
    const [postImgSource, setPostImgSource] = useState<{uri: string|undefined, type:string} | null>(null);
    const [focusedChip, setFocusedChip] = useState('M');

    const [titleModalVisible, setTitleModalVisible] = useState(false);
    
    const openImagePicker = async () => {
        try {
            const pickedImg = await openPicker({
                cropping: true,
                mediaType:'photo',
                multiple:false,
                freeStyleCropEnabled:true,
                compressImageQuality:0.8,
            });
            const imageUri = Platform.OS === 'ios' ? pickedImg.sourceURL : pickedImg.path;
            setPostImgSource({uri: imageUri, type:pickedImg.mime});
            setDisplayHeight((width/pickedImg.width)*pickedImg.height)
        } catch (error) {
            console.log(error);
        }
    };

    type TitleModalPropsType = {
        title:string
        setTitle:React.Dispatch<React.SetStateAction<string>>
        visible:boolean
        onClosePress:() => void
    };

    const TitleModal = ({title, setTitle, visible, onClosePress}:TitleModalPropsType) => {
        const [newTitle, setNewTitle] = useState(title);
        
        const onDonePress = () => {
            setPostTitle(newTitle);
            onClosePress();
        };

        return (
            <Modal
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                visible={visible}
            >
                <View style={{flex:1, alignItems:'center', justifyContent:'center',}} >
                    <View style={{width:'80%', backgroundColor:'#fff', borderRadius:20, padding:16, elevation:3}}>
                        <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize:17, fontWeight:'500'}}>
                                Nom du business
                            </Text>
                            <Pressable
                                style={styles.closeBtn}
                                onPress={onClosePress}
                                hitSlop={4}
                            >
                                <Text style={{fontWeight:'500', color:'#000', transform:[{scaleY:0.8}, {translateY:-1}]}}>
                                    X
                                </Text>
                            </Pressable>
                        </View>
                        <TextInput
                            style={{backgroundColor:'rgba(0, 0, 0, 0.08)', borderRadius:16, paddingHorizontal:10, fontSize:15}}
                            placeholder='Écrivez ici...'
                            value={newTitle}
                            onChangeText={text => setNewTitle(text)}
                        />
                        <Pressable onPress={onDonePress} style={styles.doneBtn}>
                            <Text style={{fontSize:16, fontWeight:'500'}}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <View style={{flex:1}}>
            <TitleModal
                visible={titleModalVisible}
                onClosePress={() => setTitleModalVisible(false)}
                title={postTitle}
                setTitle={setPostTitle}
            />
            <ScrollView contentContainerStyle={{alignItems:'center', backgroundColor:'#fff'}}>
                <Pressable onPress={openImagePicker} >
                    <Image
                        source={postImgSource ? postImgSource : item.visuals[0].source}
                        style={{width, height:displayHeight}}
                    />
                </Pressable>
                <View style={{paddingHorizontal:10, paddingVertical:5}}>
                    <Pressable
                        android_ripple={{foreground:true, color:'aqua'}}
                        style={{marginTop:10, flexWrap:'wrap'}}
                        onPress={() => setTitleModalVisible(true)}

                    >
                        <Text style={{fontSize:Math.round(fontSize*1.2), fontWeight:'500', color:'#000'}}>
                            {postTitle}
                        </Text>
                    </Pressable>
                    <View style={{marginVertical:10}}>
                        <Text style={{fontSize, color:'#567'}}>{item.description}</Text>
                    </View>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#ccc', width:'100%', flexDirection:'row', paddingHorizontal:14, paddingVertical:8}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize, color:'black', fontWeight:'500'}}>fiabilité: </Text>
                        <View style={{height:20, width:40, backgroundColor:item.reliabilityColor, marginLeft:10, borderRadius:9, transform:[{scale:1.1}]}}/>
                    </View>
                    <Text>

                    </Text>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#ccc', width:'100%', flexDirection:'row', paddingHorizontal:10, paddingVertical:5}}>
                    <Image style={styles.socialIcon} source={require('../assets/youtube.png')} />
                    <Image style={styles.socialIcon} source={require('../assets/telegram.png')} />
                    <Image style={styles.socialIcon} source={require('../assets/whatsapp.png')} />
                </View>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    closeBtn:{
        height:20,
        width:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.05)',
        transform:[{scale:1.4}, {translateX:-6}, {translateY:-4}]
    },
    doneBtn:{
        height:48,
        width:'100%',
        backgroundColor:'aqua',
        marginTop:20,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden'
    },
    socialIcon: {
        height:50,
        width:50,
        resizeMode:'contain',
        marginVertical:5,
        marginHorizontal:10
    }
})

export default EditPost;