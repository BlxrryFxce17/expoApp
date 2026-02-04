import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { AppInput } from '../components/AppInput';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const onRegister = () => {
        navigation.replace('Home');
    };

    return (
        <>
            <AppHeader title="BasicFormApp" subtitle="Create an account" />
            <ScreenContainer>
                <Text style={styles.title}>Register</Text>
                <View style={styles.card}>
                    <AppInput
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />

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
                        placeholder="Create a password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <AppInput
                        label="Confirm Password"
                        placeholder="Re-enter password"
                        secureTextEntry
                        value={confirm}
                        onChangeText={setConfirm}
                    />
                </View>

                <AppButton label="Register" onPress={onRegister} style={{ width: '50%', alignSelf: 'center' }} />
            </ScreenContainer>
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 8,
        alignSelf: 'center',
        color: '#ffffff',
    },
    card: {
        backgroundColor: '#020617',
        borderRadius: 18,
        padding: 18,
        marginBottom: 20,
        borderWidth: 0,
        width: '90%',
        alignSelf: 'center',    
    },
});
