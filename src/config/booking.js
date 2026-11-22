import heroImg from '../assets/images/hero-paris.jpg'
import normalCarImg from '../assets/images/fleet-normale.jpg'
import executiveCarImg from '../assets/images/fleet-haute-gamme.jpg'
import luxuryCarImg from '../assets/images/fleet-luxe.jpg'
import vanImg from '../assets/images/fleet-van.jpg'

/**
 * Configuration centrale — Remplacez simplement whatsappNumber par votre numéro
 * au format international sans '+' ni espaces (ex: '33612345678' pour +33 6 12 34 56 78).
 */
export const BRAND_CONFIG = {
  name: 'Maison Aurèle',
  tagline: 'Chauffeur Privé · Paris',
  whatsappNumber: '33612345678',
  displayPhone: '+33 6 12 34 56 78',
  email: 'conciergerie@maison-aurele.paris',
  address: '8 Place Vendôme, 75001 Paris',
  heroImage: heroImg,
}

export const VEHICLE_CATEGORIES = [
  {
    id: 'normale',
    shortLabel: 'Normale',
    label: 'Voiture Normale',
    subtitle: 'Berline Confort',
    models: 'Peugeot 508 · Toyota Camry Hybride',
    badge: 'Essentiel Paris',
    priceFrom: '45 €',
    airportRate: '65 €',
    maxPassengers: 3,
    maxLuggage: 2,
    image: normalCarImg,
    description:
      'Idéale pour vos déplacements parisiens quotidiens, transferts gares et trajets professionnels dans un confort soigné et silencieux.',
    features: [
      'Eau minérale & chargeurs USB-C',
      'Chauffeur ponctuel en tenue soignée',
      'Annulation gratuite jusqu’à 2h avant',
    ],
  },
  {
    id: 'haute-gamme',
    shortLabel: 'Haute Gamme',
    label: 'Voiture Haute Gamme',
    subtitle: 'Berline Affaires',
    models: 'Mercedes-Benz Classe E · BMW Série 5',
    badge: 'Le plus réservé',
    featured: true,
    priceFrom: '65 €',
    airportRate: '85 €',
    maxPassengers: 3,
    maxLuggage: 3,
    image: executiveCarImg,
    description:
      'L’alliance de la discrétion, de la sellerie cuir et du silence absolu pour vos rendez-vous d’affaires et transferts CDG ou Orly.',
    features: [
      'Wi-Fi haut débit & chargeurs à bord',
      'Accueil pancarte nominative inclus',
      'Suivi de vol en direct & 45 min d’attente',
    ],
  },
  {
    id: 'luxe',
    shortLabel: 'Luxe',
    label: 'Voiture de Luxe',
    subtitle: 'Limousine Prestige',
    models: 'Mercedes-Benz Classe S · Maybach',
    badge: 'Haute Conciergerie',
    priceFrom: '110 €',
    airportRate: '145 €',
    maxPassengers: 3,
    maxLuggage: 3,
    image: luxuryCarImg,
    description:
      'L’excellence absolue pour les palaces parisiens, Fashion Week, soirées de gala et transferts aviation privée depuis Le Bourget.',
    features: [
      'Salon arrière cuir inclinable & feutré',
      'Rafraîchissements premium & presse',
      'Chauffeur VIP bilingue & 60 min d’attente',
    ],
  },
  {
    id: 'van',
    shortLabel: 'Van',
    label: 'Van Prestige',
    subtitle: 'Salon Mobile 7 Places',
    models: 'Mercedes-Benz Classe V Extra-Long',
    badge: 'Groupes & Familles',
    priceFrom: '85 €',
    airportRate: '110 €',
    maxPassengers: 7,
    maxLuggage: 7,
    image: vanImg,
    description:
      'Un espace salon modulable en cuir face-à-face avec vitres teintées, pensé pour les familles, délégations et bagages volumineux.',
    features: [
      'Jusqu’à 7 passagers & 7 grandes valises',
      'Configuration salon cuir face-à-face',
      'Siège bébé / rehausseur offert sur demande',
    ],
  },
]

export const PARIS_PICKUP_SUGGESTIONS = [
  'Aéroport Paris-Charles de Gaulle (CDG)',
  'Aéroport Paris-Orly (ORY)',
  'Aéroport du Bourget (LBG)',
  'Gare du Nord, Paris 10e',
  'Gare de Lyon, Paris 12e',
  'Avenue des Champs-Élysées, Paris 8e',
  'Place Vendôme, Paris 1er',
  'La Défense — Grande Arche',
]

export const PARIS_DROPOFF_SUGGESTIONS = [
  'Aéroport Paris-Charles de Gaulle (CDG)',
  'Aéroport Paris-Orly (ORY)',
  'Tour Eiffel — Champ-de-Mars, Paris 7e',
  'Hôtel Plaza Athénée, Avenue Montaigne',
  'Opéra Garnier, Paris 9e',
  'Château de Versailles',
  'Disneyland Paris — Marne-la-Vallée',
  'Gare Montparnasse, Paris 15e',
]

