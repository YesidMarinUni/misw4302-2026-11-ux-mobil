import React from 'react';
import { View, Text } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';

export default function FeedbackScreen() {
  const { feedbackMessage } = useAlarm();

  return (
    <View style={{
      flex: 1,
      backgroundColor: t.colors.bg,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    }}>
      <View style={{
        width: 80,
        height: 80,
        borderRadius: t.radii.md,
        backgroundColor: t.colors.teal,
        borderWidth: 3,
        borderColor: t.colors.text,
        shadowColor: t.colors.text,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
      }}>
        <Text style={{ fontSize: 36 }}>✓</Text>
      </View>

      <Text style={{
        fontFamily: t.fonts.display,
        fontSize: 18,
        color: t.colors.text,
        textAlign: 'center',
        lineHeight: 26,
      }}>
        {feedbackMessage}
      </Text>
    </View>
  );
}
