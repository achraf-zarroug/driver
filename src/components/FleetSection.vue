<script setup>
import { ref, computed } from 'vue'
import { Users, Briefcase, Check, ArrowRight, Sparkles } from 'lucide-vue-next'
import { VEHICLE_CATEGORIES } from '../config/booking'

const props = defineProps({
  selectedCategory: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['choose-vehicle'])

const activeFilter = ref('all')

const filterTabs = [
  { id: 'all', label: 'Toutes les gammes' },
  { id: 'normale', label: 'Voiture Normale' },
  { id: 'haute-gamme', label: 'Haute Gamme' },
  { id: 'luxe', label: 'Voiture de Luxe' },
  { id: 'van', label: 'Van Prestige' },
]

const displayedVehicles = computed(() => {
  if (activeFilter.value === 'all') return VEHICLE_CATEGORIES
  return VEHICLE_CATEGORIES.filter((v) => v.id === activeFilter.value)
})
</script>

<template>
  <section id="flotte" class="bg-[#F7F5F0] py-20 text-[#141418] sm:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <!-- Editorial Section Header -->
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9E7B42]">
            <span class="h-[1px] w-7 bg-[#C8A46B]"></span>
            <span>Notre Flotte Parisienne</span>
          </div>
          <h2 class="mt-4 font-editorial text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-[#141418] sm:text-5xl">
            Quatre gammes d’exception, pensées pour chaque trajet.
          </h2>
          <p class="mt-4 text-base leading-relaxed text-[#5C5953]">
            De la berline normale sobre et efficace à la limousine de luxe ou au van 7 places,
            chaque véhicule est récent, impeccablement entretenu et conduit par un chauffeur privé expérimenté.
          </p>
        </div>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par gamme de véhicule">
          <button
            v-for="tab in filterTabs"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="activeFilter === tab.id"
            @click="activeFilter = tab.id"
            class="rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-250 cursor-pointer"
            :class="
              activeFilter === tab.id
                ? 'bg-[#141418] text-[#F7F5F0] shadow-sm'
                : 'border border-[#141418]/12 bg-white text-[#5C5953] hover:border-[#C8A46B] hover:text-[#141418]'
            "
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Fleet Cards Grid -->
      <div
        class="mt-12 grid gap-7"
        :class="displayedVehicles.length === 1 ? 'mx-auto max-w-3xl grid-cols-1' : 'grid-cols-1 md:grid-cols-2'"
      >
        <article
          v-for="vehicle in displayedVehicles"
          :key="vehicle.id"
          class="group flex flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,20,24,0.10)]"
          :class="
            selectedCategory === vehicle.id
              ? 'border-[#C8A46B] ring-1 ring-[#C8A46B]/40 shadow-[0_18px_45px_rgba(158,123,66,0.12)]'
              : 'border-[#141418]/10'
          "
        >
          <!-- Vehicle Photography -->
          <div class="relative aspect-[16/9] overflow-hidden bg-[#141418]">
            <img
              :src="vehicle.image"
              :alt="`${vehicle.label} — ${vehicle.models} à Paris`"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/65 via-transparent to-[#0A0A0C]/20"></div>

            <!-- Top Badges -->
            <div class="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md"
                :class="
                  vehicle.featured
                    ? 'bg-[#C8A46B] text-[#0A0A0C]'
                    : 'border border-white/20 bg-[#0A0A0C]/70 text-[#F5F2EC]'
                "
              >
                <Sparkles v-if="vehicle.featured" class="h-3 w-3" />
                {{ vehicle.badge }}
              </span>

              <span
                v-if="selectedCategory === vehicle.id"
                class="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-[11px] font-semibold text-[#071A0E] shadow-md"
              >
                <Check class="h-3.5 w-3.5 stroke-[2.5]" />
                Sélectionné
              </span>
            </div>

            <!-- Bottom Overlay Price -->
            <div class="absolute inset-x-5 bottom-4 flex items-end justify-between text-white">
              <div>
                <p class="text-[11px] uppercase tracking-[0.18em] text-[#DEC18E]">
                  {{ vehicle.subtitle }}
                </p>
                <h3 class="font-editorial text-3xl font-medium leading-tight text-white">
                  {{ vehicle.label }}
                </h3>
              </div>
              <div class="text-right">
                <span class="block text-[10px] uppercase tracking-[0.16em] text-white/75">
                  Paris dès
                </span>
                <span class="font-editorial text-2xl font-semibold text-[#DEC18E]">
                  {{ vehicle.priceFrom }}
                </span>
              </div>
            </div>
          </div>

          <!-- Card Body -->
          <div class="flex flex-1 flex-col p-6 sm:p-7">
            <!-- Models & Capacity Strip -->
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#141418]/10 pb-4">
              <span class="text-xs font-semibold tracking-wide text-[#141418]">
                {{ vehicle.models }}
              </span>
              <div class="flex items-center gap-3 text-xs font-medium text-[#5C5953]">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-[#F7F5F0] px-2.5 py-1">
                  <Users class="h-3.5 w-3.5 text-[#9E7B42]" />
                  Max {{ vehicle.maxPassengers }} pers.
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-[#F7F5F0] px-2.5 py-1">
                  <Briefcase class="h-3.5 w-3.5 text-[#9E7B42]" />
                  {{ vehicle.maxLuggage }} valises
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="mt-4 text-sm leading-relaxed text-[#5C5953]">
              {{ vehicle.description }}
            </p>

            <!-- Features List -->
            <ul class="mt-5 space-y-2.5">
              <li
                v-for="feat in vehicle.features"
                :key="feat"
                class="flex items-center gap-2.5 text-xs font-medium text-[#2A2926]"
              >
                <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C8A46B]/18 text-[#9E7B42]">
                  <Check class="h-2.5 w-2.5 stroke-[2.8]" />
                </span>
                <span>{{ feat }}</span>
              </li>
            </ul>

            <!-- Footer CTA -->
            <div class="mt-7 flex items-center justify-between gap-4 border-t border-[#141418]/10 pt-5">
              <div>
                <span class="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#7A766E]">
                  Transfert Aéroport indicatif
                </span>
                <span class="text-sm font-semibold text-[#141418]">
                  À partir de {{ vehicle.airportRate }}
                </span>
              </div>

              <button
                type="button"
                @click="emit('choose-vehicle', vehicle.id)"
                class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] transition-all duration-300 cursor-pointer"
                :class="
                  selectedCategory === vehicle.id
                    ? 'bg-[#C8A46B] text-[#0A0A0C] hover:bg-[#b89256]'
                    : 'bg-[#141418] text-[#F7F5F0] hover:bg-[#C8A46B] hover:text-[#0A0A0C]'
                "
              >
                <span>{{ selectedCategory === vehicle.id ? 'Réserver cette gamme' : 'Choisir ce véhicule' }}</span>
                <ArrowRight class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
