const categories = [
  {
    name: "Apps",
    description:
      "With secure payments, extensive product catalogs, and personalized recommendations, these apps provide a seamless shopping experience. Browse, compare, and purchase products from various categories, all conveniently accessible on your mobile device. Simplify and enhance your shopping journey today.",
    image: "/images/apps-category.jpg",
    attrs: [
      { key: "Compatibility", value: ["IOS", "Android"] },
      { key: "Size", value: ["Under 50MB", "50MB-100MB", "Over 100MB"] },
    ],
  },
  {
    name: "Beauty",
    description:
      "Discover top brands, browse through an extensive collection, and find the perfect products to enhance your beauty routine. From cosmetics to grooming essentials, these apps provide a convenient platform for exploring and purchasing beauty products that cater to your unique needs and preferences.",
    image: "/images/beauty-category.jpg",
    attrs: [{ key: "Type", value: ["Skin", "Hair"] }],
  },
  {
    name: "Books",
    description:
      "Dive into a world of imagination, knowledge, and storytelling with ease. Explore bestsellers, classics, educational materials, and more, all at your fingertips. Discover your next captivating read and expand your literary horizons through these convenient and comprehensive book apps.",
    image: "/images/books-category.jpg",
    attrs: [
      { key: "Genre", value: ["Fiction", "Memoir", "Fantasy", "Non-fiction"] },
    ],
  },
  {
    name: "Accessories",
    description:
      "From keyboards, mice, and headphones to cables, adapters, and storage devices, these apps provide a convenient platform to explore and purchase high-quality computer accessories that improve productivity, comfort, and performance. Upgrade your setup and optimize your computing needs with ease.",
    image: "/images/accessories-category.jpg",
    attrs: [
      { key: "Class", value: ["Keyboard", "Mouse"] },
      { key: "Connection", value: ["Wired", "Wireless"] },
      { key: "Compatibility", value: ["Windows", "macOS"] },
      { key: "Gaming", value: ["Yes", "No"] },
    ],
  },
  {
    name: "Cameras",
    description:
      "From professional DSLR cameras to compact point-and-shoot models, explore a range of options for capturing stunning images and videos. Discover lenses, accessories, and equipment to elevate your photography skills and unleash your creativity. Find the perfect camera to capture life's precious moments with clarity and precision.",
    image: "/images/cameras-category.jpg",
    attrs: [],
  },
  {
    name: "Printers",
    description:
      "Discover a variety of printers, including inkjet, laser, and all-in-one models. Browse through features such as wireless connectivity, high-quality prints, and advanced functionality. Find the perfect printer to meet your home or office printing needs, making document handling and creative projects hassle-free.",
    image: "/images/printers-category.jpg",
    attrs: [],
  },
  {
    name: "Monitors",
    description:
      "Explore a diverse range of monitors with different sizes, resolutions, and features. Whether for gaming, graphic design, or office work, find the perfect monitor to enhance your viewing experience, improve productivity, and enjoy immersive visuals.",
    image: "/images/monitors-category.png",
    attrs: [
      { key: "Display", value: ["24 Inch", "27 Inch"] },
      { key: "Refresh Rate", value: ["60Hz", "144Hz", "240Hz"] },
      { key: "Connectivity", value: ["HDMI", "DisplayPort"] },
      { key: "Panel", value: ["IPS", "QLED"] },
    ],
  },
  {
    name: "Tablets",
    description:
      "Explore a range of tablets with varying screen sizes, powerful processors, and extensive app ecosystems. Whether for productivity or entertainment, find the perfect tablet to stay connected and enjoy a seamless mobile computing experience.",
    image: "/images/tablets-category.jpg",
    attrs: [
      { key: "Display", value: ["10 Inch", "12 Inch"] },
      { key: "Storage", value: ["128GB", "256GB", "512GB"] },
      { key: "OS", value: ["iPadOS", "Android", "Windows"] },
    ],
  },
  {
    name: "Computers",
    description:
      "Discover powerful desktops, sleek laptops, and versatile tablets. Explore specifications, performance features, and brands to find the perfect computer for work, gaming, or entertainment. Upgrade your digital experience and stay connected with cutting-edge technology at your fingertips.",
    image: "/images/computers-category.jpg",
    attrs: [
      { key: "Display", value: ["14 Inch", "15.6 Inch"] },
      { key: "RAM", value: ["8GB", "16GB", "32GB"] },
      { key: "Storage", value: ["512GB", "1TB"] },
      { key: "OS", value: ["macOS", "Windows"] },
    ],
  },
  {
    name: "Computers/Laptops",
    description:
      "Discover sleek and powerful laptops that offer exceptional performance, stunning displays, and advanced features. From lightweight ultrabooks to gaming laptops, find the perfect device to stay productive, connected, and entertained on the go.",
    image: "/images/laptops-category.jpg",
  },
  {
    name: "Computers/Laptops/Lenovo",
    description:
      "Discover a variety of models, including sleek ultrabooks, powerful gaming laptops, and versatile 2-in-1 devices. Explore exceptional performance, robust build quality, and innovative features, making Lenovo laptops an ideal choice for productivity, creativity, and entertainment.",
    image: "/images/lenovo-category.jpg",
  },
  {
    name: "Computers/Laptops/Dell",
    description:
      "Explore a variety of models, including sleek ultrabooks, gaming laptops, and powerful workstations. Discover exceptional build quality, advanced features, and reliable performance, making Dell laptops a popular choice for professionals, students, and enthusiasts alike.",
    image: "/images/dell-category.jpeg",
  },
  {
    name: "Computers/Laptops/HP",
    description:
      "Explore a range of models, including sleek ultrabooks, versatile 2-in-1 devices, and powerful gaming laptops. Discover cutting-edge technology, robust performance, and stylish designs, making HP laptops a reliable choice for work, entertainment, and productivity.",
    image: "/images/hp-category.jpg",
  },
  {
    name: "Smartphones",
    description:
      "Explore a variety of smartphones with stunning displays, powerful processors, advanced camera systems, and a multitude of features. Discover the perfect smartphone to suit your communication, productivity, and entertainment needs, all conveniently available at your fingertips.",
    image: "/images/smartphones-category.jpg",
    attrs: [
      { key: "RAM", value: ["4GB", "6GB", "8GB"] },
      { key: "Storage", value: ["64GB", "128GB", "256GB"] },
      { key: "OS", value: ["IOS", "Android"] },
    ],
  },
  {
    name: "Smartphones/Apple",
    description:
      "Explore the latest iPhone models, featuring innovative technology, exceptional build quality, and seamless integration with the Apple ecosystem. Discover stunning displays, powerful processors, advanced camera systems, and a wealth of apps to enhance your mobile experience. Experience the best of Apple with these cutting-edge smartphones.",
    image: "/images/apple-category.jpeg",
  },
  {
    name: "Smartphones/Samsung",
    description:
      "Discover an array of Samsung phone models, offering stunning displays, powerful processors, advanced camera capabilities, and innovative features. Explore the Samsung ecosystem and find the perfect smartphone to suit your needs, whether it's for productivity, photography, or entertainment. Elevate your mobile experience with Samsung's cutting-edge technology.",
    image: "/images/samsung-category.jpg",
  },
  {
    name: "Smartphones/OnePlus",
    description:
      "Explore flagship models known for their powerful processors, smooth user experience, and exceptional camera capabilities. Discover cutting-edge features, fast charging technology, and premium build quality, making OnePlus phones a top choice for tech enthusiasts seeking an outstanding mobile experience.",
    image: "/images/oneplus-category.jpg",
  },
];

module.exports = categories;
