<script setup>
import { ref, computed, watch } from 'vue'
import {
  User,
  Phone,
  MapPin,
  Navigation,
  ArrowUpDown,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Minus,
  Plus,
  Copy,
  Check,
  Sparkles,
  FileText,
  ExternalLink,
  AlertCircle,
  X,
} from 'lucide-vue-next'
import WhatsAppIcon from './icons/WhatsAppIcon.vue'
import {
  BRAND_CONFIG,
  VEHICLE_CATEGORIES,
  PARIS_PICKUP_SUGGESTIONS,
  PARIS_DROPOFF_SUGGESTIONS,
  getCategoryById,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from '../config/booking'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const errors = ref({
  clientName: '',
  pickupAddress: '',
  dropoffAddress: '',
})

const autoVanNotice = ref(false)
const copied = ref(false)
const submittedUrl = ref('')
const showSentConfirmation = ref(false)

const clientNameRef = ref(null)
const pickupRef = ref(null)
const dropoffRef = ref(null)

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const selectedVehicle = computed(() => getCategoryById(form.value.vehicleCategory))

const previewMessage = computed(() => buildWhatsAppMessage(form.value))
const whatsappUrl = computed(() => buildWhatsAppUrl(form.value))

const currentTimeLabel = computed(() => {
  const now = new Date()
  return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
})

const todayIso = computed(() => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
})

const isFormReady = computed(() => {
  return (
    form.value.clientName.trim().length >= 2 &&
    form.value.pickupAddress.trim().length >= 3 &&
    form.value.dropoffAddress.trim().length >= 3
  )
})

function updateField(key, value) {
  emit('update:modelValue', {
    ...form.value,
    [key]: value,
  })
  if (errors.value[key]) {
    errors.value[key] = ''
  }
}

function selectVehicleCategory(categoryId) {
  const targetCat = getCategoryById(categoryId)
  const nextPassengers = Math.min(form.value.passengers, targetCat.maxPassengers)
  const nextLuggage = Math.min(form.value.luggage, targetCat.maxLuggage)
  autoVanNotice.value = false

  emit('update:modelValue', {
    ...form.value,
    vehicleCategory: categoryId,
    passengers: Math.max(1, nextPassengers),
    luggage: Math.max(0, nextLuggage),
  })
}

function adjustPassengers(delta) {
  const next = Math.min(7, Math.max(1, form.value.passengers + delta))
  if (next > 3 && form.value.vehicleCategory !== 'van') {
    autoVanNotice.value = true
    emit('update:modelValue', {
      ...form.value,
      passengers: next,
      vehicleCategory: 'van',
    })
  } else {
    emit('update:modelValue', {
      ...form.value,
      passengers: next,
    })
  }
}

function adjustLuggage(delta) {
  const maxAllowed = 7
  const next = Math.min(maxAllowed, Math.max(0, form.value.luggage + delta))
  if (next > selectedVehicle.value.maxLuggage && form.value.vehicleCategory !== 'van') {
    autoVanNotice.value = true
    emit('update:modelValue', {
      ...form.value,
      luggage: next,
      vehicleCategory: 'van',
    })
  } else {
    emit('update:modelValue', {
      ...form.value,
      luggage: next,
    })
  }
}

function swapAddresses() {
  emit('update:modelValue', {
    ...form.value,
    pickupAddress: form.value.dropoffAddress,
    dropoffAddress: form.value.pickupAddress,
  })
}

function validateForm() {
  const nextErrors = {
    clientName: '',
    pickupAddress: '',
    dropoffAddress: '',
  }

  if (!form.value.clientName.trim() || form.value.clientName.trim().length < 2) {
    nextErrors.clientName = 'Veuillez renseigner votre nom complet.'
  }
  if (!form.value.pickupAddress.trim() || form.value.pickupAddress.trim().length < 3) {
    nextErrors.pickupAddress = 'Veuillez indiquer l’adresse de récupération à Paris ou en Île-de-France.'
  }
  if (!form.value.dropoffAddress.trim() || form.value.dropoffAddress.trim().length < 3) {
    nextErrors.dropoffAddress = 'Veuillez indiquer votre adresse de destination.'
  }

  errors.value = nextErrors

  if (nextErrors.clientName) {
    clientNameRef.value?.focus()
    return false
  }
  if (nextErrors.pickupAddress) {
    pickupRef.value?.focus()
    return false
  }
  if (nextErrors.dropoffAddress) {
    dropoffRef.value?.focus()
    return false
  }
  return true
}

