// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { renderRoute } from './setup.tsx'

import nock from 'nock'

const date = new Date().getTime()

const ALL_TYPES = [
  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: true,
    organisation_id: 1,
    date: `${date}`,
  },
  {
    name: 'Furniture',
    accepting: true,
    urgently_seeking: true,
    organisation_id: 1,
    date: `${date}`,
  },

  // id: 2
  // name: 'Salvation Army Miramar'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 2,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 2,
    date: `${date}`,
  },

  // id: 3
  // name: 'Whiskers & Wonders'

  {
    name: 'Pet care',
    accepting: true,
    urgently_seeking: true,
    organisation_id: 3,
    date: `${date}`,
  },
  {
    name: 'Household goods',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 3,
    date: `${date}`,
  },
  {
    name: 'Clothes',
    accepting: false,
    urgently_seeking: false,
    organisation_id: 3,
    date: `${date}`,
  },

  // id: 4
  // name: 'Aro Valley Opshop'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 4,
    date: `${date}`,
  },
  {
    name: 'Household goods',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 4,
    date: `${date}`,
  },

  // id: 5
  // name: 'The Koha Shed Wellington'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 5,
    date: `${date}`,
  },
  {
    name: 'Furniture',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 5,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 5,
    date: `${date}`,
  },

  // id: 6
  // name: 'Dress for Success Wellington'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 6,
    date: `${date}`,
  },
  {
    name: 'Accessories',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 6,
    date: `${date}`,
  },

  // id: 7
  // name: 'Wellington SPCA'

  {
    name: 'Pet care',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 7,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 7,
    date: `${date}`,
  },
  {
    name: 'Appliances',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 7,
    date: `${date}`,
  },

  // id: 8
  // name: 'Salvation Army Wellington'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 8,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 8,
    date: `${date}`,
  },
  {
    name: 'Furniture',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 8,
    date: `${date}`,
  },

  // id: 9
  // name: 'Wellington City Mission'

  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 9,
    date: `${date}`,
  },
  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 9,
    date: `${date}`,
  },

  // id: 10
  // name: 'Vinnies Wellington'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 10,
    date: `${date}`,
  },
  {
    name: 'Furniture',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 10,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 10,
    date: `${date}`,
  },
  {
    name: 'Household goods',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 10,
    date: `${date}`,
  },

  // id: 11
  // name: "Wellington Women's Refuge"

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 11,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 11,
    date: `${date}`,
  },
  {
    name: 'Toiletries',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 11,
    date: `${date}`,
  },

  // id: 12
  // name: 'Newtown Community & Cultural Centre'

  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 12,
    date: `${date}`,
  },
  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 12,
    date: `${date}`,
  },

  // id: 13
  // name: 'Kaibosh Wellington'

  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 13,
    date: `${date}`,
  },

  // id: 14
  // name: 'The Free Store'

  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 14,
    date: `${date}`,
  },

  // id: 15
  // name: 'Wellington Night Shelter'

  {
    name: 'Clothes',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 15,
    date: `${date}`,
  },
  {
    name: 'Linen & Bedding',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 15,
    date: `${date}`,
  },
  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 15,
    date: `${date}`,
  },

  // id: 16
  // name: 'Soup Kitchen Wellington'

  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 16,
    date: `${date}`,
  },

  // id: 17
  // name: 'Soup Kitchen Wellington'

  {
    name: 'Food',
    accepting: true,
    urgently_seeking: false,
    organisation_id: 17,
    date: `${date}`,
  },
]

