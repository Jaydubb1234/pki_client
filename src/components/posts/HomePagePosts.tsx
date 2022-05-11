/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableHighlight} from 'react-native';
import{ connect } from 'react-redux'
import { fetchPosts, refreshPosts } from '../../actions/postsActions'
import { renderFooter, renderHeader } from './HomePagePostRenders'
import PostCard from './PostCard';
import { styles, styleContainer } from './homePageStyles'
import MyTabs from '../screens/MyTabs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { Navigation } from 'react-native-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  currentUserId: string
  fetchPosts: any
  refreshing: boolean
  refreshPosts: any
  isPostLoaded: boolean
  error: any
  posts: any []
  loading: boolean
  navigationProps: any
  offSet: number
  pageSize: number
  //posts: Array<{}>
};
//interface Props {};
class HomePagePosts extends Component<Props> {
  // static navigationOptions = {
  //   title: 'Homeies',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  //   // title: ({ state }) => state.params.name,

  // };

  constructor(props) {
    super(props);

    // Navigation.events().bindComponent(this);
  }

  componentDidMount = () => {
    this.props.fetchPosts(this.props.currentUserId, this.props.refreshing, this.props.offSet, this.props.pageSize)
  }

  componentDidUpdate = () => {
    this.props.navigationProps.navigation.setOptions({
      title: 'PKI'
    })
  }

  handleRefresh = () => {
    this.props.refreshPosts(this.props.currentUserId, this.props.refreshing, /* 0 */this.props.offSet, this.props.pageSize)
  }

  handleLoadMore = () => {
    if (!this.props.loading) {
      this.props.fetchPosts(this.props.currentUserId, this.props.refreshing, this.props.offSet, this.props.pageSize)
    }
  }

  // static defaultNavigationOptions = ({ navigation }) => {
  //   // const { params = {} } = navigation.state;
  //   console.log('navigation ',navigation)
  //   return {
  //       title: 'Home Page',
  //       headerTitleStyle :{color:'#fff'},
  //       headerStyle: {backgroundColor:'#3c3c3c'},
  //       headerRight: <Icon style={{ marginLeft:15,color:'#fff' }} name={'bars'} size={25} onPress={() => alert('sfdf')} />
  //   };
  // };

  render = () => {
    const { posts, isPostLoaded, refreshing, error, navigationProps } = this.props
    
    return (
      <>
        <View style={styles.container}>
          {
            !isPostLoaded ?
              <Text style={{textAlign: 'center', color: '#fff'}}>Loading...</Text> : 

              error ?
              <Text style={{textAlign: 'center', color: '#fff'}}>Sorry, Network Issues</Text> : 
              //<List containerStyle={styleContainer}>
                <FlatList
                    data={posts}
                    renderItem={(post) => (
                      <PostCard post={post} navProps={navigationProps}/>
                    )}
                    keyExtractor={(post, ind) => ind.toString()/*post.id.toString()*/}
                    ListHeaderComponent={renderHeader(posts)}
                    ListFooterComponent={renderFooter(this.props.loading)}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                />
            //</List>
          }
        </View>
        </>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>Welcome to React Native!</Text>
    //     <Text style={styles.instructions}>To get started, edit App.js</Text>
    //     <Text style={styles.instructions}>{instructions}</Text>
    //   </View>
    // );
  }
}

// HomePagePosts.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   posts: PropTypes.object.isRequired
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

const mapStateToProps = state => {
  const {posts, error, refreshing, isPostLoaded, loading, offSet, pageSize} = state.postReducer
  return {
    posts,
    error,
    refreshing,
    isPostLoaded,
    loading,
    offSet,
    pageSize
  }
}

const mapDispatchToProps = dispatch => {
 return {
  fetchPosts: (currentUserId, refreshing, offSet, pageSize) => dispatch(fetchPosts(currentUserId, refreshing, offSet, pageSize)),
  refreshPosts: (currentUserId, refreshing, offSet, pageSize) => dispatch(refreshPosts(currentUserId, refreshing, offSet, pageSize))
  //fetchPosts: () => dispatch(fetchPosts('14', false, null))
  //fetchPosts: () => fetchPosts('14', false, null)
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePosts) //*
//export default connect(mapStateToProps)(HomePagePosts) //*