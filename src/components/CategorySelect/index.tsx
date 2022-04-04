import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, ScrollView } from 'react-native';
import { theme } from '../../global/styles/theme';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

import { styles } from "./styles";

type Props = {
    categorySelected: string;
    hasCheckBox?: boolean;
    setCategory: (categoryID: string) => void;
}

export function CategorySelect({ categorySelected, setCategory, hasCheckBox = false }: Props) {

    return (
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 40 }}
        >

            {
                categories.map(category => (
                    <Category
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={() => setCategory(category.id)}
                        hasCheckBox={hasCheckBox}
                    />
                ))
            }
        </ScrollView>
    );
}