const INITIAL_ORGS = [
  {
    id: 1,
    name: 'Hospice Cuba Street',
    contact_email: 'wookie123@getMaxListeners.com',
    contact_number: '0277719999',
    location: '123 Cuba St, Wellington',
    about: 'Providing essential services to the community.',
    longitude: 174.7762,
    latitude: -41.2924,
    org_types: 'Charity',
    image: '/images/MPHospiceCubaStreet.webp',
    volunteering_needed: true,
    donation_method:
      'Drop off donations in store, or contact for collection of large items',
    website: null,
  },
  {
    id: 2,
    name: 'Salvation Army Miramar',
    contact_email: null,
    contact_number: null,
    location: '50 Miramar Ave, Wellington',
    about: 'Supporting those in need.',
    longitude: 174.8287,
    latitude: -41.3137,
    org_types: 'Non-Profit',
    image: '/images/salvationArmyMiramar.webp',
    volunteering_needed: false,
    donation_method:
      'Drop into our shop during business hours or by request a pick up by our Family Store truck.',
    website: null,
  },
  {
    id: 3,
    name: 'Whiskers & Wonders',
    contact_email: null,
    contact_number: null,
    location: 'Furr Lane, Wellington',
    about:
      'Whiskers & Wonders is dedicated to improving the lives of pets across the globe with innovative, heartwarming solutions. Our programs focus on delivering high-quality toys, engaging activities, and educational resources to pet owners, ensuring that every furry friend can experience a life full of happiness and adventure.',
    longitude: 174.7668,
    latitude: -41.2973,
    org_types: 'Charity',
    image: '/images/Whiskers-and-Wonders.webp',
    volunteering_needed: true,
    donation_method:
      'Drop off pet food, supplies and toys during business hours. Mon-Fri: 9am -5pm',
    website: null,
  },
  {
    id: 4,
    name: 'Aro Valley Opshop',
    contact_email: null,
    contact_number: null,
    location: '109 Aro Street, Aro Valley, Wellington 6021',
    about:
      'Helping people in need through various outreach and charity services.',
    longitude: 174.7659307,
    latitude: -41.295422,
    org_types: 'Charity',
    image: '/images/svdpkilbirnie.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'https://www.svdp.org.nz/',
  },
  {
    id: 5,
    name: 'The Koha Shed Wellington',
    contact_email: 'koha@missionsocialservices.org',
    contact_number: null,
    location:
      'Wellington City Mission Supermarket, 19 Gordon Pl, Newtown, Wellington',
    about:
      'A charitable initiative that collects and distributes goods for people in need.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/koha.webp',
    volunteering_needed: true,
    donation_method:
      'Koha drop off in person between Tues 10 - 12 and Sunday 1 - 3pm.',
    website: 'https://www.wellingtoncitymission.org.nz/koha-shed',
  },
  {
    id: 6,
    name: 'Dress for Success Wellington',
    contact_email: 'wellington@dressforsuccess.org',
    contact_number: '04 499 4590',
    location: '29 Broderick Rd, Johnsonville, Wellington',
    about:
      'Helping women get back into the workforce by providing professional attire and development tools.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/dress_for_success.webp',
    volunteering_needed: true,
    donation_method: 'Good quality and clean. Email to discuss.',
    website: 'https://wellington.dressforsuccess.org/',
  },
  {
    id: 7,
    name: 'Wellington SPCA',
    contact_email: null,
    contact_number: '04 389 8044',
    location: '140 Alexandra Rd, Newtown, Wellington',
    about:
      'Helping animals in need and promoting animal welfare in Wellington.',
    longitude: null,
    latitude: null,
    org_types: 'Animal Welfare',
    image: '/images/spca.webp',
    volunteering_needed: true,
    donation_method:
      'If you would like to donate any of these items, they can be dropped to your local SPCA Centre.',
    website: 'https://www.spca.nz/centre/wellington-centre',
  },
  {
    id: 8,
    name: 'Salvation Army Wellington',
    contact_email: 'enquiries@salvationarmy.org.nz',
    contact_number: '04 389 0594',
    location: '204 Cuba St, Te Aro, Wellington',
    about: 'Providing community support and social services for those in need.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/salvation-army.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'https://www.salvationarmy.org.nz/centre/wellington-city',
  },
  {
    id: 9,
    name: 'Wellington City Mission',
    contact_email: null,
    contact_number: '04 245 0900',
    location: '19 Gordon Pl, Newtown, Wellington',
    about:
      'Providing assistance to individuals and families in need throughout Wellington.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/wellington-city-mission.webp',
    volunteering_needed: true,
    donation_method: 'Phone',
    website: 'https://www.wellingtoncitymission.org.nz/',
  },
  {
    id: 10,
    name: 'Vinnies Wellington',
    contact_email: 'vinnies@stvincents.co.nz',
    contact_number: '04 389 7122',
    location: '207 Riddiford St, Newtown, Wellington',
    about:
      'Helping people in need through various outreach and charity services.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/svdpkilbirnie.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'https://www.vinnies-wellington.org.nz/',
  },
  {
    id: 11,
    name: "Wellington Women's Refuge",
    contact_email: null,
    contact_number: '04 473 6280',
    location: '44 Wigan Street, Te Aro, Wellington',
    about:
      'Supporting women and children in escaping domestic violence and offering safe housing and services.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/womens-refuge.webp',
    volunteering_needed: false,
    donation_method: 'Phone',
    website: 'https://womensrefuge.org.nz/',
  },
  {
    id: 12,
    name: 'Newtown Community & Cultural Centre',
    contact_email: 'newtowncentre@paradise.net.nz',
    contact_number: '04 389 4786',
    location: 'Corner of Rintoul and Colombo St, Newtown, Wellington',
    about:
      'Providing community events, workshops, and support services for residents of Newtown.',
    longitude: null,
    latitude: null,
    org_types: 'Community Centre',
    image: '/images/newtown_ccc.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'http://www.newtowncommunity.org.nz/',
  },
  {
    id: 13,
    name: 'Kaibosh Wellington',
    contact_email: 'info@kaibosh.org.nz',
    contact_number: '04 385 0825',
    location: 'Wellington Central, Wellington',
    about:
      'Wellington-based food rescue service, redistributing surplus food to people in need.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/kaiboshNoStorefront.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'https://www.kaibosh.org.nz/',
  },
  {
    id: 14,
    name: 'The Free Store',
    contact_email: 'freestore@wellington.org.nz',
    contact_number: '04 387 8087',
    location: '211 Willis St, Te Aro, Wellington',
    about:
      'Redistributing surplus food from local cafes and bakeries to people in need in Wellington.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/thefreestore.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'https://www.thefreestore.org.nz/',
  },
  {
    id: 15,
    name: 'Wellington Night Shelter',
    contact_email: null,
    contact_number: '04 385 9546',
    location: '304 Taranaki St, Mt Cook, Wellington',
    about:
      'Providing emergency and temporary housing for men in need in Wellington.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/wellington-night-shelter.webp',
    volunteering_needed: true,
    donation_method: 'Phone',
    website: 'https://wellingtonnightshelter.org.nz/',
  },
  {
    id: 16,
    name: 'Soup Kitchen Wellington',
    contact_email: 'soupkitchen@compassion.org.nz',
    contact_number: '04 385 9299',
    location: '132 Tory St, Te Aro, Wellington',
    about:
      'Providing meals and support services to vulnerable members of the Wellington community.',
    longitude: null,
    latitude: null,
    org_types: 'Charity',
    image: '/images/theSoupKitchen.webp',
    volunteering_needed: true,
    donation_method: 'Email',
    website: 'https://soupkitchen.org.nz/',
  },
  {
    id: 17,
    name: 'Free Coffee for Coders Wellington',
    contact_email: 'donatemate4@gmail.com',
    contact_number: '04 300 500',
    location: '275 Cuba Street, Te Aro, Wellington',
    about:
      'Providing free coffee for hard-working students and facilitators, one cohort at a time',
    longitude: 174.7886706700347,
    latitude: -41.28795621507406,
    org_types: 'Community Centre',
    image: '/images/Coffee.webp',
    volunteering_needed: true,
    donation_method: 'Drop-in between 8.30am and 5pm!',
    website: 'https://devacademy.co.nz/',
  },
]

beforeAll(() => {
  nock.disableNetConnect() // Disable real HTTP connections
})

afterEach(() => {
  nock.cleanAll() // Clear all nock setups after each test
})

describe('a user can filter organisations by donation types', () => {
  it('shows a list of organisations', async () => {
    // Set up nock to match the request
    nock('http://localhost')
      .get('/api/v1/organisations')
      .reply(200, INITIAL_ORGS)

    nock('http://localhost').get('/api/v1/alltypes').reply(200, ALL_TYPES)

    // Render the route or component
    const { findByRole } = renderRoute()

    // Find the button and assert its visibility
    const button = await findByRole('link')
    expect(button).toBeVisible()
  })
})
