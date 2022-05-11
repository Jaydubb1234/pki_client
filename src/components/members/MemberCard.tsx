import * as React from 'react';
import { Text} from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements'
import { TouchableHighlight, TouchableOpacity } from 'react-native';

const MemberCard = ({member, navProps}) => {
    const { item } = member
    const { navigation } = navProps;
    return (
        <Card containerStyle={{margin:10, backgroundColor: 'black', borderColor: 'black'}}>
            {/* <ListItem
                // subtitle={item.display_name}
                leftAvatar={{ source: { uri: item.avatar }, rounded:true }}
            /> */}

            <ListItem containerStyle={{ backgroundColor: 'black' }}>
                <TouchableOpacity onPress={() => navigation.push('Profile', {userId: item.ID})}>
                    <Avatar rounded source={{ uri: item.avatar }} />
                </TouchableOpacity>
                <ListItem.Content>
                    <TouchableHighlight onPress={() => navigation.push('Profile', {userId: item.ID})} underlayColor="black">
                        <ListItem.Title style={{color:'#fff'}}>{item.display_name}</ListItem.Title>
                        {/* <ListItem.Subtitle>{item.display_name}</ListItem.Subtitle> */}
                    </TouchableHighlight>
                </ListItem.Content>
                <TouchableHighlight onPress={() => navigation.push('Profile', {userId: item.ID})} underlayColor="black">
                    <ListItem.Chevron color="white" />
                </TouchableHighlight>
            </ListItem>
        </Card>
    )
}

export default MemberCard;