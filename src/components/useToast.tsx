// src/components/useToast.tsx
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export function useToast(durationMs = 2000) {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    const showToast = (msg: string) => {
        setMessage(msg);
        setVisible(true);

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 180,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateY, {
                        toValue: 20,
                        duration: 180,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setVisible(false);
                });
            }, durationMs);
        });
    };

    const Toast = () =>
        visible ? (
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.toast,
                    {
                        opacity,
                        transform: [{ translateY }],
                    },
                ]}
            >
                <Text style={styles.toastText}>{message}</Text>
            </Animated.View>
        ) : null;

    return { showToast, Toast };
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 32,
        alignSelf: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: 'rgba(15, 23, 42, 0.96)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    toastText: {
        color: '#F9FAFB',
        fontSize: 13,
        fontWeight: '500',
    },
});
