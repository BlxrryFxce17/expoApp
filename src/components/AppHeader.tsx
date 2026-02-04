import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
    subtitle?: string;
};

export const AppHeader: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 18,
        paddingBottom: 14,
        backgroundColor: '#020617',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#E5E7EB',
    },
    subtitle: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 2,
    },
});
