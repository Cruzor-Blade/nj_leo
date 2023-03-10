import {useEffect, useRef, useState} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View, useWindowDimensions } from 'react-native';
import { HomeStackParamsList, socialLinks } from '../global/types';
import { openPicker } from "react-native-image-crop-picker";
import { TextInput } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { firestore } from '../App';
import { storage } from '../App';

export const ratingColors = [
    {color:"#ff0000", min:0, max:20},
    {color:"#ff8000", min:21, max:35},
    {color:"grey", min:36, max:50},
    {color:"#0000ff", min:51, max:60},
    {color:"#0D98BA", min:61, max:80},
    {color:"#00f700", min:81, max:100},
]

type DetailsPropsType = StackScreenProps<HomeStackParamsList, 'EditPost'>;

const EditPost = ({navigation, route}:DetailsPropsType) => {
    const {item} = route.params;
    const {width} = useWindowDimensions();
    const fontSize = 16;

    const initialPostImgURI = useRef(item?.visuals[0].source.uri).current;

    const [imageDims, setImageDims] = useState({height:1, width:1})

    const [displayHeight, setDisplayHeight] = useState((width/imageDims.width)*imageDims.height);
    const [postTitle, setPostTitle] = useState(item?.title||'');
    const [postDescription, setPostDescription] = useState(item?.description || '');
    const [rating, setRating] = useState(item?.rating || 0);
    const [postImgSource, setPostImgSource] = useState<{uri: string|undefined, type:string} | null>(item?.visuals[0].source.uri? {uri: item.visuals[0].source.uri, type:'image'}: null);
    const [socialLinks, setSocialLinks] = useState(item?.socialLinks||{youtube:'', telegram:'', whatsapp:''});
    const [uploading, setUploading] = useState(false);

    const [titleModalVisible, setTitleModalVisible] = useState(false);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [socialModalVisible, setSocialModalVisible] = useState(false);

    
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

    const onSave = async () => {
        let uploadObj:{
            [key:string]:any
        } = {
            title:postTitle,
            description:postDescription,
            rating:rating,
            socialLinks:socialLinks,
            createdAt:new Date()
        };

        try {
            if(item) {
                if( initialPostImgURI != postImgSource?.uri) { //the poster image for the current business have been updated
                    const imageUrl = await uploadImage();
                    console.log('Image Url: ', imageUrl);
                    uploadObj.visuals = [{type:'image', source:{uri:imageUrl}}]
                }
                const result = await firestore
                    .collection('posts')
                    .doc(item.id)
                    .update(uploadObj);
                console.log('Updated Successfully');
            
            } else {
                const imageUrl = await uploadImage();
                console.log('Image Url: ', imageUrl);
                const result = await firestore
                    .collection('posts')
                    .add({
                        title:postTitle,
                        description:postDescription,
                        rating:rating,
                        visuals:[{type:'image', source:{uri:imageUrl}}],
                        socialLinks:socialLinks,
                        createdAt:new Date()
                    });

                console.log('Published Successfully');
            }
            ToastAndroid.show('Publi?? avec succ??s', 1500);
            navigation.navigate('Home', {shouldRefresh:true});
        } catch (error) {
            console.log('An error occured: ', error);
        }
            
    }
    
    const uploadImage = async () => {
        if( !postImgSource?.uri ) {
            return null;
        }
        const uploadUri = postImgSource.uri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
        setUploading(true);
        
        const storageRef = storage.ref(`photos/business_poster/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
        // Set transferred state

        try {
            await task;
    
            const url = await storageRef.getDownloadURL();
    
            setUploading(false);
            return url;
    
        } catch (e) {
            console.log(e);
            return null;
        }    
    };
    
    
    useEffect(() => {
        if(item && item.visuals[0].source.uri){
            Image.getSize(item.visuals[0].source.uri, (width: number, height: number) => {
                setImageDims({width, height});
            })
        } else {
            const imageDims = Image.resolveAssetSource(require('../assets/no_image.jpg'));
            setImageDims({width:imageDims.width, height:imageDims.height})
        }
    }, []);

    
    type TitleModalPropsType = {
        title:string
        setTitle:React.Dispatch<React.SetStateAction<string>>
        visible:boolean
        onClosePress:() => void
    };

    const TitleModal = ({title, setTitle, visible, onClosePress}:TitleModalPropsType) => {
        const [newTitle, setNewTitle] = useState(title);
        
        const onDonePress = () => {
            setTitle(newTitle);
            onClosePress();
        };

        return (
            <Modal
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                visible={visible}
                onRequestClose={onClosePress}
            >
                <View style={{flex:1, alignItems:'center', justifyContent:'center',}} >
                    <View style={{width:'80%', backgroundColor:'#fff', borderRadius:20, padding:16, elevation:3}}>
                        <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize:17, fontWeight:'500', color:'#000'}}>
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
                            style={styles.textInput}
                            placeholder='??crivez ici...'
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

    type DescriptionModalPropsType = {
        description:string
        setDescription:React.Dispatch<React.SetStateAction<string>>
        visible:boolean
        onClosePress:() => void
    };

    const DescriptionModal = ({description, setDescription, visible, onClosePress}:DescriptionModalPropsType) => {
        const [newDescription, setNewDescription] = useState(description);
        
        const onDonePress = () => {
            setDescription(newDescription);
            onClosePress();
        };

        return (
            <Modal
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                visible={visible}
                onRequestClose={onClosePress}
            >
                <View style={{flex:1, alignItems:'center', justifyContent:'center',}} >
                    <View style={{width:'80%', backgroundColor:'#fff', borderRadius:20, padding:16, elevation:3}}>
                        <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize:17, fontWeight:'500'}}>
                                Description du business
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
                            style={{...styles.textInput, maxHeight:220}}
                            placeholder='??crivez ici...'
                            value={newDescription}
                            onChangeText={text => setNewDescription(text)}
                            multiline
                        />
                        <Pressable onPress={onDonePress} style={styles.doneBtn}>
                            <Text style={{fontSize:16, fontWeight:'500'}}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    };

    type RatingModalPropsType = {
        rating:number
        setRating:React.Dispatch<React.SetStateAction<number>>
        visible:boolean
        onClosePress:() => void
    };

    const RatingModal = ({rating, setRating, visible, onClosePress}:RatingModalPropsType) => {
        const [newRating, setNewRating] = useState(rating);
        
        const onDonePress = () => {
            setRating(newRating);
            onClosePress();
        };

        return (
            <Modal
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                visible={visible}
                onRequestClose={onClosePress}
            >
                <View style={{flex:1, alignItems:'center', justifyContent:'center',}} >
                    <View style={{width:'80%', backgroundColor:'#fff', borderRadius:20, padding:16, elevation:3}}>
                        <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize:17, fontWeight:'500', color:'black'}}>
                                Indice de fiabilit??
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
                        <Text style={{marginHorizontal:14, color:'gray'}}>{newRating+' %'}</Text>
                        {/* Tells Typescript to ignore type checking for the slider component */}
                        {/*
                            // @ts-ignore */}
                        <Slider
                            style={{width: '100%', height:40}}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor={ratingColors.filter(item => item.max - newRating>=0 && newRating -item.min >=0)[0].color}
                            maximumTrackTintColor={ratingColors[0]}
                            onValueChange={(value:number) => setNewRating(value)}
                            value={newRating}
                            step={1}
                            thumbTintColor={ratingColors.filter(item => item.max - newRating>=0 && newRating -item.min >=0)[0].color}
                        />
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            {
                                ratingColors.map(item => <View key={item.color} style={{height:30, width:30, borderRadius:2, backgroundColor:item.color}} />)
                            }
                        </View>
                        <Pressable onPress={onDonePress} style={styles.doneBtn}>
                            <Text style={{fontSize:16, fontWeight:'500'}}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    };


    type SocialModalPropsType = {
        links:socialLinks
        setLinks:React.Dispatch<React.SetStateAction<socialLinks>>
        visible:boolean
        onClosePress:() => void
    };

    const SocialModal = ({links, setLinks, visible, onClosePress}:SocialModalPropsType) => {
        const [newLinks, setNewLinks] = useState(links);
        
        const onDonePress = () => {
            setLinks(newLinks);
            onClosePress();
        };

        return (
            <Modal
                transparent={true}
                animationType='fade'
                statusBarTranslucent
                visible={visible}
                onRequestClose={onClosePress}
            >
                <View style={{flex:1, alignItems:'center', justifyContent:'center',}} >
                    <View style={{width:'80%', backgroundColor:'#fff', borderRadius:20, padding:16, elevation:3}}>
                        <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize:17, fontWeight:'500', color:'#000'}}>
                                Liens sociaux
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
                        <Text style={{color:'#333', marginBottom:6}}>
                            Youtube :
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='??crivez ici...'
                            value={newLinks.youtube}
                            onChangeText={text => setNewLinks({...newLinks, youtube:text})}
                        />
                        <Text style={{color:'#333', marginBottom:6, marginTop:12}}>
                            Telegram :
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='??crivez ici...'
                            value={newLinks.telegram}
                            onChangeText={text => setNewLinks({...newLinks, telegram:text})}
                        />
                        <Text style={{color:'#333', marginBottom:6, marginTop:12}}>
                            WhatsApp :
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='??crivez ici...'
                            value={newLinks.whatsapp}
                            onChangeText={text => setNewLinks({...newLinks, whatsapp:text})}
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
        <View style={{flex:1, backgroundColor:'white'}}>
            <TitleModal
                visible={titleModalVisible}
                title={postTitle}
                setTitle={setPostTitle}
                onClosePress={() => setTitleModalVisible(false)}
            />
            <DescriptionModal
                visible={descriptionModalVisible}
                setDescription={setPostDescription}
                description={postDescription}
                onClosePress={() => setDescriptionModalVisible(false)}
            />
        
            <RatingModal
                visible={ratingModalVisible}
                rating={rating}
                setRating={setRating}
                onClosePress={() => setRatingModalVisible(false)}
            />

            <SocialModal
                visible={socialModalVisible}
                links={socialLinks}
                setLinks={setSocialLinks}
                onClosePress={() => setSocialModalVisible(false)}
            />
            <ScrollView contentContainerStyle={{alignItems:'center', backgroundColor:'#fff'}}>
                <Pressable onPress={openImagePicker} >
                    <Image
                        source={ postImgSource?.uri? postImgSource: item && item.visuals[0].source ? item.visuals[0].source:require('../assets/no_image.jpg')}
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
                            {postTitle || '( Titre )'}
                        </Text>
                    </Pressable>
                    <Pressable
                        android_ripple={{foreground:true, color:'aqua'}}
                        style={{marginVertical:10}}
                        onPress={() => setDescriptionModalVisible(true)}
                    >
                        <Text style={{fontSize, color:'#567'}}>{postDescription || '\n( Description )\n'}</Text>
                    </Pressable>
                </View>
                <Pressable onPress={() => setRatingModalVisible(true)} style={{borderTopWidth:1, borderColor:'#ddd', width:'100%', flexDirection:'row', paddingHorizontal:14, paddingVertical:8}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize, color:'black', fontWeight:'500'}}>fiabilit??: </Text>
                        <View
                            style={{...styles.ratingChip, backgroundColor:ratingColors.filter(item => item.max - rating>=0 && rating -item.min >=0)[0].color }} 
                        />
                    </View>
                    <Text>

                    </Text>
                </Pressable>
                <Pressable
                    style={styles.socialsContainer}
                    onPress={() => setSocialModalVisible(true)}
                >
                    <Image style={styles.socialIcon} source={require('../assets/youtube.png')} />
                    <Image style={styles.socialIcon} source={require('../assets/telegram.png')} />
                    <Image style={styles.socialIcon} source={require('../assets/whatsapp.png')} />
                </Pressable>
                <Pressable
                    android_ripple={{foreground:true, color:'#fff'}}
                    onPress={onSave} style={styles.saveBtn}>
                    <Text style={{fontSize:16, fontWeight:'500', color:'#fff'}}>Sauvegarder</Text>
                    {
                        uploading?
                            <ActivityIndicator style={{margin:10, transform:[{translateY:3}]}} size={24} color="#ccc" />
                        :
                        null
                    }
                </Pressable>
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
    textInput:{
        backgroundColor:'rgba(0, 0, 0, 0.08)',
        borderRadius:16,
        paddingHorizontal:10,
        fontSize:15
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
    ratingChip: {
        height:20,
        width:40,
        marginLeft:10,
        borderRadius:9,
        transform:[{scale:1.1}]
    },
    socialsContainer:{
        borderTopWidth:1,
        borderColor:'#ddd',
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:5
    },
    socialIcon: {
        height:50,
        width:50,
        resizeMode:'contain',
        marginVertical:5,
        marginHorizontal:10
    },
    saveBtn:{
        height:48,
        width:'90%',
        backgroundColor:'#000080',
        marginTop:20,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        flexDirection:'row'
    },
})

export default EditPost;