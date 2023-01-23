import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { CardType } from "../global/types";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const cardWidth = width * 0.8;
export const defaultCardHeight = cardWidth * ratio;

type CardProps = {
  item:CardType
}

export default ({ item }: CardProps) => {
  return <View style={[styles.card, {backgroundColor:item.color}]} />;
};

const styles = StyleSheet.create({
    card: {
      width: cardWidth,
      height: defaultCardHeight,
      borderRadius:20
    },
  });
  
  