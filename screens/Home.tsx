import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Pressable, Text, View, StyleSheet } from "react-native";
import { CardType, Dictionnary, HomeStackParamsList } from "../global/types";
import AnimatedPostCard from "../components/AnimatedPostCard";
import { StackScreenProps } from "@react-navigation/stack";
import { auth, firestore } from "../App";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { height: wHeight, width } = Dimensions.get("window");

const cardWidth = width * 0.9;
const height = wHeight - 64;


type HomePropsType = StackScreenProps<HomeStackParamsList, 'Home'>;
const Home = ({navigation, route}: HomePropsType) => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const setUser = authContext?.setUser;
    const isAdmin = authContext?.isAdmin;
    const setAdminsArr = authContext?.setAdminsArr;

    const [posts, setPosts] = useState<CardType[]>([]);
    const [startAfterDate, setStartAfterDate] = useState<Date|null>(null);
    const [loading, setLoading] = useState(false);

    const y = useRef(new Animated.Value(0)).current;
    
    const [totalCardHeights, setTotalCardHeights] = useState<number[]>([]); //Array containing the heights of all the rendered cards
  
    const sumArrayNumbers = (numArr:number[]):number => {
        let sum = 0;
        for (const index in numArr) {
            sum += numArr[index];
        };
        return sum;
    };

    const getAdmins = async () => {
        let adminsEmails = [];
        const adminsSnapshot = await firestore.collection('admins').get();
        for (const doc of adminsSnapshot.docs) {
            adminsEmails.push(doc.data().email);
        }
        if(setAdminsArr) setAdminsArr(adminsEmails);
    };

    const fetchPosts = async (number:number, fromDate?:Date|null, reset?:boolean) => {
        if(loading) return;
        setLoading(true);

        let fetchedPosts:CardType[] = [];
        let query = firestore.collection('posts').orderBy('createdAt', 'desc');
            
        if(fromDate) query = query.startAfter(fromDate); //apply fromDate filter if specified
            
        const result = await query.limit(number).get();

        if(result.empty) {
            console.log('List empty')
            setLoading(false);
            return;   
        };
        for (const document of result.docs) {
            let docData = document.data();

            await Image.getSize(docData.visuals[0].source.uri, (width: number, height: number) => {
                let refactoredDoc:CardType = {
                    id:document.id,
                    visuals:docData.visuals,
                    title:docData.title,
                    rating:docData.rating,
                    description:docData.description,
                    socialLinks: docData.socialLinks
                };
                
                refactoredDoc.visuals[0].dimensions = {width, height};

                fetchedPosts.push(refactoredDoc);
            })
        };

        if(reset) {
            setPosts(fetchedPosts);
        } else {
            setPosts(posts.concat(fetchedPosts));
        }
        setStartAfterDate(result.docs[result.docs.length-1].data().createdAt);
        setLoading(false);
    };

    const onFloatingButtonPress = () => {
        if(isAdmin) {
            navigation.navigate('EditPost', {item:null})
        } else if(!user) {
            navigation.navigate('SignIn');
        } else {

        }
    };


    useFocusEffect(() => {
        if(route.params?.shouldRefresh) { //if shouldRefresh is enabled, refetch posts and disable shouldRefresh
            fetchPosts(3, undefined, true);
            navigation.setParams({shouldRefresh:false})
        }
    });
      

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(authUser => {
            if(authUser && setUser) setUser({email:authUser.email||'', id:authUser.uid});
        })
        getAdmins();
        fetchPosts(3).then(() => fetchPosts(5, startAfterDate));
        return subscriber;
    }, []);
    
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
            {
                (isAdmin) || !user ?
                <Pressable
                    style={styles.floatingButtonContainer}
                    android_ripple={{color:'#fff', foreground:true}}
                    onPress={onFloatingButtonPress}
                >
                    { () => {
                            if(isAdmin) {
                                return <Text style={{color:'#fff', fontSize:30}}>+</Text>;
                            } else if(!user) {
                                return <Image source={require('../assets/user.png')} style={{height:30, width:30, tintColor:'#fff'}} />;
                            }
                        }
                    }
                </Pressable>
                :
                null
            }
            <AnimatedFlatList
                scrollEventThrottle={16}
                bounces={false}
                data={posts}
                renderItem={RenderItem}
                ListFooterComponent={<View style={{width:'100%', paddingBottom:height/6}}/>}
                keyExtractor={(item:any) => item.id}
                {...{ onScroll }}
                extraData={y}
                onEndReachedThreshold={0.2}
                onEndReached={() => fetchPosts(4, startAfterDate)}
                refreshing={loading}
                onRefresh={() => fetchPosts(3, undefined, true)}
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