import HomeStack from "./navigation/HomeStack";
import { NavigationContainer } from '@react-navigation/native';
import firestoreModule from '@react-native-firebase/firestore';
import storageModule from '@react-native-firebase/storage';

export const firestore = firestoreModule();
export const storage = storageModule();

const App = () => {
    return (
        <NavigationContainer>
            <HomeStack/>
        </NavigationContainer>
    )
};

export default App;