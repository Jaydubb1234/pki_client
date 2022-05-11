import * as React from 'react';
import { View, FlatList, ActivityIndicator} from 'react-native';
import { ListItem } from 'react-native-elements'

export const renderHeader = (memberData) => {
    return (
      <FlatList
        horizontal={true}
        data={memberData}
        renderItem={(data) => (
          <ListItem
            // roundAvatar
            // avatar={{uri: data.item.avatar}}
            // containerStyle={{ borderBottomWidth: 0 }}
            // hideChevron={true}
            leftAvatar={{ source: { uri: data.item.avatar }, rounded:true }}
          />
        )}
        keyExtractor={(data, ind) => ind.toString()/*data.id.toString()*/}
      />
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