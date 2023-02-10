import {useContext, useState} from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../App';
import { AuthContext } from '../contexts/AuthContext';

const SignUp = () => {
    const emailRegExp = new RegExp('^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}$');
    
    const setUser = useContext(AuthContext)?.setUser; 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    
    const endEditObject = {
        email:() => {setEmailValid(emailRegExp.test(email)); return emailRegExp.test(email)},
        password:() => {setPasswordValid(password.length>=8); return password.length>=8},
    };

    const onConnect = async () => {
        const condition = setUser
        && endEditObject.email()
        && endEditObject.password();
        
        if(condition) {
            await auth.signInWithEmailAndPassword(email, password);
            // setUser(response.data);
        }
    }
    return (
        <View>
            {emailValid? null: <Text style={styles.error}>Addresse email non valide</Text>}
            <TextInput
                placeholder='addresse email'
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder='mot de passe'
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
            />
            <Pressable
                android_ripple={{foreground:true, color:'#fff'}}
                onPress={onConnect} style={styles.connectBtn}>
                <Text style={{fontSize:16, fontWeight:'500', color:'#fff'}}>Se connecter</Text>
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
        height:40,
        width:'100%',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        color:'black'
    },
    connectBtn:{
        height:48,
        width:'90%',
        backgroundColor:'#000080',
        marginTop:20,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        flexDirection:'row'
    },
})
export default SignUp;