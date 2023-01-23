import React, { useState } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import { CardType } from "../global/types";
import AnimatedPostCard from "../components/AnimatedPostCard";


const imgs = {
    card1:require('../assets/card1.png'),
    card2:require('../assets/card2.png'),
    card3:require('../assets/card3.png'),
    card4:require('../assets/card4.png'),
    card5:require('../assets/card5.png'),
    card6:require('../assets/card6.png'),
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { height: wHeight, width } = Dimensions.get("window");

const cardWidth = width * 0.9;
const height = wHeight - 64;

const cards:CardType[] = [
    {
        color:'blue',
        title:'HUhas ih',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card1
            },
        ]
    },
    {
        color:'red',
        title:'HUhas ih',
        description:" elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card3
            },
            {
                type:'image',
                source:imgs.card5
            },
        ]
    },
    {
        color:'purple',
        title:'HUhas ih',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card4
            },
            {
                type:'image',
                source:imgs.card5
            },
        ]
    },
    {
        color:'gray',
        title:'HUhas ih',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,  hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card2
            },
            {
                type:'image',
                source:imgs.card1
            },
        ]
    },
    {
        color:'aquamarine',
        title:'HUhas ih',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card2
            },
            {
                type:'image',
                source:imgs.card1
            },
        ]
    },
    {
        color:'cyan',
        title:'HUhas ih',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card2
            },
            {
                type:'image',
                source:imgs.card1
            },
        ]
    },
    {
        color:'magenta',
        title:'HUhas ih',
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card1
            },
            {
                type:'image',
                source:imgs.card2
            },
            {
                type:'image',
                source:imgs.card1
            },
        ]
    },
    
]
const Home = () => {
    const y = new Animated.Value(0);
    
    const [totalCardHeights, setTotalCardHeights] = useState<number[]>([]); //Array containing the heights of all the rendered cards
  
    const sumArrayNumbers = (numArr:number[]):number => {
        let sum = 0;
        for (const index in numArr) {
            sum += numArr[index];
        };
        return sum;
    };

    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true,
    });

    const RenderItem = ({ item, index }:{item:unknown, index:number}) => {
        const prevCardsHeight = sumArrayNumbers(totalCardHeights.slice(0, index));
        return (
            <AnimatedPostCard
                item={item as CardType}
                {...{ index, y, cardWidth, height, totalCardHeights, setTotalCardHeights, prevCardsHeight }}
            />
        )
    };

  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={RenderItem}
      ListFooterComponent={<View style={{width:'100%', paddingBottom:height/6}}/>}
      keyExtractor={(item:any) => item.color}
      {...{ onScroll }}
    />
  );
};

export default Home;