<script setup>
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-vue-next'
import WhatsAppIcon from './icons/WhatsAppIcon.vue'
import { BRAND_CONFIG, VEHICLE_CATEGORIES, buildDirectWhatsAppUrl } from '../config/booking'

const emit = defineEmits(['choose-vehicle'])
const directWhatsAppUrl = buildDirectWhatsAppUrl()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/10 bg-[#08080A] text-[#CFCAC0]">
    <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <!-- Brand Column -->
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3.5">
            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A46B]/50">
              <span class="font-editorial text-xl font-medium text-[#C8A46B]">A</span>
            </div>
            <div>
              <span class="font-editorial text-2xl font-medium tracking-[0.06em] text-[#F5F2EC]">
                {{ BRAND_CONFIG.name }}
              </span>
              <span class="block text-[10px] uppercase tracking-[0.24em] text-[#C8A46B]">
                {{ BRAND_CONFIG.tagline }}
              </span>
            </div>
          </div>

          <p class="mt-5 max-w-md text-sm leading-relaxed text-[#9C978E]">
            Service de voiture avec chauffeur privé sur Paris et toute l’Île-de-France.
            Berlines normales, haute gamme, limousines de luxe et vans prestige disponibles
            24h/24 sur réservation directe WhatsApp.
          </p>

          <a
            :href="directWhatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#25D366] hover:text-[#071A0E]"
          >
            <WhatsAppIcon class="h-4 w-4 text-[#25D366] group-hover:text-[#071A0E]" />
            <span>Écrire sur WhatsApp</span>
            <ArrowUpRight class="h-3.5 w-3.5" />
          </a>
        </div>

        <!-- Fleet Quick Links -->
        <div class="lg:col-span-3">
          <h4 class="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A46B]">
            Nos Gammes
          </h4>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="cat in VEHICLE_CATEGORIES" :key="cat.id">
              <button
                type="button"
                @click="emit('choose-vehicle', cat.id)"
                class="text-[#B8B2A7] transition-colors hover:text-[#DEC18E] cursor-pointer"
              >
                {{ cat.label }} — {{ cat.subtitle }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Contact Details -->
        <div class="lg:col-span-4">
          <h4 class="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A46B]">
            Conciergerie Paris
          </h4>
          <ul class="mt-5 space-y-3.5 text-sm text-[#B8B2A7]">
            <li class="flex items-start gap-3">
              <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#C8A46B]" />
              <span>{{ BRAND_CONFIG.address }} · Paris &amp; Île-de-France (CDG, Orly, Le Bourget, Gares)</span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="h-4 w-4 shrink-0 text-[#C8A46B]" />
              <a
                :href="directWhatsAppUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors hover:text-white"
              >
                {{ BRAND_CONFIG.displayPhone }} (WhatsApp 24/7)
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="h-4 w-4 shrink-0 text-[#C8A46B]" />
              <a :href="`mailto:${BRAND_CONFIG.email}`" class="transition-colors hover:text-white">
                {{ BRAND_CONFIG.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="hairline-gold my-10 h-[1px] w-full opacity-40"></div>

      <div class="flex flex-col items-center justify-between gap-3 text-xs text-[#7D7870] sm:flex-row">
        <p>© {{ currentYear }} {{ BRAND_CONFIG.name }} Paris. Tous droits réservés.</p>
        <p>Chauffeurs Privés VTC · Paris · CDG · Orly · Le Bourget</p>
      </div>
    </div>
  </footer>
</template>
