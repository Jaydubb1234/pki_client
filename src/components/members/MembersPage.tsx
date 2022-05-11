/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import{ connect } from 'react-redux'
import { fetchMembers, refreshMembers } from '../../actions/membersActions'
import { renderFooter, renderHeader } from './MembersPageRenders'
import MemberCard from './MemberCard';
import { styles, styleContainer } from './memberPageStyles'



type Props = {
  currentUserId: string
  fetchMembers: any
  refreshing: boolean
  refreshMembers: any
  isMemberLoaded: boolean
  error: any
  members: any []
  loading: boolean
  navigationProps: any
  offSet: number
  pageSize: number
  //posts: Array<{}>
};
//interface Props {};
class MembersPage extends Component<Props> {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount = () => {
    console.log('mounted')
    this.props.fetchMembers(this.props.offSet, this.props.pageSize, this.props.refreshing)
  }

  handleRefresh = () => {
    this.props.refreshMembers(this.props.offSet, /* 0 */this.props.pageSize, this.props.refreshing)
  }

  handleLoadMore = () => {
    if (!this.props.loading) {
      this.props.fetchMembers(this.props.offSet, this.props.pageSize, this.props.refreshing)
    }
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Memberngpopoop'
        },
        leftButtons: [
          {
            id: 'buttonOne',
            text: 'Add Member'
            //icon: require('icon.png')
          }
        ],
      }
    };
  }

  render = () => {
    const { isMemberLoaded, members, refreshing, error, navigationProps } = this.props
    return (
      <View style={styles.container}>
        {
          !isMemberLoaded ?
            <Text style={{textAlign: 'center', color: '#fff'}}>Loading...</Text> : 

            error ?
            <Text style={{textAlign: 'center', color: '#fff'}}>Sorry, Network Issues</Text> : 
            //<List containerStyle={styleContainer}>
              <FlatList
                  data={members}
                  renderItem={(member) => (
                    <MemberCard member={member} navProps={navigationProps}/>
                  )}
                  keyExtractor={(member, ind) => ind.toString()/*post.id.toString()*/}
                  // ListHeaderComponent={renderHeader(members)}
                  ListFooterComponent={renderFooter(this.props.loading)}
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
              />
          //</List>
        }
      </View>
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
  const {members, error, refreshing, pageSize, isMemberLoaded, loading, offSet} = state.memberReducer
  return {
    members,
    error,
    refreshing,
    isMemberLoaded,
    loading,
    offSet,
    pageSize
  }
}

const mapDispatchToProps = dispatch => {
 return {
    fetchMembers: (offSet, pageSize, refreshing) => dispatch(fetchMembers(offSet, pageSize, refreshing)),
    refreshMembers: (offSet, pageSize, refreshing) => dispatch(refreshMembers(offSet, pageSize, refreshing))
  //fetchPosts: () => dispatch(fetchPosts('14', false, null))
  //fetchPosts: () => fetchPosts('14', false, null)
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage) //*
//export default connect(mapStateToProps)(HomePagePosts) //*