<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WhatsAppIcon from './icons/WhatsAppIcon.vue'
import { buildDirectWhatsAppUrl } from '../config/booking'

const visible = ref(false)
const whatsappUrl = buildDirectWhatsAppUrl()

function onScroll() {
  visible.value = window.scrollY > 420
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <a
      v-if="visible"
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter la conciergerie sur WhatsApp"
      class="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/35 bg-[#0E1512]/95 py-3 pl-4 pr-5 text-xs font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#13221A]"
    >
      <span class="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-[#071A0E]">
        <WhatsAppIcon class="h-4 w-4" />
        <span class="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
          <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]"></span>
        </span>
      </span>
      <span class="hidden sm:flex flex-col leading-tight">
        <span class="text-[10px] font-medium uppercase tracking-[0.14em] text-[#A8D5BA]">Conciergerie 24/7</span>
        <span>WhatsApp Direct</span>
      </span>
    </a>
  </transition>
</template>
