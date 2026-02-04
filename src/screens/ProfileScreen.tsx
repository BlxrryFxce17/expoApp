import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
    };

    return (
        <>
            <AppHeader title="Profile" subtitle={user.name} />
            <ScreenContainer>
                <Text style={styles.title}>Your details</Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Account</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{user.name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{user.email}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Mobile</Text>
                        <Text style={styles.value}>{user.phone}</Text>
                    </View>
                </View>

                <View style={styles.buttonsRow}>
                    <AppButton
                        label="Edit profile"
                        onPress={() => { }}
                        variant="outline"
                        style={styles.buttonHalf}
                    />
                    <AppButton
                        label="Back to home"
                        onPress={() => navigation.goBack()}
                        style={styles.buttonHalf}
                    />
                </View>
            </ScreenContainer>
        </>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 16,
        marginTop: 8,
        textAlign: 'center',
        color: '#F9FAFB',
    },
    card: {
        backgroundColor: '#020617',
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
        width: '90%',
        alignContent: 'center',
        alignSelf: 'center',
        borderWidth: 0,
        borderColor: 'rgba(148, 163, 184, 0.35)',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    label: {
        fontSize: 14,
        color: '#E5E7EB',
    },
    value: {
        fontSize: 14,
        color: '#F9FAFB',
        fontWeight: '500',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        width: '90%',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    buttonHalf: {
        flex: 1,
        width: '60%',
    },
});
