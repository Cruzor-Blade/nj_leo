import React, { useState } from "react";
import { Animated, LayoutChangeEvent, StyleSheet } from "react-native";
import Card from "./Card";
import { CardType } from "../global/types";


interface WalletCardProps {
  y: Animated.Value
  index: number
  item: CardType
  cardWidth:number
  height:number
  totalCardHeights:number[]
  prevCardsHeight:number
  setTotalCardHeights:React.Dispatch<React.SetStateAction<number[]>>
}

const WalletCard = ({ item, y, index, height, cardWidth, prevCardsHeight, totalCardHeights, setTotalCardHeights }: WalletCardProps) => {
  
    const cardMargin = 16;
    const [visibleCardHeight, setVisibleCardHeight] = useState(0); //The visible height of a card
    const totalCardHeight = visibleCardHeight + cardMargin * 2; //The total height of a card, including vertical margin

    const position = Animated.subtract(prevCardsHeight, y);
    const isDisappearing = -totalCardHeight;
    const isTop = 0;
    const isBottom = height - totalCardHeight;
    const isAppearing = height;

    const translateY = Animated.add(
        Animated.add(
            y,
            y.interpolate({
                inputRange: [0, 0.00001 + prevCardsHeight],
                outputRange: [0, -prevCardsHeight],
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

    const onLayout = (e:LayoutChangeEvent) => {
        setVisibleCardHeight(e.nativeEvent.layout.height);
        
        //we add cardMargin because margin is not included in component height on layout
        setTotalCardHeights(totalCardHeights.concat(e.nativeEvent.layout.height+cardMargin));
        console.log(prevCardsHeight);
    };

  return (
    <Animated.View
      style={[styles.card, { opacity, marginVertical:cardMargin, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
        <Card
            onLayout={onLayout}
            {...{ item, cardWidth, visibleCardHeight }}
        />
    </Animated.View>
  );
};


const styles = StyleSheet.create({
    card: {
      alignSelf: "center",
    },
  });
export default WalletCard;