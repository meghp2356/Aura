import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { images } from "../../constants";
import { SignIn as loggedInUser, getUserAccount } from "../../lib/appwrite";
import { useGlobaleContext } from "../../context/GlobaleProvider";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const { setUser, setisLoggedIn } = useGlobaleContext;

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "please fill al the fields");
    }

    setisSubmitting(true);

    try {
      await loggedInUser(form);
      const user = await getUserAccount();

      setUser(user);
      setisLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex w-full justify-center min-h-[94vh] px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35]"
          />

          <Text className=" text-2xl text-white text-semibold font-psemibold mt-10">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setform({ ...form , email: e });
            }}
            style="mt-7"
            keybordType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setform({ ...form , password: e });
            }}
            style="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className=" flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an Account
            </Text>

            <Link
              href="/sign-up"
              className=" text-lg font-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
