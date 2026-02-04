import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'StockPrice'>;

// ===== Finnhub config =====
const FINNHUB_TOKEN = 'd61iii9r01qufbsnd0hgd61iii9r01qufbsnd0i0'; 
const buildQuoteUrl = (symbol: string) =>
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_TOKEN}`;

type Company = {
    symbol: string;
    name: string;
};

type Sector = {
    key: string;
    label: string;
    company: Company; // representative company for that sector
};

const SECTORS: Sector[] = [
    {
        key: 'tech',
        label: 'Technology',
        company: { symbol: 'AAPL', name: 'Apple Inc.' },
    },
    {
        key: 'software',
        label: 'Software',
        company: { symbol: 'MSFT', name: 'Microsoft Corporation' },
    },
    {
        key: 'internet',
        label: 'Internet',
        company: { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)' },
    },
    {
        key: 'chips',
        label: 'Semiconductors',
        company: { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    },
    {
        key: 'social',
        label: 'Social Media',
        company: { symbol: 'META', name: 'Meta Platforms, Inc.' },
    },
    {
        key: 'ecommerce',
        label: 'E‑Commerce',
        company: { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
    },
    {
        key: 'retail',
        label: 'Retail',
        company: { symbol: 'WMT', name: 'Walmart Inc.' },
    },
    {
        key: 'food',
        label: 'Food & Beverage',
        company: { symbol: 'MCD', name: "McDonald's Corporation" },
    },
    {
        key: 'ev',
        label: 'EV & Auto',
        company: { symbol: 'TSLA', name: 'Tesla, Inc.' },
    },
    {
        key: 'banking',
        label: 'Banking',
        company: { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    },
    {
        key: 'payments',
        label: 'Payments',
        company: { symbol: 'V', name: 'Visa Inc.' },
    },
];

type StockData = {
    symbol: string;
    companyName: string;
    current: number;
    prevClose: number;
    change: number;
    changePercent: number;
};

const StockPriceScreen: React.FC<Props> = ({ navigation }) => {
    const [activeSectorKey, setActiveSectorKey] = useState<string>('tech');
    const [stock, setStock] = useState<StockData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getActiveSector = (): Sector =>
        SECTORS.find(s => s.key === activeSectorKey) ?? SECTORS[0];

    const fetchQuote = useCallback(async () => {
        const sector = getActiveSector();
        const company = sector.company;

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(buildQuoteUrl(company.symbol));
            if (!res.ok) {
                throw new Error(`Status ${res.status}`);
            }

            const data = await res.json();

            if (data.c == null || data.pc == null) {
                throw new Error('No quote data');
            }

            const current = Number(data.c);
            const prevClose = Number(data.pc);
            const change = Number(data.d ?? current - prevClose);
            const changePercent = Number(
                data.dp ?? (prevClose ? ((current - prevClose) / prevClose) * 100 : 0),
            );

            const mapped: StockData = {
                symbol: company.symbol,
                companyName: company.name,
                current,
                prevClose,
                change,
                changePercent,
            };

            setStock(mapped);
        } catch (err: any) {
            setError(err.message ?? 'Failed to load quote');
            setStock(null);
        } finally {
            setLoading(false);
        }
    }, [activeSectorKey]);

    useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    const onSelectSector = (key: string) => {
        if (key === activeSectorKey) return;
        setActiveSectorKey(key);
    };

    const renderCard = () => {
        if (!stock) return null;

        const changeColor =
            stock.change >= 0 ? '#22C55E' : '#EF4444';

        return (
            <View style={styles.card}>
                <View style={styles.cardHeaderRow}>
                    <View style={{ flexShrink: 1 }}>
                        <Text style={styles.cardSymbol}>{stock.symbol}</Text>
                        <Text style={styles.cardCompany} numberOfLines={1}>
                            {stock.companyName}
                        </Text>
                    </View>
                    <Text style={[styles.cardChange, { color: changeColor }]}>
                        {stock.change >= 0 ? '▲' : '▼'} {stock.change.toFixed(2)} (
                        {stock.changePercent.toFixed(2)}%)
                    </Text>
                </View>

                <Text style={styles.cardPrice}>${stock.current.toFixed(2)}</Text>

                <Text style={styles.cardMeta}>
                    Previous close: ${stock.prevClose.toFixed(2)}
                </Text>

                <Text style={styles.cardSectorLabel}>
                    Sector: {getActiveSector().label}
                </Text>
            </View>
        );
    };

    return (
        <>
            <AppHeader title="Stocks" subtitle="Sector watchlist (Finnhub)" />
            <ScreenContainer>
                <Text style={styles.title}>Price tracker</Text>

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
                            onPress={fetchQuote}
                            style={{ marginTop: 8, width: 120 }}
                        />
                    </View>
                )}

                {!loading && !error && renderCard()}

                <FlatList
                    data={SECTORS}
                    horizontal
                    keyExtractor={item => item.key}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.pillRow}
                    renderItem={({ item }) => {
                        const isActive = item.key === activeSectorKey;
                        return (
                            <TouchableOpacity
                                onPress={() => onSelectSector(item.key)}
                                style={[styles.pill, isActive && styles.pillActive]}
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        isActive && styles.pillTextActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />

                <AppButton
                    label="Back to home"
                    onPress={() => navigation.navigate('Home')}
                    variant="outline"
                    style={{ marginTop: 16 }}
                />
            </ScreenContainer>
        </>
    );
};

export default StockPriceScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 6,
        marginTop: 4,
        color: '#F9FAFB',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    errorText: {
        color: '#F97373',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#020617',
        borderRadius: 20,
        marginTop: 4,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.35)',
        paddingHorizontal: 18,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardSymbol: {
        fontSize: 20,
        fontWeight: '800',
        color: '#F9FAFB',
    },
    cardCompany: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    cardChange: {
        fontSize: 14,
        fontWeight: '600',
    },
    cardPrice: {
        fontSize: 32,
        fontWeight: '800',
        color: '#F9FAFB',
        marginBottom: 6,
    },
    cardMeta: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    cardSectorLabel: {
        fontSize: 12,
        color: '#C7D2FE',
        marginTop: 6,
    },
    pillRow: {
        paddingVertical: 8,
        paddingHorizontal: 2,
        paddingRight: 12,
        marginTop: 8,
        marginBottom: 4,
        minHeight: 60,
        maxHeight: 60,
    },
    pill: {
        paddingHorizontal: 14,
        paddingVertical: 10,
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
});
