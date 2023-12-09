<script lang="ts" setup>
import { Colors } from 'src/config/Colors.enum';

export interface CSubtitleProps {
  title: string;
  color?: Colors | string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

withDefaults(defineProps<CSubtitleProps>(), {
  title: '',
  color: Colors.PRIMARY,
  fontSize: '17',
  fontWeight: '600',
  lineHeight: '',
  letterSpacing: '',
});
</script>

<template>
  <div
    :style="`font-size: ${fontSize}px; color: ${color}; font-weight: ${fontWeight}; ${
      lineHeight
        ? `line-height: ${lineHeight}px`
        : letterSpacing
        ? `letter-spacing: ${letterSpacing}px`
        : ''
    }`"
  >
    {{ title }}
  </div>
</template>
