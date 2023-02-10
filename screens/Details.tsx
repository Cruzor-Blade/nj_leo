import {useContext, useEffect, useState} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { HomeStackParamsList } from '../global/types';
import { ratingColors } from './EditPost';
import { AuthContext } from '../contexts/AuthContext';

type DetailsPropsType = StackScreenProps<HomeStackParamsList, 'Details'>;

const Details = ({navigation, route}:DetailsPropsType) => {
    const authContext = useContext(AuthContext);
    const isAdmin = authContext?.isAdmin;
    const {item} = route.params;
    const {width} = useWindowDimensions();
    const fontSize = 16;

    const [imageDims, setImageDims] = useState({height:1, width:1});

    const displayHeight = (width/imageDims.width)*imageDims.height;

    const onEditPress = () => {
        navigation.navigate('EditPost', {item})
    };

    const onSocialPress = (platform:'youtube'|'whatsapp'|'telegram') => {
        if(item.socialLinks[platform]) {
            Linking.openURL(item.socialLinks[platform] as string);
        }
    };

    useEffect(() => {
        if(item.visuals[0].source.uri){
            Image.getSize(item.visuals[0].source.uri, (width: number, height: number) => {
                setImageDims({width, height});
            })
        } else {
            const imageDims = Image.resolveAssetSource(require('../assets/no_image.jpg'));
            setImageDims({width:imageDims.width, height:imageDims.height})
        }
    }, []);
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            {
                isAdmin?
                    <Pressable
                        style={styles.floatingButtonContainer}
                        android_ripple={{color:'#fff', foreground:true}}
                        onPress={onEditPress}
                    >
                        <Image
                            source={require('../assets/edit.png')}
                            style={{height:40, width:40, resizeMode:'contain', tintColor:'#fff'}}
                        />
                    </Pressable>
                :
                    null
            }
            <ScrollView contentContainerStyle={{alignItems:'center', backgroundColor:'#fff'}}>
                <Image
                    source={item.visuals[0].source?item.visuals[0].source:require('../assets/no_image.jpg')}
                    style={{width, height:displayHeight}}
                />
                <View style={{paddingHorizontal:10, paddingVertical:5}}>
                    <View style={{marginTop:10, flexWrap:'wrap'}}>
                        <Text style={{fontSize:Math.round(fontSize*1.2), fontWeight:'500', color:'#000'}}>{item.title}</Text>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={{fontSize, color:'#567'}}>{item.description}</Text>
                    </View>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#ddd', width:'100%', flexDirection:'row', paddingHorizontal:14, paddingVertical:8}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize, color:'black', fontWeight:'500'}}>fiabilité: </Text>
                        <View
                            style={{...styles.ratingChip, backgroundColor:ratingColors.filter(rating => rating.max - item.rating>=0 && item.rating -rating.min >=0)[0].color }}
                        />
                    </View>
                    <Text>

                    </Text>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#ddd', width:'100%', flexDirection:'row', paddingHorizontal:10, paddingVertical:5}}>
                    {
                        item.socialLinks.youtube?
                        <Pressable onPress={() => onSocialPress('youtube')}>
                            <Image style={styles.socialIcon} source={require('../assets/youtube.png')} />
                        </Pressable>
                        :
                        null
                    }
                    {
                        item.socialLinks.telegram?
                        <Pressable onPress={() => onSocialPress('telegram')}>
                            <Image style={{...styles.socialIcon, transform:[{scale:0.95}]}} source={require('../assets/telegram.png')} />
                        </Pressable>
                        :
                        null
                    }
                    {
                        item.socialLinks.whatsapp?
                        <Pressable onPress={() => onSocialPress('whatsapp')}>
                            <Image style={{...styles.socialIcon, transform:[{scale:0.9}]}} source={require('../assets/whatsapp.png')} />
                        </Pressable>
                        :
                        null
                    }
                </View>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    floatingButtonContainer:{
        backgroundColor:'purple',
        height:60,
        width:60,
        borderRadius:30,
        elevation:10,
        position:'absolute',
        zIndex:9999,
        bottom:50,
        right:30,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    },
    ratingChip: {
        height:20,
        width:40,
        marginLeft:10,
        borderRadius:9,
        transform:[{scale:1.1}]
    },
    socialIcon: {
        height:50,
        width:50,
        resizeMode:'contain',
        marginVertical:5,
        marginHorizontal:10
    }
})

export default Details;