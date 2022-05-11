import * as React from 'react'
import { Dimensions, Image, View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as PropTypes from 'prop-types'
import { WebView } from 'react-native-webview';

const Post = ({ containerStyle, userName, userAvatar, post_content }) => {
  const htmlString: string = `
        <style>
            p {
                color: white !important;
                font-size: 64px !important;
            }
        </style>
        <div style="
            font-size:40px;
            color:#fff;
            background:#000000;
            margin:-10px;
            padding-top:1px;
            padding-bottom:50px"
        >
            <p>${post_content}</p>
        </div>`
  return (
    <View style={[styles.container, containerStyle]}>
      { post_content.length > 0 ?
        <>
          <View style={styles.postRow}>
            <View style={styles.userImage}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: userAvatar,
                }}
              />
            </View>
            <View>
              <Text style={{color: 'white'}}>{userName}</Text>
            </View>
          </View>
          <View style={styles.wordRow}>
            <Text style={styles.wordText}>{post_content}</Text>
                {/* <WebView originWhitelist={['*']} source={{ html: htmlString }} /> */}
          </View>
        </> :
        <Text style={{color: 'white'}}>No Poems</Text>
      }
    </View>
  )
}

// Post.propTypes = {
//   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
//   image: PropTypes.string,
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     avatar: PropTypes.string.isRequired,
//   }).isRequired,
//   createdDate: PropTypes.string.isRequired,
//   sentences: PropTypes.string.isRequired,
// }

// Post.defaultProps = {
//   containerStyle: {},
//   image: null,
// }

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    padding: 0,
  },
  date: {
    color: 'gray',
    fontSize: 12.5,
  },
  postRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    width: Dimensions.get('window').width * 1,
  },
  postImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.075)',
    height: 200,
  },
  userImage: {
    marginRight: 12,
  },
  wordRow: {
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  wordText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: 'white'
  },
})

export default Post