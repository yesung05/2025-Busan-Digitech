import { Category, Spot, DailySchedule } from './types';

export const SPOTS: Spot[] = [
  {
    id: '1',
    name: 'Magnate Cafe',
    description: 'Owned by BTS Jimin\'s father. A modern, spacious cafe featuring Jimin\'s hats and fan art. A must-visit for ARMY.',
    category: Category.BTS,
    imageUrl: 'https://picsum.photos/seed/magnate/400/300',
    location: 'Daeyeon-dong, Nam-gu',
    highlight: true
  },
  {
    id: '2',
    name: 'Gamcheon Culture Village',
    description: 'Known as the "Machu Picchu of Busan". Features the famous Little Prince statue and the Jungkook & Jimin mural.',
    category: Category.BTS,
    imageUrl: 'https://picsum.photos/seed/gamcheon/400/300',
    location: 'Gamcheon-dong, Saha-gu',
    highlight: true
  },
  {
    id: '3',
    name: 'Gwangalli Beach',
    description: 'Filming location for "Black Panther" car chase scene. Stunning views of the Diamond Bridge at night.',
    category: Category.DRAMA,
    imageUrl: 'https://picsum.photos/seed/gwangalli/400/300',
    location: 'Gwangan-dong, Suyeong-gu',
    highlight: true
  },
  {
    id: '4',
    name: 'Ahopsan Forest',
    description: 'Mystical bamboo forest featured in "The King: Eternal Monarch" and "Moon Lovers: Scarlet Heart Ryeo".',
    category: Category.DRAMA,
    imageUrl: 'https://picsum.photos/seed/ahopsan/400/300',
    location: 'Cheolma-myeon, Gijang-gun'
  },
  {
    id: '5',
    name: 'Busan High School of Arts',
    description: 'The alma mater of BTS Jimin. Walk the same path he did during his school days.',
    category: Category.BTS,
    imageUrl: 'https://picsum.photos/seed/school/400/300',
    location: 'Geumjeong-gu'
  },
  {
    id: '6',
    name: 'Dwaeji Gukbap Alley',
    description: 'Busan\'s soul food. Enjoy the hearty pork soup that many K-stars grew up eating.',
    category: Category.FOOD,
    imageUrl: 'https://picsum.photos/seed/gukbap/400/300',
    location: 'Seomyeon'
  },
  {
    id: '7',
    name: 'Huinnyeoul Culture Village',
    description: 'Filming spot for the movie "The Attorney". Beautiful coastal walks perfect for Instagram photos.',
    category: Category.DRAMA,
    imageUrl: 'https://picsum.photos/seed/huinnyeoul/400/300',
    location: 'Yeongdo-gu'
  }
];

export const SCHEDULE: DailySchedule[] = [
  {
    day: 1,
    title: "Arrival & City Vibes",
    items: [
      { time: "14:00", title: "Pick up at Gimhae Airport", description: "Welcome to Busan! Private van transfer.", type: "transport" },
      { time: "16:00", title: "Check-in at Seomyeon Hotel", description: "Freshen up in the center of youth culture.", type: "free" },
      { time: "18:00", title: "Seomyeon Street Food & Shopping", description: "Explore the trendiest fashion shops and street snacks.", type: "activity" },
      { time: "20:00", title: "Welcome Dinner: K-BBQ", description: "Authentic Korean BBQ experience.", type: "meal" }
    ]
  },
  {
    day: 2,
    title: "The Purple Path (BTS Tour)",
    items: [
      { time: "09:30", title: "Hotel Pickup", description: "Start the day comfortably.", type: "transport" },
      { time: "10:30", title: "Gamcheon Culture Village", description: "Photo op at the mural and Little Prince statue.", type: "activity" },
      { time: "12:30", title: "Lunch: Dwaeji Gukbap", description: "Jimin's favorite childhood soul food.", type: "meal" },
      { time: "14:00", title: "Magnate Cafe", description: "Coffee time at Jimin's dad's cafe. Relax and look at merch.", type: "activity" },
      { time: "16:30", title: "Busan Citizen Park", description: "Walk the 'V' trail where Taehyung visited.", type: "activity" },
      { time: "19:00", title: "Gwangalli Yacht Tour", description: "Enjoy the purple-lit Gwangandaegyo bridge from the sea.", type: "activity" }
    ]
  },
  {
    day: 3,
    title: "K-Drama & Ocean Breeze",
    items: [
      { time: "10:00", title: "Ahopsan Forest", description: "Feel the mystical vibe from 'The King'.", type: "activity" },
      { time: "12:30", title: "Lunch: Seafood Feast", description: "Fresh seafood by the Gijang coast.", type: "meal" },
      { time: "14:30", title: "Haedong Yonggungsa Temple", description: "Beautiful seaside temple.", type: "activity" },
      { time: "16:30", title: "Blue Line Park Beach Train", description: "Romantic train ride with ocean view.", type: "activity" },
      { time: "18:00", title: "Drop off / Free Time", description: "End of package. Enjoy your night!", type: "free" }
    ]
  }
];