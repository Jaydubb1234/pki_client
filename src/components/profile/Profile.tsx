// import * as React from 'react';
// import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
 
// const Profile = ({ navigation, route }) => {
//   console.log(route.params)
//   return (
//     <View style={styles.container}>
//       <Text style={{color: '#fff'}}>Profile Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
 
// export default Profile;

import * as React from 'react'
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabView,
  TabBar,
} from 'react-native-tab-view'
import * as PropTypes from 'prop-types'

import Posts from './Posts'
import MemberApi from '../../api/MemberApi';
import PostApi from '../../api/PostApi';

type Props = {
  containerStyles: any
  posts: any[]
  avatar: string
  name: string
  bio: string 
  user: any
  route: any
  navigation: any
};

class Profile extends React.Component<Props>{
  constructor(props) {
    super(props);
    // this.state = {
    //   userInfo: null,
    //   userAvatar: '',
    // }
  }
  // static propTypes = {
  //   avatar: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   bio: PropTypes.string.isRequired,
  //   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  //   tabContainerStyle: PropTypes.oneOfType([
  //     PropTypes.object,
  //     PropTypes.number,
  //   ]),
  //   posts: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.number.isRequired,
  //       words: PropTypes.string.isRequired,
  //       sentence: PropTypes.string.isRequired,
  //       paragraph: PropTypes.string.isRequired,
  //       image: PropTypes.string,
  //       user: PropTypes.shape({
  //         name: PropTypes.string.isRequired,
  //         username: PropTypes.string.isRequired,
  //         avatar: PropTypes.string.isRequired,
  //         email: PropTypes.string.isRequired,
  //       }),
  //     })
  //   ).isRequired,
  // }

  // static defaultProps = {
  //   containerStyle: {},
  //   tabContainerStyle: {},
  //   Posts: {}, //needed?
  // }

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: '1', title: 'active', count: 31 },
        { key: '2', title: 'like', count: 86 },
        { key: '3', title: 'following', count: 95 },
        { key: '4', title: 'followers', count: '1.3 K' },
      ],
    },
    userInfo: null,
    userInfoLoading: true,
    userAvatar: '',
    userAvatarLoading: true,
    userId: this.props.route.params.userId,
    posts: null,
    postsLoading: true
  }

  componentDidMount() {
    MemberApi.getMember(this.state.userId)
      .then((res) => {
        this.setState({
          userInfo: res.data,
          userInfoLoading: false
        })
      })
      .catch((err) => {
        console.log('err ',err)
      })
    
    MemberApi.getMembersAvatar(this.state.userId)
      .then((res) => {
        this.setState({
          userAvatar: res,
          userAvatarLoading: false
        })
      })
      .catch((err) => {
        console.log('err ',err)
      })
    
    PostApi.getPost(this.state.userId)
      .then((res) => {
        this.setState({
          posts: res,
          postsLoading: false
        })
      })
      .catch((err) => {
        console.log('err ',err)
    })
  }

  onPressPlace = () => {
    console.log('place')
  }

  handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  componentDidUpdate = () => {
    this.props.navigation.setOptions({
      title: this.state.postsLoading || this.state.userAvatarLoading || this.state.userInfoLoading ? 'Profile' : `${this.state.userInfo.display_name}`
    })
  }

  renderTabBar = props => {
    return <TabBar
      indicatorStyle={styles.indicatorTab}
      renderLabel={this.renderLabel(props)}
      pressOpacity={0.8}
      style={styles.tabBar}
      {...props}
    />
  };

  renderLabel = props => ({ route }) => {
    const routes = props.navigationState.routes

    let labels = []
    routes.forEach((e, index) => {
      labels.push(index === props.navigationState.index ? 'black' : 'white')
    })

    const currentIndex = parseInt(route.key) - 1
    const color = labels[currentIndex]

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  renderScene = ({ route: { key } }) => {
    let isLoading = true

    // if (!this.state.userInfoLoading && !this.state.postsLoading) {
    //   const mappedPosts = this.state.posts.map(post => {
    //     post.display_name = this.state.userInfo.display_name || ''
    //     return post
    //   })

    //   console.log('profile posts before', this.state.posts)
    //   this.setState({
    //     posts: mappedPosts
    //   })
    // }

    return (
      <>
        <View>
          {
            this.state.postsLoading || this.state.userAvatarLoading || this.state.userInfoLoading ?
              <Text style={{color: 'white'}}>Loading...</Text> :
              <>
                {isLoading = false}
                <Posts containerStyle={styles.sceneContainer} posts={this.state.posts} userName={this.state.userInfo.display_name} userAvatar={this.state.userAvatar} navProps={this.props.navigation} isLoading={isLoading} />
              </>
          }
        </View>
      </>
    )
    // const { posts } = this.props

    // switch (key) {
    //   case '1':
    //     return <Posts containerStyle={styles.sceneContainer} posts={posts} />
    //   case '2':
    //     return <Posts containerStyle={styles.sceneContainer} posts={posts} />
    //   case '3':
    //     return <Posts containerStyle={styles.sceneContainer} posts={posts} />
    //   case '4':
    //     return <Posts containerStyle={styles.sceneContainer} posts={posts} />
    //   default:
    //     return <View />
    // }
  }

  renderContactHeader = (userId) => {
    const bio = 'i am who i say i am'

    return (
      <View style={styles.headerContainer}>
          {this.state.userInfoLoading || this.state.userAvatarLoading ?
          <Text> Loading...</Text> :
          <>
            <View style={styles.userRow}>
              <Image
                style={styles.userImage}
                source={{uri: this.state.userAvatar}}
              />
              <View style={styles.userNameRow}>
                <Text style={styles.userNameText}>{this.state.userInfo.display_name}</Text>
              </View>
              <View style={styles.userBioRow}>
                <Text style={styles.userBioText}>{bio}</Text>
              </View>
            </View>
            <View style={styles.socialRow}>
              <View>
                <Icon
                  size={30}
                  type="entypo"
                  color="#3B5A98"
                  name="facebook-with-circle"
                  onPress={() => console.log('facebook')}
                />
              </View>
              <View style={styles.socialIcon}>
                <Icon
                  size={30}
                  type="entypo"
                  color="#56ACEE"
                  name="twitter-with-circle"
                  onPress={() => console.log('twitter')}
                />
              </View>
              <View>
                <Icon
                  size={30}
                  type="entypo"
                  color="#DD4C39"
                  name="google--with-circle"
                  onPress={() => console.log('google')}
                />
              </View>
            </View>
          </>
      }
      </View>
    )
  }

  render() {
    const userId = this.props.route.params.userId
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader(userId)}
            <TabView
              style={styles.tabContainer}
              navigationState={this.state.tabs}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this.handleIndexChange}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: 'black',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#7e3f98',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'white',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'white',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})

export default Profile