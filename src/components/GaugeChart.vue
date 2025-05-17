<template>
  <svg :width="size" :height="size / 2" viewBox="0 0 200 100">
    <!-- Background Arc -->
    <path d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="#3e3e3e" stroke-width="20" />

    <!-- Active Arc -->
    <path
      v-if="value !== 0"
      :d="activePath"
      fill="none"
      stroke="url(#dynamicGradient)"
      stroke-width="20"
    />

    <!-- Value Number -->
    <text x="100" y="98" text-anchor="middle" font-size="46" fill="white" font-weight="bold">
      {{ value }}
    </text>

    <!-- Gradient Definition -->
    <defs>
      <linearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="startColor" />
        <stop offset="100%" :stop-color="endColor" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true }, // 0–3
  size: { type: Number, default: 200 }
})

// Warna gradasi dinamis
const startColor = computed(() => {
  if (props.value === 1) return '#f6ad55' // kuning
  if (props.value === 2) return '#f6ad55' // kuning dominan
  if (props.value === 3) return '#ed8936' // oranye dominan
  return '#00000000' // transparan jika 0
})

const endColor = computed(() => {
  if (props.value === 1) return '#f6ad55' // kuning
  if (props.value === 2) return '#ed8936' // campuran
  if (props.value === 3) return '#c53030' // merah
  return '#00000000' // transparan jika 0
})

// Hitung path lengkungan aktif
const activePath = computed(() => {
  const radius = 90
  const centerX = 100
  const centerY = 100
  const angle = 180 * (props.value / 3)
  const start = toCoords(180)
  const end = toCoords(180 - angle)
  const largeArcFlag = angle > 180 ? 1 : 0
  return `M ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y}`
})

function toCoords(angle) {
  const rad = (Math.PI * angle) / 180
  return {
    x: 100 + 90 * Math.cos(rad),
    y: 100 - 90 * Math.sin(rad)
  }
}
</script>
