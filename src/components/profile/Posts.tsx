import * as React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import * as PropTypes from 'prop-types'

import Post from './Post'
import PostCard from '../posts/PostCard';

const Posts = ({ containerStyle, posts, userName, userAvatar, navProps, isLoading }) => {

  posts.forEach(post => {
    post.display_name = userName
    post.avatar = userAvatar
  })

  return (
    // <FlatList
    //   scrollEnab led={false}
    //   removeClippedSubviews={false}
    //   contentContainerStyle={[styles.container, containerStyle]}
    //   data={posts}
    //   renderItem={list => {
    //     list.item.userName = userName
    //     list.item.userAvatar = userAvatar
    //     return (
    //       <Post
    //         key={`post-${list.item.ID}`}
    //         containerStyle={styles.postContainer}
    //         {...list.item}
    //       />
    //     )
    //   }}
    // />
    <>
      {
        posts.length > 0 ?
        <FlatList
          data={posts}
          renderItem={(post) => (
            <PostCard post={post} navProps={{ navigation: navProps }} />
          )}
          keyExtractor={(post, ind) => ind.toString()/*post.id.toString()*/}
          // ListFooterComponent={renderFooter(isLoading)}
          // refreshing={isLoading}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          /> : 
          <Text style={{color: 'white'}}>No Poens</Text>
      }
    </>
  )
}

// Posts.propTypes = {
//   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
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

// Posts.defaultProps = {
//   containerStyle: {},
//   posts: {}, //missing? 
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    padding: 0,
    borderWidth: 0,
  },
})

export default Posts