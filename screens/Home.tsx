import React, { useState } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import { CardType, HomeStackParamsList } from "../global/types";
import AnimatedPostCard from "../components/AnimatedPostCard";
import { StackScreenProps } from "@react-navigation/stack";


const imgs = {
    card1:require('../assets/card1.jpg'),
    card2:require('../assets/card2.jpg'),
    card3:require('../assets/card3.jpg'),
    card4:require('../assets/card4.jpg'),
    card5:require('../assets/card5.jpg'),
    card6:require('../assets/card6.jpg'),
    card7:require('../assets/card7.jpg'),
    card8:require('../assets/card8.jpg'),
    card9:require('../assets/card9.jpg'),
    card10:require('../assets/card10.jpg'),
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { height: wHeight, width } = Dimensions.get("window");

const cardWidth = width * 0.9;
const height = wHeight - 64;

const cards:CardType[] = [
    {
        reliabilityColor:'blue',
        title:'HUhas ih',
        id:'Ijndasiu789231Iuindsa',
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
        reliabilityColor:'red',
        title:'HUhas ih',
        id:'dshjhaxuh%uy3276',
        description:" elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ",
        visuals:[
            {
                type:'image',
                source:imgs.card2
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
        reliabilityColor:'purple',
        title:'HUhas ih',
        id:'Ihnasuy&632(*&y32187',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card10
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
        reliabilityColor:'gray',
        title:'HUhas ih',
        id:'Iun87321658Guasbnkyds',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,  hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card7
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
        reliabilityColor:'aquamarine',
        title:'HUhas ih',
        id:'^&hj328yHihoinds9uJ90',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card6
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
        reliabilityColor:'cyan',
        title:'HUhas ih',
        id:'*neqw8B87312nbj&*9u423lkj9',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card8
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
        reliabilityColor:'magenta',
        title:'HUhas ih',
        id:'*nea8yuN8yheknwd8yuN8ye3q',
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card5
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
        reliabilityColor:'aquamarine',
        title:'HUhas ih',
        id:'*nds8ujn()ujndkas9080432',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card6
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
        reliabilityColor:'cyan',
        title:'HUhas ih',
        id:'(ujnmeaw9un90sau32-85478',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card8
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
        reliabilityColor:'magenta',
        title:'HUhas ih',
        id:'8ujnw890s7un)(8ujkewj90saudj',
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card9
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
        reliabilityColor:'aquamarine',
        title:'HUhas ih',
        id:'(*ujnewa9ujnku90udas;kgr8y',
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card2
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
        reliabilityColor:'cyan',
        title:'HUhas ih',
        id:'()8jkeqw89nS8y8ihsendl',
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
        reliabilityColor:'magenta',
        title:'HUhas ih',
        id:'9Ujkeq0i43298ydiouo08uad',
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        visuals:[
            {
                type:'image',
                source:imgs.card9
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
];

type HomePropsType = StackScreenProps<HomeStackParamsList, 'Home'>;
const Home = ({navigation}: HomePropsType) => {
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
                {...{ index, y, cardWidth, height, totalCardHeights, setTotalCardHeights, prevCardsHeight, navigation }}
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
        keyExtractor={(item:any) => item.id}
        {...{ onScroll }}
    />
  );
};

export default Home;