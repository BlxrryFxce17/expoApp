import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 1500);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MySmallApp</Text>
            <Text style={styles.subtitle}>Loading your experience…</Text>
            <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 24 }} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#E5E7EB',
        letterSpacing: 1,
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'left',
    },
});
