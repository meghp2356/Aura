import { View, Text, ScrollView, Image } from "react-native";
import { Redirect , router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton"
import { StatusBar } from "expo-status-bar";

import { images } from "../constants";
import { useGlobaleContext } from "../context/GlobaleProvider";

const Index = () => {
  const {isLoading , isLoggedIn} = useGlobaleContext()

  console.log(isLoading,isLoggedIn)
  if(!isLoading && isLoggedIn) return (<Redirect href="home"/>)
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{  height: "100%" }}>
        <View className="w-full flex justify-center items-center min-h-[94vh] px-4">
          <Image
            source={images.logo}
            className=" w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className=" max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discorver Endless Possibilities with{" "}
              <Text className=" text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              re  sizeMode="contain"
            />
          </View>

          <Text className=" font-pregular text-sm text-gray-100 mt-7 text-center ">
            Where creativity meets innovation embark on a journey of limitless
            exploration with Aura
          </Text>

          <CustomButton title="Continue with Email" handlePress={()=>router.push("/sign-in")} containerStyle = " w-full mt-7"/>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Index;
