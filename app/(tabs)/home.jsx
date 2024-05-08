import { View, Text , FlatList , Image, RefreshControl , Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import {images} from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPost, getLatestPost } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'

const home = () => {
  const [refreshing, setrefreshing] = useState(false)

  const {data : post , refetch} = useAppwrite(getAllPost)
  const {data : LatestPost} = useAppwrite(getLatestPost)

  const onRefresh = async()=>{
    
    setrefreshing(true)
    await refetch()
    setrefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data = {post}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=>(
          <VideoCard 
            video = {item}
          />
        )}
        ListHeaderComponent={()=>(
          <View className=" my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome back
                  </Text>
                  <Text className="text-2xl font-semibold text-white">
                    Megh
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image 
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode='contain'
                  />
                </View>
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8  ">
                <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Video</Text>
                <Trending post={LatestPost}/>
            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState 
            title="no video found"
            subTitle="Be the first one to upload video"
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default home