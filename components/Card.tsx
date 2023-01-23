import React from "react";
import { Dimensions, Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { CardType } from "../global/types";


type CardProps = {
  item:CardType
  cardWidth:number
  visibleCardHeight:number
  onLayout:(event: LayoutChangeEvent) => void
}

export default ({ item, cardWidth, visibleCardHeight, onLayout }: CardProps) => {

    return (
        <View
            style={[styles.card, {width:cardWidth, borderWidth:1, borderColor:'red'}]}
            onLayout={onLayout}
        >
            <Image source={item.visuals[0].source} style={{height:cardWidth*2/3, width:cardWidth, resizeMode:'stretch'}} />
            <View style={styles.cardBottom}>
                <Text style={{fontSize:20, color:'#000'}}>
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
        padding:10
    }
  });
  
  