import React from 'react';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Image, Text, View } from 'react-native';

import DiscordIMG from "../../assets/discord.png";

import { styles } from "./styles";

type Props = RectButtonProps & {
    title: string
}

export function ButtonIcon({ title, ...rest }: Props) {
    return (

        <RectButton
            style={styles.container}
            activeOpacity={0.8}
            {...rest}
        >

            <View style={styles.iconWrapper}>
                <Image source={DiscordIMG} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton >

    );
}