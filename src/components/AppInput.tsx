import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

type Props = TextInputProps & {
    label?: string;
};

export const AppInput: React.FC<Props> = ({ label, ...rest }) => {
    return (
        <View style={styles.container}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    label: {
        marginBottom: 6,
        color: '#E5E7EB',
        fontSize: 13,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1F2933',
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 11,
        fontSize: 14,
        color: '#F9FAFB',
        backgroundColor: '#020617',
    },
});
