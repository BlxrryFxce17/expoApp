import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const menuItems = [
    { id: 'profile', label: '', screen: 'Profile' },
    { id: 'settings', label: '', screen: 'Settings' },
    { id: 'learnmore', label: '', screen: 'LearnMore' },
    { id: 'logout', label: '', screen: 'Login' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const handlePress = (item: (typeof menuItems)[number]) => {
        if (item.id === 'logout') {
            navigation.replace('Login');
        } else if (item.screen) {
            navigation.navigate(item.screen as any);
        }
    };

    return (
        <>
            <AppHeader title="Welcome" subtitle="Hi, John Doe" />
            <ScreenContainer>
                <Text style={styles.title}>Home</Text>

                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.label}</Text>
                            <AppButton
                                label={getButtonLabel(item.id)}
                                onPress={() => handlePress(item)}
                                variant={item.id === 'logout' ? 'outline' : 'primary'}
                                style={{ marginTop: 8, width: '50%', alignSelf: 'center' }}
                            />
                        </View>
                    )}
                />
            </ScreenContainer>
        </>
    );
};

export default HomeScreen;

const getButtonLabel = (id: string) => {
    if (id === 'profile') return 'View Profile';
    if (id === 'settings') return 'Open Settings';
    if (id === 'learnmore') return 'Learn More';
    if (id === 'logout') return 'Logout';
    return 'Open';
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 16,
        marginTop: 8,
        left: '47%',
        color: '#F9FAFB',
    },
    card: {
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        borderWidth: 0, 
        backgroundColor: '#020617',
        alignSelf: 'center',
        width: '60%',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#E5E7EB',
    },
});
