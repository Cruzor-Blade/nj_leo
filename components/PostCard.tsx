import { Image, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { CardType, HomeStackParamsList } from "../global/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ratingColors } from "../screens/EditPost";


type PostCardProps = {
  item:CardType
  cardWidth:number
  visibleCardHeight:number
  onLayout:(event: LayoutChangeEvent) => void
  navigation:StackNavigationProp<HomeStackParamsList, "Home", undefined>
}

const PostCard = ({ item, cardWidth, onLayout, navigation }: PostCardProps) => {
    const imageDims = item.visuals[0].dimensions;
    
    const onPress = () => {
        navigation.navigate('Details', {item})
    };

    const displayHeight = (cardWidth/imageDims.width)*imageDims.height;

    return (
        <View
            style={[styles.card, {width:cardWidth, elevation:10, shadowColor:'rgba(0, 0, 0, 0.5)', backgroundColor:'#fff', overflow:'hidden'}]}
            onLayout={onLayout}
        >
            <Pressable
                android_ripple={{foreground:true, color:'aquamarine'}}
                style={{overflow:'hidden'}}
                onPress={onPress}
            >

                <Image
                    source={item.visuals[0].source? item.visuals[0].source:require('../assets/no_image.jpg')}
                    style={{height:displayHeight, width:cardWidth, resizeMode:'stretch'}}
                />
                <View style={styles.cardBottom}>
                    <Text style={{fontSize:20, color:'#000', fontWeight:'500'}}>
                        {item.title}
                    </Text>
                    <Text style={{color:'#567'}}>
                        {item.description}
                    </Text>
                </View>
                <View style={{marginBottom:10, flexDirection:'row', justifyContent:'flex-end', paddingHorizontal:30}}>
                    <Text style={{color:'#777'}}>fiabilité</Text>
                    <View style={{height:20, width:40, backgroundColor:ratingColors.filter(rating => rating.max - item.rating>=0 && item.rating -rating.min >=0)[0].color, marginLeft:10, borderRadius:9}}/>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
      borderRadius:20
    },
    cardBottom: {
        padding:14
    }
  });
  
export default PostCard;