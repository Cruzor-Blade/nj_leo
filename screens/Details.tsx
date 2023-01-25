import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { HomeStackParamsList } from '../global/types';

type DetailsPropsType = StackScreenProps<HomeStackParamsList, 'Details'>;

const Details = ({navigation, route}:DetailsPropsType) => {
    const {item} = route.params;
    const {width} = useWindowDimensions();
    const fontSize = 16;

    const imageDims = Image.resolveAssetSource(item.visuals[0].source);
    const displayHeight = (width/imageDims.width)*imageDims.height;

    const onEditPress = () => {
        navigation.navigate('EditPost', {item})
    }
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Pressable
                style={styles.floatingButtonContainer}
                android_ripple={{color:'#fff', foreground:true}}
                onPress={onEditPress}
            >
                <Text style={{color:'#fff', fontSize:16}}>Edit</Text>
            </Pressable>
            <ScrollView contentContainerStyle={{alignItems:'center', backgroundColor:'#fff'}}>
                <Image source={item.visuals[0].source} style={{width, height:displayHeight}} />
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
                        <View style={{height:20, width:40, backgroundColor:item.reliabilityColor, marginLeft:10, borderRadius:9, transform:[{scale:1.1}]}}/>
                    </View>
                    <Text>

                    </Text>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#ddd', width:'100%', flexDirection:'row', paddingHorizontal:10, paddingVertical:5}}>
                    <Image style={styles.socialIcon} source={require('../assets/youtube.png')} />
                    <Image style={{...styles.socialIcon, transform:[{scale:0.95}]}} source={require('../assets/telegram.png')} />
                    <Image style={{...styles.socialIcon, transform:[{scale:0.9}]}} source={require('../assets/whatsapp.png')} />
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
    socialIcon: {
        height:50,
        width:50,
        resizeMode:'contain',
        marginVertical:5,
        marginHorizontal:10
    }
})

export default Details;