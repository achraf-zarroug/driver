<script setup>
import { ref } from 'vue'
import { VEHICLES, HERO_IMAGE, WHATSAPP_NUMBER, buildWhatsAppUrl } from './config/booking'

const form = ref({
  clientName: '',
  pickupAddress: '',
  dropoffAddress: '',
  vehicleId: 'normale',
})

const errorMsg = ref('')

function selectVehicle(id) {
  form.value.vehicleId = id
  document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
}

function submitWhatsApp() {
  if (!form.value.clientName.trim() || !form.value.pickupAddress.trim() || !form.value.dropoffAddress.trim()) {
    errorMsg.value = 'Veuillez remplir votre nom, l’adresse de récupération et la destination.'
    return
  }
  errorMsg.value = ''
  const url = buildWhatsAppUrl(form.value)
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="min-h-screen bg-[#0F1115] text-white">
    <!-- Header Taxi Paris -->
    <header class="border-b border-white/10 bg-[#0F1115]/95 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" class="flex items-center gap-2.5">
          <span class="rounded-md bg-[#F5B82E] px-2.5 py-1 text-xs font-extrabold tracking-widest text-[#0F1115]">
            TAXI
          </span>
          <span class="text-lg font-bold tracking-tight text-white">Paris 24/7</span>
        </a>

        <nav class="flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
          <a href="#flotte" class="hover:text-[#F5B82E] transition-colors">Véhicules</a>
          <a
            href="#reservation"
            class="rounded-lg bg-[#F5B82E] px-4 py-2 font-bold text-[#0F1115] hover:bg-[#ffca4f] transition-colors"
          >
            Commander
          </a>
        </nav>
      </div>
    </header>

    <!-- Hero + Formulaire de réservation Taxi -->
    <section id="reservation" class="relative overflow-hidden py-12 sm:py-20">
      <div class="pointer-events-none absolute inset-0">
        <img
          :src="HERO_IMAGE"
          alt="Taxi à Paris"
          class="h-full w-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0F1115]/85 via-[#0F1115]/80 to-[#0F1115]"></div>
      </div>

      <div class="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 lg:grid-cols-12">
        <!-- Présentation -->
        <div class="lg:col-span-6">
          <span class="inline-flex items-center gap-2 rounded-full border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-3.5 py-1 text-xs font-semibold text-[#F5B82E]">
            <span class="h-2 w-2 rounded-full bg-[#F5B82E]"></span>
            Disponible 24h/24 &amp; 7j/7 · Paris &amp; Aéroports
          </span>

          <h1 class="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Réservez votre <span class="text-[#F5B82E]">Taxi à Paris</span> en quelques secondes.
          </h1>

          <p class="mt-4 max-w-lg text-base leading-relaxed text-zinc-300">
            Déplacez-vous rapidement grâce aux couloirs de bus réservés aux taxis parisiens.
            Voiture normale, haute gamme, voiture de luxe ou van : envoyez votre course directement sur WhatsApp.
          </p>
        </div>

        <!-- Formulaire essentiel -->
        <div class="lg:col-span-6">
          <form
            @submit.prevent="submitWhatsApp"
            class="rounded-2xl bg-white p-6 text-[#0F1115] shadow-2xl sm:p-8"
          >
            <h2 class="text-2xl font-bold text-[#0F1115]">
              Commander un Taxi
            </h2>
            <p class="mt-1 text-xs text-zinc-500">
              Réponse immédiate via WhatsApp · Gares, Aéroports CDG / Orly &amp; tout Paris
            </p>

            <!-- Choix de la gamme -->
            <div class="mt-5">
              <label class="block text-xs font-bold uppercase tracking-wider text-zinc-600">
                Catégorie de véhicule
              </label>
              <div class="mt-2 grid grid-cols-2 gap-2">
                <button
                  v-for="v in VEHICLES"
                  :key="v.id"
                  type="button"
                  @click="form.vehicleId = v.id"
                  class="rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all cursor-pointer"
                  :class="
                    form.vehicleId === v.id
                      ? 'border-[#F5B82E] bg-[#0F1115] text-white ring-2 ring-[#F5B82E]/40'
                      : 'border-zinc-200 bg-zinc-50 text-[#0F1115] hover:border-[#F5B82E]'
                  "
                >
                  <span class="block">{{ v.label }}</span>
                  <span
                    class="mt-0.5 block text-[11px] font-normal"
                    :class="form.vehicleId === v.id ? 'text-[#F5B82E]' : 'text-zinc-500'"
                  >
                    {{ v.id === 'van' ? 'Jusqu’à 7 places' : '1 à 3 places' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Champs demandés -->
            <div class="mt-5 space-y-4">
              <div>
                <label for="clientName" class="mb-1 block text-xs font-bold text-zinc-800">
                  Nom du client *
                </label>
                <input
                  id="clientName"
                  v-model="form.clientName"
                  type="text"
                  required
                  placeholder="Ex. Karim Benali"
                  class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/25"
                />
              </div>

              <div>
                <label for="pickupAddress" class="mb-1 block text-xs font-bold text-zinc-800">
                  Adresse de récupération *
                </label>
                <input
                  id="pickupAddress"
                  v-model="form.pickupAddress"
                  type="text"
                  required
                  placeholder="Ex. Gare du Nord, Aéroport CDG, 15 Rue de Rivoli..."
                  class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/25"
                />
              </div>

              <div>
                <label for="dropoffAddress" class="mb-1 block text-xs font-bold text-zinc-800">
                  Adresse de destination *
                </label>
                <input
                  id="dropoffAddress"
                  v-model="form.dropoffAddress"
                  type="text"
                  required
                  placeholder="Ex. Tour Eiffel, Aéroport Orly, La Défense..."
                  class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/25"
                />
              </div>
            </div>

            <p v-if="errorMsg" class="mt-3 text-xs font-semibold text-red-600">
              {{ errorMsg }}
            </p>

            <!-- Envoi WhatsApp -->
            <button
              type="submit"
              class="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1EA952] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#178B43] cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path
                  d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.59 5.95L0 24l6.33-1.66a11.86 11.86 0 0 0 5.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.76.99 1-3.66-.24-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"
                />
              </svg>
              <span>Réserver mon Taxi sur WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Grille des 4 catégories de Taxis -->
    <section id="flotte" class="bg-zinc-100 py-16 text-[#0F1115]">
      <div class="mx-auto max-w-6xl px-5">
        <div class="mb-10 text-center">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-600">
            Flotte Taxi Parisien
          </span>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight">
            Nos 4 types de Taxis
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="vehicle in VEHICLES"
            :key="vehicle.id"
            class="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg"
            :class="form.vehicleId === vehicle.id ? 'border-[#F5B82E] ring-2 ring-[#F5B82E]/50' : 'border-zinc-200'"
          >
            <img
              :src="vehicle.image"
              :alt="vehicle.label"
              class="aspect-[16/10] w-full object-cover"
            />
            <div class="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 class="text-lg font-bold text-[#0F1115]">{{ vehicle.label }}</h3>
                <p class="mt-1 text-xs font-medium text-zinc-600">{{ vehicle.models }}</p>
                <p class="mt-2 text-xs text-zinc-500">{{ vehicle.seats }}</p>
              </div>

              <button
                type="button"
                @click="selectVehicle(vehicle.id)"
                class="mt-5 w-full rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                :class="
                  form.vehicleId === vehicle.id
                    ? 'bg-[#F5B82E] text-[#0F1115]'
                    : 'bg-[#0F1115] text-white hover:bg-[#F5B82E] hover:text-[#0F1115]'
                "
              >
                {{ form.vehicleId === vehicle.id ? 'Sélectionné' : 'Choisir ce taxi' }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Footer simple -->
    <footer class="border-t border-white/10 bg-[#0F1115] py-6 text-center text-xs text-zinc-400">
      <p>Taxi Paris 24/7 — Réservation directe WhatsApp : +{{ WHATSAPP_NUMBER }}</p>
    </footer>
  </div>
</template>
