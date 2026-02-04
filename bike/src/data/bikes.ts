export interface Bike {
  id: string;
  name: string;
  model: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  engine: string;
  power: string;
  torque: string;
  weight: string;
  fuelCapacity: string;
  topSpeed: string;
  description: string;
  features: string[];
  colors: string[];
  isNew?: boolean;
  isDiscounted?: boolean;
}

export const bikes: Bike[] = [
   {
    id: "gt-650",
    name: "GT 650",
    model: "2024",
    price: 480000,
    image: "https://images.hindustantimes.com/auto/img/2023/04/08/1600x900/GT_13_1_1680938176428_1680938186908_1680938186908.jpeg",
    category: "Classic",
    engine: "349cc Single Cylinder",
    power: "20.2 bhp @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    weight: "195 kg",
    fuelCapacity: "13 L",
    topSpeed: "220 km/h",
    description: "The Classic 350 carries forward the legacy of NextGear Bikes with its timeless design. A true icon that combines heritage with modern technology.",
    features: ["Retro Design", "USB Charging", "Dual Channel ABS", "Halogen Headlamp"],
    colors: ["Chrome", "Dark", "Signals", "Halcyon"],
    isNew: true
  },
  {
    id: "hunter-350",
    name: "Hunter 350",
    model: "2024",
    price: 149900,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    category: "Roadster",
    engine: "349cc Single Cylinder",
    power: "20.2 bhp @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    weight: "181 kg",
    fuelCapacity: "13 L",
    topSpeed: "114 km/h",
    description: "The Hunter 350 is a nimble and agile roadster designed for the city streets. With its retro-modern design and capable engine, it's perfect for urban adventures.",
    features: ["LED DRL", "Digital-Analog Console", "Tubeless Tyres", "Tripper Navigation"],
    colors: ["Rebel Red", "Rebel Blue", "Dapper Grey", "Dapper White"],
    isNew: true
  },
  {
    id: "classic-350",
    name: "Classic 350",
    model: "2024",
    price: 193118,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    category: "Classic",
    engine: "349cc Single Cylinder",
    power: "20.2 bhp @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    weight: "195 kg",
    fuelCapacity: "13 L",
    topSpeed: "120 km/h",
    description: "The Classic 350 carries forward the legacy of NextGear Bikes with its timeless design. A true icon that combines heritage with modern technology.",
    features: ["Retro Design", "USB Charging", "Dual Channel ABS", "Halogen Headlamp"],
    colors: ["Chrome", "Dark", "Signals", "Halcyon"],
    isNew: true
  },
  {
    id: "meteor-350",
    name: "Meteor 350",
    model: "2024",
    price: 208373,
    originalPrice: 225000,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
    category: "Cruiser",
    engine: "349cc Single Cylinder",
    power: "20.2 bhp @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    weight: "191 kg",
    fuelCapacity: "15 L",
    topSpeed: "118 km/h",
    description: "The Meteor 350 is a cruiser built for long highway rides. Comfortable, stylish, and equipped with Tripper Navigation for easy touring.",
    features: ["Tripper Navigation", "LED Tail Lamp", "Windshield", "Comfortable Seat"],
    colors: ["Fireball Yellow", "Stellar Blue", "Supernova Brown"],
    isDiscounted: true
  },
  {
    id: "himalayan-450",
    name: "Himalayan 450",
    model: "2024",
    price: 285000,
    image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800",
    category: "Adventure",
    engine: "452cc Single Cylinder",
    power: "40 bhp @ 8000 rpm",
    torque: "40 Nm @ 5500 rpm",
    weight: "196 kg",
    fuelCapacity: "17 L",
    topSpeed: "145 km/h",
    description: "The all-new Himalayan 450 is built for the ultimate adventure. With a powerful new engine and advanced features, conquer any terrain with confidence.",
    features: ["TFT Display", "Ride Modes", "Traction Control", "LED Lighting"],
    colors: ["Kamet White", "Slate Himalayan Salt", "Hanle Black"],
    isNew: true
  },
  {
    id: "interceptor-650",
    name: "Interceptor 650",
    model: "2024",
    price: 320000,
    originalPrice: 350000,
    image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800",
    category: "Retro",
    engine: "648cc Parallel Twin",
    power: "47 bhp @ 7150 rpm",
    torque: "52 Nm @ 5250 rpm",
    weight: "202 kg",
    fuelCapacity: "13.7 L",
    topSpeed: "161 km/h",
    description: "The Interceptor 650 is a modern classic with twin-cylinder performance. Perfect blend of style, comfort, and exhilarating power.",
    features: ["Twin Exhaust", "Retro Design", "Slip & Assist Clutch", "Dual Channel ABS"],
    colors: ["Mark 2", "Orange Crush", "Ventura Blue"],
    isDiscounted: true
  },
  {
    id: "continental-gt-650",
    name: "Continental GT 650",
    model: "2024",
    price: 335000,
    image: "https://images.unsplash.com/photo-1580341289255-5b47c98a59dd?w=800",
    category: "Cafe Racer",
    engine: "648cc Parallel Twin",
    power: "47 bhp @ 7150 rpm",
    torque: "52 Nm @ 5250 rpm",
    weight: "198 kg",
    fuelCapacity: "12.5 L",
    topSpeed: "165 km/h",
    description: "The Continental GT 650 is a true cafe racer with race-inspired design. Clip-on handlebars and twin-cylinder power for pure riding pleasure.",
    features: ["Clip-on Handlebars", "Race Seat", "Twin Cylinder Engine", "Premium Finish"],
    colors: ["Slipstream Blue", "Rocker Red", "British Racing Green"],
    isNew: true
  },
  {
    id: "bullet-350",
    name: "Bullet 350",
    model: "2024",
    price: 187000,
    originalPrice: 199000,
    image: "https://images.unsplash.com/photo-1591378603223-e15b45a81640?w=800",
    category: "Classic",
    engine: "349cc Single Cylinder",
    power: "20.2 bhp @ 6100 rpm",
    torque: "27 Nm @ 4000 rpm",
    weight: "195 kg",
    fuelCapacity: "13 L",
    topSpeed: "110 km/h",
    description: "The Bullet is the motorcycle that started it all. An icon of motorcycling history, now with modern reliability and classic charm.",
    features: ["Classic Design", "Cast Iron Engine Feel", "Comfortable Riding", "Heritage Style"],
    colors: ["Black", "Maroon", "Forest Green"],
    isDiscounted: true
  },
  {
    id: "super-meteor-650",
    name: "Super Meteor 650",
    model: "2024",
    price: 375000,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800",
    category: "Cruiser",
    engine: "648cc Parallel Twin",
    power: "47 bhp @ 7150 rpm",
    torque: "52.3 Nm @ 5250 rpm",
    weight: "241 kg",
    fuelCapacity: "15.7 L",
    topSpeed: "155 km/h",
    description: "The Super Meteor 650 is the flagship cruiser from NextGear Bikes. Grand touring comfort meets twin-cylinder performance.",
    features: ["Tripper Navigation", "LED Lighting", "Cruise Control Ready", "Grand Touring Comfort"],
    colors: ["Astral Black", "Celestial Red", "Interstellar Green"],
    isNew: true
  },
  {
    id: "scram-411",
    name: "Scram 411",
    model: "2024",
    price: 209000,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
    category: "Scrambler",
    engine: "411cc Single Cylinder",
    power: "24.3 bhp @ 6500 rpm",
    torque: "32 Nm @ 4000 rpm",
    weight: "185 kg",
    fuelCapacity: "15 L",
    topSpeed: "125 km/h",
    description: "The Scram 411 is an urban scrambler that's ready for any adventure. Lightweight, capable, and perfect for city-to-trail riding.",
    features: ["Tripper Navigation", "19/17 Wheel Setup", "Upswept Exhaust", "Compact Design"],
    colors: ["Blazing Black", "Silver Spirit", "Graphite Blue"],
    isNew: true
  },
  {
    id: "shotgun-650",
    name: "Shotgun 650",
    model: "2024",
    price: 340000,
    originalPrice: 365000,
    image: "https://images.unsplash.com/photo-1622185135505-2d795003f0d8?w=800",
    category: "Bobber",
    engine: "648cc Parallel Twin",
    power: "47 bhp @ 7150 rpm",
    torque: "52.3 Nm @ 5250 rpm",
    weight: "215 kg",
    fuelCapacity: "13.7 L",
    topSpeed: "150 km/h",
    description: "The Shotgun 650 is a factory custom bobber with attitude. Stripped-down styling meets twin-cylinder power for the ultimate street presence.",
    features: ["Bobber Styling", "Low Seat Height", "Twin Cylinder", "USD Forks"],
    colors: ["Plasma Black", "Green Drill", "Stencil White"],
    isDiscounted: true
  },
  {
    id: "continental-gt-560",
    name: "Continental GT 560",
    model: "2025",
    price: 295000,
    image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800",
    category: "Cafe Racer",
    engine: "560cc Single Cylinder",
    power: "38 bhp @ 7500 rpm",
    torque: "44 Nm @ 5000 rpm",
    weight: "192 kg",
    fuelCapacity: "13 L",
    topSpeed: "155 km/h",
    description: "The Continental GT 560 brings cafe racer styling with a punchy single-cylinder engine. Perfect balance of power and agility for spirited riding.",
    features: ["Clip-on Handlebars", "TFT Display", "Ride Modes", "LED Lighting"],
    colors: ["Racing Green", "Chrome Red", "Midnight Black"],
    isNew: true
  },
  {
    id: "interceptor-560",
    name: "Interceptor 560",
    model: "2025",
    price: 285000,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    category: "Retro",
    engine: "560cc Single Cylinder",
    power: "38 bhp @ 7500 rpm",
    torque: "44 Nm @ 5000 rpm",
    weight: "195 kg",
    fuelCapacity: "14 L",
    topSpeed: "150 km/h",
    description: "The Interceptor 560 combines retro aesthetics with modern performance. A versatile roadster that excels on highways and city streets alike.",
    features: ["Retro Design", "Dual Channel ABS", "USB Charging", "Comfortable Ergonomics"],
    colors: ["Sunset Orange", "Canyon Blue", "Desert Sand"],
    isNew: true
  },
  {
    id: "hunter-560",
    name: "Hunter 560",
    model: "2025",
    price: 275000,
    originalPrice: 295000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    category: "Roadster",
    engine: "560cc Single Cylinder",
    power: "38 bhp @ 7500 rpm",
    torque: "44 Nm @ 5000 rpm",
    weight: "188 kg",
    fuelCapacity: "13.5 L",
    topSpeed: "152 km/h",
    description: "The Hunter 560 is an aggressive roadster with street-fighter DNA. Nimble, powerful, and designed to dominate urban landscapes.",
    features: ["TFT Display", "Traction Control", "Quick Shifter", "LED DRL"],
    colors: ["Stealth Black", "Neon Yellow", "Urban Grey"],
    isDiscounted: true
  }
];

export const getNewBikes = () => bikes.filter(bike => bike.isNew);
export const getDiscountedBikes = () => bikes.filter(bike => bike.isDiscounted);
export const getBikeById = (id: string) => bikes.find(bike => bike.id === id);
export const getBikesByCategory = (category: string) => bikes.filter(bike => bike.category === category);
