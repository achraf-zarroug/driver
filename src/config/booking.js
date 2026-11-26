import heroImg from '../assets/images/hero-paris.jpg'
import normalCarImg from '../assets/images/fleet-normale.jpg'
import luxuryCarImg from '../assets/images/fleet-luxe.jpg'
import vanImg from '../assets/images/fleet-van.jpg'

// Remplacez par votre numéro WhatsApp (format international sans '+' ni espaces)
export const WHATSAPP_NUMBER = '33612345678'
export const HERO_IMAGE = heroImg

export const DIRECT_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  '🚕 Bonjour, je souhaite commander un Taxi à Paris maintenant.'
)}`

export const VEHICLES = [
  {
    id: 'normale',
    label: 'Voiture Normale',
    models: 'Taxi Standard · Berline Confort',
    seats: '1 à 3 passagers · 2 bagages',
    image: normalCarImg,
  },
  {
    id: 'luxe',
    label: 'Voiture de Luxe',
    models: 'Taxi Prestige · Mercedes Classe S',
    seats: '1 à 3 passagers · 3 bagages',
    image: luxuryCarImg,
  },
  {
    id: 'van',
    label: 'Van',
    models: 'Taxi Van · Mercedes Classe V (7 places)',
    seats: 'Jusqu’à 7 passagers · 7 bagages',
    image: vanImg,
  },
]

export function buildWhatsAppUrl({ clientName, pickupAddress, dropoffAddress, vehicleId }) {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0]

  const message = [
    '🚕 Bonjour, je souhaite réserver un Taxi à Paris :',
    '',
    `• Nom du client : ${clientName.trim()}`,
    `• Type de véhicule : ${vehicle.label} (${vehicle.models})`,
    `• Adresse de récupération : ${pickupAddress.trim()}`,
    `• Adresse de destination : ${dropoffAddress.trim()}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
