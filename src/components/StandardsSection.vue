<script setup>
import { Clock, ShieldCheck, MessageCircle, Award } from 'lucide-vue-next'

const pillars = [
  {
    number: '01',
    icon: Clock,
    title: 'Ponctualité & suivi de vol',
    description:
      'Votre chauffeur suit l’heure réelle de votre vol ou train à CDG, Orly et dans les gares parisiennes, et ajuste automatiquement sa prise en charge.',
  },
  {
    number: '02',
    icon: Award,
    title: 'Chauffeurs d’exception',
    description:
      'Professionnels certifiés VTC, discrets, bilingues français/anglais, maîtrisant parfaitement Paris intra-muros et les protocoles des palaces.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Tarifs transparents',
    description:
      'Le montant exact de votre course vous est confirmé clairement avant départ sur WhatsApp — sans surprise ni majoration cachée.',
  },
  {
    number: '04',
    icon: MessageCircle,
    title: 'Conciergerie WhatsApp 24/7',
    description:
      'Un interlocuteur humain répond à votre demande en quelques minutes, de jour comme de nuit, pour un transfert immédiat ou planifié.',
  },
]
</script>

<template>
  <section id="engagements" class="border-t border-white/10 bg-[#0D0D10] py-20 text-[#F5F2EC] sm:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A46B]">
          <span class="h-[1px] w-7 bg-[#C8A46B]"></span>
          <span>Nos Engagements</span>
        </div>
        <h2 class="mt-4 font-editorial text-4xl font-medium leading-[1.08] text-[#F5F2EC] sm:text-5xl">
          L’art du déplacement privé à la parisienne.
        </h2>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in pillars"
          :key="item.number"
          class="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#C8A46B]/45 hover:bg-white/[0.04]"
        >
          <div class="flex items-center justify-between">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C8A46B]/30 bg-[#C8A46B]/10 text-[#DEC18E]">
              <component :is="item.icon" class="h-5 w-5" />
            </div>
            <span class="font-editorial text-2xl font-medium text-white/25 transition-colors group-hover:text-[#C8A46B]">
              {{ item.number }}
            </span>
          </div>
          <h3 class="mt-6 font-editorial text-2xl font-medium text-white">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-[#A8A39A]">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
