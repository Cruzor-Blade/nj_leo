import {useContext, useState} from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../App';
import { AuthContext } from '../contexts/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamsList } from '../global/types';


type SignUpPropsType = StackScreenProps<HomeStackParamsList, 'SignUp'>;

const SignIn = ({navigation}:SignUpPropsType) => {
    const emailRegExp = new RegExp('^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}$');
    
    const setUser = useContext(AuthContext)?.setUser; 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [error, setError] = useState('');

    const endEditObject = {
        email:() => {setEmailValid(emailRegExp.test(email)); return emailRegExp.test(email)},
        password:() => {setPasswordValid(password.length>=8); return password.length>=8},
    };

    const onConnect = async () => {
        if(error) setError('');
        const condition = setUser
        && endEditObject.email()
        && endEditObject.password();
        
        if(condition) {
            try {
                await auth.signInWithEmailAndPassword(email, password);
                // setUser(response.data);
                navigation.replace('Home', {shouldRefresh:false});
            } catch (error) {
                console.log('An error occured: ', error);
                setError('An error occured');
            }
        }
    };

    return (
        <View style={{backgroundColor:'#fff', flex:1}}>
            <Text style={{marginVertical:15, marginHorizontal:20, fontSize:15, color:'#000'}}>
                Vous pouvez vous connecter à votre compte en remplissant les informations ci dessous
            </Text>
            {emailValid? null: <Text style={styles.error}>Addresse email non valide</Text>}
            <TextInput
                placeholder='addresse email'
                style={{...styles.textInput, marginTop:10}}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor='#888'
            />
            {passwordValid? null: <Text>Le mot de passe doit avoir au moins 8 caractères</Text>}
            <TextInput
                placeholder='mot de passe'
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor='#888'
            />
            {
                error?<Text>{error}</Text>:null
            }
            <Pressable
                android_ripple={{foreground:true, color:'#fff'}}
                onPress={onConnect} style={styles.connectBtn}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#fff'}}>Se connecter</Text>
            </Pressable>
            <Text style={{marginTop:15, textAlign:'center'}}>Vous n'avez pas encore un compte?</Text>
            <Pressable
                android_ripple={{foreground:true, color:'#ccc'}}
                onPress={() => navigation.navigate('SignUp')} style={{...styles.connectBtn, marginTop:15, backgroundColor:'#fff', borderWidth:3, borderColor:'#000080'}}>
                <Text style={{fontSize:16, fontWeight:'600', color:'#000080'}}>Créer un compte</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    error:{
        color:'red',
        fontSize:12,
        marginBottom:8,
        marginHorizontal:20
    },
    textInput:{
        height:46,
        width:'90%',
        borderWidth:1,
        borderColor:'#777',
        alignItems:'center',
        justifyContent:'center',
        color:'black',
        alignSelf:'center',
        borderRadius:5,
        marginVertical:5,
        paddingHorizontal:15
    },
    connectBtn:{
        height:48,
        width:'90%',
        backgroundColor:'#000080',
        marginTop:20,
        borderRadius:20,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        flexDirection:'row'
    },
})
export default SignIn;