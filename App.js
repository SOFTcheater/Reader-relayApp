import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationState } from '@react-navigation/routers'
import { Ionicons } from '@expo/vector-icons';
import Chats from './screens/Chats';
import  Settings from "./screens/Settings";
import { colors } from "./config/constants";
import SignUp from "./screens/SignUp";
import Chat from "./screens/Chat";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Users from "./screens/Users";
import About from "./screens/About";
import Account from "./screens/Account";
import Help from "./screens/Help";
import Group from "./screens/Group";
import ChatInfo from "./screens/ChatInfo";
import ChatHeader from "./components/ChatHeader";
import ChatMenu from "./components/ChatMenu";
import { MenuProvider } from "react-native-popup-menu";
import Home from "./screens/Homescreen";
import News from "./screens/NewsScreen";
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { createStackNavigator } from '@react-navigation/stack';
import NewsArticleScreen from './screens/NewsScreen';
import { AuthenticatedUserProvider, AuthenticatedUserContext } from "./contexts/AuthenticatedUserContext";
import { UnreadMessagesProvider, UnreadMessagesContext } from "./contexts/UnreadMessagesContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  const { unreadCount, setUnreadCount } = useContext(UnreadMessagesContext);
  const navigation = useNavigation();

  return (
    <Tab.Navigator
   
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
             case 'Chats':
              iconName = 'chatbubbles';
              break;
              case 'Settings':
                iconName = 'settings';
                break;
            case 'Home':
              iconName = 'home';
              break;
            case 'News':
              iconName = 'newspaper';
              break;
           
          }
          if (!focused && !iconName.endsWith('-outline')) {
            iconName += '-outline';
          }
          return <Ionicons name={iconName} size={35} color={color}  />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        headerShown: true,
        presentation: 'modal',
        tabBarStyle: {
          height: 70, // Increase the height of the bottom tab navigator
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius:15,
          borderTopRightRadius:20 // Add padding to the bottom
        },
       headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="person-circle-outline" size={45} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Chats" options={{ tabBarBadge: unreadCount > 0 ? unreadCount : null}}>
        {() => <Chats setUnreadCount={setUnreadCount} />}
      </Tab.Screen>
     
      <Tab.Screen name="Home" color='black' component={Home}  />  
      <Tab.Screen name="News" color='black' component={News}  />  
      
    </Tab.Navigator>
  );
};

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader chatName={route.params.chatName} chatId={route.params.id} />,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen  name="Settings"  component={Settings}/>
    <Stack.Screen name="Users" component={Users} options={{ title: 'Select User' }} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="Help" component={Help} />
    <Stack.Screen name="Account" component={Account} />
    <Stack.Screen name="Group" component={Group} options={{ title: 'New Group' }} />
    <Stack.Screen name="ChatInfo" component={ChatInfo} options={{ title: 'Chat Information' }} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='SignUp' component={SignUp} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async authenticatedUser => {
      setUser(authenticatedUser || null);
      setIsLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <MenuProvider>
      <AuthenticatedUserProvider>
        <UnreadMessagesProvider>
          <RootNavigator />
        </UnreadMessagesProvider>
      </AuthenticatedUserProvider>
    </MenuProvider>
  );
};

export default App;
const styles = StyleSheet.create({
});
