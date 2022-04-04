import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg';


const { CDN_IMAGE } = process.env;

type Props = {
    guildID: string;
    iconID: string | null;
}

export function GuildIcon({ guildID, iconID }: Props) {

    const uri = `${CDN_IMAGE}/icons/${guildID}/${iconID}.png`;

    return (

        <View style={styles.container}>
            {
                iconID ? 
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                :
                <DiscordSvg width={40} height={40} />
            }

        </View>
    );
}