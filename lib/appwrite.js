import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platfrom: "com.jsm.aora",
  projectId: "6635ff630009445f2530",
  databaseId: "663600cc0007cb3620fe",
  userCollectionId: "663600dc0006f01c9d0d",
  videoCollectionId: "66360126000659541826",
  storageId: "6636031d000377ef2948",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platfrom);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const CreateUser = async ({ username, email, password }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await SignIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        AccountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const SignIn = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw error;
  }
};

export const getUserAccount = async()=>{
  try {
    const currentAccount = await account.get()

    if(!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('AccountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error

    return currentUser.documents[0]

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllPost = async()=>{
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
    )

    return post.documents
  } catch (error) {
    throw error
  }
}

export const getLatestPost = async()=>{
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7))]
    )

    return post.documents
  } catch (error) {
    throw error
  }
}

