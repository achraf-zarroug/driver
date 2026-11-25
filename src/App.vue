<script setup>
import { ref } from 'vue'
import { VEHICLES, HERO_IMAGE, WHATSAPP_NUMBER, buildWhatsAppUrl } from './config/booking'

const form = ref({
  clientName: '',
  pickupAddress: '',
  dropoffAddress: '',
  vehicleId: 'haute-gamme',
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
  <div class="min-h-screen bg-[#0A0A0C] text-[#F5F2EC]">
    <!-- Header simple -->
    <header class="border-b border-white/10 bg-[#0A0A0C]/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" class="font-editorial text-2xl font-semibold tracking-wide text-[#F5F2EC]">
          Maison Aurèle <span class="text-sm font-sans font-normal text-[#C8A46B]">· Paris</span>
        </a>
        <nav class="flex items-center gap-6 text-xs uppercase tracking-widest text-[#D8D3C8]">
          <a href="#flotte" class="hover:text-[#C8A46B] transition-colors">Véhicules</a>
          <a
            href="#reservation"
            class="rounded-full bg-[#C8A46B] px-4 py-2 font-semibold text-[#0A0A0C] hover:bg-[#DEC18E] transition-colors"
          >
            Réserver
          </a>
        </nav>
      </div>
    </header>

    <!-- Hero + Formulaire de réservation essentiel -->
    <section id="reservation" class="relative overflow-hidden py-14 sm:py-20">
      <div class="pointer-events-none absolute inset-0">
        <img
          :src="HERO_IMAGE"
          alt="Chauffeur privé à Paris"
          class="h-full w-full object-cover opacity-35"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/80 via-[#0A0A0C]/75 to-[#0A0A0C]"></div>
      </div>

      <div class="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 lg:grid-cols-12">
        <!-- Texte d'accroche -->
        <div class="lg:col-span-6">
          <span class="inline-block rounded-full border border-[#C8A46B]/40 px-3.5 py-1 text-xs uppercase tracking-widest text-[#DEC18E]">
            Service 24h/24 · Paris &amp; Aéroports
          </span>
          <h1 class="mt-5 font-editorial text-4xl font-medium leading-tight sm:text-6xl">
            Votre voiture avec chauffeur privé <span class="italic text-[#DEC18E]">à Paris.</span>
          </h1>
          <p class="mt-4 max-w-lg text-base leading-relaxed text-[#CFCAC0]">
            Voitures normales, haute gamme, voitures de luxe et vans. Remplissez le formulaire pour envoyer directement votre réservation sur WhatsApp.
          </p>
        </div>

        <!-- Formulaire simple -->
        <div class="lg:col-span-6">
          <form
            @submit.prevent="submitWhatsApp"
            class="rounded-2xl bg-[#FAF8F4] p-6 text-[#141418] shadow-2xl sm:p-8"
          >
            <h2 class="font-editorial text-3xl font-semibold text-[#141418]">
              Réserver un trajet
            </h2>

            <!-- Choix de la catégorie -->
            <div class="mt-5">
              <label class="block text-xs font-semibold uppercase tracking-wider text-[#6E6A62]">
                Type de véhicule
              </label>
              <div class="mt-2 grid grid-cols-2 gap-2">
                <button
                  v-for="v in VEHICLES"
                  :key="v.id"
                  type="button"
                  @click="form.vehicleId = v.id"
                  class="rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all cursor-pointer"
                  :class="
                    form.vehicleId === v.id
                      ? 'border-[#C8A46B] bg-[#141418] text-white'
                      : 'border-black/15 bg-white text-[#141418] hover:border-[#C8A46B]'
                  "
                >
                  <span class="block">{{ v.label }}</span>
                  <span
                    class="text-[11px] font-normal"
                    :class="form.vehicleId === v.id ? 'text-[#DEC18E]' : 'text-[#6E6A62]'"
                  >
                    {{ v.price }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Champs essentiels -->
            <div class="mt-5 space-y-4">
              <div>
                <label for="clientName" class="mb-1 block text-xs font-semibold text-[#141418]">
                  Nom du client *
                </label>
                <input
                  id="clientName"
                  v-model="form.clientName"
                  type="text"
                  required
                  placeholder="Ex. Jean Dupont"
                  class="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#C8A46B]"
                />
              </div>

              <div>
                <label for="pickupAddress" class="mb-1 block text-xs font-semibold text-[#141418]">
                  Adresse de récupération *
                </label>
                <input
                  id="pickupAddress"
                  v-model="form.pickupAddress"
                  type="text"
                  required
                  placeholder="Ex. Aéroport CDG, 12 Rue de Rivoli Paris..."
                  class="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#C8A46B]"
                />
              </div>

              <div>
                <label for="dropoffAddress" class="mb-1 block text-xs font-semibold text-[#141418]">
                  Adresse de destination *
                </label>
                <input
                  id="dropoffAddress"
                  v-model="form.dropoffAddress"
                  type="text"
                  required
                  placeholder="Ex. Tour Eiffel, Aéroport Orly, Gare de Lyon..."
                  class="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#C8A46B]"
                />
              </div>
            </div>

            <p v-if="errorMsg" class="mt-3 text-xs font-medium text-red-600">
              {{ errorMsg }}
            </p>

            <!-- Bouton WhatsApp -->
            <button
              type="submit"
              class="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1EA952] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#178B43] cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path
                  d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.59 5.95L0 24l6.33-1.66a11.86 11.86 0 0 0 5.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.76.99 1-3.66-.24-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"
                />
              </svg>
              <span>Envoyer la demande via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Section des 4 gammes de véhicules -->
    <section id="flotte" class="bg-[#F7F5F0] py-16 text-[#141418]">
      <div class="mx-auto max-w-6xl px-5">
        <div class="mb-10 text-center">
          <span class="text-xs font-semibold uppercase tracking-widest text-[#9E7B42]">
            Notre Flotte à Paris
          </span>
          <h2 class="mt-2 font-editorial text-4xl font-semibold">
            Nos 4 gammes de véhicules
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="vehicle in VEHICLES"
            :key="vehicle.id"
            class="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg"
            :class="form.vehicleId === vehicle.id ? 'border-[#C8A46B] ring-2 ring-[#C8A46B]/40' : 'border-black/10'"
          >
            <img
              :src="vehicle.image"
              :alt="vehicle.label"
              class="aspect-[16/10] w-full object-cover"
            />
            <div class="flex flex-1 flex-col justify-between p-5">
              <div>
                <div class="flex items-baseline justify-between gap-2">
                  <h3 class="font-editorial text-2xl font-semibold">{{ vehicle.label }}</h3>
                  <span class="text-xs font-semibold text-[#9E7B42]">{{ vehicle.price }}</span>
                </div>
                <p class="mt-1 text-xs font-medium text-[#5C5953]">{{ vehicle.models }}</p>
                <p class="mt-2 text-xs text-[#7A766E]">{{ vehicle.seats }}</p>
              </div>

              <button
                type="button"
                @click="selectVehicle(vehicle.id)"
                class="mt-5 w-full rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                :class="
                  form.vehicleId === vehicle.id
                    ? 'bg-[#C8A46B] text-[#0A0A0C]'
                    : 'bg-[#141418] text-white hover:bg-[#C8A46B] hover:text-[#0A0A0C]'
                "
              >
                {{ form.vehicleId === vehicle.id ? 'Sélectionné' : 'Choisir' }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Footer minimaliste -->
    <footer class="border-t border-white/10 bg-[#0A0A0C] py-6 text-center text-xs text-[#8E8980]">
      <p>Maison Aurèle — Chauffeur Privé à Paris · WhatsApp : +{{ WHATSAPP_NUMBER }}</p>
    </footer>
  </div>
</template>
