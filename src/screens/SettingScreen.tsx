import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
    // User-changeable settings (local state for now)
    const [darkMode, setDarkMode] = useState(false);
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(false);

    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
    };

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <>
            <AppHeader title="Settings" subtitle="Manage your preferences" />
            <ScreenContainer>
                <Text style={styles.title}>Settings</Text>

                {/* Account card */}
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

                {/* Preferences with interactive switches */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <View style={styles.row}>
                        <View style={styles.rowText}>
                            <Text style={styles.label}>Dark mode</Text>
                            <Text style={styles.helper}>
                                Switch between light and dark theme
                            </Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#4B5563', true: '#4F46E5' }}
                            thumbColor={darkMode ? '#E5E7EB' : '#F9FAFB'}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowText}>
                            <Text style={styles.label}>Push notifications</Text>
                            <Text style={styles.helper}>
                                Get alerts on new activity
                            </Text>
                        </View>
                        <Switch
                            value={pushEnabled}
                            onValueChange={setPushEnabled}
                            trackColor={{ false: '#4B5563', true: '#4F46E5' }}
                            thumbColor={pushEnabled ? '#E5E7EB' : '#F9FAFB'}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowText}>
                            <Text style={styles.label}>Email updates</Text>
                            <Text style={styles.helper}>
                                Occasional tips and product news
                            </Text>
                        </View>
                        <Switch
                            value={emailEnabled}
                            onValueChange={setEmailEnabled}
                            trackColor={{ false: '#4B5563', true: '#4F46E5' }}
                            thumbColor={emailEnabled ? '#E5E7EB' : '#F9FAFB'}
                        />
                    </View>
                </View>

                {/* Buttons row */}
                <View style={styles.buttonsRow}>
                    <AppButton
                        label="Logout"
                        onPress={handleLogout}
                        variant="outline"
                        style={styles.buttonHalf}
                    />
                    <AppButton
                        label="Back to home"
                        onPress={() => navigation.navigate('Home')}
                        style={styles.buttonHalf}
                    />
                </View>
            </ScreenContainer>
        </>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 16,
        marginTop: 8,
        color: '#F9FAFB',
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#020617',
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
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
        paddingVertical: 8,
        gap: 12,
    },
    rowText: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#E5E7EB',
    },
    helper: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2,
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
        width: '50%',
        alignSelf: 'center',
        marginTop: 24,
    },
    buttonHalf: {
        flex: 1,
    },
});
