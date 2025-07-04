export const testimonials = [
  {
    client: "Sophie Martinez",
    image: "/images/testimonials/websites/art-portofolio.webp",
    profile: "/images/testimonials/clients/Sophie-Martinez.jpeg",
    reviews:
      "Working with this developer was an amazing experience — they perfectly captured my artistic vision and made everything so easy to update.",
    altImage:
      "Screenshot of Sophie Martinez's colorful online art portfolio showcasing original paintings and creative works.",
  },
  {
    client: "Budi Santoso",
    image: "/images/testimonials/websites/books.webp",
    profile: "/images/testimonials/clients/Budi-Santoso.jpeg",
    reviews:
      "The developer built a beautiful, intuitive site that truly feels like my physical bookstore — I couldn't be happier with the result.",
    altImage:
      "Screenshot of Budi Santoso's modern bookstore website featuring book collections and staff recommendations.",
  },
  {
    client: "Hana Lee",
    image: "/images/testimonials/websites/flourist.webp",
    profile: "/images/testimonials/clients/Hana-Lee.jpeg",
    reviews:
      "He understood my brand perfectly and delivered a stunning, easy-to-use website that my customers love.",
    altImage:
      "Screenshot of Hana Lee's elegant florist website showcasing handcrafted floral arrangements and event decor.",
  },
  {
    client: "Andi Pratama",
    image: "/images/testimonials/websites/furniture.webp",
    profile: "/images/testimonials/clients/Andi-Pratama.jpeg",
    reviews:
      "Incredible attention to detail and technical skill — my website looks exactly how I imagined and functions flawlessly.",
    altImage:
      "Screenshot of Andi Pratama's furniture website highlighting handcrafted wooden pieces and custom designs.",
  },
  {
    client: "Chef Marco Wijaya",
    image: "/images/testimonials/websites/restaurant.webp",
    profile: "/images/testimonials/clients/Chef-Marco-Wijaya.jpeg",
    reviews:
      "He created a website that captures the heart of my restaurant and makes it so easy for guests to engage and book.",
    altImage:
      "Screenshot of Chef Marco Wijaya's restaurant website featuring seasonal dishes and reservation options.",
  },
];

export const experienceData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "SmartEdu Systems | Remote | Jul 2015 – Jul 2018",
    achievements: [
      "Developed and maintained responsive web applications, improving user engagement by 30%.",
      "Collaborated with UX/UI designers to implement modern design principles, enhancing user experience.",
      "Optimized web applications for maximum speed and scalability, resulting in a 20% reduction in load times.",
    ],
    image: "/images/services/service-1.jpg",
    bgClass: "bg-[#5f626d]",
  },
  {
    id: 2,
    title: "Junior Web Developer",
    company: "Global MedTech Inc. | Chicago, IL | Aug 2018 – Dec 2020",
    achievements: [
      "Collaborated on a team to develop a web application for medical device management, enhancing operational efficiency by 25%.",
      "Implemented responsive design principles, ensuring accessibility across devices and platforms.",
      "Assisted in migrating legacy systems to modern web technologies, reducing maintenance costs by 40%.",
    ],
    image: "/images/services/service-2.jpg",
    bgClass: "bg-[#807686]",
  },
  {
    id: 3,
    title: "Mobile App Developer (Freelance Contract)",
    company: "LocalStart Gym App | Remote | Mar 2020 – Oct 2020",
    achievements: [
      "Developed a cross-platform fitness app using React Native and Firebase, with over 10,000 downloads in the first six months.",
      "Integrated features such as class schedules, membership management, and workout tracking.",
      "Collaborated with the client to ensure the app met user needs and business goals.",
    ],
    image: "/images/services/service-3.jpg",
    bgClass: "bg-[#71808a]",
  },
  {
    id: 4,
    title: "Student",
    company: "Purwadhika | On Campus | May 2025 - August 2025",
    achievements: [
      "Engaged in a comprehensive curriculum covering advanced web development, including React, next.js, and database management.",
      "Completed hands-on projects that simulated real-world scenarios, enhancing practical skills.",
      "Collaborated with peers on group projects, fostering teamwork and communication skills.",
    ],
    image: "/images/services/service-4.jpg",
    bgClass: "bg-[#c7baa9] text-[#2c2427]",
  },
];

