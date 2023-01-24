import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { HomeStackParamsList } from '../global/types';

type DetailsPropsType = StackScreenProps<HomeStackParamsList, 'Details'>;

const EditPost = ({route}:DetailsPropsType) => {
    const {item} = route.params;
    const {width} = useWindowDimensions();
    const fontSize = 16;

    const imageDims = Image.resolveAssetSource(item.visuals[0].source);
    const displayHeight = (width/imageDims.width)*imageDims.height;

    return (
        <ScrollView contentContainerStyle={{flex:1, alignItems:'center', backgroundColor:'#fff'}}>
            <Image source={item.visuals[0].source} style={{width, height:displayHeight}} />
            <View style={{paddingHorizontal:10, paddingVertical:5}}>
                <View style={{marginTop:10, flexWrap:'wrap'}}>
                    <Text style={{fontSize:Math.round(fontSize*1.2), fontWeight:'500', color:'#000'}}>{item.title}</Text>
                </View>
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
    )
};


const styles = StyleSheet.create({
    socialIcon: {
        height:50,
        width:50,
        resizeMode:'contain',
        marginVertical:5,
        marginHorizontal:10
    }
})

export default EditPost;