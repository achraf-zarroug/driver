<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import WhatsAppIcon from './icons/WhatsAppIcon.vue'
import { BRAND_CONFIG, buildDirectWhatsAppUrl } from '../config/booking'

const emit = defineEmits(['navigate-booking'])

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Flotte', href: '#flotte' },
  { label: 'Réserver', href: '#reservation' },
  { label: 'Trajets Paris', href: '#trajets' },
  { label: 'Engagements', href: '#engagements' },
]

const directWhatsAppUrl = buildDirectWhatsAppUrl()

function handleScroll() {
  isScrolled.value = window.scrollY > 36
}

function handleLinkClick(href) {
  mobileMenuOpen.value = false
  if (href === '#reservation') {
    emit('navigate-booking')
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="
      isScrolled
        ? 'bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
        : 'bg-gradient-to-b from-[#0A0A0C]/85 via-[#0A0A0C]/40 to-transparent py-5'
    "
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
      <!-- Brand Signature -->
      <a
        href="#accueil"
        class="group flex items-center gap-3.5 focus:outline-none"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A46B]/50 bg-[#0A0A0C]/80 transition-colors duration-300 group-hover:border-[#C8A46B]"
        >
          <span class="font-editorial text-xl font-medium tracking-wider text-[#C8A46B]">A</span>
        </div>
        <div class="flex flex-col">
          <span class="font-editorial text-xl font-medium tracking-[0.08em] text-[#F5F2EC] sm:text-2xl leading-none">
            {{ BRAND_CONFIG.name }}
          </span>
          <span class="mt-1 text-[10px] font-medium uppercase tracking-[0.26em] text-[#C8A46B]">
            {{ BRAND_CONFIG.tagline }}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-xs font-medium uppercase tracking-[0.18em] text-[#E6E1D8]/80 transition-colors duration-200 hover:text-[#C8A46B]"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Desktop Actions -->
      <div class="hidden items-center gap-3 lg:flex">
        <a
          :href="directWhatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium tracking-wide text-[#F5F2EC] transition-all duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 hover:text-white"
        >
          <WhatsAppIcon class="h-3.5 w-3.5 text-[#25D366]" />
          <span>WhatsApp 24/7</span>
        </a>
        <a
          href="#reservation"
          @click.prevent="emit('navigate-booking')"
          class="inline-flex items-center gap-2 rounded-full bg-[#C8A46B] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0A0A0C] transition-all duration-300 hover:bg-[#DEC18E] hover:shadow-[0_0_24px_rgba(200,164,107,0.35)]"
        >
          <span>Réserver</span>
          <ArrowUpRight class="h-3.5 w-3.5" />
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F5F2EC] lg:hidden"
        :aria-expanded="mobileMenuOpen"
        aria-label="Ouvrir le menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <X v-if="mobileMenuOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="border-b border-white/10 bg-[#0A0A0C]/98 px-6 pb-7 pt-4 backdrop-blur-2xl lg:hidden"
      >
        <div class="flex flex-col divide-y divide-white/10">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-[#F5F2EC] transition-colors hover:text-[#C8A46B]"
            @click="handleLinkClick(link.href)"
          >
            {{ link.label }}
          </a>
        </div>
        <div class="mt-5 flex flex-col gap-3">
          <a
            href="#reservation"
            class="flex items-center justify-center gap-2 rounded-full bg-[#C8A46B] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#0A0A0C]"
            @click="handleLinkClick('#reservation')"
          >
            Réserver un chauffeur
            <ArrowUpRight class="h-4 w-4" />
          </a>
          <a
            :href="directWhatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 text-xs font-semibold text-[#F5F2EC]"
          >
            <WhatsAppIcon class="h-4 w-4 text-[#25D366]" />
            Contacter sur WhatsApp ({{ BRAND_CONFIG.displayPhone }})
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
