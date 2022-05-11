import { StyleSheet } from 'react-native';

export const styleContainer = {
    borderTopWidth: 0, 
    borderBottomWidth: 0
}
  
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
    }
});
  