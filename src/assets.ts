import darkPalace from "./assets/dark-palace.jpg";
import eventIcons from "./assets/event-icons.png";
import frescoWall from "./assets/fresco-wall.jpg";
import gardenCream from "./assets/garden-cream.jpg";
import heroFloral from "./assets/hero-floral.jpg";
import nightSky from "./assets/night-sky.jpg";
import peacock from "./assets/peacock-medallion.png";
import vine from "./assets/vine-tile.png";

// Gallery photos
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";
import photo4 from "./assets/photo4.jpg";


export const IMG = {
  heroFloral,
  vine,
  darkPalace,
  gardenCream,
  frescoWall,
  nightSky,
  eventIcons,
  peacock,
};


/**
 * Local pre-wedding photography
 * used in the Gallery Wall.
 *
 * Each image has its own frame ratio
 * according to the actual photo orientation.
 */
export const GALLERY = [
  {
    src: photo1,
    alt: "Tanya and Rohan together in a beautiful wedding moment",
    shape: "arch" as const,
  },
  {
    src: photo2,
    alt: "Tanya and Rohan sharing a special moment together",
    shape: "arch" as const,
  },
  {
    src: photo3,
    alt: "Tanya and Rohan enjoying a romantic wedding moment",
    shape: "square" as const,
  },
  {
    src: photo4,
    alt: "Tanya and Rohan together in traditional wedding attire",
    shape: "arch" as const,
  },
];
