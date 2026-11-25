import heroImg from '../assets/images/hero-paris.jpg'
import normalCarImg from '../assets/images/fleet-normale.jpg'
import executiveCarImg from '../assets/images/fleet-haute-gamme.jpg'
import luxuryCarImg from '../assets/images/fleet-luxe.jpg'
import vanImg from '../assets/images/fleet-van.jpg'

// Remplacez par votre numéro WhatsApp (format international sans '+' ni espaces)
export const WHATSAPP_NUMBER = '33612345678'
export const HERO_IMAGE = heroImg

export const VEHICLES = [
  {
    id: 'normale',
    label: 'Voiture Normale',
    models: 'Peugeot 508 · Berline Confort',
    seats: '3 passagers · 2 bagages',
    price: 'Dès 45 €',
    image: normalCarImg,
  },
  {
    id: 'haute-gamme',
    label: 'Voiture Haute Gamme',
    models: 'Mercedes Classe E · BMW Série 5',
    seats: '3 passagers · 3 bagages',
    price: 'Dès 65 €',
    image: executiveCarImg,
  },
  {
    id: 'luxe',
    label: 'Voiture de Luxe',
    models: 'Mercedes Classe S · Maybach',
    seats: '3 passagers · 3 bagages',
    price: 'Dès 110 €',
    image: luxuryCarImg,
  },
  {
    id: 'van',
    label: 'Van',
    models: 'Mercedes Classe V · 7 Places',
    seats: '7 passagers · 7 bagages',
    price: 'Dès 85 €',
    image: vanImg,
  },
]

export function buildWhatsAppUrl({ clientName, pickupAddress, dropoffAddress, vehicleId }) {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0]

  const message = [
    'Bonjour, je souhaite réserver un chauffeur privé à Paris :',
    '',
    `• Nom du client : ${clientName.trim()}`,
    `• Véhicule : ${vehicle.label} (${vehicle.models})`,
    `• Adresse de récupération : ${pickupAddress.trim()}`,
    `• Adresse de destination : ${dropoffAddress.trim()}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
