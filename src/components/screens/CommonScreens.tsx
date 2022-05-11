import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../profile/Profile';

const Stack = createStackNavigator();
const styles = {
    flex: 1,
};

const CommonScreens = ({ currentUserId }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default CommonScreens