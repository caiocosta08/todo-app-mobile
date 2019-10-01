import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    input: {
        margin: 5,
        borderBottomWidth: 1,
        height: 40,
        width: '90%',
        fontSize: 19
    },

    btnLogin: {
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#607A9C',
        borderRadius: 5,
        width: '90%',
        height: 50,
        margin: 5,
        marginTop: 50
    },
    btnLoginText: {
        
        color: '#FFFFFF',
        fontSize: 18
    },
    btnSignUp: {
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8BFFA6',
        borderRadius: 5,
        width: '90%',
        height: 50,
        margin: 5,
    },
    btnSignUpText: {
        
        color: '#555555',
        fontSize: 18
    },
});

module.exports = {
    styles
}