function handleWhatsAppSubmit() {
  if (!validateForm()) return

  const url = whatsappUrl.value
  submittedUrl.value = url
  showSentConfirmation.value = true

  window.open(url, '_blank', 'noopener,noreferrer')
}

async function copyMessageToClipboard() {
  try {
    await navigator.clipboard.writeText(previewMessage.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2400)
  } catch {
    // Fallback if clipboard API unavailable
    const textarea = document.createElement('textarea')
    textarea.value = previewMessage.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2400)
  }
}

function resetConfirmation() {
  showSentConfirmation.value = false
}

watch(
  () => form.value.vehicleCategory,
  (val) => {
    if (val !== 'van') autoVanNotice.value = false
  }
)

defineExpose({
  focusNameInput: () => clientNameRef.value?.focus(),
})
</script>

<template>
  <section
    id="reservation"
    class="relative overflow-hidden bg-[#0A0A0C] py-20 text-[#F5F2EC] sm:py-28"
  >
    <!-- Subtle Champagne Ambient Glow -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[#C8A46B]/[0.07] blur-[120px]"
    ></div>

    <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A46B]">
          <span class="h-[1px] w-7 bg-[#C8A46B]"></span>
          <span>Réservation Directe WhatsApp</span>
        </div>
        <h2 class="mt-4 font-editorial text-4xl font-medium leading-[1.06] text-[#F5F2EC] sm:text-5xl">
          Réservez votre chauffeur <span class="italic text-[#DEC18E]">en 30 secondes.</span>
        </h2>
        <p class="mt-4 text-base leading-relaxed text-[#B0AAA0]">
          Choisissez votre gamme de véhicule, saisissez votre nom ainsi que vos adresses de récupération et de destination.
          Votre demande pré-remplie s’ouvre instantanément sur WhatsApp.
        </p>
      </div>

      <!-- Main 12-Col Studio Layout -->
      <div class="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <!-- LEFT COLUMN: Luminous Editorial Reservation Form -->
        <form
          @submit.prevent="handleWhatsAppSubmit"
          novalidate
          class="rounded-3xl bg-[#FAF8F4] p-6 text-[#141418] shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-8 lg:col-span-7"
        >
          <!-- STEP 1: Vehicle Category -->
          <div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9E7B42]">
                01 · Gamme de véhicule
              </span>
              <span class="text-xs font-medium text-[#6C6860]">
                {{ selectedVehicle.label }} · dès {{ selectedVehicle.priceFrom }}
              </span>
            </div>

            <div class="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <button
                v-for="cat in VEHICLE_CATEGORIES"
                :key="cat.id"
                type="button"
                @click="selectVehicleCategory(cat.id)"
                class="group relative flex flex-col overflow-hidden rounded-2xl border p-2 text-left transition-all duration-250 cursor-pointer"
                :class="
                  form.vehicleCategory === cat.id
                    ? 'border-[#C8A46B] bg-[#141418] text-white shadow-md ring-1 ring-[#C8A46B]'
                    : 'border-[#141418]/12 bg-white text-[#141418] hover:border-[#C8A46B]/70'
                "
              >
                <div class="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#141418]">
                  <img
                    :src="cat.image"
                    :alt="cat.label"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    v-if="form.vehicleCategory === cat.id"
                    class="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C8A46B] text-[#0A0A0C]"
                  >
                    <Check class="h-3 w-3 stroke-[3]" />
                  </span>
                </div>
                <div class="mt-2 px-0.5">
                  <span class="block text-xs font-semibold leading-tight">
                    {{ cat.shortLabel }}
                  </span>
                  <span
                    class="mt-0.5 block text-[10px]"
                    :class="form.vehicleCategory === cat.id ? 'text-[#DEC18E]' : 'text-[#6E6A62]'"
                  >
                    Max {{ cat.maxPassengers }} pers. · {{ cat.priceFrom }}
                  </span>
                </div>
              </button>
            </div>

            <!-- Auto-switch to Van notice -->
            <div
              v-if="autoVanNotice"
              class="mt-3 flex items-center gap-2 rounded-xl border border-[#C8A46B]/40 bg-[#C8A46B]/12 px-3.5 py-2 text-xs font-medium text-[#705525]"
            >
              <Sparkles class="h-3.5 w-3.5 shrink-0 text-[#9E7B42]" />
              <span>
                Passé automatiquement en <strong>Van Prestige</strong> pour accueillir confortablement
                {{ form.passengers }} passagers et {{ form.luggage }} bagages.
              </span>
            </div>
          </div>

          <hr class="my-6 border-[#141418]/10" />

          <!-- STEP 2: Client Identity & Paris Itinerary -->
          <div class="space-y-5">
            <span class="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#9E7B42]">
              02 · Coordonnées &amp; Itinéraire
            </span>

            <!-- Client Name + Phone Row -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  for="client-name"
                  class="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1E1D1B]"
                >
                  <span>Nom du client <span class="text-[#B84A39]">*</span></span>
                </label>
                <div
                  class="flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-all"
                  :class="
                    errors.clientName
                      ? 'border-[#C44536] ring-2 ring-[#C44536]/15'
                      : 'border-[#141418]/15 focus-within:border-[#C8A46B] focus-within:ring-2 focus-within:ring-[#C8A46B]/20'
                  "
                >
                  <User class="h-4 w-4 shrink-0 text-[#9E7B42]" />
                  <input
                    id="client-name"
                    ref="clientNameRef"
                    :value="form.clientName"
                    @input="updateField('clientName', $event.target.value)"
                    type="text"
                    autocomplete="name"
                    required
                    placeholder="Ex. Camille Laurent"
                    class="w-full bg-transparent text-sm text-[#141418] placeholder-[#9B968D] focus:outline-none"
                  />
                </div>
                <p v-if="errors.clientName" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#C44536]">
                  <AlertCircle class="h-3.5 w-3.5" />
                  {{ errors.clientName }}
                </p>
              </div>

              <div>
                <label
                  for="client-phone"
                  class="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1E1D1B]"
                >
                  <span>Téléphone</span>
                  <span class="text-[11px] font-normal text-[#878279]">Optionnel</span>
                </label>
                <div
                  class="flex items-center gap-2.5 rounded-xl border border-[#141418]/15 bg-white px-3.5 py-3 transition-all focus-within:border-[#C8A46B] focus-within:ring-2 focus-within:ring-[#C8A46B]/20"
                >
                  <Phone class="h-4 w-4 shrink-0 text-[#9E7B42]" />
                  <input
                    id="client-phone"
                    :value="form.clientPhone"
                    @input="updateField('clientPhone', $event.target.value)"
                    type="tel"
                    autocomplete="tel"
                    placeholder="Ex. +33 6 12 34 56 78"
                    class="w-full bg-transparent text-sm text-[#141418] placeholder-[#9B968D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Addresses Wrapper with Swap Button -->
            <div class="relative space-y-3.5">
              <!-- Pickup Address -->
              <div>
                <label
                  for="pickup-address"
                  class="mb-1.5 block text-xs font-semibold text-[#1E1D1B]"
                >
                  Adresse de récupération (Départ) <span class="text-[#B84A39]">*</span>
                </label>
                <div
                  class="flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-all"
                  :class="
                    errors.pickupAddress
                      ? 'border-[#C44536] ring-2 ring-[#C44536]/15'
                      : 'border-[#141418]/15 focus-within:border-[#C8A46B] focus-within:ring-2 focus-within:ring-[#C8A46B]/20'
                  "
                >
                  <MapPin class="h-4 w-4 shrink-0 text-[#25A25A]" />
                  <input
                    id="pickup-address"
                    ref="pickupRef"
                    :value="form.pickupAddress"
                    @input="updateField('pickupAddress', $event.target.value)"
                    type="text"
                    required
                    placeholder="Numéro, rue, hôtel, gare ou aéroport à Paris..."
                    class="w-full bg-transparent text-sm text-[#141418] placeholder-[#9B968D] focus:outline-none"
                  />
                  <button
                    v-if="form.pickupAddress"
                    type="button"
                    @click="updateField('pickupAddress', '')"
                    aria-label="Effacer l'adresse de récupération"
                    class="text-[#9B968D] transition-colors hover:text-[#141418] cursor-pointer"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
                <p v-if="errors.pickupAddress" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#C44536]">
                  <AlertCircle class="h-3.5 w-3.5" />
                  {{ errors.pickupAddress }}
                </p>

                <!-- Quick Paris Pickup Suggestions -->
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <button
                    v-for="place in PARIS_PICKUP_SUGGESTIONS.slice(0, 5)"
                    :key="place"
                    type="button"
                    @click="updateField('pickupAddress', place)"
                    class="rounded-full border border-[#141418]/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#5C5953] transition-colors hover:border-[#C8A46B] hover:text-[#141418] cursor-pointer"
                  >
                    {{ place.split(',')[0].replace('Aéroport Paris-', '') }}
                  </button>
                </div>
              </div>

              <!-- Swap Addresses Divider -->
              <div class="flex items-center justify-end pr-2 -my-1">
                <button
                  type="button"
                  @click="swapAddresses"
                  title="Inverser départ et destination"
                  class="inline-flex items-center gap-1.5 rounded-full border border-[#141418]/12 bg-white px-3 py-1 text-[11px] font-medium text-[#5C5953] shadow-xs transition-all hover:border-[#C8A46B] hover:text-[#141418] cursor-pointer"
                >
                  <ArrowUpDown class="h-3 w-3 text-[#9E7B42]" />
                  <span>Inverser départ / destination</span>
                </button>
              </div>

              <!-- Dropoff Address -->
              <div>
                <label
                  for="dropoff-address"
                  class="mb-1.5 block text-xs font-semibold text-[#1E1D1B]"
                >
                  Adresse de destination (Arrivée) <span class="text-[#B84A39]">*</span>
                </label>
                <div
                  class="flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-all"
                  :class="
                    errors.dropoffAddress
                      ? 'border-[#C44536] ring-2 ring-[#C44536]/15'
                      : 'border-[#141418]/15 focus-within:border-[#C8A46B] focus-within:ring-2 focus-within:ring-[#C8A46B]/20'
                  "
                >
                  <Navigation class="h-4 w-4 shrink-0 text-[#9E7B42]" />
                  <input
                    id="dropoff-address"
                    ref="dropoffRef"
                    :value="form.dropoffAddress"
                    @input="updateField('dropoffAddress', $event.target.value)"
                    type="text"
                    required
                    placeholder="Destination exacte, palace, aéroport, gare..."
                    class="w-full bg-transparent text-sm text-[#141418] placeholder-[#9B968D] focus:outline-none"
                  />
                  <button
                    v-if="form.dropoffAddress"
                    type="button"
                    @click="updateField('dropoffAddress', '')"
                    aria-label="Effacer l'adresse de destination"
                    class="text-[#9B968D] transition-colors hover:text-[#141418] cursor-pointer"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
                <p v-if="errors.dropoffAddress" class="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#C44536]">
                  <AlertCircle class="h-3.5 w-3.5" />
                  {{ errors.dropoffAddress }}
                </p>

                <!-- Quick Paris Dropoff Suggestions -->
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <button
                    v-for="place in PARIS_DROPOFF_SUGGESTIONS.slice(0, 6)"
                    :key="place"
                    type="button"
                    @click="updateField('dropoffAddress', place)"
                    class="rounded-full border border-[#141418]/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#5C5953] transition-colors hover:border-[#C8A46B] hover:text-[#141418] cursor-pointer"
                  >
                    {{ place.split('—')[0].split(',')[0].replace('Aéroport Paris-', '') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr class="my-6 border-[#141418]/10" />

          <!-- STEP 3: Schedule, Passengers & Optional Notes -->
          <div class="space-y-5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9E7B42]">
                03 · Date, Passagers &amp; Préférences
              </span>

              <!-- Timing Segmented Control -->
              <div class="inline-flex rounded-full border border-[#141418]/12 bg-white p-0.5">
                <button
                  type="button"
                  @click="updateField('timingMode', 'scheduled')"
                  class="rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer"
                  :class="
                    form.timingMode === 'scheduled'
                      ? 'bg-[#141418] text-white'
                      : 'text-[#66625A] hover:text-[#141418]'
                  "
                >
                  Planifier
                </button>
                <button
                  type="button"
                  @click="updateField('timingMode', 'now')"
                  class="rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer"
                  :class="
                    form.timingMode === 'now'
                      ? 'bg-[#141418] text-white'
                      : 'text-[#66625A] hover:text-[#141418]'
                  "
                >
                  Immédiat
                </button>
              </div>
            </div>

            <!-- Date & Time Inputs -->
            <div v-if="form.timingMode === 'scheduled'" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="booking-date" class="mb-1.5 block text-xs font-semibold text-[#1E1D1B]">
                  Date de prise en charge
                </label>
                <div
                  class="flex items-center gap-2.5 rounded-xl border border-[#141418]/15 bg-white px-3.5 py-2.5 focus-within:border-[#C8A46B]"
                >
                  <Calendar class="h-4 w-4 shrink-0 text-[#9E7B42]" />
                  <input
                    id="booking-date"
                    :value="form.date"
                    :min="todayIso"
                    @input="updateField('date', $event.target.value)"
                    type="date"
                    class="w-full bg-transparent text-sm text-[#141418] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label for="booking-time" class="mb-1.5 block text-xs font-semibold text-[#1E1D1B]">
                  Heure souhaitée
                </label>
                <div
                  class="flex items-center gap-2.5 rounded-xl border border-[#141418]/15 bg-white px-3.5 py-2.5 focus-within:border-[#C8A46B]"
                >
                  <Clock class="h-4 w-4 shrink-0 text-[#9E7B42]" />
                  <input
                    id="booking-time"
                    :value="form.time"
                    @input="updateField('time', $event.target.value)"
                    type="time"
                    class="w-full bg-transparent text-sm text-[#141418] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex items-center gap-2.5 rounded-xl border border-[#C8A46B]/35 bg-[#C8A46B]/10 px-4 py-3 text-xs font-medium text-[#6B5022]"
            >
              <Clock class="h-4 w-4 shrink-0 text-[#9E7B42]" />
              <span>
                Prise en charge immédiate demandée — un chauffeur disponible à proximité vous est attribué dès confirmation WhatsApp.
              </span>
            </div>

            <!-- Passengers & Luggage Steppers -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="flex items-center justify-between rounded-xl border border-[#141418]/12 bg-white px-4 py-2.5">
                <div class="flex items-center gap-2.5">
                  <Users class="h-4 w-4 text-[#9E7B42]" />
                  <div>
                    <span class="block text-xs font-semibold text-[#141418]">Passagers</span>
                    <span class="text-[11px] text-[#7A766E]">Max 7 (Van)</span>
                  </div>
                </div>
                <div class="flex items-center gap-2.5">
                  <button
                    type="button"
                    @click="adjustPassengers(-1)"
                    :disabled="form.passengers <= 1"
                    aria-label="Retirer un passager"
                    class="flex h-7 w-7 items-center justify-center rounded-full border border-[#141418]/15 text-[#141418] transition-colors hover:border-[#C8A46B] disabled:opacity-35 cursor-pointer"
                  >
                    <Minus class="h-3.5 w-3.5" />
                  </button>
                  <span class="w-5 text-center text-sm font-semibold text-[#141418]">
                    {{ form.passengers }}
                  </span>
                  <button
                    type="button"
                    @click="adjustPassengers(1)"
                    :disabled="form.passengers >= 7"
                    aria-label="Ajouter un passager"
                    class="flex h-7 w-7 items-center justify-center rounded-full border border-[#141418]/15 text-[#141418] transition-colors hover:border-[#C8A46B] disabled:opacity-35 cursor-pointer"
                  >
                    <Plus class="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between rounded-xl border border-[#141418]/12 bg-white px-4 py-2.5">
                <div class="flex items-center gap-2.5">
                  <Briefcase class="h-4 w-4 text-[#9E7B42]" />
                  <div>
                    <span class="block text-xs font-semibold text-[#141418]">Bagages</span>
                    <span class="text-[11px] text-[#7A766E]">Valises standard</span>
                  </div>
                </div>
                <div class="flex items-center gap-2.5">
                  <button
                    type="button"
                    @click="adjustLuggage(-1)"
                    :disabled="form.luggage <= 0"
                    aria-label="Retirer un bagage"
                    class="flex h-7 w-7 items-center justify-center rounded-full border border-[#141418]/15 text-[#141418] transition-colors hover:border-[#C8A46B] disabled:opacity-35 cursor-pointer"
                  >
                    <Minus class="h-3.5 w-3.5" />
                  </button>
                  <span class="w-5 text-center text-sm font-semibold text-[#141418]">
                    {{ form.luggage }}
                  </span>
                  <button
                    type="button"
                    @click="adjustLuggage(1)"
                    :disabled="form.luggage >= 7"
                    aria-label="Ajouter un bagage"
                    class="flex h-7 w-7 items-center justify-center rounded-full border border-[#141418]/15 text-[#141418] transition-colors hover:border-[#C8A46B] disabled:opacity-35 cursor-pointer"
                  >
                    <Plus class="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Flight Number / Notes -->
            <div>
              <label for="booking-notes" class="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1E1D1B]">
                <span>Numéro de vol, pancarte ou précisions</span>
                <span class="text-[11px] font-normal text-[#878279]">Optionnel</span>
              </label>
              <div
                class="flex items-start gap-2.5 rounded-xl border border-[#141418]/15 bg-white px-3.5 py-2.5 focus-within:border-[#C8A46B]"
              >
                <FileText class="mt-0.5 h-4 w-4 shrink-0 text-[#9E7B42]" />
                <textarea
                  id="booking-notes"
                  rows="2"
                  :value="form.notes"
                  @input="updateField('notes', $event.target.value)"
                  placeholder="Ex. Vol AF1234, siège bébé souhaité, accueil pancarte..."
                  class="w-full resize-none bg-transparent text-sm text-[#141418] placeholder-[#9B968D] focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Submit Row -->
          <div class="mt-7 space-y-3">
            <button
              type="submit"
              class="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1EA952] px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_14px_34px_rgba(30,169,82,0.32)] transition-all duration-300 hover:bg-[#199447] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <WhatsAppIcon class="h-5 w-5 shrink-0" />
              <span>Envoyer ma demande sur WhatsApp</span>
              <ExternalLink class="h-4 w-4 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-[#6B675E]">
              <span>Confirmation rapide 24h/24 · Aucun paiement en ligne requis</span>
              <button
                type="button"
                @click="copyMessageToClipboard"
                class="inline-flex items-center gap-1.5 font-semibold text-[#141418] transition-colors hover:text-[#9E7B42] cursor-pointer"
              >
                <Check v-if="copied" class="h-3.5 w-3.5 text-[#1EA952]" />
                <Copy v-else class="h-3.5 w-3.5" />
                <span>{{ copied ? 'Message copié !' : 'Copier le message' }}</span>
              </button>
            </div>

            <!-- Post-Submit Confirmation Banner (immediately visible on mobile & desktop) -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
            >
              <div
                v-if="showSentConfirmation"
                class="mt-4 rounded-2xl border border-[#1EA952]/35 bg-[#ECF9F1] p-4 text-[#0E3B20]"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-2.5">
                    <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1EA952] text-white">
                      <Check class="h-4 w-4 stroke-[2.8]" />
                    </span>
                    <div>
                      <p class="text-sm font-semibold text-[#0B2E19]">
                        Demande prête sur WhatsApp
                      </p>
                      <p class="mt-0.5 text-xs text-[#285E3D]">
                        Si l’application ne s’est pas ouverte automatiquement, utilisez le bouton ci-dessous.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="resetConfirmation"
                    aria-label="Fermer la notification"
                    class="text-[#285E3D] hover:text-[#0B2E19] cursor-pointer"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
                <div class="mt-3.5 flex flex-wrap gap-2">
                  <a
                    :href="submittedUrl || whatsappUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1EA952] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#178B43]"
                  >
                    <WhatsAppIcon class="h-4 w-4" />
                    <span>Ouvrir WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    @click="copyMessageToClipboard"
                    class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#1EA952]/30 bg-white px-4 py-2.5 text-xs font-semibold text-[#0B2E19] hover:bg-[#F5FCF7] cursor-pointer"
                  >
                    <Copy class="h-3.5 w-3.5" />
                    <span>{{ copied ? 'Copié' : 'Copier le texte' }}</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </form>

        <!-- RIGHT COLUMN: Sticky Vehicle Summary + Live WhatsApp Preview -->
        <div class="space-y-5 lg:sticky lg:top-28 lg:col-span-5">
          <!-- Selected Vehicle Preview Card -->
          <div class="overflow-hidden rounded-3xl border border-white/12 bg-[#131317]">
            <div class="relative aspect-[16/9] overflow-hidden">
              <img
                :src="selectedVehicle.image"
                :alt="selectedVehicle.label"
                class="h-full w-full object-cover transition-all duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#131317] via-[#131317]/30 to-transparent"></div>
              <div class="absolute bottom-3.5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DEC18E]">
                    Gamme sélectionnée
                  </span>
                  <h3 class="font-editorial text-2xl font-medium text-white">
                    {{ selectedVehicle.label }}
                  </h3>
                </div>
                <span class="rounded-full border border-[#C8A46B]/40 bg-[#0A0A0C]/80 px-3 py-1 text-xs font-semibold text-[#DEC18E] backdrop-blur-md">
                  Dès {{ selectedVehicle.priceFrom }}
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between gap-3 px-5 py-3.5 text-xs text-[#B5B0A6]">
              <span class="truncate">{{ selectedVehicle.models }}</span>
              <span class="shrink-0 text-[#DEC18E]">
                {{ selectedVehicle.maxPassengers }} pers. · {{ selectedVehicle.maxLuggage }} val.
              </span>
            </div>
          </div>

          <!-- Live WhatsApp Message Preview -->
          <div class="overflow-hidden rounded-3xl border border-white/12 bg-[#111916]">
            <!-- WhatsApp Top Bar -->
            <div class="flex items-center justify-between border-b border-white/10 bg-[#172821] px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div class="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0C] border border-[#C8A46B]/50">
                  <span class="font-editorial text-base font-medium text-[#C8A46B]">A</span>
                  <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#172821] bg-[#25D366]"></span>
                </div>
                <div>
                  <p class="text-xs font-semibold text-white">
                    {{ BRAND_CONFIG.name }} · Conciergerie
                  </p>
                  <p class="text-[11px] text-[#8FCDA6]">
                    Aperçu en direct · En ligne 24/7
                  </p>
                </div>
              </div>

              <span
                class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                :class="
                  isFormReady
                    ? 'bg-[#25D366]/20 text-[#59E48E]'
                    : 'bg-white/10 text-[#A8B5AE]'
                "
              >
                {{ isFormReady ? 'Prêt' : 'En saisie' }}
              </span>
            </div>

            <!-- Message Bubble -->
            <div class="p-5">
              <div class="rounded-2xl rounded-tr-sm border border-[#25D366]/20 bg-[#18382B] p-4 shadow-inner">
                <pre class="whitespace-pre-wrap font-sans text-[12.5px] leading-relaxed text-[#EBF5EE]">{{ previewMessage }}</pre>
                <div class="mt-2.5 flex items-center justify-end gap-1.5 text-[10px] text-[#8EC2A1]">
                  <span>{{ currentTimeLabel }}</span>
                  <span aria-hidden="true">✓✓</span>
                </div>
              </div>

              <p class="mt-3.5 text-center text-[11px] leading-relaxed text-[#8E9B94]">
                Destinataire WhatsApp : <span class="font-medium text-[#D1DCD6]">{{ BRAND_CONFIG.displayPhone }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
