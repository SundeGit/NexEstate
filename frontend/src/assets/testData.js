export const getInitials = (fullName) => {
    const name = fullName.trim().split(' ')[0];
    const surname = fullName.trim().split(' ')[1];
    if(name != null && surname != null)
        return `${name[0]}${surname[0]}`.toUpperCase();
    else
        return `${name[0]}`;
}

export const cities = [
  { value: 'novi-sad', label: 'Novi Sad' },
  { value: 'beograd', label: 'Beograd' },
  { value: 'nis', label: 'Niš' },
  { value: 'kragujevac', label: 'Kragujevac' },
  { value: 'subotica', label: 'Subotica' },
  { value: 'zrenjanin', label: 'Zrenjanin' },
  { value: 'pancevo', label: 'Pančevo' },
  { value: 'cacak', label: 'Čačak' },
  { value: 'novi-pazar', label: 'Novi Pazar' },
  { value: 'kraljevo', label: 'Kraljevo' },
];

export const featuredProperties = [
  { _id: '1', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', price: 150000, location: 'Novi Sad', type: 'Stan', area: 65, featured: true, },
  { _id: '2', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', price: 280000, location: 'Beograd', type: 'Kuća', area: 180, featured: true, },
  { _id: '3', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600', price: 95000, location: 'Niš', type: 'Stan', area: 45, featured: true, },
  { _id: '4', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', price: 45000, location: 'Subotica', type: 'Plac', area: 500, featured: true, },
];

export const reviews = [
  { _id: '1', fullName: 'Marko Petrović', text: 'Odličan sajt, pronašao sam stan za koji sam dugo tražio. Preporučujem svima!' },
  { _id: '2', fullName: 'Jovana Nikolić', text: 'Veoma jednostavno za korišćenje, oglasi su detaljni i ažurni.' },
  { _id: '3', fullName: 'Stefan Jovanović', text: 'Prodao sam stan za kratko vreme zahvaljujući NexEstate platformi.' },
  { _id: '4', fullName: 'Ana Đorđević', text: 'Preporučujem svima koji traže ili prodaju nekretnine.' },
];

export const properties = [
  { _id: '1', title: 'Dvosoban stan u centru NS-a', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200', price: 150000, location: 'Bulevar Oslobođenja 12, Novi Sad', type: 'Stan', area: 65, rooms: 2, floor: 3, furnished: true, parking: true, lift: true, heating: ['Centralno', 'Klima'], description: 'Odličan stan u centru Novog Sada. Stan se nalazi na trećem spratu zgrade sa liftom. Potpuno je namešten i opremljen. U blizini se nalaze sve potrebne institucije, prodavnice i javni prevoz.', coordinates: [45.2671, 19.8335], featured: true, owner: { fullName: 'Luka Stefanović', phone: '+381611234567' } },
  { _id: '2', title: 'Velika kuća u centru BG-a', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200', price: 280000, location: 'Knez Mihailova 5, Beograd', type: 'Kuća', area: 180, rooms: 5, floor: 0, furnished: false, parking: true, elevator: false, heating: ['Gas', 'Podno grejanje'], description: 'Lepa kuća u centru Beograda sa velikim dvorištem.', coordinates: [44.8176, 20.4569], featured: true, owner: { fullName: 'Jovana Nikolić', phone: '+381611234567' } },
  { _id: '3', title: 'Jednosoban stan od 45m2 u centru NS-a', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200', price: 95000, location: 'Obrenovićeva 3, Niš', type: 'Stan', area: 45, rooms: 1, floor: 2, furnished: true, parking: false, elevator: true, heating: ['Centralno'], description: 'Manji stan u Nišu, idealan za studente.', coordinates: [43.3209, 21.8954], featured: true, owner: { fullName: 'Stefan Jovanović', phone: '+381621234567' } },
  { _id: '4', title: 'Veliki plac sa plodnim zemljištem', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200', price: 45000, location: 'Cara Lazara 10, Subotica', type: 'Plac', area: 500, rooms: 0, floor: 0, furnished: false, parking: false, elevator: false, heating: [], description: 'Plac u Subotici, pogodan za gradnju.', coordinates: [46.1000, 19.6658], featured: true, owner: { fullName: 'Ana Đorđević', phone: '+381631234567' } },
  { _id: '5', title: 'Kuća sa garažom Beograd', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200', price: 320000, location: 'Vojvode Stepe 22, Beograd', type: 'Kuća', area: 220, rooms: 6, floor: 0, furnished: true, parking: true, elevator: false, heating: ['Gas', 'Klima'], description: 'Prostrana kuća sa velikim dvorištem i garažom.', coordinates: [44.7866, 20.4489], featured: false, owner: { fullName: 'Milan Stojanović', phone: '+381641234567' } },
  { _id: '6', title: 'Jednosoban stan u Futoškoj ulici', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200', price: 75000, location: 'Futoška 8, Novi Sad', type: 'Stan', area: 38, rooms: 1, floor: 1, furnished: false, parking: false, elevator: false, heating: ['Centralno'], description: 'Manji stan u Novom Sadu, blizu centra.', coordinates: [45.2550, 19.8450], featured: false, owner: { fullName: 'Petra Vasić', phone: '+381651234567' } },
];