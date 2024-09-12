export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('organisations').del()

  // Inserts seed entries
  await knex('organisations').insert([
    {
      name: 'The Koha Shed Wellington',
      contact_details: ['Email: koha@missionsocialservices.org'],
      about:
        'A charitable initiative that collects and distributes goods for people in need.',
      location:
        'Wellington City Mission Supermarket, 19 Gordon Pl, Newtown, Wellington 6021',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'https://www.wellingtoncitymission.org.nz/koha-shed',
      donation_type: ['Clothes', 'Furniture', 'Food'], // Multiple donation types
      accepting_donations: true,
      urgently_seeking: true,
    },
    {
      name: 'Dress for Success Wellington',
      contact_details: [
        'Email: wellington@dressforsuccess.org',
        'Phone: 04 499 4590',
      ],
      about:
        'Helping women get back into the workforce by providing professional attire and development tools.',
      location: '29 Broderick Rd, Johnsonville, Wellington 6037',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'https://wellington.dressforsuccess.org/',
      donation_type: ['Clothes', 'Accessories'],
      accepting_donations: true,
      urgently_seeking: false,
    },
    {
      name: 'Wellington SPCA',
      contact_details: ['Phone: 04 389 8044'],
      about:
        'Helping animals in need and promoting animal welfare in Wellington.',
      location: '140 Alexandra Rd, Newtown, Wellington 6021',
      org_types: 'Animal Welfare',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Phone',
      website: 'https://www.spca.nz/centre/wellington-centre',
      donation_type: ['Pet care', 'Food', 'Appliances'],
      accepting_donations: true,
      urgently_seeking: false,
    },
    {
      name: 'Salvation Army Wellington',
      contact_details: [
        'Phone: 04 389 0594',
        'Email: enquiries@salvationarmy.org.nz',
      ],
      about:
        'Providing community support and social services for those in need.',
      location: '204 Cuba St, Te Aro, Wellington 6011',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'https://www.salvationarmy.org.nz/centre/wellington-city',
      donation_type: ['Clothes', 'Food', 'Furniture'],
      accepting_donations: true,
      urgently_seeking: true,
    },
    {
      name: 'Wellington City Mission',
      contact_details: ['Phone: 04 245 0900'],
      about:
        'Providing assistance to individuals and families in need throughout Wellington.',
      location: '19 Gordon Pl, Newtown, Wellington 6021',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Phone',
      website: 'https://www.wellingtoncitymission.org.nz/',
      donation_type: ['Food', 'Clothes', 'Volunteering'],
      accepting_donations: true,
      urgently_seeking: true,
    },
    {
      name: 'Vinnies Wellington',
      contact_details: [
        'Email: vinnies@stvincents.co.nz',
        'Phone: 04 389 7122',
      ],
      about:
        'Helping people in need through various outreach and charity services.',
      location: '207 Riddiford St, Newtown, Wellington 6021',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'https://www.vinnies-wellington.org.nz/',
      donation_type: ['Clothes', 'Furniture', 'Food', 'Household goods'],
      accepting_donations: true,
      urgently_seeking: false,
    },
    {
      name: "Wellington Women's Refuge",
      contact_details: ['Phone: 04 473 6280'],
      about:
        'Supporting women and children in escaping domestic violence and offering safe housing and services.',
      location: 'Confidential address in Wellington',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: false,
      method: 'Phone',
      website: 'https://womensrefuge.org.nz/',
      donation_type: ['Clothes', 'Food', 'Toiletries'],
      accepting_donations: true,
      urgently_seeking: true,
    },
    {
      name: 'Newtown Community & Cultural Centre',
      contact_details: [
        'Phone: 04 389 4786',
        'Email: newtowncentre@paradise.net.nz',
      ],
      about:
        'Providing community events, workshops, and support services for residents of Newtown.',
      location: 'Corner of Rintoul and Colombo St, Newtown, Wellington 6021',
      org_types: 'Community Centre',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'http://www.newtowncommunity.org.nz/',
      donation_type: ['Food', 'Clothes', 'Volunteering'],
      accepting_donations: true,
      urgently_seeking: false,
    },
    {
      name: 'Kaibosh Wellington',
      contact_details: ['Phone: 04 385 0825', 'Email: info@kaibosh.org.nz'],
      about:
        'Wellington-based food rescue service, redistributing surplus food to people in need.',
      location: 'Wellington Central, Wellington 6011',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'https://www.kaibosh.org.nz/',
      donation_type: ['Food', 'Volunteering'],
      accepting_donations: true,
      urgently_seeking: true,
    },
    {
      name: 'The Free Store',
      contact_details: [
        'Phone: 04 387 8087',
        'Email: freestore@wellington.org.nz',
      ],
      about:
        'Redistributing surplus food from local cafes and bakeries to people in need in Wellington.',
      location: '211 Willis St, Te Aro, Wellington 6011',
      org_types: 'Charity',
      image: '/images/placeholder-image.webp',
      volunteering_needed: true,
      method: 'Email',
      website: 'https://www.thefreestore.org.nz/',
      donation_type: ['Food', 'Volunteering'],
      accepting_donations: true,
      urgently_seeking: false,
    },
  ])
}