export const POPULAR_ROUTES = [
  {
    id: 'cdg-paris',
    tag: 'Transfert Aéroport',
    title: 'Paris Centre ↔ Aéroport CDG',
    duration: '40 – 55 min',
    priceFrom: '65 €',
    pickup: 'Aéroport Paris-Charles de Gaulle (CDG)',
    dropoff: 'Place Vendôme, Paris 1er',
    recommendedCategory: 'haute-gamme',
    note: 'Suivi de vol automatique & accueil pancarte',
  },
  {
    id: 'orly-paris',
    tag: 'Transfert Aéroport',
    title: 'Paris Centre ↔ Aéroport Orly',
    duration: '25 – 40 min',
    priceFrom: '55 €',
    pickup: 'Aéroport Paris-Orly (ORY)',
    dropoff: 'Avenue des Champs-Élysées, Paris 8e',
    recommendedCategory: 'normale',
    note: 'Prise en charge directe au terminal',
  },
  {
    id: 'bourget-palace',
    tag: 'Aviation Privée',
    title: 'Le Bourget ↔ Palaces Parisiens',
    duration: '30 – 45 min',
    priceFrom: '135 €',
    pickup: 'Aéroport du Bourget — Aviation d’Affaires',
    dropoff: 'Hôtel Ritz / Place Vendôme, Paris 1er',
    recommendedCategory: 'luxe',
    note: 'Accès tarmac / FBO & discrétion absolue',
  },
  {
    id: 'gares-paris',
    tag: 'Gares TGV & Eurostar',
    title: 'Gares Parisiennes ↔ Intra-Muros',
    duration: '15 – 30 min',
    priceFrom: '45 €',
    pickup: 'Gare du Nord — Sortie Eurostar, Paris 10e',
    dropoff: 'Saint-Germain-des-Prés, Paris 6e',
    recommendedCategory: 'normale',
    note: 'Gare du Nord, Gare de Lyon, Montparnasse, Est',
  },
  {
    id: 'versailles-disneyland',
    tag: 'Excursion Famille & VIP',
    title: 'Paris ↔ Versailles ou Disneyland',
    duration: '40 – 60 min',
    priceFrom: '95 €',
    pickup: 'Hôtel Paris Centre',
    dropoff: 'Disneyland Paris — Marne-la-Vallée',
    recommendedCategory: 'van',
    note: 'Van Classe V idéal jusqu’à 7 personnes',
  },
  {
    id: 'mise-a-disposition',
    tag: 'Chauffeur à l’heure',
    title: 'Mise à disposition Paris & Île-de-France',
    duration: 'À partir de 2h',
    priceFrom: '80 € / h',
    pickup: 'Triangle d’Or, Paris 8e',
    dropoff: 'Mise à disposition — Itinéraire libre Paris',
    recommendedCategory: 'luxe',
    note: 'Shopping, Fashion Week, rendez-vous multiples',
  },
]

export function getCategoryById(id) {
  return VEHICLE_CATEGORIES.find((cat) => cat.id === id) || VEHICLE_CATEGORIES[1]
}

export function formatFrenchDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  if (!year || !month || !day) return dateStr
  const dateObj = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj)
}

export function buildWhatsAppMessage(booking) {
  const category = getCategoryById(booking.vehicleCategory)
  const scheduleLine =
    booking.timingMode === 'now'
      ? 'Dès que possible (prise en charge immédiate)'
      : `${formatFrenchDate(booking.date) || 'À définir'}${booking.time ? ` à ${booking.time}` : ''}`

  const lines = [
    `🚘 *DEMANDE DE RÉSERVATION — ${BRAND_CONFIG.name.toUpperCase()} PARIS*`,
    '',
    `👤 *Client :* ${booking.clientName?.trim() || 'Non renseigné'}`,
  ]

  if (booking.clientPhone?.trim()) {
    lines.push(`📞 *Téléphone :* ${booking.clientPhone.trim()}`)
  }

  lines.push(
    `✨ *Gamme choisie :* ${category.label} (${category.models})`,
    `📍 *Adresse de récupération :* ${booking.pickupAddress?.trim() || 'Non renseignée'}`,
    `🏁 *Adresse de destination :* ${booking.dropoffAddress?.trim() || 'Non renseignée'}`,
    `🗓️ *Prise en charge :* ${scheduleLine}`,
    `👥 *Passagers / Bagages :* ${booking.passengers} ${booking.passengers > 1 ? 'passagers' : 'passager'} · ${booking.luggage} ${booking.luggage > 1 ? 'bagages' : 'bagage'}`
  )

  if (booking.notes?.trim()) {
    lines.push(`📝 *Vol / Remarques :* ${booking.notes.trim()}`)
  }

  lines.push('', 'Merci de me confirmer la disponibilité et le tarif pour ce trajet.')

  return lines.join('\n')
}

export function buildWhatsAppUrl(booking) {
  const text = buildWhatsAppMessage(booking)
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function buildDirectWhatsAppUrl(customText = 'Bonjour Maison Aurèle, je souhaite réserver un chauffeur privé à Paris.') {
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(customText)}`
}
