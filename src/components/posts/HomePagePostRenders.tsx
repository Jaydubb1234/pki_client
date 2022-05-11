import * as React from 'react';
import { View, FlatList, ActivityIndicator, Button} from 'react-native';
import { ListItem } from 'react-native-elements'
import { styles, styleContainer } from '../members/memberPageStyles';

export const renderHeader = (postData) => {
  // console.log('navigationProps ', navigationProps)
  // React.useLayoutEffect(() => {
  //   navigationProps.navigation.setOptions({
  //     headerRight: () => (
  //       <Button onPress={() => alert('hih')} color='white' title="Update count" />
  //     ),
  //   });
  // }, [navigationProps]);
  return (
    <View style={{borderBottomColor: '#3c4146eb', borderBottomWidth: 2}}>
      <FlatList
        horizontal={true}
        data={postData}
      renderItem={(data) => (
          <ListItem
            // roundAvatar
            // avatar={{uri: data.item.avatar}}
            // containerStyle={{ borderBottomWidth: 0 }}
            // hideChevron={true}
          containerStyle={{ backgroundColor: 'black'}}
            leftAvatar={{ source: { uri: data.item.avatar }, rounded:true }}
          />
        )}
        keyExtractor={(data, ind) => ind.toString()/*data.id.toString()*/}
      />
      </View>
    )
}

export const renderFooter = (loading) => {
    if (!loading) return null
    return (
        <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor:"#CED0CE"}}>
            <ActivityIndicator animating size="large"/>
        </View>
    )
}