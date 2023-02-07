import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Pressable, Text, View, StyleSheet } from "react-native";
import { CardType, HomeStackParamsList } from "../global/types";
import AnimatedPostCard from "../components/AnimatedPostCard";
import { StackScreenProps } from "@react-navigation/stack";
import { firestore } from "../App";
import { cards } from "../assets/dummyCards";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { height: wHeight, width } = Dimensions.get("window");

const cardWidth = width * 0.9;
const height = wHeight - 64;


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