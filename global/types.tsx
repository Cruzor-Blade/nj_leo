import { ImageSourcePropType } from "react-native/types"

export type CardType = {
    color:string
    visuals:VisualItem[]
    title:string
    description:string
}

type VisualItem = {
    type:'image'
    source:ImageSourcePropType
}

export type HomeStackParamsList = {
    Home:undefined
    Details:undefined
}