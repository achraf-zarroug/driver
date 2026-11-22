<script setup>
import { ref, nextTick } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import FleetSection from './components/FleetSection.vue'
import BookingStudio from './components/BookingStudio.vue'
import RoutesSection from './components/RoutesSection.vue'
import StandardsSection from './components/StandardsSection.vue'
import FooterSection from './components/FooterSection.vue'
import FloatingWhatsApp from './components/FloatingWhatsApp.vue'
import { getCategoryById } from './config/booking'

function getDefaultDate() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getDefaultTime() {
  const nextHour = new Date(Date.now() + 60 * 60 * 1000)
  const h = String(nextHour.getHours()).padStart(2, '0')
  return `${h}:00`
}

const booking = ref({
  clientName: '',
  clientPhone: '',
  vehicleCategory: 'haute-gamme',
  pickupAddress: '',
  dropoffAddress: '',
  timingMode: 'scheduled',
  date: getDefaultDate(),
  time: getDefaultTime(),
  passengers: 2,
  luggage: 2,
  notes: '',
})

const bookingStudioRef = ref(null)
const toastMessage = ref('')
let toastTimer = null

function triggerToast(message) {
  toastMessage.value = message
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 3600)
}

function scrollToSection(id, focusForm = false) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  if (focusForm) {
    nextTick(() => {
      setTimeout(() => {
        bookingStudioRef.value?.focusNameInput?.()
      }, 550)
    })
  }
}

function handleQuickStart({ pickup, dropoff, category }) {
  const cat = getCategoryById(category)
  booking.value = {
    ...booking.value,
    vehicleCategory: category,
    pickupAddress: pickup || booking.value.pickupAddress,
    dropoffAddress: dropoff || booking.value.dropoffAddress,
    passengers: Math.min(booking.value.passengers, cat.maxPassengers),
    luggage: Math.min(booking.value.luggage, cat.maxLuggage),
  }
  scrollToSection('reservation', true)
}

function handleSelectCategoryOnly(categoryId) {
  const cat = getCategoryById(categoryId)
  booking.value = {
    ...booking.value,
    vehicleCategory: categoryId,
    passengers: Math.min(booking.value.passengers, cat.maxPassengers),
    luggage: Math.min(booking.value.luggage, cat.maxLuggage),
  }
}

function handleChooseVehicle(categoryId) {
  const cat = getCategoryById(categoryId)
  handleSelectCategoryOnly(categoryId)
  triggerToast(`Gamme « ${cat.label} » sélectionnée dans votre réservation.`)
  scrollToSection('reservation', true)
}

function handlePrefillRoute(route) {
  const cat = getCategoryById(route.recommendedCategory)
  booking.value = {
    ...booking.value,
    pickupAddress: route.pickup,
    dropoffAddress: route.dropoff,
    vehicleCategory: route.recommendedCategory,
    passengers: Math.min(booking.value.passengers, cat.maxPassengers),
    luggage: Math.min(booking.value.luggage, cat.maxLuggage),
  }
  triggerToast(`Trajet « ${route.title} » pré-rempli dans le formulaire.`)
  scrollToSection('reservation', true)
}
</script>

<template>
  <div class="min-h-screen bg-[#0A0A0C] text-[#F5F2EC]">
    <Navbar @navigate-booking="scrollToSection('reservation', true)" />

    <main>
      <HeroSection
        :selected-category="booking.vehicleCategory"
        @select-category="handleSelectCategoryOnly"
        @quick-start="handleQuickStart"
        @scroll-to-fleet="scrollToSection('flotte')"
      />

      <FleetSection
        :selected-category="booking.vehicleCategory"
        @choose-vehicle="handleChooseVehicle"
      />

      <BookingStudio
        ref="bookingStudioRef"
        v-model="booking"
      />

      <RoutesSection @prefill-route="handlePrefillRoute" />

      <StandardsSection />
    </main>

    <FooterSection @choose-vehicle="handleChooseVehicle" />

    <FloatingWhatsApp />

    <!-- Subtle Luxury Toast Notification -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="toastMessage"
        role="status"
        aria-live="polite"
        class="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-[#C8A46B]/45 bg-[#141418]/95 px-5 py-3 text-xs font-medium text-[#F5F2EC] shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <CheckCircle2 class="h-4 w-4 shrink-0 text-[#C8A46B]" />
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>
