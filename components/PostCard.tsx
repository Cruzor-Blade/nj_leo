import React from "react";
import { Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { CardType } from "../global/types";


type PostCardProps = {
  item:CardType
  cardWidth:number
  visibleCardHeight:number
  onLayout:(event: LayoutChangeEvent) => void
}

const PostCard = ({ item, cardWidth, visibleCardHeight, onLayout }: PostCardProps) => {

    return (
        <View
            style={[styles.card, {width:cardWidth, borderWidth:1, borderColor:'rgba(0, 0, 0, 0.1)'}]}
            onLayout={onLayout}
        >
            <Image source={item.visuals[0].source} style={{height:cardWidth*2/3, width:cardWidth, resizeMode:'stretch'}} />
            <View style={styles.cardBottom}>
                <Text style={{fontSize:20, color:'#000', fontWeight:'500'}}>
                    {item.title}
                </Text>
                <Text style={{color:'#567'}}>
                    {item.description}
                </Text>
            </View>
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