import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { CardType, HomeStackParamsList } from "../global/types";
import Details from "../screens/Details";
import EditPost from "../screens/EditPost";
import { Image, Linking, Pressable, StyleSheet, Text, View, } from "react-native";
import { firestore } from "../App";
import { storage } from "../App";

const Stack = createStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
    const deletePost = async(item:CardType|null) => {
        if(item) {
            await firestore.doc(`posts/${item.id}`).delete();
            if(item.visuals[0].source.uri) {
                const fileRef = storage.refFromURL(item.visuals[0].source.uri);
                await fileRef.delete();
            }
        }
    };

    return (
        <Stack.Navigator
            // screenOptions={{headerShown:false}}
            initialRouteName='Home'
        >
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    header: () => (
                        <View style={{backgroundColor:'#fff', height:80, alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, flexDirection:'row'}}>
                            <Text style={{color:'#000', fontSize:20, fontWeight:'600'}}>
                                NJ Leo Business List
                            </Text>
                            <View style={{alignItems:'center'}}>
                                <Text style={{color:'#777', fontSize:16, marginRight:6}}>Suivez moi:</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Pressable onPress={() => Linking.openURL('http://youtube.com@NJLEO')}>
                                        <Image style={styles.socialIcon} source={require('../assets/youtube.png')}/>
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL('http://t.me/+cLNU6Jvk7P9iN2U8')}>
                                        <Image style={{...styles.socialIcon, transform:[{scale:0.95}]}} source={require('../assets/telegram.png')} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
            <Stack.Screen
                name='Details'
                component={Details}
                options={{headerTitle:'Détails'}}
            />
            <Stack.Screen
                name="EditPost"
                component={EditPost}
                options={({route}) => {
                    return {
                        headerTitle:route.params.item ? 'Éditer le post':'Publier un business',
                        headerRight:route.params.item ? () => (
                                <View style={{marginRight:20, borderRadius:30, overflow:'hidden'}}>
                                    <Pressable
                                        style={{paddingVertical:10, paddingHorizontal:14}}
                                        android_ripple={{color:'grey'}}
                                        onPress={() => deletePost(route.params.item)}
                                    >
                                        <Image source={require('../assets/bin.png')} style={{height:30, width:24, resizeMode:'contain'}}/>
                                    </Pressable>
                                </View>
                            ):undefined
                    }
                }}
            />
        </Stack.Navigator>
    )
};


const styles = StyleSheet.create({
    socialIcon: {
        height:50,
        width:50,
        resizeMode:'contain',
        // marginTop:5,
        marginHorizontal:7
    }
})

export default HomeStack;
