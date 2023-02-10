import { ImageSourcePropType, ImageURISource } from "react-native/types"

export type Dictionnary = {
    [key:string]:any
};

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
    dimensions:{height:number, width:number}
    type:'image'
    source:ImageURISource
}

export type HomeStackParamsList = {
    Home:{
        shouldRefresh?:boolean
    }
    Details:{
        item:CardType
    }
    EditPost:{
        item:CardType | null
    }
    SignIn:undefined
    SignUp:undefined
};

export type UserType = {
    email:string
    id:string
};

export type SetUserType = React.Dispatch<React.SetStateAction<UserType | null>>;

export type AuthContextType = {
    isAdmin:boolean
    setAdminsArr:React.Dispatch<React.SetStateAction<string[]>>
    user:UserType | null
    setUser:SetUserType
};
