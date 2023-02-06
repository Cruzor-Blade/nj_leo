import { ImageSourcePropType, ImageURISource } from "react-native/types"

export type CardType = {
    id:string
    visuals:VisualItem[]
    title:string
    rating:number
    description:string
    socialLinks: {
        youtube?:string
        telegram?:string
        whatsapp?:string
    }
}

export type socialLinks = {
    youtube?:string,
    telegram?:string,
    whatsapp?:string
};

type VisualItem = {
    type:'image'
    source:ImageURISource
}

export type HomeStackParamsList = {
    Home:undefined
    Details:{
        item:CardType
    }
    EditPost:{
        item:CardType | null
    }
};