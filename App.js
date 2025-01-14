import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from './screens/SplashScreen'; 
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';


const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Show Details', 
          headerStyle: {
            backgroundColor: '#1c1c1c', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

//  bottom tab navigator
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e50914', 
        tabBarInactiveTintColor: '#888', 
        tabBarStyle: {
          backgroundColor: '#1c1c1c', 
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab" 
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SearchTab" 
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// root stack navigator
const RootStack = createStackNavigator();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {showSplash ? (
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;