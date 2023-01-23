import HomeStack from "./navigation/HomeStack";
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    return (
        <NavigationContainer>
            <HomeStack/>
        </NavigationContainer>
    )
};

export default App;