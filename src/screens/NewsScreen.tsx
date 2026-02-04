import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'News'>;

type Category = {
    key: string;
    label: string;
};

const CATEGORIES: Category[] = [
    { key: 'general', label: 'Top' },
    { key: 'business', label: 'Business' },
    { key: 'entertainment', label: 'Entertainment' },
    { key: 'health', label: 'Health' },
    { key: 'science', label: 'Science' },
    { key: 'sports', label: 'Sports' },
    { key: 'technology', label: 'Tech' },
];

type NewsItem = {
    title?: string;
    description?: string;
    url?: string;
    publishedAt?: string;
    sourceName?: string;
    urlToImage?: string;
};

const buildNewsUrl = (category: string) =>
    `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;

const NewsScreen: React.FC<Props> = ({ navigation }) => {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('general');

    const fetchNews = useCallback(async (category: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(buildNewsUrl(category));
            if (!res.ok) {
                throw new Error(`Status ${res.status}`);
            }

            const data = await res.json();
            const list: NewsItem[] = (data.articles || []).map((a: any) => ({
                title: a.title,
                description: a.description,
                url: a.url,
                publishedAt: a.publishedAt,
                sourceName: a.source?.name,
                urlToImage: a.urlToImage,
            }));

            setItems(list);
        } catch (err: any) {
            setError(err.message ?? 'Failed to load news');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews(activeCategory);
    }, [activeCategory, fetchNews]);

    const onSelectCategory = (catKey: string) => {
        if (catKey === activeCategory) return;
        setActiveCategory(catKey);
    };

    const renderItem = ({ item }: { item: NewsItem }) => (
        <View style={styles.card}>
            {item.urlToImage && (
                <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
            )}

            <View style={styles.cardContent}>
                <Text style={styles.cardSource}>
                    {item.sourceName || 'Unknown source'}
                </Text>

                <Text style={styles.cardTitle} numberOfLines={3}>
                    {item.title || 'No title'}
                </Text>

                {item.description ? (
                    <Text style={styles.cardBody} numberOfLines={3}>
                        {item.description}
                    </Text>
                ) : null}

                {item.publishedAt ? (
                    <Text style={styles.cardMeta}>
                        {new Date(item.publishedAt).toLocaleString()}
                    </Text>
                ) : null}
            </View>
        </View>
    );

    return (
        <>
            <AppHeader title="Indian news" subtitle="Top headlines (free API)" />
            <ScreenContainer>
                <Text style={styles.title}>Latest headlines</Text>

                {/* Category pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.pillRow}
                >
                    {CATEGORIES.map(cat => {
                        const isActive = cat.key === activeCategory;
                        return (
                            <TouchableOpacity
                                key={cat.key}
                                onPress={() => onSelectCategory(cat.key)}
                                style={[
                                    styles.pill,
                                    isActive && styles.pillActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        isActive && styles.pillTextActive,
                                    ]}
                                >
                                    {cat.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {loading && (
                    <View style={styles.center}>
                        <ActivityIndicator color="#6366F1" />
                    </View>
                )}

                {error && !loading && (
                    <View style={styles.center}>
                        <Text style={styles.errorText}>Error: {error}</Text>
                        <AppButton
                            label="Retry"
                            onPress={() => fetchNews(activeCategory)}
                            style={{ marginTop: 8, width: 120 }}
                        />
                    </View>
                )}

                {!loading && !error && (
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => String(item.url ?? index)}
                        contentContainerStyle={styles.listContent}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                )}

                <AppButton
                    label="Back to home"
                    onPress={() => navigation.navigate('Home')}
                    variant="outline"
                    style={{ marginTop: 8 }}
                />
            </ScreenContainer>
        </>
    );
};

export default NewsScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 4,
        marginTop: 4,
        color: '#F9FAFB',
    },

    // Pills row
    pillRow: {
        paddingVertical: 8,
        paddingHorizontal: 2,
        paddingRight: 12,
        marginBottom: 8,
        maxHeight: 60,
        minHeight: 60,
        alignItems: 'center',
    },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.5)',
        marginRight: 8,
        backgroundColor: '#020617',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillActive: {
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
    },
    pillText: {
        fontSize: 13,
        color: '#E5E7EB',
        fontWeight: '500',
        textAlign: 'center',
    },
    pillTextActive: {
        color: '#F9FAFB',
    },

    // Loading / error
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    errorText: {
        color: '#F97373',
        fontSize: 14,
    },

    // List
    listContent: {
        paddingBottom: 20,
        paddingTop: 4,
    },

    // Card
    card: {
        backgroundColor: '#020617',
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.35)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    cardImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    cardSource: {
        fontSize: 11,
        fontWeight: '600',
        color: '#A5B4FC',
        textTransform: 'uppercase',
        letterSpacing: 0.9,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#F9FAFB',
        marginBottom: 4,
    },
    cardBody: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 8,
        lineHeight: 20,
    },
    cardMeta: {
        fontSize: 12,
        color: '#6B7280',
    },
});

