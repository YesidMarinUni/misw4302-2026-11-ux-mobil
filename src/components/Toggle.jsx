import { TouchableOpacity, View, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

export default function Toggle({ enabled, onToggle, size = 'normal' }) {
  const w = size === 'small' ? 46 : 56;
  const h = size === 'small' ? 26 : 32;
  const knob = size === 'small' ? 18 : 22;
  const bw = size === 'small' ? 2 : 3;
  const travel = w - knob - bw * 2 - (h - knob - bw * 2) / 2;
  const offset = (h - knob - bw * 2) / 2;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={(e) => { e.stopPropagation?.(); onToggle(); }}
      style={[
        styles.track,
        {
          width: w,
          height: h,
          borderRadius: t.radii.full,
          borderWidth: bw,
          backgroundColor: enabled ? t.colors.teal : t.colors.disabled,
        },
      ]}
    >
      <View
        style={[
          styles.knob,
          {
            width: knob,
            height: knob,
            borderRadius: knob / 2,
            left: enabled ? travel : offset,
            top: offset,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    borderColor: t.colors.text,
    position: 'relative',
    justifyContent: 'center',
  },
  knob: {
    position: 'absolute',
    backgroundColor: t.colors.white,
    borderWidth: 2,
    borderColor: t.colors.text,
  },
});
