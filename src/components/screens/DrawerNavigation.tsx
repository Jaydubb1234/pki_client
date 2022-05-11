import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import HomePagePosts from '../posts/HomePagePosts';
import MembersPage from '../members/MembersPage';
import SignIn from '../landing/SignIn';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const DrawerNavigtion = ({ route, navigation }) => {
  console.log('route ', route)
  console.log('navigation ',navigation)
    const homeIcon = <Icon name="home" size={30} color="#7e3f98" />;
    const freeWriteIcon = <Icon name="edit" size={30} color="#7e3f98" />;
    const PoolIcon = <Icon name="spinner" size={30} color="#7e3f98" />;
    const membersIcon = <Icon name="users" size={30} color="#7e3f98" />;
    const journalIcon = <Icon name="book" size={30} color="#7e3f98" />;
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home">
          {props => <HomePagePosts currentUserId={route.params.currentUserId} navigationProps={props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Members" component={MembersPage} />
      </Drawer.Navigator>


    //   <DrawerContentScrollView>
    //   <DrawerItem
    //     label="Close drawer"
    //     onPress={() => navigation.closeDrawer()}
    //   />
    //   <DrawerItem
    //     label="Toggle drawer"
    //     onPress={() => navigation.toggleDrawer()}
    //   />
    // </DrawerContentScrollView>
    );
}

export default DrawerNavigtion