import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { HomeStackParamsList } from "../global/types";
import Details from "../screens/Details";
import EditPost from "../screens/EditPost";
import { Image, Linking, Pressable, StyleSheet, Text, View, } from "react-native";


const Stack = createStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
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
                                    <Pressable onPress={() => Linking.openURL('http://youtube.com')}>
                                        <Image style={styles.socialIcon} source={require('../assets/youtube.png')}/>
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL('http://telegram.com')}>
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
                options={{headerTitle:'Éditer le post'}}
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
