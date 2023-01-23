import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import Card, {
  defaultCardHeight,
} from "./Card";
import { CardType } from "../global/types";

const cardMargin = 16;
export const cardHeight = defaultCardHeight + cardMargin * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: cardMargin,
    alignSelf: "center",
  },
});

interface WalletCardProps {
  y: Animated.Value;
  index: number;
  item: CardType;
}

const WalletCard = ({ item, y, index }: WalletCardProps) => {
  const position = Animated.subtract(index * cardHeight, y);
  const isDisappearing = -cardHeight;
  const isTop = 0;
  const isBottom = height - cardHeight;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * cardHeight],
        outputRange: [0, -index * cardHeight],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -cardHeight / 4],
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
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
      <Card {...{ item }} />
    </Animated.View>
  );
};

export default WalletCard;