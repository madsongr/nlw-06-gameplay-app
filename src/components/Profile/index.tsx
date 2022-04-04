import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';

import { styles } from "./styles";

export function Profile() {

    const { user, signOut } = useAuth();

    function logOut() {

        Alert.alert('Sair', 'Deseja sair do Gameplay?',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    style: 'default',
                    onPress: () => signOut()
                },
            ]
        );
    }

    return (
        <View style={styles.container}>

            <RectButton onPress={logOut}>
                <Avatar urlImage={user.avatar} />
            </RectButton>

            <View>
                <View style={styles.user}>
                    <Text style={styles.greetings}>
                        Olá,
                    </Text>
                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>

        </View>
    );
}