import React, { useCallback } from "react";
import { Text, View, StyleSheet, Alert, Linking, TouchableOpacity } from "react-native";
import ContactRow from "../components/ContactRow";
import { colors } from "../config/constants";
import Cell from "../components/Cell";
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons'

const Settings = ({ navigation }) => {
    const handleLogout = () => {
        Alert.alert(
          "Logout",
          "Are you sure you want to logout?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Logout",
              onPress: () => {
                auth.signOut().then(() => {
                  navigation.replace('Login'); // Adjust the navigation as needed
                }).catch((error) => {
                  console.error("Error signing out: ", error);
                });
              }
            }
          ]
        );
      };
   

    return (
        <View>
            <ContactRow
                name={auth?.currentUser?.displayName ?? 'No name'}
                subtitle={auth?.currentUser?.email}
                style={styles.contactRow}
                onPress={() => {
                    navigation.navigate('Profile');
                }}
            />

            <Cell
                title='Account'
                subtitle='Privacy, delete account'
                icon='key-outline'
                onPress={() => {
                    navigation.navigate('Account');
                }}
                iconColor="black"
                style={{ marginTop: 20 }}
            />

            <Cell
                title='Help'
                subtitle='Contact us, app info'
                icon='help-circle-outline'
                iconColor="black"
                onPress={() => {
                    navigation.navigate('Help');
                }}
            />

            <Cell
                title='Invite a friend'
                icon='people-outline'
                iconColor="black"
                onPress={() => {
                    alert('Share touched')
                }}
                showForwardIcon={false}
            />
              <Cell
        title='Logout'
        icon='log-out-outline'
        iconColor="black"
        onPress={handleLogout}
        style={{ marginTop: 20 }}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    contactRow: {
        backgroundColor: 'white',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border
    },
    githubLink: {
        marginTop: 20,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 100,
    },
})

export default Settings;