export const portfolioData = {
  mainProject: {
    title: "E-commerce for Recycled Shoe Store",
    description:
      "This project involved developing a full-stack e-commerce platform for XYZ Retail, a traditional retail business transitioning to online sales. The goal was to create a scalable, user-friendly web application that catered to both desktop and mobile users, with features like secure checkout, product reviews, and real-time inventory updates.",
    imgSrc: [
      {
        src: "/images/portofolio/recycled-shoe-store-home.jpg",
        alt: "Recycled Shoe Store Home Page",
        width: 401,
        height: 4228,
      },
      {
        src: "/images/portofolio/recycled-shoe-store-story.jpg",
        alt: "Recycled Shoe Store Story Page",
        width: 1200,
        height: 4039,
      },
      {
        src: "/images/portofolio/recycled-shoe-store-lookbook.jpg",
        alt: "Recycled Shoe Store Lookbook Page",
        width: 1200,
        height: 4722,
      },
      {
        src: "/images/portofolio/recycled-shoe-store-sale.jpg",
        alt: "Recycled Shoe Store Sale Page",
        width: 1200,
        height: 3820,
      },
      {
        src: "/images/portofolio/recycled-shoe-store-contact.jpg",
        alt: "Recycled Shoe Store Contact Page",
        width: 1200,
        height: 2569,
      },
    ],
  },
  projectSteps: [
    {
      title: "Situation:",
      description:
        "XYZ Retail, an established retail company, sought to expand into e-commerce to reach a wider audience and streamline its sales processes. They needed a scalable, user-friendly platform to support both desktop and mobile users with features like product browsing, user reviews, secure checkout, and real-time inventory updates.",
    },
    {
      title: "Task",
      description:
        "I was responsible for building the front-end and back-end components of the platform, ensuring seamless integration with the client’s inventory and payment systems. The project goal was to create an efficient, high-performing application with a smooth user experience.",
    },
    {
      title: "Action",
      description:
        "Using React for the front-end, I designed a responsive, intuitive UI focused on user engagement and easy navigation. On the back end, I developed RESTful APIs with Node.js and MongoDB for data management. Additionally, I integrated the platform with AWS to optimize loading times and set up a CI/CD pipeline for faster deployment and testing. I worked closely with designers and QA to address usability and accessibility standards.",
    },
    {
      title: "Result",
      description:
        "The project was completed on time, leading to a 35% increase in online sales within the first three months. User feedback highlighted the site's speed and ease of use, and the client reported a substantial reduction in manual inventory management tasks.",
    },
  ],
};

export const skills = [
  {
    type: "title",
    text: "Skill Playground",
  },
  {
    type: "category",
    text: "Front-End Skills: React, TypeScript, Next.js, GSAP, Tailwind CSS, HTML, CSS.",
  },
  {
    type: "category",
    text: "Back-End Skills: Node.js, Express, REST APIs, and Myqsl.",
  },
  {
    type: "category",
    text: "DevOps & Tools: Docker, Git and GitHub, CI/CD pipelines.",
  },
];

export const skillImages = [
  {
    name: "html",
    image: "/images/skill-items/html.png",
    width: 1000,
    height: 709,
    pos: {
      small: { x: 100, y: 100 },
      large: { x: 500, y: 800 },
    },
  },
  {
    name: "css",
    image: "/images/skill-items/css.png",
    width: 1000,
    height: 714,
    pos: {
      small: { x: 1000, y: 150 },
      large: { x: 3000, y: 2000 },
    },
  },
  {
    name: "javascript",
    image: "/images/skill-items/javascript.png",
    width: 1000,
    height: 1000,
    pos: {
      small: { x: 1950, y: 1250 },
      large: { x: 4450, y: 240 },
    },
  },
  {
    name: "typescript",
    image: "/images/skill-items/typescript.png",
    width: 1000,
    height: 1000,
    pos: {
      small: { x: 850, y: 1500 },
      large: { x: 3450, y: 1200 },
    },
  },
  {
    name: "react",
    image: "/images/skill-items/react.png",
    width: 1000,
    height: 899,
    pos: {
      small: { x: 2100, y: 200 },
      large: { x: 2200, y: 500 },
    },
  },
  {
    name: "next-js",
    image: "/images/skill-items/next-js.png",
    width: 999,
    height: 602,
    pos: {
      small: { x: 600, y: 250 },
      large: { x: 1100, y: 750 },
    },
  },
  {
    name: "gsap",
    image: "/images/skill-items/gsap.png",
    width: 1024,
    height: 1024,
    pos: {
      small: { x: 1650, y: 1100 },
      large: { x: 3350, y: 1850 },
    },
  },
  {
    name: "tailwind-css",
    image: "/images/skill-items/tailwind-css.png",
    width: 1000,
    height: 600,
    pos: {
      small: { x: 1400, y: 200 },
      large: { x: 2600, y: 800 },
    },
  },
  {
    name: "node-js",
    image: "/images/skill-items/node-js.png",
    width: 1000,
    height: 888,
    pos: {
      small: { x: 800, y: 1000 },
      large: { x: 1300, y: 2200 },
    },
  },
  {
    name: "express-js",
    image: "/images/skill-items/express-js.png",
    width: 1000,
    height: 224,
    pos: {
      small: { x: 1600, y: 150 },
      large: { x: 4500, y: 500 },
    },
  },
  {
    name: "mysql",
    image: "/images/skill-items/mysql.png",
    width: 1000,
    height: 520,
    pos: {
      small: { x: 300, y: 1800 },
      large: { x: 1800, y: 2700 },
    },
  },
  {
    name: "docker",
    image: "/images/skill-items/docker.png",
    width: 1000,
    height: 733,
    pos: {
      small: { x: 2000, y: 600 },
      large: { x: 3700, y: 900 },
    },
  },
  // {
  //   name: "git",
  //   image: "/images/skill-items/git.png",
  //   width: 1000,
  //   height: 999,
  //   pos: {
  //     small: { x: 400, y: 1200 },
  //     large: { x: 900, y: 1600 },
  //   },
  // },
  // {
  //   name: "github",
  //   image: "/images/skill-items/github.png",
  //   width: 1000,
  //   height: 975,
  //   pos: {
  //     small: { x: 1800, y: 400 },
  //     large: { x: 3200, y: 400 },
  //   },
  // },
];

export const aboutContent = [
  "I build interactive web interfaces using React, TypeScript, and modern technologies. Always learning new frameworks to deliver quality solutions.",
  "Focusing on JavaScript, TypeScript, React, Next.js, GSAP, Tailwind CSS, HTML, CSS, Git, REST APIs.",
  "I strive to deliver work on schedule, ensure every aspect meets high standards, and maintain open, effective communication throughout every project.",
];
