import React from "react";
import { Animated, StyleSheet } from "react-native";
import Card from "./Card";
import { CardType } from "../global/types";


interface WalletCardProps {
  y: Animated.Value
  index: number
  item: CardType
  cardMargin:number
  totalCardHeight:number
  cardWidth:number
  visibleCardHeight:number
  height:number
}

const WalletCard = ({ item, y, index, cardMargin, totalCardHeight, height, cardWidth, visibleCardHeight }: WalletCardProps) => {
  const position = Animated.subtract(index * totalCardHeight, y);
  const isDisappearing = -totalCardHeight;
  const isTop = 0;
  const isBottom = height - totalCardHeight;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * totalCardHeight],
        outputRange: [0, -index * totalCardHeight],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -totalCardHeight / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[styles.card, { opacity, marginVertical:cardMargin, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
      <Card {...{ item, cardWidth, visibleCardHeight }} />
    </Animated.View>
  );
};


const styles = StyleSheet.create({
    card: {
      alignSelf: "center",
    },
  });
export default WalletCard;