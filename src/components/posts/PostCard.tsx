import * as React from 'react';
// import { Text, Dimensions} from 'react-native';
// import { /*Card,*/ ListItem } from 'react-native-elements'
import { WebView } from 'react-native-webview';
import { TouchableHighlight } from 'react-native';
import { Card, CardItem, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements';

const PostCard = ({post, navProps}) => {
    const { item } = post;
    const { navigation } = navProps;
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
            <p>${item.post_content}</p>
        </div>`
    // return (
    //     <Card containerStyle={{margin:10}}>
    //         <ListItem
    //             // roundAvatar
    //             // avatar={{uri: item.avatar}}
    //             // subtitle={item.display_name}
    //             // title={item.post_title}
    //             // containerStyle={{borderBottomWidth: 0}}
    //             // hideChevron={true}
    //             title={item.post_title}
    //             subtitle={item.display_name}
    //             leftAvatar={{ source: { uri: item.avatar }, rounded:true }}
    //         />
    //         {/* <Text>
    //             {post.item.post_content}
    //         </Text> */}
    //         <WebView originWhitelist={['*']} source={{ html: post.item.post_content }} />
            
    //     </Card>
    // )
    const goToProfile = () => {
        navigation.push('Profile', {userId: item.post_author})
    };
    // const cardItemContentHeight = item.post_content.length/4 > 100 ? item.post_content.length/4 : 400
    return (
        <Card style={{ flex: 3, marginLeft: 10, marginRight: 10, borderColor: 'black'}}>
            <CardItem style={{height: 100, backgroundColor:'black', borderColor: 'black', paddingTop:-1}}>
                <Left>
                    <TouchableHighlight onPress={() => navigation.push('Profile', {userId: item.post_author})} underlayColor="black">
                        <Thumbnail source={{ uri: item.avatar }} />
                    </TouchableHighlight>
                    <Body>
                        <TouchableHighlight onPress={goToProfile} underlayColor="black">
                            <Text style={{ color: '#fff' }}>{item.display_name}</Text>
                        </TouchableHighlight>
                        <Text note style={{ color: '#fff' }}>{item.post_title}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem style={{ backgroundColor:'black', borderColor: 'black', margin:-1}}>
                <Text style={{ backgroundColor: 'black', color: 'white' }}>{item.post_content}</Text>
                {/* <WebView originWhitelist={['*']} source={{ html: htmlString }} /> */}
            </CardItem>
            <CardItem style={{backgroundColor: 'black'}}>
                <Left>
                    <Badge value={item.comments.length} badgeStyle={{backgroundColor: 'red', borderColor: 'black'}} textStyle={{color: 'white'}} containerStyle={{backgroundColor: 'black', position: 'absolute', left: -5, zIndex: 1}}/>
                    <Icon name="comment-o" size={30} color="#7e3f98" />

                    <Badge value={item.likes} badgeStyle={{backgroundColor: 'red', borderColor: 'black'}} textStyle={{color: 'white'}} containerStyle={{backgroundColor: 'black', position: 'absolute', left: 45, zIndex: 1}}/>
                    <Icon name="thumbs-o-up" size={30} color="#7e3f98" style={{position: 'absolute', left: 55}}/>
                </Left>
            </CardItem>
        </Card>
    )
}

// const styles = StyleSheet.create({
//     whiteText: {

//     }
//   });
export default PostCard;