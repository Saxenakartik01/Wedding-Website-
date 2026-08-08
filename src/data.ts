export const WEDDING = {
  bride: "Tanya",
  groom: "Rohan",
  hashtag: "#TanyaWedsRohan",
  dateLong: "12 December 2026",
  dateSplit: ["12", "DECEMBER", "2026"],
  venue: "The Oberoi Udaivilas, Udaipur",
  brideParents: "D/O Mr. Rajesh Sharma & Mrs. Kavita Sharma",
  groomParents: "S/O Mr. Sanjay Kapoor & Mrs. Neeta Kapoor",
  mapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
  whatsapp:
    "https://wa.me/919000000000?text=I%20would%20love%20to%20join%20Tanya%20%26%20Rohan%27s%20wedding%20celebrations!",
};

export type WeddingEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  note: string;
  icon: 0 | 1 | 2;
};

export const EVENTS: WeddingEvent[] = [
  {
    id: "mehendi",
    name: "Mehendi",
    date: "11 Dec 2026",
    time: "4:00 PM",
    venue: "Lotus Courtyard",
    note: "Greens & florals encouraged",
    icon: 0,
  },
  {
    id: "haldi",
    name: "Haldi",
    date: "12 Dec 2026",
    time: "10:00 AM",
    venue: "Poolside Courtyard",
    note: "Yellow / ivory tones",
    icon: 1,
  },
  {
    id: "wedding",
    name: "Wedding",
    date: "12 Dec 2026",
    time: "7:00 PM",
    venue: "The Grand Mandap Lawn",
    note: "Royal festive attire",
    icon: 2,
  },
];

export const INFO_CARDS = [
  {
    icon: "dress",
    title: "Dress Code",
    body: "Festive Indian elegance. Sarees, lehengas and sherwanis are warmly encouraged.",
  },
  {
    icon: "venue",
    title: "Venue",
    body: "The Oberoi Udaivilas, Udaipur. All celebrations take place within the palace grounds.",
  },
  {
    icon: "stay",
    title: "Stay Options",
    body: "A curated block of rooms has been reserved. Please book by 1st November 2026.",
  },
  {
    icon: "hash",
    title: "Wedding Hashtag",
    body: "Share your favourite moments with #TanyaWedsRohan",
  },
];

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "invite", label: "Invite" },
  { id: "events", label: "Events" },
  { id: "couple", label: "Meet the Couple" },
  { id: "gallery", label: "Gallery" },
  { id: "info", label: "Things to Know" },
  { id: "rsvp", label: "RSVP" },
];

export const STORY = `A monsoon evening in Udaipur, a marigold archway, and a girl laughing in the rain — that was all it took. Three years, countless chai mornings, and one nervous rooftop proposal in Jaipur later, Tanya & Rohan are ready to begin their most beautiful chapter yet.`;
