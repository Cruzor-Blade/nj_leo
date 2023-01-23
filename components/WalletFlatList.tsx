import React from "react";
import { Animated, Dimensions, FlatList } from "react-native";

import WalletCard from "./WalletCard";
import { CardType } from "../global/types";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ratio = 228 / 362;
const cardMargin = 16;
const { height: wHeight, width } = Dimensions.get("window");

const cardWidth = width * 0.9;
const visibleCardHeight = cardWidth * ratio; //The visible height of a card

const totalCardHeight = visibleCardHeight + cardMargin * 2; //The total height of a card, including vertical margin
const height = wHeight - 64;

const cards:CardType[] = [
    {
        color:'blue'
    },
    {
        color:'red'
    },
    {
        color:'purple'
    },
    {
        color:'gray'
    },
    {
        color:'aquamarine'
    },
    {
        color:'cyan'
    },
    {
        color:'magenta'
    },
    
]
const Wallet = () => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={({ item, index }) => (
        <WalletCard
            item={item as CardType}
            {...{ index, y, cardMargin, totalCardHeight:(totalCardHeight+20*index), cardWidth, visibleCardHeight:(visibleCardHeight+40*index), height, }}
        />
      )}
      keyExtractor={(item:any) => item.color}
      {...{ onScroll }}
    />
  );
};

export default Wallet;