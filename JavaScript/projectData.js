// Project data stored as a JSON array for easy management
const projectData = [
    {
        id: 1,
        title: "IoT/Embedded Smart Fire Alarm System",
        type: "Hardware",
        techStack: ["ESP32", "React", "MQTT", "MongoDB", "Thermal Imaging"],
        //image: "../Photos/fire-alarm-system.jpg",
        shortDescription: "Multi-sensor fire detection platform with real-time dashboard and emergency alerts",
        details: [
          "Designed and engineered a smart fire alarm integrating ESP32 with sensors for smoke, temperature, humidity, and CO levels.",
          "Built a real-time dashboard using React and MQTT to visualize sensor readings and trigger alerts within milliseconds.",
          "Logged data to MongoDB for persistence and trend analysis across 400+ fire simulation trials.",
          "Reduced false alarms by 75% through environmental calibration algorithms and redundancy checks.",
          "Cut detection latency by 60 seconds on average compared to commercial systems through optimized data streaming.",
          "Tested across varied indoor environments for robustness in smoke, heat, and multi-sensor edge cases."
        ]
      },
      {
        id: 2,
        title: "SoleMate",
        type: "Mobile",
        techStack: ["React Native", "TensorFlow", "REST API", "CNN", "Cloud Hosting"],
        //image: "../Photos/solemate.jpg",
        shortDescription: "Mobile app that classifies shoes from user photos using CNN-based AI",
        details: [
          "Built and deployed a React Native app for real-time shoe recognition powered by a CNN trained on 10K+ samples.",
          "Connected front-end to a REST API backend for image classification with TensorFlow on the cloud.",
          "Applied transfer learning and data augmentation to achieve 92% classification accuracy in varied lighting conditions.",
          "Reduced average inference time by 45% using optimized model quantization and hosted endpoints.",
          "Enabled users to browse product suggestions or verify authenticity based on model confidence scores."
        ]
      },
      {
        id: 3,
        title: "TimeTracker+",
        type: "Web",
        techStack: ["Angular", "Node.js", "PostgreSQL", "AWS", "EC2", "RDS", "S3"],
        //image: "../Photos/time-tracker.png",
        shortDescription: "Enterprise-grade dashboard for time tracking, cost allocation, and team analytics",
        details: [
          "Built a full-stack Angular + Node.js application to manage employee work hours and departmental costs.",
          "Implemented secure REST APIs for data submission and querying with full token-based auth and rate-limiting.",
          "Deployed infrastructure on AWS (EC2 for backend, RDS for data, S3 for logs) with CI/CD for automated updates.",
          "Designed data visualizations for burn rate and cost analytics, enabling finance teams to identify inefficiencies.",
          "Adhered to OWASP standards and ensured GDPR-compliant data storage practices across all modules."
        ]
      },
      
      {
        id: 4,
        title: "Algorithmic Trading Platform",
        type: "AI",
        techStack: ["Python", "C++", "TensorFlow", "PyTorch", "Docker"],
        //image: "../Photos/trading-algo.png",
        shortDescription: "High-frequency trading system using ML to predict market trends.",
        details: [
          "Built a trading engine in C++ that could execute thousands of trades per second.",
          "Used Python to train LSTM and Transformer models to predict stock price direction.",
          "Connected the platform to multiple exchanges using a custom protocol handler.",
          "Set up daily backtests on historical data to measure model performance.",
          "Tracked return on investment over time to compare with market benchmarks.",
          "Used Docker for environment setup and job automation."
        ]
      },
      {
        id: 5,
        title: "Climate Trends Visualizer",
        type: "Web",
        techStack: ["Python", "Flask", "React", "D3.js", "AWS", "GIS"],
        //image: "../Photos/weather-trends.png",
        shortDescription: "Web tool to explore climate data with charts and maps.",
        details: [
          "Created a Flask API to serve global weather data going back several decades.",
          "Used React and D3.js to build charts that update in real time with filters.",
          "Mapped climate patterns using GIS layers with location-based filtering.",
          "Deployed to AWS with Lambda for backend and S3 for static site hosting.",
          "Added temperature and rainfall prediction models with 90%+ accuracy.",
          "Worked with large datasets and handled data cleaning and formatting."
        ]
      },
      {
        id: 6,
        title: "Personal Finance Tracker",
        type: "Mobile",
        techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow", "AWS Amplify"],
        //image: "../Photos/personal-finance-tracker.png",
        shortDescription: "Mobile app that helps users track spending and budget better.",
        details: [
          "Built a finance app in React Native with secure user login and data sync.",
          "Used Node.js and MongoDB for backend storage of user transactions.",
          "Connected to banks using OAuth for pulling in transaction history.",
          "Trained a TensorFlow model to give budgeting tips based on spending habits.",
          "Sent notifications for large transactions or unusual activity.",
          "Deployed with AWS Amplify for fast release and scaling."
        ]
      },
      {
        id: 7,
        title: "Blood Supply Optimization",
        type: "AI",
        techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Prophet", "Tableau"],
        //image: "../Photos/blood-supply-algo.png",
        shortDescription: "AI tool to help hospitals better manage blood inventory.",
        details: [
          "Analyzed blood usage data from hospitals to forecast demand by blood type.",
          "Used Prophet and Scikit-learn to build time series models.",
          "Built dashboards in Tableau to show predictions and inventory needs.",
          "Helped reduce waste and improve delivery between hospital locations.",
          "Cleaned and organized years of transfusion data for use in ML models.",
          "Worked with doctors and hospital admins to gather system feedback."
        ]
      },
      {
        id: 8,
        title: "Deep-Space Analogue Research",
        type: "Hardware",
        techStack: ["Python", "C/C++", "MQTT", "ROS", "Node.js", "Three.js"],
        //image: "../Photos/dare_project_image.jpg",
        shortDescription: "Drone system for mapping caves with no GPS signal.",
        details: [
          "Built a drone control system that sends sensor data through MQTT.",
          "Used ROS to coordinate tasks like movement and sensor logging.",
          "Mapped cave environments with multiple drones using real-time data.",
          "Built a 3D viewer with Three.js to see the environment as the drones explored.",
          "Handled offline logging and fault handling when connections dropped.",
          "Tested the system in analog environments for space exploration."
        ]
      },
      {
        id: 9,
        title: "SMART Intersection System",
        type: "AI",
        techStack: ["MATLAB", "Simulink", "Reinforcement Learning", "Computer Vision", "5G"],
        //image: "../Photos/autonomous_car_image.jpg",
        shortDescription: "Traffic system that helps autonomous cars move safely at intersections.",
        details: [
          "Simulated traffic flows in Simulink to test how cars respond at intersections.",
          "Trained reinforcement learning agents to choose when to stop or go.",
          "Built camera-based system to detect pedestrians and cyclists in real-time.",
          "Tested low-latency communication between vehicles using 5G protocols.",
          "Reduced congestion and safety incidents in test simulations.",
          "Worked with real traffic footage to tune models and camera parameters."
        ]
      },
      {
        id: 10,
        title: "Word Guessing Game",
        type: "Web",
        techStack: ["Java", "JavaFX", "Markov Chains", "NLP", "WebSockets"],
        //image: "../Photos/word_guessing_game_image.jpg",
        shortDescription: "Multiplayer word game with smart AI opponents.",
        details: [
          "Built a turn-based game in JavaFX where users guess secret words.",
          "Used Markov Chains to make AI players choose realistic guesses.",
          "Added multiplayer with WebSocket support and ranking system.",
          "Included difficulty scaling and performance tracking features.",
          "Ran tests to improve AI response times and reduce game lag.",
          "Designed a polished UI with animations and sound effects."
        ]
      },
      {
        id: 11,
        title: "Battle of Bands",
        type: "Mobile",
        techStack: ["Swift", "UIKit", "Core Animation", "Bayesian Networks", "SpriteKit"],
        //image: "../Photos/battle_of_bands_image.jpg",
        shortDescription: "iOS game with characters, upgrades, and turn-based combat.",
        details: [
          "Created a tactical game in Swift using SpriteKit and UIKit.",
          "Designed characters with different powers and attack types.",
          "Used Bayesian models to let AI opponents learn from player behavior.",
          "Built animation and visual effects for battles and level transitions.",
          "Added game progression and save/load features using Core Data.",
          "Tested on multiple iOS devices for performance and touch accuracy."
        ]
      },
      {
        id: 12,
        title: "Exam Review App",
        type: "Mobile",
        techStack: ["Swift", "Core Data", "SQLite", "Machine Learning", "AWS"],
        //image: "../Photos/exam_review_app_image.jpg",
        shortDescription: "Mobile app for personalized study sessions and quiz prep.",
        details: [
          "Created an app to help students review for exams with flashcards and quizzes.",
          "Stored user progress using Core Data and synced with AWS.",
          "Used spaced repetition algorithms to plan review schedules.",
          "Tracked quiz scores and recommended topics to revisit.",
          "Allowed users to share notes and study sets with classmates.",
          "Improved average test scores during pilot trials at 2 schools."
        ]
      }
        
];