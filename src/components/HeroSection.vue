<script setup>
import { ref } from 'vue'
import { ArrowRight, MapPin, Navigation, Sparkles, Clock, ShieldCheck } from 'lucide-vue-next'
import { BRAND_CONFIG, VEHICLE_CATEGORIES } from '../config/booking'

const props = defineProps({
  selectedCategory: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['quick-start', 'select-category', 'scroll-to-fleet'])

const quickPickup = ref('')
const quickDropoff = ref('')

function handleQuickSubmit() {
  emit('quick-start', {
    pickup: quickPickup.value.trim(),
    dropoff: quickDropoff.value.trim(),
    category: props.selectedCategory,
  })
}
</script>

<template>
  <section
    id="accueil"
    class="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#0A0A0C] pt-28 pb-10 sm:pt-32 sm:pb-14"
  >
    <!-- Full-Bleed Editorial Parisian Hero Photography -->
    <div class="pointer-events-none absolute inset-0 z-0">
      <img
        :src="BRAND_CONFIG.heroImage"
        alt="Chauffeur privé Paris devant une berline de luxe au crépuscule avec vue Tour Eiffel"
        class="h-full w-full object-cover object-[72%_center] sm:object-center scale-[1.01]"
      />
      <!-- Directional contrast veil preserving car & Eiffel Tower on the right -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/80 to-[#0A0A0C]/20"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/65"
      ></div>
    </div>

    <!-- Main Hero Copy -->
    <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-8 sm:px-8 lg:py-12">
      <div class="max-w-2xl">
        <!-- Eyebrow -->
        <div
          class="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-[#C8A46B]/30 bg-[#0A0A0C]/65 px-4 py-1.5 backdrop-blur-md"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-[#C8A46B]"></span>
          <span class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#DEC18E]">
            Paris &amp; Île-de-France · Service 24h/24
          </span>
        </div>

        <!-- Headline -->
        <h1
          class="animate-fade-up-delay-1 mt-6 font-editorial text-5xl font-medium leading-[1.03] tracking-[-0.01em] text-[#F5F2EC] sm:text-6xl lg:text-[4.6rem]"
        >
          L’excellence d’un chauffeur privé
          <span class="italic text-[#DEC18E]">à Paris.</span>
        </h1>

        <!-- Subtitle -->
        <p
          class="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[#D8D3C8]/90 sm:text-lg"
        >
          Voitures normales, haute gamme, limousines de luxe et vans prestige.
          Indiquez votre itinéraire et envoyez votre réservation directement par
          <span class="font-medium text-white">WhatsApp</span> en quelques secondes.
        </p>

        <!-- Primary CTAs -->
        <div class="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            @click="handleQuickSubmit"
            class="group inline-flex items-center gap-3 rounded-full bg-[#C8A46B] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0A0C] shadow-[0_12px_32px_rgba(200,164,107,0.28)] transition-all duration-300 hover:bg-[#DEC18E] hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Réserver une voiture</span>
            <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            @click="emit('scroll-to-fleet')"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F5F2EC] backdrop-blur-md transition-all duration-300 hover:border-[#C8A46B]/60 hover:bg-white/10 cursor-pointer"
          >
            <span>Explorer nos 4 gammes</span>
          </button>
        </div>

        <!-- Editorial Trust Metrics -->
        <div
          class="animate-fade-up-delay-3 mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 sm:gap-8"
        >
          <div>
            <div class="flex items-center gap-1.5 text-[#DEC18E]">
              <Clock class="h-3.5 w-3.5" />
              <span class="font-editorial text-2xl font-medium text-white sm:text-3xl">&lt; 5 min</span>
            </div>
            <p class="mt-1 text-[11px] leading-snug text-[#BDB7AB]">
              Confirmation rapide via WhatsApp
            </p>
          </div>
          <div>
            <div class="flex items-center gap-1.5 text-[#DEC18E]">
              <Sparkles class="h-3.5 w-3.5" />
              <span class="font-editorial text-2xl font-medium text-white sm:text-3xl">4 Gammes</span>
            </div>
            <p class="mt-1 text-[11px] leading-snug text-[#BDB7AB]">
              Normale, Haute Gamme, Luxe &amp; Van
            </p>
          </div>
          <div>
            <div class="flex items-center gap-1.5 text-[#DEC18E]">
              <ShieldCheck class="h-3.5 w-3.5" />
              <span class="font-editorial text-2xl font-medium text-white sm:text-3xl">24/7</span>
            </div>
            <p class="mt-1 text-[11px] leading-snug text-[#BDB7AB]">
              Aéroports CDG, Orly, Gares &amp; Paris
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Floating Express Booking Strip -->
    <div class="relative z-10 mx-auto mt-6 w-full max-w-7xl px-5 sm:px-8">
      <form
        @submit.prevent="handleQuickSubmit"
        class="rounded-2xl border border-white/15 bg-[#111115]/85 p-3.5 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-4"
      >
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <span class="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C8A46B]">
            Démarrage rapide · Paris
          </span>
          <!-- Quick Vehicle Category Selector -->
          <div class="flex flex-wrap items-center gap-1.5">
            <button
              v-for="cat in VEHICLE_CATEGORIES"
              :key="cat.id"
              type="button"
              @click="emit('select-category', cat.id)"
              class="rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer"
              :class="
                selectedCategory === cat.id
                  ? 'bg-[#C8A46B] text-[#0A0A0C] shadow-sm'
                  : 'bg-white/5 text-[#D8D3C8]/80 hover:bg-white/10 hover:text-white'
              "
            >
              {{ cat.shortLabel }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-2.5 md:grid-cols-12">
          <!-- Pickup -->
          <label
            class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors focus-within:border-[#C8A46B]/70 md:col-span-5"
          >
            <MapPin class="h-4 w-4 shrink-0 text-[#C8A46B]" />
            <div class="min-w-0 flex-1">
              <span class="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#9E988D]">
                Adresse de récupération
              </span>
              <input
                v-model="quickPickup"
                type="text"
                placeholder="Ex. Aéroport CDG, Hôtel, Rue de Rivoli..."
                class="mt-0.5 w-full bg-transparent text-sm text-white placeholder-[#7A756C] focus:outline-none"
              />
            </div>
          </label>

          <!-- Dropoff -->
          <label
            class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors focus-within:border-[#C8A46B]/70 md:col-span-5"
          >
            <Navigation class="h-4 w-4 shrink-0 text-[#DEC18E]" />
            <div class="min-w-0 flex-1">
              <span class="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#9E988D]">
                Adresse de destination
              </span>
              <input
                v-model="quickDropoff"
                type="text"
                placeholder="Ex. Tour Eiffel, Orly, Place Vendôme..."
                class="mt-0.5 w-full bg-transparent text-sm text-white placeholder-[#7A756C] focus:outline-none"
              />
            </div>
          </label>

          <!-- Continue CTA -->
          <button
            type="submit"
            class="flex items-center justify-center gap-2 rounded-xl bg-[#F5F2EC] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0A0A0C] transition-all duration-300 hover:bg-[#C8A46B] md:col-span-2 cursor-pointer"
          >
            <span>Continuer</span>
            <ArrowRight class="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
