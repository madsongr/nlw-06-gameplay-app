import React from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';

import illustration from "../../assets/illustration.png";
import { styles } from './styles';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';


export function SignIn() {

    const { loading, signIn } = useAuth()

    async function handleSignIn() {
        try {
            await signIn();
        } catch (error: any) {
            Alert.alert(error);
        }
    }

    return (

        //Views agrupam pra poder movimentar os elementos; tipo as div
        <Background>
            <View style={styles.container}>

                <Image source={illustration} style={styles.image} resizeMode="stretch" />

                <View style={styles.content}>

                    <Text style={styles.title}>
                        Conecte-se {'\n'}
                        e organize suas {'\n'}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>

                    {
                        loading ? <ActivityIndicator color={theme.colors.primary} /> :
                            <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
                    }
                </View>
            </View>
        </Background>
    );
}