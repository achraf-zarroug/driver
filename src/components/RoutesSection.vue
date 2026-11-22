<script setup>
import { ArrowUpRight, Clock, Plane, Sparkles } from 'lucide-vue-next'
import { POPULAR_ROUTES, getCategoryById } from '../config/booking'

const emit = defineEmits(['prefill-route'])
</script>

<template>
  <section id="trajets" class="bg-[#F7F5F0] py-20 text-[#141418] sm:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <!-- Header -->
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9E7B42]">
            <span class="h-[1px] w-7 bg-[#C8A46B]"></span>
            <span>Itinéraires Fréquents</span>
          </div>
          <h2 class="mt-4 font-editorial text-4xl font-medium leading-[1.08] text-[#141418] sm:text-5xl">
            Paris, ses aéroports et ses grandes adresses.
          </h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-[#5C5953]">
          Sélectionnez un trajet ci-dessous pour pré-remplir instantanément votre formulaire de réservation WhatsApp.
        </p>
      </div>

      <!-- Routes Grid -->
      <div class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="route in POPULAR_ROUTES"
          :key="route.id"
          type="button"
          @click="emit('prefill-route', route)"
          class="group flex flex-col justify-between rounded-2xl border border-[#141418]/10 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A46B] hover:shadow-[0_18px_45px_rgba(20,20,24,0.08)] cursor-pointer"
        >
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-[#F7F5F0] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9E7B42]">
                <Plane v-if="route.tag.includes('Aéroport') || route.tag.includes('Aviation')" class="h-3 w-3" />
                <Sparkles v-else class="h-3 w-3" />
                {{ route.tag }}
              </span>
              <span class="flex h-8 w-8 items-center justify-center rounded-full border border-[#141418]/10 text-[#141418] transition-all duration-300 group-hover:border-[#C8A46B] group-hover:bg-[#C8A46B] group-hover:text-[#0A0A0C]">
                <ArrowUpRight class="h-4 w-4" />
              </span>
            </div>

            <h3 class="mt-5 font-editorial text-2xl font-medium leading-snug text-[#141418] group-hover:text-[#9E7B42] transition-colors">
              {{ route.title }}
            </h3>
            <p class="mt-2 text-xs leading-relaxed text-[#5C5953]">
              {{ route.note }}
            </p>
          </div>

          <div class="mt-6 flex items-end justify-between border-t border-[#141418]/10 pt-4">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 text-xs text-[#5C5953]">
                <Clock class="h-3.5 w-3.5 text-[#9E7B42]" />
                <span>{{ route.duration }}</span>
              </div>
              <span class="block text-[11px] font-medium text-[#7A766E]">
                Recommandé : {{ getCategoryById(route.recommendedCategory).label }}
              </span>
            </div>
            <div class="text-right">
              <span class="block text-[10px] uppercase tracking-[0.14em] text-[#7A766E]">Dès</span>
              <span class="font-editorial text-2xl font-semibold text-[#141418]">
                {{ route.priceFrom }}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
