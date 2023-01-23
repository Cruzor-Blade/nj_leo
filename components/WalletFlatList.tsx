import React from "react";
import { Animated, FlatList } from "react-native";

import WalletCard from "./WalletCard";
import { CardType } from "../global/types";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
        <WalletCard item={item as CardType} {...{ index, y }} />
      )}
      keyExtractor={(item:any) => item.index}
      {...{ onScroll }}
    />
  );
};

export default Wallet;