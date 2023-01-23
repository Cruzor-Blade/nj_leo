import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { CardType } from "../global/types";


type CardProps = {
  item:CardType
  cardWidth:number
  visibleCardHeight:number
}

export default ({ item, cardWidth, visibleCardHeight }: CardProps) => {
  return <View style={[styles.card, {backgroundColor:item.color, width:cardWidth, height:visibleCardHeight}]} />;
};

const styles = StyleSheet.create({
    card: {
      borderRadius:20
    },
  });
  
  