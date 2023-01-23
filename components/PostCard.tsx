import React from "react";
import { Image, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { CardType, HomeStackParamsList } from "../global/types";
import { StackNavigationProp } from "@react-navigation/stack";


type PostCardProps = {
  item:CardType
  cardWidth:number
  visibleCardHeight:number
  onLayout:(event: LayoutChangeEvent) => void
  navigation:StackNavigationProp<HomeStackParamsList, "Home", undefined>
}

const PostCard = ({ item, cardWidth, onLayout, navigation }: PostCardProps) => {

    const onPress = () => {
        navigation.navigate('Details', {item})
    };

    const imageDims = Image.resolveAssetSource(item.visuals[0].source);
    const displayHeight = (cardWidth/imageDims.width)*imageDims.height;

    return (
        <View
            style={[styles.card, {width:cardWidth, elevation:10, shadowColor:'rgba(0, 0, 0, 0.5)', backgroundColor:'#fff', overflow:'hidden'}]}
            onLayout={onLayout}
        >
            <Pressable
                android_ripple={{foreground:true, color:'aquamarine'}}
                style={{overflow:'hidden'}}
                onPress={onPress}
            >

                <Image source={item.visuals[0].source} style={{height:displayHeight, width:cardWidth, resizeMode:'stretch'}} />
                <View style={styles.cardBottom}>
                    <Text style={{fontSize:20, color:'#000', fontWeight:'500'}}>
                        {item.title}
                    </Text>
                    <Text style={{color:'#567'}}>
                        {item.description}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
      borderRadius:20
    },
    cardBottom: {
        padding:14
    }
  });
  
export default PostCard;