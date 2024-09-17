const data = [
   {
      id: 1,
      name: "Samsung Galaxy S21",
      price: 799,
      promoPrice: 699,
      description: "Experience the latest in smartphone technology with the Samsung Galaxy S21. Featuring a 6.2-inch Dynamic AMOLED display, the Galaxy S21 delivers vibrant colors and deep contrasts. Capture stunning photos with the 64MP triple camera system, and enjoy smooth performance with the Exynos 2100 processor. The sleek design and 5G connectivity ensure you're always connected and in style. Available now at a special discount for a limited time!",
      discountPercentage: Math.round(((799 - 699) / 799) * 100),
      category: "Smartphones",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1661668773694-70e748916ba8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1663245482988-22fad02654e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://images.unsplash.com/photo-1574771540177-1b67712f6c6e?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
   },
   {
      id: 2,
      name: "iPhone 14 Pro",
      price: 999,
      promoPrice: 899,
      description: "The iPhone 14 Pro brings advanced technology to your fingertips. Featuring a stunning 6.1-inch Super Retina XDR display, this phone offers a cinematic viewing experience with its ProMotion technology. The A16 Bionic chip ensures lightning-fast performance and efficiency. Capture professional-quality photos and videos with the Pro camera system, including a 48MP main camera and innovative Photonic Engine. Take advantage of this exclusive offer to upgrade to the iPhone 14 Pro today!",
      discountPercentage: Math.round(((999 - 899) / 999) * 100),
      category: "Smartphones",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1681395791877-e7186492ad3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1678533511793-3e4098b854e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1677563277026-17a254ea02f7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://images.unsplash.com/photo-1671038374738-e0525bbc36f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
   },
   {
      id: 3,
      name: "Dell XPS 13",
      price: 1299,
      promoPrice: 1199,
      description: "The Dell XPS 13 is designed for performance and portability. It features a 13.4-inch InfinityEdge display that provides an immersive viewing experience with virtually no bezels. Powered by Intel's latest processors, this laptop handles demanding tasks with ease. Its sleek and lightweight design makes it perfect for professionals on the go. Take advantage of our special offer to get the Dell XPS 13 at a discounted price!",
      discountPercentage: Math.round(((1299 - 1199) / 1299) * 100),
      category: "Laptops",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1651169611895-d8bd3d1544b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1651169610533-8f0cabeb04b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1651169610533-8f0cabeb04b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://images.unsplash.com/photo-1651169610523-edca6032aaef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
   },
   {
      id: 4,
      name: "Sony WH-1000XM4",
      price: 349,
      promoPrice: 299,
      description: "Experience industry-leading noise cancellation with the Sony WH-1000XM4 headphones. Equipped with advanced noise-canceling technology and exceptional sound quality, these headphones provide an immersive listening experience. Enjoy up to 30 hours of battery life on a single charge, and customize your audio settings with the companion app. Perfect for travel, work, or leisure, these headphones are now available at a special promotional price.",
      discountPercentage: Math.round(((349 - 299) / 349) * 100),
      category: "Headphones",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://unsplash.com/photos/a-pair-of-headphones-sitting-on-top-of-a-table-qcZpoGO7Sh8",
         side: "https://plus.unsplash.com/premium_photo-1687832783491-61e12e6e6273?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxMY1UyVEdRbGM3a3x8ZW58MHx8fHx8",
         additional: "https://plus.unsplash.com/premium_photo-1679864782395-cc5697bf614f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxMY1UyVEdRbGM3a3x8ZW58MHx8fHx8"
      }
   },
   {
      id: 5,
      name: "GoPro HERO10",
      price: 499,
      promoPrice: 449,
      description: "Capture every moment of your adventures with the GoPro HERO10. Featuring 5.3K video resolution, this action camera offers incredible detail and clarity. The new GP2 processor ensures smooth performance and quick response times, even in challenging conditions. With advanced stabilization and water resistance, the HERO10 is perfect for capturing your most daring activities. Take advantage of our limited-time discount and get the GoPro HERO10 at a reduced price!",
      discountPercentage: Math.round(((499 - 449) / 499) * 100),
      category: "Cameras",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1457608135803-4827addc43e0?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://media.istockphoto.com/id/599500368/photo/old-folding-camera.webp?a=1&s=612x612&w=0&k=20&c=waGAdcWVigvaX_Ufn773plB4LWIGABUnPAFscTD8Z-s=",
         side: "https://media.istockphoto.com/id/469816097/photo/vintage-camera-on-wooden-background.webp?a=1&s=612x612&w=0&k=20&c=MunRTX8_NLGIx_jEEjOy1RWvnCu7eKZ6KOl4Lu5DGXc=",
         additional: "https://images.unsplash.com/photo-1456858060761-fd3f80c5aca0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
      }
   },
   {
      id: 6,
      name: "Bose QuietComfort 35 II",
      price: 299,
      promoPrice: 259,
      description: "The Bose QuietComfort 35 II headphones offer exceptional noise cancellation and audio performance. With an over-ear design and plush ear cushions, these headphones provide all-day comfort for long listening sessions. The Bluetooth connectivity allows for easy wireless pairing, while the integrated voice assistants enable hands-free control. Perfect for travel or work, these headphones are now available at a discounted price. Experience the best in audio technology with Bose.",
      discountPercentage: Math.round(((299 - 259) / 299) * 100),
      category: "Headphones",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHBob25lcyUyMEJvc2UlMjBRdWlldENvbWZvcnQlMjAzNSUyMElJfGVufDB8fDB8fHww",
         back: "https://media.istockphoto.com/id/1403459838/photo/headphones-with-red-and-blue-gradient-led-lights.webp?a=1&s=612x612&w=0&k=20&c=L7MdG2anFLUCCQAXWRF-N-vjA-B3bLsqe1Ah6wqJ0Ps=",
         side: "https://media.istockphoto.com/id/1306201068/photo/overhead-modern-stylish-black-headphones-on-the-table-copyspace.webp?a=1&s=612x612&w=0&k=20&c=RxP4elbnZxxFPtxVD9mZPLcYvxx-BAOmYXd_ySOrX90=",
         additional: "https://images.unsplash.com/photo-1606400082792-fe14743a8e01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
      }
   },
   {
      id: 7,
      name: "Microsoft Surface Pro 8",
      price: 1099,
      promoPrice: 999,
      description: "The Microsoft Surface Pro 8 combines the functionality of a laptop with the convenience of a tablet. Featuring a 13-inch PixelSense Flow display with a high resolution and smooth touch experience, this device is perfect for both productivity and entertainment. With the Intel Core i7 processor and up to 16GB of RAM, the Surface Pro 8 handles demanding tasks with ease. The versatile kickstand and detachable keyboard make it an ideal choice for professionals and students alike. Get it now at a special promotional price!",
      discountPercentage: Math.round(((1099 - 999) / 1099) * 100),
      category: "Laptops",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1489110804417-276c3f517515?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1489110804417-276c3f517515?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1489110804417-276c3f517515?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://media.istockphoto.com/id/1059048656/photo/top-view-of-woman-legs-in-socks-and-using-laptop-on-cozy-bed-lifestyle-concept.webp?a=1&s=612x612&w=0&k=20&c=5IUqL1l7WtTogYeR0v9o_SV9Kwnu68N0FwLZ8xEDRiY="
      }
   },
   {
      id: 8,
      name: "Apple Watch Series 7",
      price: 399,
      promoPrice: 359,
      description: "Experience the next level of health monitoring with the Apple Watch Series 7. Equipped with a larger and more durable display, this smartwatch provides seamless access to essential health features, including heart rate monitoring, ECG, and blood oxygen measurement. Its sleek design and improved performance make it a perfect companion for your daily activities and workouts. Take advantage of our special offer to get it at a discounted price and stay ahead in health and technology.",
      discountPercentage: Math.round(((399 - 359) / 399) * 100),
      category: "Wearables",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1686657984027-3f738de9fcbe?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1548960254-5139d80bd5ec?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1597038519284-aa729dd6d720?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw2MzMwOTYzN3x8ZW58MHx8fHx8",
         additional: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
   },
   {
      id: 9,
      name: "Google Pixel 6",
      price: 599,
      promoPrice: 549,
      description: "The Google Pixel 6 redefines smartphone excellence with its innovative design and powerful performance. Featuring a stunning AMOLED display and the Google Tensor processor, it delivers a seamless and intuitive user experience. Capture stunning photos with its advanced camera system, and enjoy the latest Android features with timely updates. Grab this premium smartphone at a reduced price and experience cutting-edge technology.",
      discountPercentage: Math.round(((599 - 549) / 599) * 100),
      category: "Smartphones",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1613836255019-a7b845804788?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1653628989908-a22b51baaa5c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1612442058361-178007e5e498?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
   },
   {
      id: 10,
      name: "HP Spectre x360",
      price: 1399,
      promoPrice: 1299,
      description: "The HP Spectre x360 is the epitome of luxury and functionality in a convertible laptop. Its elegant design, high-performance Intel Core i7 processor, and stunning 4K display make it ideal for both work and entertainment. With its 360-degree hinge, it effortlessly transitions between laptop and tablet modes, providing unmatched versatility. Enjoy a special discount and elevate your computing experience with this premium device.",
      discountPercentage: Math.round(((1399 - 1299) / 1399) * 100),
      category: "Laptops",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1681702178751-d99556a42a7b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://plus.unsplash.com/premium_photo-1681702178635-52b7725c440a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://plus.unsplash.com/premium_photo-1681702114305-301323b95ba5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
   },
   {
      id: 11,
      name: "Men's Formal Dress",
      price: 199,
      promoPrice: 179,
      description: "Elevate your style with this sophisticated Men's Formal Dress. Perfectly crafted for office meetings and special events, it combines elegance with comfort. Made from high-quality fabrics, this dress features a tailored fit and classic design, ensuring you look sharp and feel confident. Don't miss the chance to enhance your wardrobe at a special promotional price.",
      discountPercentage: Math.round(((199 - 179) / 199) * 100),
      category: "Clothing",
      availableQuantity: 10,
      images: {
         front: "https://media.istockphoto.com/id/972560088/photo/young-athletic-guy-wearing-blank-white-t-shirt-studio-close-up-empty-wall.jpg?s=1024x1024&w=is&k=20&c=Y1SNzZW8bD7hzhEljCVIrqOrjkx-PbQOZCNE5M99W0Q=",
         back: "https://media.istockphoto.com/id/865723980/photo/back-view-young-bearded-hipster-man-dressed-in-white-t-shirt-and-sunglasses-is-stands-on-city.jpg?s=1024x1024&w=is&k=20&c=8PpJG4ZOF-epu3WqfQZh8z7OYVEU2m6r6tP5XKJ5688=",
         side: "https://unsplash.com/photos/assorted-color-folded-shirts-on-wooden-panel-tWOz2_EK5EQ",
         additional: "https://unsplash.com/photos/white-hotel-printed-crew-neck-shirt-on-black-surface-9ugEeqflo70"
      }
   },
   {
      id: 12,
      name: "Women's Evening Gown",
      price: 299,
      promoPrice: 269,
      description: "Make a grand entrance with this stunning Women's Evening Gown. Designed for special occasions, this gown features a flattering silhouette and exquisite detailing, making you the center of attention. Crafted from luxurious fabrics, it offers a perfect blend of elegance and comfort. Take advantage of our limited-time offer to own this beautiful gown at a reduced price.",
      discountPercentage: Math.round(((299 - 269) / 299) * 100),
      category: "Clothing",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1541262350848-1fe9d17310eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBldmVuaW5nJTIwZ293bnxlbnwwfHwwfHx8MA%3D%3D",
         back: "https://media.istockphoto.com/id/913272034/photo/young-woman-in-tutu-skirt-looking-up.webp?a=1&s=612x612&w=0&k=20&c=G6krqqccwRlKsxa_wtTVSKEDVcnX2ic3XJxTQXNOEiU=",
         side: "https://media.istockphoto.com/id/1202245096/photo/girl-wearing-a-wedding-dress-in-the-forest.webp?a=1&s=612x612&w=0&k=20&c=6hPsYbwcDnsKPftrSmHaNr6RkEZHrMRbMmpxjRX3dOo=",
         additional: "https://images.unsplash.com/photo-1586693231040-e89840e7d805?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
      }
   },

   {
      id: 3,
      name: "Nikon Z50",
      price: 859,
      promoPrice: 799,
      description: "The Nikon Z50 is a compact and versatile mirrorless camera designed for both amateur and professional photographers. With its 20.9 MP DX-format sensor, fast autofocus system, and 4K UHD video recording, it offers exceptional image quality and performance. Whether you're capturing stunning landscapes or fast-moving subjects, the Z50 provides the flexibility and ease-of-use you need. Take advantage of our special promotion to own this cutting-edge camera at a discounted price.",
      discountPercentage: Math.round(((859 - 799) / 859) * 100),
      category: "Cameras",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1604677209492-763493452f54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
         back: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
         side: "https://images.unsplash.com/photo-1511184059754-e4b5bbbcef75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
         additional: "https://plus.unsplash.com/premium_photo-1661668773694-70e748916ba8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

         
      }
   },
   {
      id: 14,
      name: "ASUS ROG Zephyrus G14",
      price: 1499,
      promoPrice: 1399,
      description: "The ASUS ROG Zephyrus G14 is a compact gaming laptop that combines powerful performance with portability. Featuring an AMD Ryzen 9 processor and NVIDIA GeForce GTX 1660 Ti graphics, this laptop is designed to handle the latest games and demanding applications with ease. Its high-refresh-rate display and advanced cooling system ensure smooth gameplay and optimal performance. Get this high-performance gaming machine at a special promotional price and take your gaming experience to the next level.",
      discountPercentage: Math.round(((1499 - 1399) / 1499) * 100),
      category: "Laptops",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
         side: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
         additional: "https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"
      }
   },
   {
      id: 15,
      name: "Men's Casual Shirt",
      price: 59,
      promoPrice: 49,
      description: "Elevate your everyday style with this Men's Casual Shirt, designed for comfort and versatility. Made from high-quality, breathable fabric, it offers a relaxed fit that's perfect for both casual outings and more polished looks. Its timeless design includes a classic collar and button-down front, making it a staple piece for any wardrobe. Enjoy a discount on this essential item and enhance your casual wardrobe with ease.",
      discountPercentage: Math.round(((59 - 49) / 59) * 100),
      category: "Clothing",
      availableQuantity: 10,
      images: {
         front: "https://media.istockphoto.com/id/513102832/photo/folded-blue-man-shirt-and-tie-isolated-on-wooden-background.webp?a=1&s=612x612&w=0&k=20&c=JMy9LzTO46_RxMS0ro2UZMRR3DVb02CMCbcB9MOFmyA=",
         back: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
         side: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
         additional: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
      }
   },
   {id: 16,
      name: "Women's Summer Dress",
      price: 89,
      promoPrice: 79,
      description: "Enjoy the warm weather in style with this Women's Summer Dress, designed for comfort and elegance. The light and breezy fabric, combined with a flattering cut, makes it an ideal choice for sunny days and casual outings. The dress features a versatile design that can be dressed up or down, making it a versatile addition to your summer wardrobe. Take advantage of our promotional discount and refresh your summer fashion collection.",
      discountPercentage: Math.round(((89 - 79) / 89) * 100),
      category: "Clothing",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1661629352680-5d8459ce6830?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
         back: "https://media.istockphoto.com/id/1361367766/photo/woman-at-hin-ta-and-hin-yai-rocks.webp?a=1&s=612x612&w=0&k=20&c=L2XjnXbzxUTOp9NFiDsWfPdeBbQHz2c8aAQqYK49oWw=",
         side: "https://media.istockphoto.com/id/481211982/photo/pregnant-woman-at-sunset.webp?a=1&s=612x612&w=0&k=20&c=KRwUmVNrcgZzZa3wztz8gtKOUhBvus-xgDXvsVMwqS8=",
         additional: "https://plus.unsplash.com/premium_photo-1661429023637-3d97b82b67d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8V29tZW4ncyUyMFN1bW1lciUyMERyZXNzfGVufDB8fDB8fHww"
      }
   },

   {
      id: 17,
      name: "Samsung Galaxy S21",
      price: 799,
      promoPrice: 699,
      discountPercentage: 12,
      description: "The latest Samsung Galaxy S21 with 5G technology, offering a powerful Exynos 2100 processor, a stunning 6.2-inch Dynamic AMOLED display, and a triple camera setup with 8K video recording capabilities. Designed for superior performance, seamless connectivity, and high-end mobile gaming. Available in Phantom Gray, White, and Violet.",
      category: "Smartphones",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1615264952739-555010f3b29b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1610945264232-541f10d0282d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
         back: "https://images.unsplash.com/photo-1615264952739-555010f3b29b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://images.unsplash.com/photo-1646078693167-5043dc14529e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMXxlbnwwfHwwfHx8MA%3D%3D"
      }
   },
   {
      id: 18,
      name: "Apple iPhone 13",
      price: 999,
      promoPrice: 899,
      discountPercentage: 10,
      description: "The new iPhone 13 comes with Apple's latest A15 Bionic chip, a 6.1-inch Super Retina XDR display, and improved battery life. It features a dual-camera system with Cinematic mode for beautiful, depth-filled videos, and Night mode for stunning low-light photography. Available in five striking colors.",
      category: "Smartphones",
      availableQuantity: 10,
      images: {
         
         front: "https://images.unsplash.com/photo-1638951003100-2cc4550a9737?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
         side: "https://images.unsplash.com/photo-1646842329361-c43b120b2c03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
         back: "https://plus.unsplash.com/premium_photo-1661668773694-70e748916ba8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         additional: "https://images.unsplash.com/photo-1639769167777-95be78f5dceb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
      }
   },
   {
      id: 19,
      name: "Sony WH-1000XM4",
      price: 349,
      promoPrice: 299,
      discountPercentage: 14,
      description: "Industry-leading noise canceling headphones with crystal-clear sound quality and up to 30 hours of battery life. The WH-1000XM4 comes with a personalized listening experience, voice assistant support, and Adaptive Sound Control. Ideal for frequent travelers and audiophiles who demand superior sound.",
      category: "Headphones",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
         back: "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
         additional: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
      }
   },
   {
      id: 20,
      name: "MacBook Pro 14-inch",
      price: 1999,
      promoPrice: 1799,
      discountPercentage: 10,
      description: "Apple's latest MacBook Pro with the powerful M1 Pro chip, designed for professional-grade performance. It features a 14-inch Liquid Retina XDR display, advanced thermal architecture, and up to 21 hours of battery life. Perfect for creators, developers, and professionals who need superior power and portability.",
      category: "Laptops",
      availableQuantity: 10,
      images: {
         front: "https://media.istockphoto.com/id/470194883/photo/modern-digital-gadgets-smartphone-tablet-notebook.webp?a=1&s=612x612&w=0&k=20&c=Rm8Uo4sWfR6Tuo58tYEB1ws2dt2RcSM0n552-NGSaIM=",
         side: "https://media.istockphoto.com/id/147888937/photo/laptop.webp?a=1&s=612x612&w=0&k=20&c=aBmreXHzMryJLryG08x9NRr3g7TLVKJ8eZQbGoijYXM=",
         back: "https://images.unsplash.com/photo-1658400274389-e7dbedd89b67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFjQm9vayUyMFBybyUyMDE0JTIwaW5jaHxlbnwwfHwwfHx8MA%3D%3D",
         additional: "https://plus.unsplash.com/premium_photo-1681160405609-389cd83998d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
      }
   },
   {
      id: 21,
      name: "Dell XPS 13",
      price: 999,
      promoPrice: 899,
      discountPercentage: 10,
      description: "The ultra-thin Dell XPS 13 laptop with 11th-gen Intel Core i7 processor, a 13.4-inch InfinityEdge display, and up to 19 hours of battery life. Ideal for work and entertainment, it offers a sleek design, powerful performance, and a stunning 4K resolution display.",
      category: "Laptops",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
         back: "https://images.unsplash.com/1/macbook-air-all-faded-and-stuff.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
         additional: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODM1ODYyOHx8ZW58MHx8fHx8"
      }
   },

   {
      id: 22,
      name: "Men's Formal Suit",
      price: 299,
      promoPrice: 269.10, // 10% discount
      discountPercentage: 10,
      description: "A classic formal suit for men, perfect for weddings and business events. Tailored to perfection, this suit is made with high-quality fabric that ensures comfort and a sleek, professional look. Available in various sizes to cater to different body types. Whether it's a special occasion or a formal meeting, this suit guarantees you'll stand out in style.",
      category: "Clothing",
      availableQuantity: 10,
      images: {
        front: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
        back: "https://images.unsplash.com/photo-1594759845217-e9c99af2b6a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
        side: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
        additional: "https://images.unsplash.com/photo-1522968439036-e6338d0ed84f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
      }
    },
    {
      id: 23,
      name: "Men's Denim Jacket",
      price: 89,
      promoPrice: 80.10, // 10% discount
      discountPercentage: 10,
      description: "A trendy denim jacket for men, ideal for casual outings. Made from durable denim, this jacket features a modern cut that pairs well with a variety of outfits. Its lightweight design makes it perfect for layering during cooler months, and its versatile style ensures it can be worn for a range of occasions from casual Fridays to weekend adventures.",
      category: "Clothing",
      availableQuantity: 10,
      images: {
        front: "https://images.unsplash.com/photo-1511551203524-9a24350a5771?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
        back: "https://images.unsplash.com/photo-1512441547630-6ef146e5af13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        side: "https://images.unsplash.com/photo-1531945086322-64e2ffae14a6?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        additional: "https://images.unsplash.com/photo-1511401677968-feade623d58d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    },
    {
      id: 24,
      name: "Men's T-Shirt",
      price: 29,
      promoPrice: 26.10, // 10% discount
      discountPercentage: 10,
      description: "A comfortable and stylish T-shirt for men, available in various colors. Made from soft, breathable cotton, this T-shirt is perfect for daily wear. Whether you're lounging at home, running errands, or hitting the gym, this versatile tee offers a great fit and lasting comfort. Ideal for layering or wearing on its own.",
      category: "Tops",
      availableQuantity: 10,
      images: {
        front: "https://images.unsplash.com/photo-1516082669438-2d2bb5082626?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        back: "https://images.unsplash.com/photo-1516442443906-71605254b628?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
        side: "https://images.unsplash.com/photo-1516178151140-1a27a08c417a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        additional: "https://images.unsplash.com/photo-1516442443906-71605254b628?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
      }
    },
    {
      id: 25,
      name: "Women's Evening Dress",
      price: 199,
      promoPrice: 179.10,
      discountPercentage: 10,
      description: "An elegant evening dress for women, designed for special occasions. This dress features a flowing, floor-length design that exudes sophistication and grace. Perfect for galas, weddings, and other formal events, this dress ensures you make a stunning entrance. Available in a variety of colors to suit every taste.",
      category: "Clothing",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1671718110186-a58852cc06fd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
        back: "https://plus.unsplash.com/premium_photo-1671718110202-623b829275d8?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w0fHx8ZW58MHx8fHx8",
        side: "https://plus.unsplash.com/premium_photo-1671718110247-48f99d971630?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w1fHx8ZW58MHx8fHx8",
        additional: "https://plus.unsplash.com/premium_photo-1671718110186-a58852cc06fd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
      }
    },


    {
      id: 26,
      name: "Women's Casual Blouse",
      price: 49,
      description: "A versatile casual blouse for women, perfect for everyday wear. This lightweight blouse is designed with a relaxed fit, making it a stylish and comfortable option for a day out or casual office wear. Its breathable fabric ensures comfort in warm weather, while the modern cut enhances your overall look. Ideal for pairing with jeans, skirts, or trousers for a chic appearance.",
      category: "Clothing",
      availableQuantity: 10,
      discountPercentage: 10,
      promoPrice: 44.1,
      images: {
         front: "https://images.unsplash.com/photo-1533399710066-c33de66fe6bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
         side: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
         additional: "https://images.unsplash.com/photo-1529066659029-2d063ccffc3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
      }
  },
  
  {
   id: 27,
      name: "Sony PlayStation 5",
      price: 499,
      description: "The next-generation PlayStation console with 4K gaming. Experience ultra-fast loading times, immersive 3D audio, and a library of visually stunning games. The PlayStation 5 offers seamless integration with your favorite media apps, ensuring that you can stream, watch, and play all from one place. With its sleek design and powerful hardware, this console is built for serious gaming enthusiasts.",
      category: "Cameras",
      availableQuantity: 10,
      discountPercentage: 15,
      promoPrice: 424.15,
      images: {
         front: "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         side: "https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
         back: "https://images.unsplash.com/photo-1526510096283-b0b3b6cac327?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
         additional: "https://images.unsplash.com/photo-1531390658120-e06b58d826ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
      }
  },
  
  {
   id: 28,
      name: "Men's Slim Fit Jeans",
      price: 39,
      description: "Comfortable slim fit jeans for men, perfect for casual wear. Made from high-quality denim, these jeans provide a sleek and flattering fit that works well for both casual and semi-formal occasions. The modern cut ensures a sharp look without sacrificing comfort. Pair these jeans with a t-shirt or button-down shirt for a versatile and stylish outfit.",
      category: "Cameras",
      availableQuantity: 10,
      discountPercentage: 5,
      promoPrice: 37.05,
      images: {
         front: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
         back: "https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
         side: "https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
         additional: "https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D"
      }
  },
  
  {
   id: 29,
      name: "Men's Relaxed Fit Jeans",
      price: 49,
      description: "Relaxed fit jeans for men with a classic style and comfortable feel. These jeans offer extra room in the thigh and seat area, making them perfect for all-day wear. The durable denim ensures longevity, while the timeless design allows for easy pairing with casual shirts or jackets. Ideal for a laid-back look or outdoor activities.",
      category: "Clothing",
      availableQuantity: 10,
      discountPercentage: 12,
      promoPrice: 43.12,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1674828600712-7d0caab39109?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
         side: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
         additional: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
      }
   },

   {
      id: 30,
      name: "Women's Skinny Jeans",
      price: 39,
      promoPrice: 29, // 25% discount
      discountPercentage: "25%",
      description: "Stylish skinny jeans for women, designed for a perfect fit and modern look. Made from high-quality denim fabric, these jeans offer both comfort and durability. The flattering skinny fit accentuates your legs and pairs perfectly with any outfit, making it a wardrobe essential. Ideal for casual outings, office wear, or even a night out.",
      category: "Clothing",
      availableQuantity: 10,
      images: {
        
         front: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         back: " https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         side: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         additional: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D"
      }
   },
   {
      id: 31,
      name: "Women's Bootcut Jeans",
      price: 59,
      promoPrice: 44, // 25% discount
      discountPercentage: "25%",
      description: "Elegant bootcut jeans for women, offering a flattering fit and stylish design. The bootcut style creates a balanced silhouette and pairs well with heels or boots. Made from soft, breathable denim fabric, these jeans are ideal for both casual and semi-formal occasions. They add a touch of timeless style to your wardrobe, perfect for day or night outings.",
      category: "Clothing",
      availableQuantity: 10,
      images: {
         front: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         back: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         side: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         additional: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D"
      }
   },
   {
      id: 32,
      name: "Skechers Men's Running Shoes",
      price: 99,
      promoPrice: 79, // 20% discount
      discountPercentage: "20%",
      description: "Comfortable and durable running shoes from Skechers, designed for superior performance during athletic activities. These shoes feature a lightweight construction with breathable materials, ensuring maximum comfort for long-distance runs. The advanced cushioning system provides excellent support for the feet, reducing fatigue and enhancing mobility.",
      category: "Footwear",
      availableQuantity: 10,
      images: {
         front: "https://media.istockphoto.com/id/1436871415/photo/3d-illustration.webp?a=1&s=612x612&w=0&k=20&c=K5C4tNnLHdDCdXX0rTzWEmJuB6a_wwJJ6xvQKazh54I=",
         back: "https://www.istockphoto.com/photo/standing-on-top-of-each-other-gray-sneakers-on-a-blue-and-pink-background-gm1172094442-324993124?utm_campaign=adp_photos_sponsored&utm_content=https%3A%2F%2Funsplash.com%2Fphotos%2Funpaired-white-gray-and-blue-nike-air-max-90-shoe-DMl5gG0yWWY&utm_medium=affiliate&utm_source=unsplash&utm_term=shoes%3A%3Areduced-affiliates%3Ahalf",
         side: "https://media.istockphoto.com/id/1436061608/photo/flying-colorful-womens-sports-shoe-on-pink-background-fashionable-stylish-sneaker.webp?a=1&s=612x612&w=0&k=20&c=w-AfANYS6qjJ4qz94MPAQGUDbbqrE81eeWkWmvQAe6w=",
         additional: "https://images.unsplash.com/photo-1511556670410-f6989d6b0766?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
      }
   },
   {
      id: 33,
      name: "Skechers Women's Walking Shoes",
      price: 89,
      promoPrice: 71, // 20% discount
      discountPercentage: "20%",
      description: "Lightweight and supportive walking shoes from Skechers, designed for all-day comfort. These shoes feature memory foam insoles that adapt to your feet, providing a custom fit and relieving pressure points. Whether you're taking a leisurely stroll or spending hours on your feet, these shoes will keep you comfortable and supported.",
      category: "Footwear",
      availableQuantity: 10,
      images: {
         front: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         back: "https://media.istockphoto.com/id/1432319195/photo/trendy-youth-shoes-with-flying-laces-on-white-background.webp?a=1&s=612x612&w=0&k=20&c=D4IhUjf5UU1-Iz4Xckac7CCtdNuCbNRlNi9XZ98UIdg=",
         side: "https://media.istockphoto.com/id/1432319195/photo/trendy-youth-shoes-with-flying-laces-on-white-background.webp?a=1&s=612x612&w=0&k=20&c=D4IhUjf5UU1-Iz4Xckac7CCtdNuCbNRlNi9XZ98UIdg=",
         additional: "https://media.istockphoto.com/id/1427996418/photo/unpaired-womens-sneaker.webp?a=1&s=612x612&w=0&k=20&c=_pVV34uL96HVM_iawbN8PGuwAsYfg2LEtJhZNB5B8WQ="
      }
   },

   {
      id: 34,
      name: "Classic White T-Shirt",
      price: 25,
      description: "A timeless white t-shirt made from 100% organic cotton. Soft, breathable, and versatile, this shirt is perfect for any occasion, whether you're dressing up or keeping it casual. With a tailored fit and durable fabric, it’s designed to last and maintain its shape after every wash.",
      category: "Shirts",
      availableQuantity: 50,
      discountPercentage: 10, // 10% discount
      promoPrice: 22.5, // Price after discount
      images: {
        front: "https://images.unsplash.com/photo-1667544417110-403b89341112?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        side: "https://images.unsplash.com/photo-1667544707240-598d5e4f4c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
        back: "https://plus.unsplash.com/premium_photo-1690406382767-16d27f2dfe44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
        additional: "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
      }
    },
    {
      id: 35,
      name: "Denim Button-Up Shirt",
      price: 45,
      description: "A stylish denim button-up shirt perfect for casual outings or smart-casual looks. Crafted from premium quality denim, this shirt offers a comfortable fit and durable wear. The classic button-up design is enhanced by a tailored cut, giving you a sleek and modern look.",
      category: "Shirts",
      availableQuantity: 30,
      discountPercentage: 15, // 15% discount
      promoPrice: 38.25, // Price after discount
      images: {
        front: "https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        side: "https://media.istockphoto.com/id/1334816305/photo/in-white-shirt-and-blue-jeans-young-beautiful-woman-is-posing-for-the-camera-in-the-studio.webp?a=1&s=612x612&w=0&k=20&c=L_x2qEqwxVGN1eEzVUb1U4XB5zgfRBwSH7EqaxNac70=",
        back: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
        additional: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
      }
    },
    {
      id: 36,
      name: "Striped Long Sleeve Top",
      price: 30,
      description: "A comfortable long sleeve top with black and white stripes. Made from soft and stretchy fabric, it’s perfect for layering during cooler months or wearing alone for a stylish look. The classic striped design pairs well with jeans or skirts for versatile outfits.",
      category: "Shirts",
      availableQuantity: 40,
      discountPercentage: 20, // 20% discount
      promoPrice: 24, // Price after discount
      images: {
        front: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8=",
        side: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8=",
        back: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8=",
        additional: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8="
      }
    },
    {
      id: 37,
      name: "Floral Print Blouse",
      price: 35,
      description: "A beautiful floral print blouse perfect for summer days. Featuring a lightweight and breathable fabric, it keeps you cool and stylish. The vibrant floral design adds a fresh, feminine touch to any outfit, making it ideal for outdoor events or casual wear.",
      category: "Shirts",
      availableQuantity: 20,
      discountPercentage: 12, // 12% discount
      promoPrice: 30.8, // Price after discount
      images: {
        front: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
        side: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
        back: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
        additional: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
      }
    },

    {
      id: 38,
      name: "Casual Plaid Shirt",
      price: 40,
      promoPrice: 30, // 25% off
      discountPercentage: 25,
      description: "A cozy plaid shirt with a relaxed fit, perfect for layering over a t-shirt or under a jacket. The soft cotton material ensures comfort, while the timeless plaid pattern makes it a wardrobe staple for both casual and semi-formal occasions. Great for fall and winter weather.",
      category: "Tops",
      availableQuantity: 35,
      images: {
        front: "https://images.unsplash.com/photo-1657878336522-d3d697f89409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
        side: "https://images.unsplash.com/photo-1656060939967-ede35a1a6dbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
        back: "https://images.unsplash.com/photo-1659121056903-0e6740d0a0f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
        additional: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2FzdWFsJTIwUGxhaWQlMjBTaGlydHxlbnwwfHwwfHx8MA%3D%3D"
      }
    },
    {
      id: 39,
      name: "Silk Sleeveless Top",
      price: 55,
      promoPrice: 41.25, // 25% off
      discountPercentage: 25,
      description: "An elegant sleeveless top crafted from luxurious silk. This versatile piece is perfect for both casual outings and formal events. The smooth texture and lightweight fabric provide ultimate comfort, while the subtle sheen of the silk adds sophistication to any outfit. Pair it with a skirt or trousers for a chic look.",
      category: "Tops",
      availableQuantity: 25,
      images: {
        front: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        side: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        back: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        additional: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
      }
    },
    {
      id: 40,
      name: "Oversized Hoodie",
      price: 60,
      promoPrice: 48, // 20% off
      discountPercentage: 20,
      description: "A cozy oversized hoodie made from soft cotton fleece, designed for maximum comfort. This hoodie features a spacious front pocket and an adjustable drawstring hood, perfect for those cold, relaxed days. The oversized fit gives a trendy streetwear vibe, making it easy to pair with joggers or jeans for a casual look.",
      category: "Tops",
      availableQuantity: 15,
      images: {
        front: "https://images.unsplash.com/photo-1721111258887-c5467d676ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
        side: "https://images.unsplash.com/photo-1721111260612-f25b80586e45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        back: "https://images.unsplash.com/photo-1721111260612-f25b80586e45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        additional: "https://images.unsplash.com/photo-1721111260412-5541dc8fbec5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
      }
    },

   //  {
   //     name: "Nikon Z50",
   //     price: 859,
   //     description: "Compact and versatile mirrorless camera.",
   //     category: "Cameras",
   //     availableQuantity:10,
   //    front: "https://plus.unsplash.com/premium_photo-1661668773694-70e748916ba8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   //    back: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
   //        side: "https://images.unsplash.com/photo-1511184059754-e4b5bbbcef75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
   //        additional: "https://images.unsplash.com/photo-1604677209492-763493452f54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D"
       
   //  },
   //  {
   //     name: "ASUS ROG Zephyrus G14",
   //     price: 1499,
   //     description: "Compact gaming laptop with powerful performance.",
   //     category: "Laptops",
   //     availableQuantity:10,
   //     images: {
   //        front: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   //        back: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
   //        side: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
   //        additional: "https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"
   //     }
   //  },
   //  {
   //      name: "Men's Casual Shirt",
   //      price: 59,
   //      description: "A comfortable and stylish casual shirt for men, ideal for everyday wear.",
   //      category: "Clothing",
   //      availableQuantity:10,
   //      images: {
   //         front: "https://media.istockphoto.com/id/513102832/photo/folded-blue-man-shirt-and-tie-isolated-on-wooden-background.webp?a=1&s=612x612&w=0&k=20&c=JMy9LzTO46_RxMS0ro2UZMRR3DVb02CMCbcB9MOFmyA=",
   //         back: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
   //         side: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
   //         additional: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
   //      }
   //   },
   //   {
   //      name: "Women's Summer Dress",
   //      price: 89,
   //      description: "A light and breezy summer dress for women, perfect for warm weather outings.",
   //      category: "Clothing",
   //      availableQuantity:10,
   //      images: {
   //         front: "https://plus.unsplash.com/premium_photo-1661629352680-5d8459ce6830?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
   //         back: "https://media.istockphoto.com/id/1361367766/photo/woman-at-hin-ta-and-hin-yai-rocks.webp?a=1&s=612x612&w=0&k=20&c=L2XjnXbzxUTOp9NFiDsWfPdeBbQHz2c8aAQqYK49oWw=",
   //         side: "https://media.istockphoto.com/id/481211982/photo/pregnant-woman-at-sunset.webp?a=1&s=612x612&w=0&k=20&c=KRwUmVNrcgZzZa3wztz8gtKOUhBvus-xgDXvsVMwqS8=",
   //         additional: "https://plus.unsplash.com/premium_photo-1661429023637-3d97b82b67d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8V29tZW4ncyUyMFN1bW1lciUyMERyZXNzfGVufDB8fDB8fHww"
   //      }
   //   },

      //   {
      //      name: "Samsung Galaxy S21",
      //      price: 799,
      //      description: "The latest Samsung Galaxy S21 with 5G technology.",
      //      category: "Smartphones",
      //      availableQuantity:10,
      //      images: {
      //         front: "https://images.unsplash.com/photo-1615264952739-555010f3b29b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //         side: "https://images.unsplash.com/photo-1610945264232-541f10d0282d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      //         back: "https://images.unsplash.com/photo-1615264952739-555010f3b29b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //         additional: "https://images.unsplash.com/photo-1646078693167-5043dc14529e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMXxlbnwwfHwwfHx8MA%3D%3D"
      //      }
      //   },
      //   {
      //      name: "Apple iPhone 13",
      //      price: 999,
      //      description: "The new iPhone 13 with A15 Bionic chip.",
      //      category: "Smartphones",
      //      availableQuantity:10,
      //      image: {
      //         front: "https://plus.unsplash.com/premium_photo-1661668773694-70e748916ba8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //         side: "https://images.unsplash.com/photo-1646842329361-c43b120b2c03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
      //         back: "https://images.unsplash.com/photo-1638951003100-2cc4550a9737?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
      //         additional: "https://images.unsplash.com/photo-1639769167777-95be78f5dceb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
      //      }
      //   },
      //   {
      //      name: "Sony WH-1000XM4",
      //      price: 349,
      //      description: "Industry-leading noise canceling headphones.",
      //      category: "Headphones",
      //      availableQuantity:10,
      //    images: {
      //         front: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //         side: "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
      //         back: "https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
      //         additional: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
      //      }
      //   },
      //   {
      //      name: "MacBook Pro 14-inch",
      //      price: 1999,
      //      description: "Apple's latest MacBook Pro with M1 Pro chip.",
      //      category: "Laptops",
      //      availableQuantity:10,
      //    images: {
      //         front: "https://media.istockphoto.com/id/470194883/photo/modern-digital-gadgets-smartphone-tablet-notebook.webp?a=1&s=612x612&w=0&k=20&c=Rm8Uo4sWfR6Tuo58tYEB1ws2dt2RcSM0n552-NGSaIM=",
      //         side: "https://media.istockphoto.com/id/147888937/photo/laptop.webp?a=1&s=612x612&w=0&k=20&c=aBmreXHzMryJLryG08x9NRr3g7TLVKJ8eZQbGoijYXM=",
      //         back: "https://images.unsplash.com/photo-1658400274389-e7dbedd89b67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFjQm9vayUyMFBybyUyMDE0JTIwaW5jaHxlbnwwfHwwfHx8MA%3D%3D",
      //         additional: "https://plus.unsplash.com/premium_photo-1681160405609-389cd83998d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
      //      }
      //   },
      //   {
      //      name: "Dell XPS 13",
      //      price: 999,
      //      description: "Dell's premium ultraportable laptop.",
      //      category: "Laptops",
      //      availableQuantity:10,
      //    images: {
      //         front: "https://images.unsplash.com/photo-1567521463850-4939134bcd4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      //         side: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      //         back: "https://images.unsplash.com/photo-1567521463850-4939134bcd4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      //         additional: "https://images.unsplash.com/photo-1622820366109-3113cfa3825d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
      //      }
      //   },
      //   {
      //      name: "Nike Air Max 270",
      //      price: 150,
      //      description: "Comfortable and stylish Nike sneakers.",
      //      category: "Footwear",
      //      availableQuantity:10,
      //    images: {
      //         front: "https://media.istockphoto.com/id/1278867079/photo/sport-sneakers-green-gray-on-a-shop-window-wooden-background-sport-lifestyle-concept.webp?a=1&s=612x612&w=0&k=20&c=DqgDQyyJgkr_mQcfaiMiDPHhUgRmjpNxSS1iYoPNvWk=",
      //         side: "https://images.unsplash.com/photo-1570037276498-fd54b859ba63?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //         back: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
      //         additional: "https://images.unsplash.com/photo-1562687782-9f2fd422a334?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
      //      }
      //   },
      //   {
      //      name: "Adidas Ultraboost",
      //      price: 180,
      //      description: "High-performance running shoes with a responsive Boost midsole.",
      //      category: "Footwear",
      //      availableQuantity:10,
      //    images: {
      //         front: "https://images.unsplash.com/photo-1613972798759-e677d3fb640f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWRpZGFzJTIwVWx0cmFib29zdCUyMGZvb3R3ZWFyfGVufDB8fDB8fHww",
      //         side: "https://images.unsplash.com/photo-1613972798411-a6214d153680?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      //         back: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      //         additional: "https://images.unsplash.com/photo-1613972798411-a6214d153680?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
      //      }
      //   },

      //   {
      //       name: "Men's Formal Suit",
      //       price: 299,
      //       description: "A classic formal suit for men, perfect for weddings and business events.",
      //       category: "Clothing",
      //       availableQuantity:10,
      //       images: {
      //          front: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
      //          back: "https://images.unsplash.com/photo-1594759845217-e9c99af2b6a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
      //          side: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
      //          additional: "https://images.unsplash.com/photo-1522968439036-e6338d0ed84f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
      //       }
      //    },
      //    {
      //       name: "Men's Denim Jacket",
      //       price: 89,
      //       description: "A trendy denim jacket for men, ideal for casual outings.",
      //       category: "Clothing",
      //       availableQuantity:10,
      //       images: {
      //          front: "https://images.unsplash.com/photo-1511551203524-9a24350a5771?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
      //          back: "https://images.unsplash.com/photo-1512441547630-6ef146e5af13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      //          side: "https://images.unsplash.com/photo-1531945086322-64e2ffae14a6?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //          additional: "https://images.unsplash.com/photo-1511401677968-feade623d58d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      //       }
      //    },
      //    {
      //       name: "Men's T-Shirt",
      //       price: 29,
      //       description: "A comfortable and stylish T-shirt for men, available in various colors.",
      //       category: "Clothing",
      //       availableQuantity:10,
      //       images: {
      //          front: "https://images.unsplash.com/photo-1516082669438-2d2bb5082626?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //          back: "https://images.unsplash.com/photo-1516442443906-71605254b628?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      //          side: "https://images.unsplash.com/photo-1516178151140-1a27a08c417a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      //          additional: "https://images.unsplash.com/photo-1516442443906-71605254b628?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
      //       }
      //    },
      //    {
      //       name: "Women's Evening Dress",
      //       price: 199,
      //       description: "An elegant evening dress for women, designed for special occasions.",
      //       category: "Clothing",
      //       availableQuantity:10,
      //       images: {
      //          front: "https://plus.unsplash.com/premium_photo-1671718110186-a58852cc06fd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
      //          back: "https://plus.unsplash.com/premium_photo-1671718110202-623b829275d8?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w0fHx8ZW58MHx8fHx8",
      //          side: "https://plus.unsplash.com/premium_photo-1671718110247-48f99d971630?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w1fHx8ZW58MHx8fHx8",
      //          additional: "https://plus.unsplash.com/premium_photo-1671718110186-a58852cc06fd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8"
      //       }
      //    },
         // {
         //    name: "Women's Casual Blouse",
         //    price: 49,
         //    description: "A versatile casual blouse for women, perfect for everyday wear.",
         //    category: "Clothing",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://images.unsplash.com/photo-1533399710066-c33de66fe6bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         //       back: "https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
         //       side: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
         //       additional: "https://images.unsplash.com/photo-1529066659029-2d063ccffc3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
         //    }
         // },

         // {
         //    name: "Sony PlayStation 5",
         //    price: 499,
         //    description: "The next-generation PlayStation console with 4K gaming.",
         //    category: "Gaming Consoles",
         //    availableQuantity:10,
         //  images: {
         //       front: "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         //       side: "https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
         //       back: "https://images.unsplash.com/photo-1526510096283-b0b3b6cac327?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
         //       additional: "https://images.unsplash.com/photo-1531390658120-e06b58d826ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
         //    }
         // },

         // {
         //    name: "Men's Slim Fit Jeans",
         //    price: 39,
         //    description: "Comfortable slim fit jeans for men, perfect for casual wear.",
         //    category: "Clothing",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
         //       back: "https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
         //       side: "https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
         //       additional: "https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJ3MlMjBTbGltJTIwRml0JTIwSmVhbnN8ZW58MHx8MHx8fDA%3D"
         //    }
         // },
         // {
         //    name: "Men's Relaxed Fit Jeans",
         //    price: 49,
         //    description: "Relaxed fit jeans for men with a classic style and comfortable feel.",
         //    category: "Clothing",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://plus.unsplash.com/premium_photo-1674828600712-7d0caab39109?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         //       back: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
         //       side: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
         //       additional: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
         //    }
         // },
         // {
         //    name: "Women's Skinny Jeans",
         //    price: 39,
         //    description: "Stylish skinny jeans for women, designed for a perfect fit and modern look.",
         //    category: "Clothing",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         //       back: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         //       side: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         //       additional: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D"
         //    }
         // },
         // {
         //    name: "Women's Bootcut Jeans",
         //    price: 59,
         //    description: "Elegant bootcut jeans for women, offering a flattering fit and stylish design.",
         //    category: "Clothing",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         //       back: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         //       side: "https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
         //       additional: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4ncyUyMEJvb3RjdXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D"
         //    }
         // },
         // {
         //    name: "Skechers Men's Running Shoes",
         //    price: 99,
         //    description: "Comfortable and durable running shoes from Skechers, ideal for athletic activities.",
         //    category: "Footwear",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://media.istockphoto.com/id/1436871415/photo/3d-illustration.webp?a=1&s=612x612&w=0&k=20&c=K5C4tNnLHdDCdXX0rTzWEmJuB6a_wwJJ6xvQKazh54I=",
         //       back: "https://www.istockphoto.com/photo/standing-on-top-of-each-other-gray-sneakers-on-a-blue-and-pink-background-gm1172094442-324993124?utm_campaign=adp_photos_sponsored&utm_content=https%3A%2F%2Funsplash.com%2Fphotos%2Funpaired-white-gray-and-blue-nike-air-max-90-shoe-DMl5gG0yWWY&utm_medium=affiliate&utm_source=unsplash&utm_term=shoes%3A%3Areduced-affiliates%3Ahalf",
         //       side: "https://media.istockphoto.com/id/1436061608/photo/flying-colorful-womens-sports-shoe-on-pink-background-fashionable-stylish-sneaker.webp?a=1&s=612x612&w=0&k=20&c=w-AfANYS6qjJ4qz94MPAQGUDbbqrE81eeWkWmvQAe6w=",
         //       additional: "https://images.unsplash.com/photo-1511556670410-f6989d6b0766?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
         //    }
         // },
         // {
         //    name: "Skechers Women's Walking Shoes",
         //    price: 89,
         //    description: "Lightweight and supportive walking shoes from Skechers, designed for all-day comfort.",
         //    category: "Footwear",
         //    availableQuantity:10,
         //    images: {
         //       front: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         //       back: "https://media.istockphoto.com/id/1432319195/photo/trendy-youth-shoes-with-flying-laces-on-white-background.webp?a=1&s=612x612&w=0&k=20&c=D4IhUjf5UU1-Iz4Xckac7CCtdNuCbNRlNi9XZ98UIdg=",
         //       side: "https://media.istockphoto.com/id/1432319195/photo/trendy-youth-shoes-with-flying-laces-on-white-background.webp?a=1&s=612x612&w=0&k=20&c=D4IhUjf5UU1-Iz4Xckac7CCtdNuCbNRlNi9XZ98UIdg=",
         //       additional: "https://media.istockphoto.com/id/1340444696/photo/colorful-sneakers-in-empty-drawer-footwear-storage.webp?a=1&s=612x612&w=0&k=20&c=gMeG_qFisFskmaHvPzvuMU8ua3xNYX3m0gC7gkODI9A="
         //    }
         // },
      //    {
      //       name: "Classic White T-Shirt",
      //       price: 25,
      //       description: "A timeless white t-shirt made from 100% organic cotton.",
      //       category: "Shirts",
      //       availableQuantity: 50,
      //     images: {
      //           front: "https://images.unsplash.com/photo-1667544417110-403b89341112?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      //           side: "https://images.unsplash.com/photo-1667544707240-598d5e4f4c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      //           back: "https://plus.unsplash.com/premium_photo-1690406382767-16d27f2dfe44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
      //           additional: "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
      //       }
      //   },
      //   {
      //       name: "Denim Button-Up Shirt",
      //       price: 45,
      //       description: "A stylish denim button-up shirt perfect for casual outings.",
      //       category: "Shirts",
      //       availableQuantity: 30,
      //     images: {
      //           front: "https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //           side: "https://media.istockphoto.com/id/1334816305/photo/in-white-shirt-and-blue-jeans-young-beautiful-woman-is-posing-for-the-camera-in-the-studio.webp?a=1&s=612x612&w=0&k=20&c=L_x2qEqwxVGN1eEzVUb1U4XB5zgfRBwSH7EqaxNac70=",
      //           back: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      //           additional: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
      //       }
      //   },
      //   {
      //       name: "Striped Long Sleeve Top",
      //       price: 30,
      //       description: "A comfortable long sleeve top with black and white stripes.",
      //       category: "Tops",
      //       availableQuantity: 40,
      //     images: {
      //           front: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8=",
      //           side: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8=",
      //           back: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8=",
      //           additional: "https://media.istockphoto.com/id/842866154/photo/teenager-girl-posing-in-nature.webp?a=1&s=612x612&w=0&k=20&c=jdkR9_io_0uhxyJxMrr32voMGLft55iwDUER73q9aa8="
      //       }
      //   },
      //   {
      //       name: "Floral Print Blouse",
      //       price: 35,
      //       description: "A beautiful floral print blouse perfect for summer days.",
      //       category: "Tops",
      //       availableQuantity: 20,
      //     images: {
      //           front: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
      //           side: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
      //           back: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
      //           additional: "https://plus.unsplash.com/premium_photo-1672790905765-147467ee8cba?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
      //       }
      //   },
      //   {
      //       name: "Casual Plaid Shirt",
      //       price: 40,
      //       description: "A cozy plaid shirt with a relaxed fit, great for layering.",
      //       category: "Shirts",
      //       availableQuantity: 35,
      //     images: {
      //           front: "https://images.unsplash.com/photo-1657878336522-d3d697f89409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
      //           side: "https://images.unsplash.com/photo-1656060939967-ede35a1a6dbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
      //           back: "https://images.unsplash.com/photo-1659121056903-0e6740d0a0f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
      //           additional: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2FzdWFsJTIwUGxhaWQlMjBTaGlydHxlbnwwfHwwfHx8MA%3D%3D"
      //       }
      //   },
      //   {
      //       name: "Silk Sleeveless Top",
      //       price: 55,
      //       description: "An elegant sleeveless top made from luxurious silk.",
      //       category: "Tops",
      //       availableQuantity: 25,
      //     images: {
      //           front: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      //           side: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      //           back: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      //           additional: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
      //       }
      //   },
      //   {
      //       name: "Oversized Hoodie",
      //       price: 60,
      //       description: "A cozy oversized hoodie made from soft cotton fleece.",
      //       category: "Tops",
      //       availableQuantity: 15,
      //     images: {
      //           front: "https://images.unsplash.com/photo-1721111258887-c5467d676ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
      //           side: "https://images.unsplash.com/photo-1721111260612-f25b80586e45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //           back: "https://images.unsplash.com/photo-1721111260612-f25b80586e45?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //           additional: "https://images.unsplash.com/photo-1721111260412-5541dc8fbec5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
      //       }
      //   }
 ];
 
 module.exports = data;
 