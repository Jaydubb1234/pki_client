import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MembersPage from '../members/MembersPage';
import Profile from '../profile/Profile';
import CommonScreens from './CommonScreens';
import {Button} from 'react-native'

const Stack = createStackNavigator();
const styles = {
    flex: 1,
};

const MemberScreens = ({ currentUserId }) => {
  return (
    <Stack.Navigator initialRouteName="Members"
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
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      }}>
      <Stack.Screen name="Members">
        {props => <MembersPage currentUserId={currentUserId} navigationProps={props}/>}
      </Stack.Screen>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default MemberScreens