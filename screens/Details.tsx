import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { HomeStackParamsList } from '../global/types';

type DetailsPropsType = StackScreenProps<HomeStackParamsList, 'Details'>;

const Details = ({route}:DetailsPropsType) => {
    const {item} = route.params;
    const {width} = useWindowDimensions();
    const fontSize = 16;

    const imageDims = Image.resolveAssetSource(item.visuals[0].source);
    const displayHeight = (width/imageDims.width)*imageDims.height;

    return (
        <ScrollView contentContainerStyle={{flex:1, alignItems:'center'}}>
            <Image source={item.visuals[0].source} style={{width, height:displayHeight}} />
            <View style={{padding:10}}>
                <View style={{marginTop:10, flexWrap:'wrap'}}>
                    <Text style={{fontSize:Math.round(fontSize*1.2), fontWeight:'500', color:'#000'}}>{item.title}</Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text style={{fontSize, color:'#567'}}>{item.description}</Text>
                </View>
            </View>
            <View style={{borderTopWidth:1, width:'100%', flexDirection:'row', paddingHorizontal:10}}>
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
        margin:10
    }
})

export default Details;