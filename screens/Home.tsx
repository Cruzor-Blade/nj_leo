import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Pressable, Text, View, StyleSheet } from "react-native";
import { CardType, HomeStackParamsList } from "../global/types";
import AnimatedPostCard from "../components/AnimatedPostCard";
import { StackScreenProps } from "@react-navigation/stack";
import { firestore } from "../App";

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
        title:'HUhas ih',
        id:'Ijndasiu789231Iuindsa',
        rating:14,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'dshjhaxuh%uy3276',
        rating:74,
        description:" elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card3,
                dimensions:{height:Image.resolveAssetSource(imgs.card3).height, width:Image.resolveAssetSource(imgs.card3).width}
            },
            {
                type:'image',
                source:imgs.card5,
                dimensions:{height:Image.resolveAssetSource(imgs.card5).height, width:Image.resolveAssetSource(imgs.card5).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'Ihnasuy&632(*&y32187',
        rating:40,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
            {
                type:'image',
                source:imgs.card4,
                dimensions:{height:Image.resolveAssetSource(imgs.card4).height, width:Image.resolveAssetSource(imgs.card4).width}
            },
            {
                type:'image',
                source:imgs.card5,
                dimensions:{height:Image.resolveAssetSource(imgs.card5).height, width:Image.resolveAssetSource(imgs.card5).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'Iun87321658Guasbnkyds',
        rating:95,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,  hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card7,
                dimensions:{height:Image.resolveAssetSource(imgs.card7).height, width:Image.resolveAssetSource(imgs.card7).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'^&hj328yHihoinds9uJ90',
        rating:63,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card6,
                dimensions:{height:Image.resolveAssetSource(imgs.card6).height, width:Image.resolveAssetSource(imgs.card6).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'*neqw8B87312nbj&*9u423lkj9',
        rating:74,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card8,
                dimensions:{height:Image.resolveAssetSource(imgs.card8).height, width:Image.resolveAssetSource(imgs.card8).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'*nea8yuN8yheknwd8yuN8ye3q',
        rating:85,
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card5,
                dimensions:{height:Image.resolveAssetSource(imgs.card5).height, width:Image.resolveAssetSource(imgs.card5).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'*nds8ujn()ujndkas9080432',
        rating:0,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',               
                source:imgs.card6,
                dimensions:{height:Image.resolveAssetSource(imgs.card6).height, width:Image.resolveAssetSource(imgs.card6).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'(ujnmeaw9un90sau32-85478',
        rating:25,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card8,
                dimensions:{height:Image.resolveAssetSource(imgs.card8).height, width:Image.resolveAssetSource(imgs.card8).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'8ujnw890s7un)(8ujkewj90saudj',
        rating:33,
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card9,
                dimensions:{height:Image.resolveAssetSource(imgs.card9).height, width:Image.resolveAssetSource(imgs.card9).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'(*ujnewa9ujnku90udas;kgr8y',
        rating:72,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumtempora ratione aliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'()8jkeqw89nS8y8ihsendl',
        rating:83,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
    {
        title:'HUhas ih',
        id:'9Ujkeq0i43298ydiouo08uad',
        rating:43,
        description:"dolor sit amet consectetur adipisicing elit. Quam, tempora Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illum ratione aliquid impedit ea ullam qui illumLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tempora ratione aliquid impedit ea ullam qui illumaliquid impedit ea ullam qui illum hic eos consequuntur. Asperiores id, labore non cumque quidem tempora dolor. Distinctio, omnis?",
        socialLinks:{},
        visuals:[
            {
                type:'image',
                source:imgs.card9,
                dimensions:{height:Image.resolveAssetSource(imgs.card9).height, width:Image.resolveAssetSource(imgs.card9).width}
            },
            {
                type:'image',
                source:imgs.card2,
                dimensions:{height:Image.resolveAssetSource(imgs.card2).height, width:Image.resolveAssetSource(imgs.card2).width}
            },
            {
                type:'image',
                source:imgs.card1,
                dimensions:{height:Image.resolveAssetSource(imgs.card1).height, width:Image.resolveAssetSource(imgs.card1).width}
            },
        ]
    },
];

type HomePropsType = StackScreenProps<HomeStackParamsList, 'Home'>;
const Home = ({navigation}: HomePropsType) => {
    const [posts, setPosts] = useState<never[]|CardType[]>([]);
    
    const y = useRef(new Animated.Value(0)).current;
    
    const [totalCardHeights, setTotalCardHeights] = useState<number[]>([]); //Array containing the heights of all the rendered cards
  
    const sumArrayNumbers = (numArr:number[]):number => {
        let sum = 0;
        for (const index in numArr) {
            sum += numArr[index];
        };
        return sum;
    };

    const fetchPosts = async () => {
        let fetchedPosts:CardType[] = [];
        const result = await firestore
            .collection('posts')
            .orderBy('createdAt', 'desc')
            .get();

        result.forEach(document => {
            let refactoredDoc = document.data();
            refactoredDoc.id = document.id;
            fetchedPosts.push(refactoredDoc as CardType);
        });

        console.log(fetchedPosts);
        setPosts(fetchedPosts)
    }

    useEffect(() => {
        fetchPosts()
    }, []);
    // useEffect(() => {
    //     if(item.visuals[0].source.uri){
    //         Image.getSize(item.visuals[0].source.uri, (width: number, height: number) => {
    //             setImageDims({width, height});
    //         })
    //     } else {
    //         const imageDims = Image.resolveAssetSource(item.visuals[0].source||require('../assets/no_image.jpg'));
    //         setImageDims({width:imageDims.width, height:imageDims.height})
    //     }
    // }, []);

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
      <View style={{flex:1}}>
            <Pressable
                style={styles.floatingButtonContainer}
                android_ripple={{color:'#fff', foreground:true}}
                onPress={() => navigation.navigate('EditPost', {item:null})}
            >
                <Text style={{color:'#fff', fontSize:30}}>+</Text>
            </Pressable>
            <AnimatedFlatList
                scrollEventThrottle={16}
                bounces={false}
                data={cards}
                renderItem={RenderItem}
                ListFooterComponent={<View style={{width:'100%', paddingBottom:height/6}}/>}
                keyExtractor={(item:any) => item.id}
                {...{ onScroll }}
                extraData={y}
            />
      </View>
  );
};


const styles = StyleSheet.create({
    floatingButtonContainer:{
        backgroundColor:'purple',
        height:60,
        width:60,
        borderRadius:30,
        elevation:10,
        position:'absolute',
        zIndex:9999,
        bottom:50,
        right:30,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    },
})
export default Home;