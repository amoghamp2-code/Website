// src/data/projects.js
export const projects = [
{
  slug: "update-manager",
  title: "HW/SW Update Manager",
  desc: "Ensures correct firmware-hardware pairing with OTA updates via BLE between Raspberry Pi and CC2651R3SIPA nodes.",
  tags: ["C", "Python", "BLE", "Raspberry Pi", "OTA", "TI-SDK"],
  detail: {
    problem: "Firmware–hardware mismatches often lead to bricked devices or unstable behavior.",
    approach: [
      "Implemented a Git-based subtree structure to bind firmware versions to matching hardware revisions.",
      "Used TI SDK and TI BLE Stack to establish a custom GATT profile for OTA updates between Raspberry Pi and CC2651R3SIPA nodes.",
      "Python script on Raspberry Pi handles firmware packet segmentation, BLE transmission, and CRC validation.",
      "Added rollback logic triggered by failed CRC checks to ensure safe recovery and prevent partial updates."
    ],
    results: [
      "Achieved consistent, mismatch-free updates across multiple hardware revisions.",
      "Validated CRC-based integrity and rollback on physical CC2651R3SIPA LaunchPads in lab conditions.",
      "Demonstrated a reliable, version-controlled OTA workflow ready for scalable embedded deployments."
    ]
  }
},
{
  slug: "advanced-mining-suit",
  title: "Advanced Mining Suit (ESP32)",
  desc: "Carbon-fiber smart suit with gas, temperature, motion, heart-rate sensing and ESP-NOW multi-hop alerts for no-coverage mines.",
  tags: ["ESP32", "ESP-NOW", "IoT", "Wearables", "Embedded", "Safety", "Sensors"],
  detail: {
    problem: "Underground mines often lack network coverage; workers need on-body sensing and reliable, low-latency alerts without Wi-Fi or cellular.",
    approach: [
      "Built a sensorized suit using carbon-fiber cloth: gas (toxic leak), temperature (heat stress), motion (fall/immobility), and heart-rate (vitals).",
      "Used ESP32 modules with ESP-NOW; configured nodes to act as lightweight repeaters so alerts can hop suit→gateway even without infrastructure.",
      "Battery-powered design with on-suit LEDs/buzzer for immediate ‘danger ahead / do not proceed’ feedback.",
      "Central base unit aggregates alerts, raises help requests, and logs events for post-incident analysis.",
    ],
    results: [
      "Lab prototype demonstrated end-to-end alerting from suit to central unit via multi-hop ESP-NOW relays.",
      "Local LED/buzzer warnings provided instant on-body feedback during gas/heat/fall simulations.",
      "Design validated for no-coverage scenarios and ready for field-testing and ruggedization."
    ]
  }
},

{
  slug: "portable-ventilator",
  title: "Portable Ventilator",
  desc: "Low-cost Arduino-based ventilator prototype using Ambu bag actuation for emergency respiratory support during COVID-19.",
  tags: ["Arduino", "C++", "Stepper Motor", "Embedded", "Healthcare", "Mechanical Design"],
  detail: {
    problem: "During the COVID-19 pandemic, ventilator shortages left hospitals and rural clinics unable to support patients needing assisted respiration. The goal was to design a simple, low-cost backup solution using readily available components.",
    approach: [
      "Developed a microcontroller-based prototype using Arduino and a stepper motor with a geared linkage to compress a standard Ambu bag.",
      "Implemented a time-based control loop to regulate breathing rhythm and duration, mimicking manual ventilation cycles.",
      "Enabled dual power options mains adapter and rechargeable battery to maintain operation during power cuts.",
      "Constructed the mechanism with lightweight materials for portability and rapid local manufacturing during emergencies.",
      "Focused on proof-of-concept feasibility and ease of assembly over clinical calibration to prioritize fast deployment in crisis conditions."
    ],
    results: [
      "Demonstrated consistent mechanical actuation of Ambu bag under lab testing conditions.",
      "Recognized as a functional prototype and awarded in a Government Ideathon for pandemic-response innovation.",
      "Showcased the potential of simple embedded-mechanical systems to provide temporary respiratory assistance in resource-limited settings."
    ],
    disclaimer: "Prototype built for demonstration and innovation challenge purposes; not a certified medical device."
  }
},

{
  slug: "ar-hmi-iiot",
  title: "AR HMI for IIoT (ThingWorx + Creo)",
  desc: "Mobile AR demo linking IIoT production metrics from ThingWorx to 3D equipment models in Creo for contextual HMI visualization.",
  tags: ["AR", "IIoT", "ThingWorx", "Creo", "Mobile AR", "Industrial UX", "Blender"],
  detail: {
    problem: "Operators and engineers face cognitive overload when switching between physical equipment and separate HMI dashboards during monitoring tasks.",
    approach: [
      "Developed during an internship at IIT Delhi to explore AR-assisted visualization of industrial data.",
      "Integrated live production metrics from PTC ThingWorx into CAD models built in Creo.",
      "Used Blender to create lightweight motion cues and state-change animations (e.g., flow arrows, status transitions) to make KPIs glanceable in AR.",
      "Displayed contextual HMI data—such as throughput, temperature, and alerts—directly on the corresponding machine component via mobile AR.",
      "Focused on visual clarity and alignment of virtual overlays for real-time situational awareness."
    ],
    results: [
      "Demonstrated a working proof-of-concept showing real IIoT data mapped onto 3D physical assets.",
      "Reduced cognitive load by eliminating the need to reference separate control screens.",
      "Provided a scalable foundation for future AR–HMI integrations in manufacturing environments."
    ]
  }
},

{
  slug: "dualcore-riscv",
  title: "Dual-Core RISC-V Processor",
  desc: "Custom symmetric RISC-V CPU designed from scratch in Verilog/VHDL with interrupt controller and direct-mapped cache, validated on FPGA.",
  tags: ["Verilog", "VHDL", "RISC-V", "FPGA", "Vivado"],
  detail: {
    problem: "Needed a ground-up understanding of RISC-V architecture and multicore CPU design, including custom interrupt and cache logic.",
    approach: [
      "Developed a dual-core symmetric RISC-V processor from scratch using Verilog, building the ALU, control unit, registers, and interconnects.",
      "Integrated a custom interrupt controller and implemented a direct-mapped instruction/data cache to improve memory access performance.",
      "Replaced the default RISC-V core in PULPino with the custom design to evaluate ISA compliance and stability.",
      "Synthesized and deployed the design on FPGA using Vivado, verifying functional correctness through on-board execution and display output."
    ],
    results: [
      "Successful boot and execution of simple applications on FPGA hardware.",
      "Verified stable dual-core operation and interrupt handling with consistent cache performance.",
      "Demonstrated full integration of a custom RISC-V core into the PULPino SoC framework."
    ]
  }
},

{
  slug: "smart-farm",
  title: "Smart Farm Monitoring System",
  desc: "IoT-based farm automation setup using Firebase and Kodular app for live environmental monitoring and alerts.",
  tags: ["IoT", "Firebase", "Sensors", "ESP32", "Kodular", "Automation"],
  detail: {
    problem: "Manual monitoring of soil and weather conditions reduces agricultural efficiency, especially in remote or small-scale farms without automated systems.",
    approach: [
      "Developed a low-cost IoT solution integrating environmental sensors (soil moisture, temperature, humidity) with an ESP32 microcontroller.",
      "Configured real-time data synchronization to Firebase, enabling remote access to live sensor readings.",
      "Built a mobile application using Kodular for farmers to view live data, receive alerts, and track changes over time.",
      "Designed the system architecture for modular sensor addition and minimal maintenance with cloud-based storage."
    ],
    results: [
      "Achieved stable real-time monitoring and alerting through Firebase–Kodular integration.",
      "Demonstrated scalable, affordable farm monitoring prototype suitable for small-scale agricultural use.",
      "Showed potential for expansion into automated irrigation or weather-based control modules."
    ]
  }
},
{
  slug: "climate-risk-app",
  title: "Climate Risk Management App",
  desc: "Android app integrating weather forecasting and warehouse risk analytics; 3rd place internationally at Apparthon.",
  tags: ["Android Studio", "Firebase", "Java", "Weather API", "Logistics", "App Development"],
  detail: {
    problem: "Warehousing and logistics operations often face losses due to unexpected weather events, poor environmental visibility, and delayed response systems.",
    approach: [
      "Developed an Android application that combines live weather data with warehouse management to predict and mitigate climate-related risks.",
      "Integrated free weather forecasting APIs to monitor temperature, humidity, and rainfall, alerting logistics teams of potential storage risks.",
      "Used Firebase as the backend for real-time synchronization of environmental data, alerts, and user activity.",
      "Designed intuitive dashboards for logistics managers to visualize climate risk factors and plan safe dispatch or storage operations.",
      "Collaborated within a multidisciplinary team to prototype, test, and present the solution at the Apparthon international hackathon."
    ],
    results: [
      "Won 3rd place internationally at the Apparthon competition for innovation in logistics and sustainability.",
      "Demonstrated the feasibility of a cloud-linked weather risk assessment system for warehousing and transport.",
      "Received positive jury feedback for combining data-driven prediction with practical business usability."
    ]
  }
},
{
  slug: "skin-cancer-detection",
  title: "Skin Cancer Detection (Raspberry Pi + DL)",
  desc: "Government-funded device using EfficientNet-B7 for melanoma detection on low-cost embedded hardware.",
  tags: ["Python", "Deep Learning", "EfficientNet-B7", "Raspberry Pi", "Healthcare AI"],
  detail: {
    problem: "Early detection of melanoma is difficult in rural areas lacking dermatology specialists or advanced diagnostic tools.",
    approach: [
      "Collected and curated image data from the HAM10000 dataset and a local cancer hospital (with patient consent) to build a representative dataset.",
      "Trained an EfficientNet-B7 model for melanoma classification, balancing model size and accuracy for embedded inference.",
      "Deployed the model on a Raspberry Pi prototype configured for offline analysis to deliver real-time preliminary diagnosis without cloud dependency.",
      "Integrated a simple camera interface and on-device inference pipeline to ensure usability in low-infrastructure environments."
    ],
    results: [
      "Demonstrated reliable on-device detection of melanoma on low-cost hardware.",
      "Prototype supported early screening in remote regions, reducing reliance on centralized hospitals.",
      "Developed as part of a Government of Karnataka–funded initiative for affordable rural healthcare innovation."
    ]
  }
},

{
  slug: "ar-soldering-training",
  title: "AR-Assisted Soldering Training (Schneider Electric)",
  desc: "Unity-based AR system guiding factory trainees through step-by-step soldering with marker-based overlays and safety cues.",
  tags: ["AR", "Unity", "Manufacturing", "Training", "Soldering", "Factory", "Blender"],
  detail: {
    problem: "Training new operators for soldering tasks was time-consuming and inconsistent, often requiring direct supervision and repeated demonstrations.",
    approach: [
      "Developed at Schneider Electric as a factory pilot to test AR-guided operator training.",
      "Built in Unity with marker-based tracking to overlay soldering steps, tool angles, and safety zones onto the workstation.",
      "Authored short Blender animations for tip angle, dwell-time timing bars, and common-fault demos to make steps visually unambiguous.",
      "Displayed visual prompts and sequence highlights for each step, and reducing instructor dependence.",
      "Included contextual safety cues such as ESD warnings and proper ventilation reminders."
    ],
    results: [
      "Improved trainee accuracy and reduced errors during practice sessions in the pilot run.",
      "Lowered instructor involvement while maintaining process consistency.",
      "Validated the effectiveness of AR for procedural manufacturing skill training."
    ]
  }
},
{
  slug: "ar-oscilloscope-edu",
  title: "AR Oscilloscope Tutor",
  desc: "Educational Unity AR app that teaches oscilloscope basics through interactive knob overlays and guided explanations.",
  tags: ["AR", "Unity", "Education", "Electronics", "App Development", "Blender"],
  detail: {
    problem: "Students often struggle to understand oscilloscope controls and measurement principles without direct lab access.",
    approach: [
      "Built as a self-learning AR project using Unity for mobile devices.",
      "Displayed virtual overlays explaining each knob’s function—time/div, volts/div, trigger, etc. to simulate interaction without the real instrument.",
      "Created concise Blender animations for knob-turn feedback, trigger edge behavior, and scaling effects to reinforce concepts.",
      "Added guided prompts and annotations to connect concepts like waveform scaling and triggering to their practical purpose.",
      "Focused on visual clarity and conceptual understanding rather than hardware simulation."
    ],
    results: [
      "Served as an accessible teaching aid for beginners to grasp oscilloscope operation remotely.",
      "Encouraged interactive learning by linking theory to intuitive visual feedback.",
      "Demonstrated the potential of AR for quick, low-cost educational content creation."
    ]
  }
}


];
