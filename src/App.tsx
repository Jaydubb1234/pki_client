import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, connect } from 'react-redux';
import HomePagePosts from './components/posts/HomePagePosts';
import SignIn from './components/landing/SignIn';
import store from './store';
import MyTabs from './components/screens/MyTabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Profile from './components/profile/Profile';
import DrawerNavigation from './components/screens/DrawerNavigation';


const Stack = createStackNavigator();
const styles = {
    flex: 1,
};

// const [isAuthenticated, setIsAuthenticated] = React.useState(false);

// const handleSignIn = () => {
//   // TODO: implement sign in mechanism
//   setIsAuthenticated(true);
// }

// type Props = {};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home">
              {props => <HomePagePosts currentUserId={'14'}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

// class App extends React.Component<Props> {
//   render() {
//     return (
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen name="Home">
//               {props => <HomePagePosts currentUserId={'14'}/>}
//             </Stack.Screen>
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     );
//   }
// }

const mapStateToProps = ({ nav }) => ({ nav });
const RootNavigationStack = connect(mapStateToProps)(App)

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  const handleSignIn = async (args) => {
    // TODO: implement sign in mechanism

    try{
      const res = await fetch('https://www.poetsknowit.com/wp-json/api/v1/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: args.username,
          password: args.password
        })
      })
      const result = res.json()
      result.then(async data => {
        setUserId(data.ID)
        setIsAuthenticated(true);
        await AsyncStorage.setItem('userIdKey', data.ID.toString());
      })
    } catch(err) {
        console.log(err)
    }
  }

  const getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem('usernameKey');
      if (username !== null) {
        const id = await AsyncStorage.getItem('userIdKey')
        setUserId(id);
        // await AsyncStorage.clear()
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
  };

  const handleSignOut = async () => {
    // TODO implement real sign out mechanism
    await AsyncStorage.clear()
    setIsAuthenticated(false);
  };

  React.useEffect(() => {
     Promise.resolve(getRememberedUser())
  }, [])

  // return (
  //   <Provider store={store}>
  //     <StatusBar barStyle="light-content" />
  //     <NavigationContainer>
  //       {/* <DrawerNavigation currentUserId={userId} /> */}
  //       <Stack.Navigator screenOptions={{
  //         // title: "PKI",
  //         headerStyle: {
  //           backgroundColor: '#000000e8',
  //           borderBottomColor: '#000000e8',
  //           shadowColor: 'transparent',
  //         },
  //         headerTintColor: '#fff',
  //         headerBackTitleVisible: false,
  //       }}>
  //         {isAuthenticated ? (
  //           <> 
  //           {/* <Stack.Screen name="User Profile">
  //             {props => <DrawerNavigation currentUserId={userId} />}
  //           </Stack.Screen> */}
              
  //           {/* <Stack.Screen name="PKI">
  //             {props => <MyTabs currentUserId={userId} />}
  //           </Stack.Screen> */}
  //           <MyTabs currentUserId={userId} />
              
  //           {/* <Stack.Screen name="Profile" component={Profile} /> */}
  //           </>
  //         ) : (
  //             <Stack.Screen name="SignIn">
  //               {props => <SignIn {...props} onSignIn={handleSignIn} />}
  //             </Stack.Screen>
  //         )}
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </Provider>
  // );
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
          {isAuthenticated ? (
            <> 
            <MyTabs currentUserId={userId} />
            </>
        ) : (
            <Stack.Navigator>
              <Stack.Screen name="SignIn">
                {props => <SignIn {...props} onSignIn={handleSignIn} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
      </NavigationContainer>
    </Provider>
  );
}

export default Root