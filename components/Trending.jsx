import { View, Text , FlatList, TouchableOpacity , ImageBackground, Image} from 'react-native'
import React,{useState} from 'react'
import * as Animatable from "react-native-animatable"
import { icons } from '../constants'

const zoomIn = {
    0 : {
        scale : 0.9
    },
    1 : {
        scale : 1
    }
}

const zoomOut = {
    0 : {
        scale : 1
    },
    1 : {
        scale : 0.9
    }
}

const TrendingItem = ({activeItem , item}) => {
    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className = "mr-5"
            animation={
                activeItem == item.$id ? zoomIn : zoomOut
            }
            duration={500}
        >
            {play ? (<Text className="text-white">/</Text> ) : (<TouchableOpacity className="relative justify-center items-center" activeOpacity={0.9} onPress={()=>setPlay(True)}> 
                <ImageBackground 
                    source={{uri : item.thumbnail}}
                    className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                    resizeMode='cover'
                />
                <Image 
                    source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode="contain"
                />
            </TouchableOpacity>)}
        </Animatable.View>
    )
}
const Trending = ({post}) => {
    const [activeItem, setactiveItem] = useState(post[0])

    const viewableItemChange=({viewableItems})=>{
        console.log(viewableItems)
        if(viewableItems.length > 0){
            setactiveItem(viewableItems[0].key)
        }
    }
  return (
    <FlatList 
        data = {post}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
            <TrendingItem
                activeItem = {activeItem}
                item={item}
            />        
          )}
        onViewableItemsChanged={viewableItemChange}
        viewabilityConfig={{itemVisiblePercentThreshold:70}}
        contentOffset={{x:170}}
        horizontal
    />
  )
}

export default Trending