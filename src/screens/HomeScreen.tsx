import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const menuItems = [
    { id: 'profile', label: '', screen: 'Profile' },
    { id: 'settings', label: '', screen: 'Settings' },
    { id: 'stocks', label: '', screen: 'StockPrice' },
    { id: 'news', label: '', screen: 'News' },
    { id: 'logout', label: '', screen: 'Login' },
];

type Joke = {
    id: number;
    type: string;
    setup: string;
    punchline: string;
};

// Official Joke API – programming random returns an array.[web:458][web:464]
const JOKE_URL =
    'https://official-joke-api.appspot.com/jokes/programming/random';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [loadingJoke, setLoadingJoke] = useState(false);
    const [jokeError, setJokeError] = useState<string | null>(null);

    const handlePress = (item: (typeof menuItems)[number]) => {
        if (item.id === 'logout') {
            navigation.replace('Login');
        } else if (item.screen) {
            navigation.navigate(item.screen as any);
        }
    };

    const getButtonLabel = (id: string) => {
        if (id === 'profile') return 'View Profile';
        if (id === 'settings') return 'Open Settings';
        if (id === 'stocks') return 'View Stock Prices';
        if (id === 'news') return 'View News';
        if (id === 'logout') return 'Logout';
        return 'Open';
    };

    const fetchJoke = async () => {
        try {
            setLoadingJoke(true);
            setJokeError(null);

            const res = await fetch(JOKE_URL);
            if (!res.ok) {
                throw new Error(`Status ${res.status}`);
            }

            const data = await res.json();

            // Endpoint returns an array with one joke: [{...}].[web:458][web:464]
            const jokeObj = Array.isArray(data) ? data[0] : data;
            if (!jokeObj || !jokeObj.setup || !jokeObj.punchline) {
                throw new Error('No joke received');
            }

            setJoke({
                id: jokeObj.id,
                type: jokeObj.type,
                setup: jokeObj.setup,
                punchline: jokeObj.punchline,
            });
        } catch (err: any) {
            setJokeError(err.message ?? 'Failed to load joke');
            setJoke(null);
        } finally {
            setLoadingJoke(false);
        }
    };

    useEffect(() => {
        fetchJoke();

        const id = setInterval(fetchJoke, 30000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <AppHeader title="Welcome" subtitle="Hi, John Doe" />
            <ScreenContainer>
                <Text style={styles.title}>Home</Text>

                {/* Menu cards */}
                <FlatList
                    data={menuItems}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <AppButton
                                label={getButtonLabel(item.id)}
                                onPress={() => handlePress(item)}
                                variant={item.id === 'logout' ? 'outline' : 'primary'}
                                style={{ marginTop: 8 }}
                            />
                        </View>
                    )}
                />

                {/* Joke message box */}
                <View style={styles.jokeCard}>
                    <Text style={styles.jokeTitle}>Quick joke</Text>
                    {loadingJoke && <ActivityIndicator color="#6366F1" />}

                    {jokeError && !loadingJoke && (
                        <Text style={styles.jokeError}>Error: {jokeError}</Text>
                    )}

                    {joke && !loadingJoke && !jokeError && (
                        <>
                            <Text style={styles.jokeSetup}>{joke.setup}</Text>
                            <Text style={styles.jokePunchline}>{joke.punchline}</Text>
                        </>
                    )}

                    {!joke && !loadingJoke && !jokeError && (
                        <Text style={styles.jokeError}>
                            No joke yet. Pull to refresh or wait a bit.
                        </Text>
                    )}
                </View>
            </ScreenContainer>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 16,
        marginTop: 8,
        textAlign: 'center',
        color: '#F9FAFB',
    },
    jokeCard: {
        backgroundColor: '#020617',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.35)',
    },
    jokeTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    jokeSetup: {
        fontSize: 15,
        color: '#E5E7EB',
        marginBottom: 4,
    },
    jokePunchline: {
        fontSize: 15,
        color: '#A5B4FC',
        fontWeight: '600',
    },
    jokeError: {
        fontSize: 13,
        color: '#F97373',
    },
    card: {
        borderRadius: 18,
        padding: 18,
        marginBottom: 8,
        borderWidth: 0,
        backgroundColor: '#020617',
        alignSelf: 'center',
        width: '80%',
    },
});
