import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { CardType, HomeStackParamsList } from "../global/types";
import Details from "../screens/Details";
import EditPost from "../screens/EditPost";
import { Image, Linking, Modal, Pressable, StyleSheet, Text, ToastAndroid, View, } from "react-native";
import { firestore } from "../App";
import { storage } from "../App";
import { useState } from "react";

const Stack = createStackNavigator<HomeStackParamsList>();

type ConfirmDeleteModalPropsType = {
    visible:boolean
    onClosePress :() => void
    onCancel:() => void
    onConfirm:() => void
}
const ConfirmDeleteModal = ({ visible, onClosePress, onCancel, onConfirm}:ConfirmDeleteModalPropsType) => {
    const onConfirmPress = () => {
        onConfirm();
    }
    return (
        <Modal
            transparent={true}
            animationType='fade'
            statusBarTranslucent
            visible={visible}
            onRequestClose={onClosePress}
        >
            <View style={{flex:1, alignItems:'center', justifyContent:'center',}} >
                <View style={{width:'80%', backgroundColor:'#fff', borderRadius:20, padding:16, elevation:3}}>
                    <View style={{marginBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize:17, fontWeight:'500', color:'#cc0000'}}>
                            Supprimer le business?
                        </Text>
                        <Pressable
                            style={styles.closeBtn}
                            onPress={onClosePress}
                            hitSlop={4}
                        >
                            <Text style={{fontWeight:'500', color:'#000', transform:[{scaleY:0.8}, {translateY:-1}]}}>
                                X
                            </Text>
                        </Pressable>
                    </View>
                    <Text style={{fontSize:14, color:'gray'}}>
                        Il ne sera pas possible de le restaurer ultérieurement
                    </Text>
                    
                    <View style={{flexDirection:'row'}}>
                        <Pressable onPress={onCancel} style={styles.confirmBtn}>
                            <Text style={{fontSize:16, fontWeight:'500'}}>Annuler</Text>
                        </Pressable>
                        <Pressable onPress={onConfirmPress} style={{...styles.confirmBtn, backgroundColor:'darkorange'}}>
                            <Text style={{fontSize:16, fontWeight:'500', color:'rgba(255, 255, 25, 0.7)'}}>Confirmer</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
};


const HomeStack = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const deletePost = async(item:CardType|null) => {
        if(item) {
            try {
                await firestore.doc(`posts/${item.id}`).delete();
                if(item.visuals[0].source.uri) {
                    const fileRef = storage.refFromURL(item.visuals[0].source.uri);
                    await fileRef.delete();
                }
                ToastAndroid.show('Publication suprimée', 1500);
                setModalVisible(false);
            } catch (error) {
                ToastAndroid.show('Une erreur est survenue', 1500);
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
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Image source={require('../assets/bin.png')} style={{height:30, width:24, resizeMode:'contain'}}/>
                                    </Pressable>
                                    <ConfirmDeleteModal
                                        visible={modalVisible}
                                        onCancel={() => setModalVisible(false)}
                                        onClosePress={() => setModalVisible(false)}
                                        onConfirm={() => deletePost(route.params.item)}
                                    />
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
    },
    closeBtn:{
        height:20,
        width:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.05)',
        transform:[{scale:1.4}, {translateX:-6}, {translateY:-4}]
    },
    confirmBtn:{
        flex:1,
        height:48,
        backgroundColor:'aqua',
        marginTop:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        marginHorizontal:10,
    },
})

export default HomeStack;
