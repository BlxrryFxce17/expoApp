import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

export const ScreenContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.inner}>{children}</View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#020617',
    },
    inner: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
});
