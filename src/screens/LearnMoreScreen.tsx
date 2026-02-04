import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../App';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { ScreenContainer } from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnMore'>;

const LearnMoreScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <>
            <AppHeader title="Learn more" subtitle="About this app" />
            <ScreenContainer>
                <Text style={styles.title}>Learn more</Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>What is BasicFormApp?</Text>
                        <Text style={styles.body}>
                            This is a simple demo application built with Expo, React Native,
                            and React Navigation. It showcases a basic auth flow, profile,
                            settings, and reusable UI components.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Features</Text>
                        <Text style={styles.bullet}>• Splash screen and login flow</Text>
                        <Text style={styles.bullet}>• Register and profile pages</Text>
                        <Text style={styles.bullet}>• Settings with interactive toggles</Text>
                        <Text style={styles.bullet}>• Reusable Button, Input, and Header</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Tech stack</Text>
                        <Text style={styles.body}>• Expo & React Native</Text>
                        <Text style={styles.body}>• React Navigation (native stack)</Text>
                        <Text style={styles.body}>• TypeScript (optional) and functional components</Text>
                    </View>

                    <AppButton
                        label="Back to Home"
                        onPress={() => navigation.navigate('Home')}
                        style={{ marginTop: 16, width: '50%', alignSelf: 'center' }}
                    />
                </ScrollView>
            </ScreenContainer>
        </>
    );
};

export default LearnMoreScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 16,
        marginTop: 8,
        color: '#F9FAFB',
        alignSelf: 'center',
    },
    scrollContent: {
        paddingBottom: 24,
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
        fontSize: 16,
        fontWeight: '600',
        color: '#E5E7EB',
        marginBottom: 8,
    },
    body: {
        fontSize: 14,
        color: '#9CA3AF',
        lineHeight: 20,
    },
    bullet: {
        fontSize: 14,
        color: '#9CA3AF',
        lineHeight: 20,
    },
});
