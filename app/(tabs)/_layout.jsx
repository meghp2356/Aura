import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ 
          tabBarShowLabel: false ,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarHideOnKeyboard : true,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}>
        <Tabs.Screen  
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title : "Bookmark",
            headerShown: false,
            tabBarIcon : ({color , focused})=>(
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.bookmark}
                name={"Bookmark"}
              />
            )
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title : "Create",
            headerShown: false,
            tabBarIcon : ({color , focused})=>(
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.plus}
                name={"Create"}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title : "Profile",
            headerShown: false,
            tabBarIcon : ({color , focused})=>(
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.profile}
                name={"Profile"}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
