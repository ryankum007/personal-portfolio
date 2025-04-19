// Project data stored as a JSON array for easy management
const projectData = [
    {
        id: 1,
        title: "Algorithmic Trading Platform",
        type: "AI",
        techStack: ["Python", "C++", "TensorFlow", "PyTorch", "Docker"],
        image: "../Photos/trading-algo.png", 
        shortDescription: "Next-generation high-frequency trading platform with advanced ML algorithms for market prediction",
        details: [
            "Architected a cutting-edge high-frequency trading (HFT) platform capable of executing 10,000+ trades per second with sub-millisecond latency",
            "Engineered custom C++ kernel modules for ultra-fast market data processing, reducing execution time by 73% compared to industry standard solutions",
            "Implemented ensemble of LSTM, Transformer, and custom neural network models for predictive analytics with 81% directional accuracy",
            "Integrated with 15+ global exchanges and dark pools via custom FIX protocol implementation",
            "Achieved 15% ROI in the first quarter post-launch, outperforming benchmark indices by 11.3%",
            "Developed automated backtesting framework running 10,000+ simulations daily across 20 years of historical data"
        ]
    },
    {
        id: 2,
        title: "Climate Trends Visualizer",
        type: "Web",
        techStack: ["Python", "Flask", "React", "D3.js", "AWS", "GIS"],
        image: "../Photos/weather-trends.png",
        shortDescription: "Interactive visualization platform transforming complex climate data into actionable insights with ML-powered forecasting",
        details: [
            "Developed a groundbreaking web platform processing and visualizing 2.3 petabytes of global climate data from 1970-present",
            "Engineered custom GIS integration for high-resolution mapping of climate patterns with 1km² precision worldwide",
            "Built scalable Flask backend using AWS Lambda and DynamoDB for real-time data processing of satellite imagery",
            "Created interactive React components with D3.js visualizations handling 10+ million data points with 60fps performance",
            "Implemented ML models with 95% prediction accuracy for temperature and precipitation forecasting up to 10 years in advance",
            "Featured by National Geographic and the World Economic Forum for its impact on climate research and policy development"
        ]
    },
    {
        id: 3,
        title: "Personal Finance Tracker",
        type: "Mobile",
        techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow", "AWS Amplify"],
        image: "../Photos/personal-finance-tracker.png",
        shortDescription: "Revolutionary cross-platform finance app with AI-powered insights, predictive budgeting, and multi-bank integration",
        details: [
            "Designed and launched a feature-rich mobile finance platform with 99.9% uptime and military-grade encryption",
            "Implemented seamless integration with 500+ financial institutions worldwide via OAuth2.0 authentication",
            "Engineered custom TensorFlow models analyzing 2+ years of transaction data to predict spending patterns with 92% accuracy",
            "Built real-time notification system processing 10,000+ daily alerts with less than 100ms latency",
            "Reduced users' average financial management time by 6.2 hours monthly while improving savings rates by 30%",
            "Scaled to 250,000+ users within 6 months of launch with 4.8/5 average rating across app stores"
        ]
    },
    {
        id: 4,
        title: "Blood Supply Optimization",
        type: "AI",
        techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Prophet", "Tableau"],
        image: "../Photos/blood-supply-algo.png",
        shortDescription: "Life-saving AI system revolutionizing hospital blood inventory management with predictive analytics",
        details: [
            "Created an award-winning AI system that revolutionized blood supply chain management across 26 major hospitals",
            "Developed sophisticated time-series forecasting models analyzing 10+ years of transfusion records and seasonal patterns",
            "Engineered custom patient classification algorithms to predict blood type demand with 96.7% accuracy",
            "Reduced emergency blood transfers between facilities by 78% through intelligent distribution optimization",
            "Decreased blood wastage by 42% annually, saving an estimated $3.6M in healthcare costs",
            "Presented research findings at the International Society of Blood Transfusion conference, receiving industry recognition"
        ]
    },
    {
        id: 5,
        title: "Advanced Smoke Detector",
        type: "Hardware",
        techStack: ["C/C++", "ARM", "TensorFlow Lite", "IoT", "AWS IoT Core"],
        image: "../Photos/smoke_detector_image.jpg",
        shortDescription: "Next-gen IoT smoke detection system with AI environmental analysis and automated emergency response",
        details: [
            "Engineered a revolutionary smoke detection system with multi-spectral sensors capable of identifying 15+ types of fire hazards",
            "Designed custom PCB with ARM Cortex-M7 microcontroller optimized for edge AI processing with 20+ hour backup power",
            "Implemented TensorFlow Lite models that distinguish between cooking smoke, chemical fires, and false positives with 99.8% accuracy",
            "Created mesh network capability allowing 200+ units to communicate across 50,000+ sq ft buildings with redundant connectivity",
            "Integrated with smart home systems and emergency services reducing average response time by 3.2 minutes",
            "Awarded two patents for novel detection algorithms and distributed sensing architecture"
        ]
    },
    {
        id: 6,
        title: "Deep-Space Analogue Research",
        type: "Hardware",
        techStack: ["Python", "C/C++", "MQTT", "ROS", "Node.js", "Three.js"],
        image: "../Photos/dare_project_image.jpg",
        shortDescription: "Pioneering autonomous drone swarm system for mapping extreme and extraterrestrial-like environments",
        details: [
            "Led development of a revolutionary drone swarm system that autonomously maps geologically complex cave systems unreachable by humans",
            "Engineered multi-spectral sensor array capturing 6TB+ of environmental data per mission across light, radiation, gas composition and geological formations",
            "Designed fault-tolerant communication system maintaining connectivity 1.2km underground with 99.97% reliability",
            "Created stunning 3D visualization platform with Three.js and custom WebGL shaders processing billion+ data points",
            "Implemented autonomous path-finding algorithms enabling drones to navigate through unmapped terrain with 10cm precision",
            "System adopted by NASA JPL for Mars cave exploration simulation and extreme environment research"
        ]
    },
    {
        id: 7,
        title: "SMART Intersection System",
        type: "AI",
        techStack: ["MATLAB", "Simulink", "Reinforcement Learning", "Computer Vision", "5G"],
        image: "../Photos/autonomous_car_image.jpg",
        shortDescription: "Revolutionary traffic control system for autonomous vehicles using distributed reinforcement learning",
        details: [
            "Pioneered groundbreaking intelligent traffic system coordinating autonomous and manual vehicles at complex intersections",
            "Developed multi-agent reinforcement learning models reducing transit time by 43% compared to traditional traffic light systems",
            "Engineered sophisticated simulation environment in Simulink modeling 10,000+ vehicle interactions with physics-accurate parameters",
            "Implemented V2V communication protocols using 5G and DSRC with end-to-end latency under 5ms for critical safety operations",
            "Created computer vision systems identifying pedestrians and cyclists with 99.96% accuracy in adverse weather conditions",
            "Demonstrated 73% reduction in congestion and 91% decrease in near-miss incidents during 6-month pilot program"
        ]
    },
    {
        id: 8,
        title: "Word Guessing Game",
        type: "Web",
        techStack: ["Java", "JavaFX", "Markov Chains", "NLP", "WebSockets"],
        image: "../Photos/word_guessing_game_image.jpg",
        shortDescription: "Addictive multiplayer word game with sophisticated AI opponents powered by NLP and Markov models",
        details: [
            "Created engaging multiplayer word game supporting 10,000+ concurrent users with 20ms network responsiveness",
            "Implemented sophisticated AI opponents using natural language processing and adaptive difficulty scaling",
            "Developed proprietary Markov Chain vocabulary model trained on 12M+ English texts with context-awareness",
            "Built real-time matchmaking system with ELO-based ranking algorithm across 5 difficulty tiers",
            "Designed responsive UI with custom animations and accessibility features supporting 8 languages",
            "Won 'Best Game Design' award at university showcase and featured in Java Developer Monthly magazine"
        ]
    },
    {
        id: 9,
        title: "Battle of Bands",
        type: "Mobile",
        techStack: ["Swift", "UIKit", "Core Animation", "Bayesian Networks", "SpriteKit"],
        image: "../Photos/battle_of_bands_image.jpg",
        shortDescription: "Captivating iOS tactical game featuring dynamic combat systems and advanced AI opponents",
        details: [
            "Developed visually stunning iOS game with 60+ hours of gameplay and complex strategic mechanics",
            "Created 3 unique character classes with 12 subclasses each featuring distinct abilities and progression paths",
            "Engineered sophisticated AI opponents using Bayesian decision networks that adapt to player strategies",
            "Implemented physics-based battle system with 200+ unique animations and particle effects",
            "Designed procedurally generated campaign mode with 1,000+ unique encounters and branching storylines",
            "Featured on Apple's 'Games We Love' collection with 500,000+ downloads and 4.7/5 star rating"
        ]
    },
    {
        id: 10,
        title: "Exam Review App",
        type: "Mobile",
        techStack: ["Swift", "Core Data", "SQLite", "Machine Learning", "AWS"],
        image: "../Photos/exam_review_app_image.jpg",
        shortDescription: "Personalized exam preparation platform with adaptive learning algorithms that evolve with student progress",
        details: [
            "Designed comprehensive study app supporting 15+ academic disciplines with 50,000+ questions and materials",
            "Built adaptive learning algorithm analyzing student performance to customize review materials and optimize retention",
            "Implemented spaced repetition system boosting average test scores by 27% compared to traditional study methods",
            "Created collaborative study features allowing students to share notes and create group study sessions",
            "Developed offline mode with intelligent content syncing, reducing data usage by 78% while maintaining functionality",
            "Deployed to 12+ universities as official study companion with measurable improvement in student performance"
        ]
    },
    {
        id: 11,
        title: "Robotic Arm Project",
        type: "Hardware",
        techStack: ["Python", "EMG", "Autodesk Inventor", "ROS", "Computer Vision"],
        image: "../Photos/robotic_arm_project_image.jpg",
        shortDescription: "Advanced prosthetic-inspired robotic system controlled by muscle signals with precision object recognition",
        details: [
            "Engineered cutting-edge robotic arm with 6 degrees of freedom achieving human-like dexterity and 0.1mm precision",
            "Implemented EMG sensor array processing muscle signals with 98% accuracy using custom signal processing algorithms",
            "Developed computer vision system capable of identifying 100+ objects and adjusting grip strength automatically",
            "Created medical-grade sterilization container allowing operation in hospital and laboratory settings",
            "Built intuitive training system reducing learning curve from weeks to hours for new operators",
            "Prototype adopted by leading research hospital for development of next-generation assistive technologies"
        ]
    }
];