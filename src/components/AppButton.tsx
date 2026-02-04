import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'outline';
    style?: ViewStyle;
};

export const AppButton: React.FC<Props> = ({
    label,
    onPress,
    variant = 'primary',
    style,
}) => {
    const isPrimary = variant === 'primary';
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.base,
                isPrimary ? styles.primary : styles.outline,
                style,
            ]}
            activeOpacity={0.8}
        >
            <Text style={isPrimary ? styles.textPrimary : styles.textOutline}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 13,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.35,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    primary: {
        backgroundColor: '#6366F1',
    },
    outline: {
        borderWidth: 1,
        borderColor: '#4F46E5',
        backgroundColor: 'transparent',
    },
    textPrimary: {
        color: '#F9FAFB',
        fontSize: 15,
        fontWeight: '600',
    },
    textOutline: {
        color: '#E5E7EB',
        fontSize: 15,
        fontWeight: '600',
    },
});
