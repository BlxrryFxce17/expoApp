import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { AppInput } from '../components/AppInput';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        navigation.replace('Home');
    };

    return (
        <>
            <AppHeader  title="BasicFormApp" subtitle="Welcome back" />
            <ScreenContainer>
                <Text style={styles.title}>Login</Text>
                <View style={styles.card}>
                <AppInput
                    label="Mobile or Email"
                    placeholder="Enter mobile number or email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                />

                <AppInput
                    label="Password"
                    placeholder="Enter password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.forgot}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <AppButton label="Login" onPress={onLogin} />
                </View>
                <TouchableOpacity
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>
                        Don&apos;t have an account? <Text style={styles.registerTextHighlight}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </ScreenContainer>
        </>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 18,
        marginTop: 8,
        left: '47%',
        color: '#F9FAFB',
    },
    card: {
        backgroundColor: '#020617',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        borderWidth: 0,
        borderColor: 'rgba(148, 163, 184, 0.35)',
    },
    forgot: {
        alignSelf: 'flex-end',
        marginBottom: 12,
    },
    forgotText: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    registerLink: {
        marginTop: -10,
        alignItems: 'center',
    },
    registerText: {
        color: '#9CA3AF',
        fontSize: 13,
    },
    registerTextHighlight: {
        color: '#A5B4FC',
        fontWeight: '600',
    },
});
