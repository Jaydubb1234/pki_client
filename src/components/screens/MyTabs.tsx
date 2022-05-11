import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePagePosts from '../posts/HomePagePosts';
import MembersPage from '../members/MembersPage';
import SignIn from '../landing/SignIn';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../profile/Profile';
import HomeScreens from './HomeScreens';
import MemberScreens from './MemberScreens';

const Tab = createBottomTabNavigator();

const MyTabs = ({ currentUserId }) => {
    const homeIcon = <Icon name="home" size={30} color="#7e3f98" />;
    const freeWriteIcon = <Icon name="edit" size={30} color="#7e3f98" />;
    const PoolIcon = <Icon name="spinner" size={30} color="#7e3f98" />;
    const membersIcon = <Icon name="users" size={30} color="#7e3f98" />;
    const journalIcon = <Icon name="book" size={30} color="#7e3f98" />;
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                    case 'Home':
                        return (
                            homeIcon
                        );
                    case 'Free Write':
                        return (
                            freeWriteIcon
                        );
                    case 'Pool':
                        return (
                            PoolIcon
                        );
                    case 'Members':
                        return (
                            membersIcon
                        );
                    case 'Journal':
                        return (
                            journalIcon
                        );
                    default:
                        break;
                }
            },
          })}
          tabBarOptions={{
            activeTintColor: '#7e3f98',
              inactiveTintColor: '#fff',
              style: {
                  backgroundColor: '#000000e8',
                  borderTopColor: '#000000e8',
            }
          }}
        >
            {/* <Tab.Screen name="Home">
                {props => <HomePagePosts currentUserId={currentUserId} navigationProps={props} />}
            </Tab.Screen>  */}
            <Tab.Screen name="Home">
                {props => <HomeScreens currentUserId={currentUserId} props={props}/>}
            </Tab.Screen> 
            <Tab.Screen name="Free Write" component={SignIn} />
            <Tab.Screen name="Pool" component={SignIn} />
            <Tab.Screen name="Members">
                {props => <MemberScreens currentUserId={currentUserId} />}
            </Tab.Screen>
            <Tab.Screen name="Journal" component={SignIn} />
        </Tab.Navigator>
    );
}

export default MyTabs