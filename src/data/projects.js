// src/data/projects.js
export const projects = [
  {
    slug: "update-manager",
    title: "HW/SW Update Manager",
    desc: "BLE gateway (Raspberry Pi) ↔ CC2651R3SIPA nodes. Version binding, low-power, OTA safety checks.",
    tags: ["Rust", "C", "BLE", "Raspberry Pi", "OTA"],
    detail: {
      problem: "OTA updates for battery nodes must be safe, resumable and power-aware.",
      approach: [
        "Gateway (RPi) orchestrates BLE sessions; version binding to avoid partial mismatches.",
        "State machine with checkpoints; AB-style safety checks and retry windows.",
        "Measured sleep currents, packet loss under interference, and recovery paths."
      ],
      results: [
        "Zero-brick update flow in lab tests.",
        "Latency and drop-rate baselines documented; safe rollback path."
      ]
    }
  },
  {
    slug: "rust-cxx-bus",
    title: "Rust↔C++ Message Bus",
    desc: "cxx bridge, typed shared structs, YANG ops; structured logs + tests; fits embedded Linux images.",
    tags: ["Rust", "C++", "FFI", "Yocto"],
    detail: {
      problem: "Interop between Rust services and existing C++ daemons without fragile ABI glue.",
      approach: [
        "Used cxx for safe FFI; shared typed structs; YANG operation mapping.",
        "Unit tests + GitHub Actions; Yocto recipe for reproducible build."
      ],
      results: [
        "Reduced integration bugs; better observability with structured logs."
      ]
    }
  },
  {
    slug: "opencl-ct-reflection",
    title: "OpenCL CT Reflection",
    desc: "GPU interpolation matching SciPy griddata; MSE + timing; deterministic numerics.",
    tags: ["OpenCL", "C++", "Numerics"],
    detail: {
      problem: "Fast, reproducible interpolation for CT-like datasets.",
      approach: [
        "OpenCL kernels benchmarked vs SciPy griddata.",
        "Deterministic numerics, MSE and timing baselines."
      ],
      results: ["Order-of-magnitude speedup on supported GPUs; reproducible runs."]
    }
  },
  {
    slug: "ble-sensor-nodes",
    title: "BLE Sensor Nodes",
    desc: "CC2651 firmware; SPI/I²C drivers; power-aware buffering; RPi gateway state machine.",
    tags: ["BLE", "CC2651", "Drivers"],
    detail: {
      problem: "Low-power sensing with reliable gateway sync.",
      approach: [
        "Drivers over SPI/I²C; ring buffers; duty-cycle aware transmissions.",
        "RPi gateway state machine with metrics."
      ],
      results: ["Stable sync; predictable power profile."]
    }
  }
];
