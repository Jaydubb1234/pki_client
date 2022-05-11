import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePagePosts from '../posts/HomePagePosts';
import Profile from '../profile/Profile';
import CommonScreens from './CommonScreens';
import { Button } from 'react-native'
import DrawerNavigation from './DrawerNavigation'

const Stack = createStackNavigator();
const styles = {
    flex: 1,
};

const HomeScreens = ({ currentUserId, props }) => {
  console.log('props ', props)
  console.log('currentUserId ',currentUserId)
  return (
    <> 
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000e8',
            borderBottomColor: '#000000e8',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerRight: () => (
            <Button
              // onPress={() => props.navigation.navigate('Profile', {userId: currentUserId})}
              onPress={() => props.navigation.navigate('Drawer', {userId: currentUserId})}
              title="your profile"
              color="#fff"
            />
          ),
        }}>
          <Stack.Screen name="Home">
            {props => <HomePagePosts currentUserId={currentUserId} navigationProps={props} />}
          </Stack.Screen>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Drawer" component={DrawerNavigation} />
        </Stack.Navigator>
      </>
  );
}

export default HomeScreens