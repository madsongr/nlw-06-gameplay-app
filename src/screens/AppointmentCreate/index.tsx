import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from "@expo/vector-icons";
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { APPOINTMENTS_COLLECTION } from "../../configs/database";


export function AppointmentCreate() {

    const navigation:any = useNavigation();

    const [category, setCategory] = useState('');
    const [openGuildModal, setOpenGuildModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    function handleGuildModal() {
        setOpenGuildModal(true);
    }

    function handleCloseGuilds() {
        setOpenGuildModal(false);
    }

    function handleSelectedGuild(selectedGuild: GuildProps) {
        setGuild(selectedGuild);
        setOpenGuildModal(false);
    }

    function handleCategory(categoryID: string) {
        setCategory(categoryID);
    }

    async function handleSave() {

        // await AsyncStorage.clear();
        // console.log('clear');
        
        const newAppointement = {
            id: uuid.v4(), // gerar id's de forma automatica com essa lib
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        const storage = await AsyncStorage.getItem(APPOINTMENTS_COLLECTION);

        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            APPOINTMENTS_COLLECTION,
            JSON.stringify([...appointments, newAppointement])
        );

        navigation.navigate('Home');
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header title="Agendar partida" />

                    <Text style={[styles.label, { marginTop: 36, marginLeft: 24, marginBottom: 18 }]}>
                        Catergoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategory}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleGuildModal}>
                            <View style={styles.select}>

                                {guild.icon ? <GuildIcon guildID={guild.id} iconID={guild.icon} /> : <View style={styles.image} />}

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e mês
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput maxLength={2} onChangeText={setDay} />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput maxLength={2} onChangeText={setMonth} />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput maxLength={2} onChangeText={setHour} />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput maxLength={2} onChangeText={setMinute} />
                                </View>
                            </View>

                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>
                            <Text style={styles.characterLimit}>
                                Max. 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={3}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        <View style={styles.footer}>
                            <Button title="Agendar" onPress={handleSave} />
                        </View>
                    </View>
                </ScrollView>
            </Background>

            <ModalView visible={openGuildModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelected={handleSelectedGuild} />
            </ModalView>

        </KeyboardAvoidingView>
    );
}