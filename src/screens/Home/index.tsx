import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonIconAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { APPOINTMENTS_COLLECTION } from '../../configs/database';

import { styles } from './styles';

export function Home() {

    const navigation: any = useNavigation();
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const [appointments, setAppointment] = useState<AppointmentProps[]>([]);

    function handleCategory(categoryID: string) {
        categoryID === category ? setCategory('') : setCategory(categoryID);
    }

    function handleAppointmentDetails(selectedGuild: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { selectedGuild });
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {

        const response = await AsyncStorage.getItem(APPOINTMENTS_COLLECTION);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointment(storage.filter(item => item.category === category));
        } else {
            setAppointment(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category])); // toda vez que atualizar uma categoria chama a função novamente

    return (
        <Background>

            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategory}
            />

            <ListHeader
                title="Partidas agendadas"
                subtitle={`Total ${appointments.length}`}
            />
            {/* Flatlist é indicada qdo se tem mtos elementos; melhor performance do que a scrollview */}
            {
                loading ? <Load /> :
                    <>
                        <FlatList
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
                            )}
                            style={styles.matches}
                            contentContainerStyle={{ paddingBottom: 69 }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <ListDivider />}
                        />
                    </>
            }
        </Background >
    );
}