import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ImageBackground, Alert, Platform, Share } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/core';
import * as Linking from 'expo-linking';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import BannerIMG from "../../assets/banner.png";

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

import { api } from '../../services/api';

type Params = {
    selectedGuild: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[]; // isso vem lá da url do servidor criado no discord
}

export function AppointmentDetails() {

    const route = useRoute();
    const { selectedGuild } = route.params as Params;
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    async function fetchGuildidget() {
        try {
            const response = await api.get(`/guilds/${selectedGuild.guild.id}/widget.json`); // isso é bem relacionado com as configs criadas dentro dos servidores criados no discord
            setWidget(response.data);
        } catch (error) {
            Alert.alert("Verifique as configurações do servidor. Será que o Widget está habilitado?");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGuildidget();
    }, []);

    function handleShare() { // se der erro é pq eu não sou o dono do sevidor; fix feito na action onde cria o botão

        const message = Platform.OS === 'ios'
            ? `Junte-se a ${selectedGuild.guild.name}`
            : widget.instant_invite;

        Share.share({
            message: message,
            url: widget.instant_invite
        })

    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    selectedGuild.guild.owner &&
                    <BorderlessButton onPress={handleShare}>
                        <Fontisto
                            name="share"
                            size={21}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerIMG}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>

                    <Text style={styles.title}>
                        {selectedGuild.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {selectedGuild.description}
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle={`Total ${widget.members.length}`}
            />

            {loading ? <Load /> :
                <FlatList
                    data={widget.members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Member data={item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    style={styles.members}
                />
            }
            {selectedGuild.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
                </View>
            }
        </Background>
    );
}