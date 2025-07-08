export interface ThreatExample {
  name: string;
  description: string;
  impact: string;
  lessons: string;
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  students: number;
  objectives: string[];
  prerequisites: string[];
  syllabus: {
    module: string;
    topics: string[];
    duration: string;
  }[];
  skills: string[];
  certification: boolean;
  imageUrl: string;
  threatExamples?: ThreatExample[];
  practicalExercises?: string[];
}

export const coursesData: CourseData[] = [
  {
    id: "cybersec-fundamentals",
    title: "Cybersecurity Fundamentals",
    description:
      "Comprehensive foundation course covering cybersecurity principles, threat landscapes, risk management, and practical security implementations. Learn through real-world case studies and hands-on exercises.",
    instructor: "Dr. Sarah Chen",
    duration: "8 weeks",
    lessons: 32,
    difficulty: "Beginner",
    category: "Fundamentals",
    rating: 4.8,
    students: 12547,
    objectives: [
      "Master the CIA triad and cybersecurity principles",
      "Analyze real-world cyber threats and attack vectors",
      "Implement comprehensive security frameworks",
      "Develop advanced risk assessment methodologies",
      "Design incident response and recovery procedures",
      "Understand compliance requirements and governance",
    ],
    prerequisites: ["Basic computer literacy", "Understanding of networks"],
    syllabus: [
      {
        module: "Cybersecurity Foundations & Threat Landscape",
        topics: [
          "CIA Triad deep dive with case studies",
          "Current threat landscape analysis",
          "Threat actor profiling and motivations",
          "Attack kill chain methodology",
          "Cybersecurity frameworks (NIST, ISO 27001)",
          "Real-world breach analysis: Target, Equifax, SolarWinds",
        ],
        duration: "2 weeks",
      },
      {
        module: "Risk Management & Assessment",
        topics: [
          "Quantitative and qualitative risk assessment",
          "Threat modeling methodologies",
          "Business impact analysis",
          "Risk treatment strategies",
          "Continuous monitoring programs",
          "Case study: Capital One breach risk factors",
        ],
        duration: "2 weeks",
      },
      {
        module: "Security Controls & Implementation",
        topics: [
          "Administrative, technical, and physical controls",
          "Defense in depth strategies",
          "Access control models (RBAC, ABAC, MAC)",
          "Cryptographic controls and key management",
          "Security architecture principles",
          "Hands-on: Building a security control matrix",
        ],
        duration: "2 weeks",
      },
      {
        module: "Incident Response & Digital Forensics",
        topics: [
          "NIST incident response framework",
          "Evidence collection and chain of custody",
          "Malware analysis fundamentals",
          "Network forensics basics",
          "Business continuity and disaster recovery",
          "Simulation: Ransomware incident response",
        ],
        duration: "2 weeks",
      },
    ],
    skills: [
      "Risk Assessment",
      "Security Controls",
      "Incident Response",
      "Compliance",
      "Threat Analysis",
      "Forensics Fundamentals",
    ],
    certification: true,
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
    threatExamples: [
      {
        name: "WannaCry Ransomware",
        description:
          "Global ransomware attack exploiting Windows SMB vulnerability, affecting 300,000+ computers worldwide including UK's NHS",
        impact:
          "Healthcare systems shutdown, manufacturing disruption, $4 billion estimated damages",
        lessons:
          "Importance of patch management, network segmentation, and backup strategies",
      },
      {
        name: "Phishing Campaign Targeting COVID-19 Relief",
        description:
          "Sophisticated phishing emails impersonating government agencies offering pandemic relief funds",
        impact:
          "Thousands of individuals compromised, identity theft, financial fraud",
        lessons:
          "Social engineering awareness, email verification, multi-factor authentication",
      },
      {
        name: "Insider Threat: Edward Snowden",
        description:
          "Privileged user accessing and exfiltrating classified NSA documents",
        impact:
          "National security compromise, diplomatic tensions, intelligence operations exposed",
        lessons:
          "Privileged access management, continuous monitoring, least privilege principle",
      },
    ],
    practicalExercises: [
      "Conduct risk assessment for small business",
      "Analyze phishing email headers",
      "Design security awareness training program",
      "Create incident response playbook",
      "Implement basic security controls audit",
    ],
  },
  {
    id: "network-security",
    title: "Network Security Essentials",
    description:
      "Advanced network security course covering enterprise-grade security implementations, threat hunting, and real-time attack mitigation. Master cutting-edge technologies and respond to sophisticated network attacks.",
    instructor: "Michael Rodriguez",
    duration: "10 weeks",
    lessons: 40,
    difficulty: "Intermediate",
    category: "Network Security",
    rating: 4.7,
    students: 8934,
    objectives: [
      "Design zero-trust network architectures",
      "Deploy advanced firewall and VPN solutions",
      "Implement AI-powered threat detection systems",
      "Master network forensics and threat hunting",
      "Respond to APT and nation-state attacks",
      "Secure cloud and hybrid network environments",
    ],
    prerequisites: [
      "Basic networking knowledge",
      "TCP/IP fundamentals",
      "Linux command line",
    ],
    syllabus: [
      {
        module: "Advanced Network Security Architecture",
        topics: [
          "Zero-trust network design principles",
          "Software-defined perimeter (SDP)",
          "Network micro-segmentation strategies",
          "Secure network protocols deep dive",
          "Cloud network security models",
          "Case study: Analyzing the SolarWinds network compromise",
        ],
        duration: "3 weeks",
      },
      {
        module: "Next-Generation Security Technologies",
        topics: [
          "NGFW configuration and management",
          "IPSec and SSL VPN implementation",
          "SD-WAN security considerations",
          "Network access control (NAC) deployment",
          "DNS security and threat intelligence",
          "Hands-on: Building enterprise firewall rules",
        ],
        duration: "3 weeks",
      },
      {
        module: "Network Threat Detection & Response",
        topics: [
          "Advanced SIEM deployment and tuning",
          "Machine learning for anomaly detection",
          "Network behavior analysis (NBA)",
          "Threat hunting methodologies",
          "Automated incident response workflows",
          "Lab: Detecting lateral movement attacks",
        ],
        duration: "2 weeks",
      },
      {
        module: "Wireless & Mobile Network Security",
        topics: [
          "Enterprise WiFi security (WPA3, 802.1X)",
          "5G network security implications",
          "IoT device network isolation",
          "Mobile device network policies",
          "Bluetooth and NFC security",
          "Practical: WiFi penetration testing",
        ],
        duration: "2 weeks",
      },
    ],
    skills: [
      "Firewall Configuration",
      "VPN Setup",
      "Network Monitoring",
      "Wireless Security",
      "Threat Hunting",
      "Zero Trust Architecture",
      "SIEM Management",
    ],
    certification: true,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    threatExamples: [
      {
        name: "APT28 (Fancy Bear) Network Infiltration",
        description:
          "Russian state-sponsored group using spear-phishing and network lateral movement to access government networks",
        impact:
          "Democratic Party email breach, Olympic doping scandal exposure, military intelligence theft",
        lessons:
          "Network segmentation, privileged access monitoring, behavioral analytics importance",
      },
      {
        name: "Mirai Botnet DDoS Attacks",
        description:
          "IoT botnet targeting DNS infrastructure causing massive internet outages",
        impact:
          "Major websites inaccessible for hours, $110M+ estimated economic impact",
        lessons:
          "IoT security, network traffic filtering, DDoS mitigation strategies",
      },
      {
        name: "NotPetya Worm Propagation",
        description:
          "Self-propagating malware using SMB vulnerabilities to spread across networks globally",
        impact:
          "$10 billion+ in damages, shipping and manufacturing disruption worldwide",
        lessons:
          "Patch management, network isolation, backup and recovery planning",
      },
      {
        name: "BGP Hijacking Attacks",
        description:
          "Malicious actors redirecting internet traffic through compromised routes",
        impact:
          "Cryptocurrency theft, man-in-the-middle attacks, traffic interception",
        lessons:
          "BGP security measures, route monitoring, cryptographic verification",
      },
    ],
    practicalExercises: [
      "Configure pfSense firewall with advanced rules",
      "Deploy Wireshark for network traffic analysis",
      "Set up ELK stack for log correlation",
      "Implement WiFi enterprise authentication",
      "Simulate DDoS attack mitigation",
      "Build network threat hunting queries",
      "Design network segmentation strategy",
    ],
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking and Penetration Testing",
    description:
      "Master advanced ethical hacking techniques used by real-world attackers. Learn cutting-edge penetration testing methodologies, exploit development, and red team operations through immersive hands-on labs and real attack simulations.",
    instructor: "Alex Thompson",
    duration: "12 weeks",
    lessons: 48,
    difficulty: "Advanced",
    category: "Penetration Testing",
    rating: 4.9,
    students: 6721,
    objectives: [
      "Master advanced penetration testing frameworks (PTES, OWASP, NIST)",
      "Develop custom exploits and attack tools",
      "Conduct sophisticated red team operations",
      "Perform advanced persistent threat (APT) simulations",
      "Execute complex social engineering campaigns",
      "Write comprehensive penetration test reports with executive summaries",
    ],
    prerequisites: [
      "Network fundamentals",
      "Linux command line proficiency",
      "Programming in Python/Bash",
      "Basic cybersecurity knowledge",
    ],
    syllabus: [
      {
        module: "Advanced Penetration Testing Methodology",
        topics: [
          "PTES and OWASP testing guide deep dive",
          "Legal frameworks and ethical considerations",
          "Rules of engagement and scope definition",
          "Threat modeling for penetration tests",
          "Red team vs blue team dynamics",
          "Case study: Reproducing the Target breach attack path",
        ],
        duration: "2 weeks",
      },
      {
        module: "Reconnaissance & Intelligence Gathering",
        topics: [
          "Advanced OSINT techniques and automation",
          "Social media intelligence gathering",
          "DNS enumeration and subdomain discovery",
          "Network reconnaissance and port scanning",
          "Physical reconnaissance techniques",
          "Lab: Building comprehensive target profiles",
        ],
        duration: "2 weeks",
      },
      {
        module: "Vulnerability Assessment & Exploitation",
        topics: [
          "Advanced vulnerability scanning and analysis",
          "Custom exploit development techniques",
          "Buffer overflow exploitation",
          "Network service exploitation",
          "Client-side attack vectors",
          "Hands-on: Exploiting known CVEs in lab environment",
        ],
        duration: "3 weeks",
      },
      {
        module: "Web Application & API Security Testing",
        topics: [
          "OWASP Top 10 advanced exploitation",
          "SQL injection automation and bypasses",
          "Advanced XSS and CSRF techniques",
          "API security testing methodologies",
          "Authentication and session management flaws",
          "Practical: Testing real-world web applications",
        ],
        duration: "2 weeks",
      },
      {
        module: "Post-Exploitation & Persistence",
        topics: [
          "Advanced privilege escalation techniques",
          "Living off the land (LOTL) attacks",
          "Persistence mechanisms and backdoors",
          "Lateral movement and pivoting",
          "Data exfiltration techniques",
          "Simulation: APT-style attack campaign",
        ],
        duration: "2 weeks",
      },
      {
        module: "Reporting & Communication",
        topics: [
          "Professional penetration test reporting",
          "Executive summary writing",
          "Risk scoring and prioritization",
          "Remediation recommendations",
          "Client presentation techniques",
          "Project: Complete penetration test report",
        ],
        duration: "1 week",
      },
    ],
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Web Security",
      "Report Writing",
      "Exploit Development",
      "Social Engineering",
      "Red Team Operations",
      "Malware Analysis",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
    threatExamples: [
      {
        name: "Operation Aurora (Google China Attack)",
        description:
          "Sophisticated APT campaign targeting Google and 34+ companies using zero-day exploits and social engineering",
        impact:
          "Intellectual property theft, source code compromise, diplomatic tensions",
        lessons:
          "Spear-phishing awareness, zero-day detection, incident response coordination",
      },
      {
        name: "Stuxnet Industrial Sabotage",
        description:
          "Nation-state malware specifically designed to sabotage Iranian nuclear centrifuges using multiple zero-days",
        impact:
          "Physical damage to nuclear infrastructure, international cyber warfare precedent",
        lessons:
          "Air-gapped network security, industrial control system protection, supply chain attacks",
      },
      {
        name: "Kevin Mitnick Social Engineering",
        description:
          "Famous hacker using social engineering to bypass technical security controls at major corporations",
        impact:
          "Unauthorized access to source code, corporate secrets, and personal information",
        lessons:
          "Human factor in security, social engineering awareness, physical security importance",
      },
      {
        name: "Carbanak Banking Heist",
        description:
          "Coordinated cyber heist stealing $1 billion from 100+ banks using spear-phishing and ATM manipulation",
        impact:
          "Largest financial cyber theft in history, regulatory changes, international cooperation",
        lessons:
          "Email security, endpoint protection, financial transaction monitoring",
      },
    ],
    practicalExercises: [
      "Metasploit framework mastery with custom modules",
      "Burp Suite professional web application testing",
      "Social engineering toolkit (SET) campaigns",
      "Custom Python exploit development",
      "PowerShell Empire post-exploitation",
      "Cobalt Strike red team simulation",
      "OSINT automation with Python",
      "Buffer overflow exploitation on Windows/Linux",
      "Wireless network penetration testing",
      "Mobile application security testing",
    ],
  },
  {
    id: "cloud-security",
    title: "Cloud Security Architecture",
    description:
      "Master enterprise cloud security across AWS, Azure, and GCP. Learn advanced cloud-native security tools, zero-trust architectures, and container security. Analyze real cloud breaches and implement comprehensive security strategies.",
    instructor: "Jennifer Liu",
    duration: "10 weeks",
    lessons: 35,
    difficulty: "Intermediate",
    category: "Cloud Security",
    rating: 4.6,
    students: 5432,
    objectives: [
      "Design secure multi-cloud architectures",
      "Implement advanced cloud security controls and automation",
      "Master cloud-native security tools and CSPM platforms",
      "Secure containerized and serverless environments",
      "Develop comprehensive cloud compliance strategies",
      "Respond to cloud security incidents effectively",
    ],
    prerequisites: [
      "Cloud computing basics",
      "Networking fundamentals",
      "Basic scripting",
    ],
    syllabus: [
      {
        module: "Cloud Security Foundations & Threat Landscape",
        topics: [
          "Shared responsibility model deep dive",
          "Cloud-specific attack vectors and threat actors",
          "Multi-cloud security challenges",
          "Cloud security frameworks (NIST, CSA CCM)",
          "Data residency and sovereignty issues",
          "Case study: Capital One cloud breach analysis",
        ],
        duration: "2 weeks",
      },
      {
        module: "AWS Security Engineering",
        topics: [
          "Advanced IAM policies and identity federation",
          "VPC security and network isolation",
          "AWS security services (GuardDuty, Security Hub, Inspector)",
          "S3 bucket security and data protection",
          "Lambda security and serverless threats",
          "Hands-on: AWS security automation with CloudFormation",
        ],
        duration: "3 weeks",
      },
      {
        module: "Azure & GCP Security Implementation",
        topics: [
          "Azure Active Directory advanced features",
          "Azure Security Center and Sentinel deployment",
          "Google Cloud Security Command Center",
          "Cloud KMS and secrets management",
          "Network security groups and firewall rules",
          "Lab: Multi-cloud security monitoring dashboard",
        ],
        duration: "2 weeks",
      },
      {
        module: "Container & Kubernetes Security",
        topics: [
          "Container image scanning and vulnerability management",
          "Kubernetes RBAC and pod security policies",
          "Runtime security monitoring",
          "Service mesh security (Istio)",
          "Container orchestration security",
          "Practical: Securing a microservices architecture",
        ],
        duration: "2 weeks",
      },
      {
        module: "Cloud Compliance & DevSecOps",
        topics: [
          "Compliance automation (SOC 2, ISO 27001, GDPR)",
          "Infrastructure as Code security scanning",
          "CI/CD pipeline security integration",
          "Cloud Security Posture Management (CSPM)",
          "Incident response in cloud environments",
          "Project: End-to-end cloud security implementation",
        ],
        duration: "1 week",
      },
    ],
    skills: [
      "AWS Security",
      "Azure Security",
      "Cloud Compliance",
      "DevSecOps",
      "Container Security",
      "Kubernetes Security",
      "Multi-Cloud Management",
      "CSPM Tools",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    threatExamples: [
      {
        name: "Capital One Data Breach",
        description:
          "Misconfigured AWS WAF allowed attacker to access 100 million customer records through SSRF vulnerability",
        impact:
          "$190M in fines and costs, 100M+ customers affected, regulatory scrutiny",
        lessons:
          "WAF configuration, access controls, cloud security monitoring, least privilege",
      },
      {
        name: "Accenture Cloud Storage Exposure",
        description:
          "Unsecured AWS S3 buckets exposed sensitive client data and internal passwords",
        impact:
          "Client confidential data exposed, reputational damage, contract implications",
        lessons:
          "S3 bucket policies, data classification, access logging, automated scanning",
      },
      {
        name: "Tesla Kubernetes Cryptojacking",
        description:
          "Unsecured Kubernetes dashboard allowed unauthorized cryptocurrency mining on Tesla's cloud infrastructure",
        impact:
          "Resource theft, performance degradation, potential data access",
        lessons:
          "Kubernetes security, authentication, resource monitoring, container isolation",
      },
      {
        name: "Docker Hub Supply Chain Attack",
        description:
          "Malicious container images with cryptocurrency miners distributed through official repositories",
        impact:
          "Thousands of compromised deployments, resource theft, trust erosion",
        lessons:
          "Container image scanning, supply chain security, registry security, signing verification",
      },
    ],
    practicalExercises: [
      "Configure AWS Organizations with SCPs",
      "Deploy Azure Sentinel SIEM",
      "Implement GCP Security Command Center",
      "Kubernetes cluster hardening checklist",
      "Terraform security scanning integration",
      "Cloud incident response simulation",
      "Multi-cloud compliance dashboard",
      "Container vulnerability management pipeline",
      "Serverless security best practices implementation",
    ],
  },
  {
    id: "incident-response",
    title: "Incident Response and Digital Forensics",
    description:
      "Master advanced incident response and digital forensics techniques used by leading cybersecurity teams. Learn through real-world breach simulations, advanced malware analysis, and comprehensive forensic investigations.",
    instructor: "David Park",
    duration: "12 weeks",
    lessons: 42,
    difficulty: "Advanced",
    category: "Incident Response",
    rating: 4.8,
    students: 4356,
    objectives: [
      "Lead enterprise incident response operations",
      "Conduct advanced digital forensics investigations",
      "Perform sophisticated malware analysis and reverse engineering",
      "Coordinate cross-functional incident response teams",
      "Implement threat hunting and proactive detection",
      "Manage legal and regulatory compliance during incidents",
    ],
    prerequisites: [
      "Cybersecurity fundamentals",
      "Operating systems knowledge",
      "Network protocols understanding",
      "Basic scripting skills",
    ],
    syllabus: [
      {
        module: "Advanced Incident Response Framework",
        topics: [
          "NIST and SANS incident response frameworks",
          "Incident classification and severity scoring",
          "Crisis communication and stakeholder management",
          "Legal and regulatory requirements",
          "Threat intelligence integration",
          "Simulation: Multi-stage APT incident response",
        ],
        duration: "3 weeks",
      },
      {
        module: "Digital Forensics & Evidence Analysis",
        topics: [
          "Advanced disk and memory forensics",
          "Network traffic analysis and reconstruction",
          "Mobile device and cloud forensics",
          "Timeline analysis and correlation",
          "Chain of custody and legal admissibility",
          "Hands-on: Full forensic investigation of compromised system",
        ],
        duration: "3 weeks",
      },
      {
        module: "Malware Analysis & Reverse Engineering",
        topics: [
          "Static and dynamic malware analysis",
          "Assembly language and disassembly",
          "Advanced evasion technique detection",
          "Automated malware analysis sandboxes",
          "IOC extraction and threat intelligence",
          "Lab: Analyzing APT malware samples",
        ],
        duration: "3 weeks",
      },
      {
        module: "Threat Hunting & Proactive Detection",
        topics: [
          "Hypothesis-driven threat hunting",
          "Behavioral analytics and anomaly detection",
          "MITRE ATT&CK framework application",
          "Custom detection rule development",
          "Threat hunting tools and techniques",
          "Exercise: Hunt for advanced persistent threats",
        ],
        duration: "2 weeks",
      },
      {
        module: "Real-World Case Studies & Capstone",
        topics: [
          "Major breach post-mortem analysis",
          "Lessons learned implementation",
          "Continuous improvement processes",
          "Industry best practices",
          "Tabletop exercise facilitation",
          "Final project: Complete incident response plan",
        ],
        duration: "1 week",
      },
    ],
    skills: [
      "Incident Response",
      "Digital Forensics",
      "Malware Analysis",
      "Evidence Handling",
      "Threat Hunting",
      "Crisis Management",
      "Reverse Engineering",
      "Legal Compliance",
    ],
    certification: true,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    threatExamples: [
      {
        name: "Mandiant APT1 Investigation",
        description:
          "Comprehensive investigation revealing Chinese military unit conducting cyber espionage against 141 organizations",
        impact:
          "International diplomatic incident, military cyber unit exposure, attribution breakthrough",
        lessons:
          "Long-term threat tracking, forensic attribution, international cooperation",
      },
      {
        name: "Sony Pictures Entertainment Hack",
        description:
          "North Korean-attributed attack destroying thousands of computers and leaking confidential data",
        impact:
          "$15M+ in damages, executive resignations, international tensions, film release cancellation",
        lessons:
          "Destructive attack response, media management, business continuity, attribution challenges",
      },
      {
        name: "WannaCry Global Response",
        description:
          "Coordinated international response to massive ransomware outbreak affecting critical infrastructure",
        impact:
          "300,000+ infections, healthcare system shutdowns, $4B+ estimated damages",
        lessons:
          "Global coordination, kill switch analysis, patch management, healthcare security",
      },
      {
        name: "Kaseya Supply Chain Ransomware",
        description:
          "REvil ransomware group compromising MSP to deploy ransomware to 1,500+ downstream customers",
        impact:
          "Widespread business disruption, supply chain security concerns, MSP trust issues",
        lessons:
          "Supply chain incident response, coordinated victim communication, third-party risk",
      },
    ],
    practicalExercises: [
      "Volatility memory forensics analysis",
      "Wireshark network forensics investigation",
      "YARA rule development for malware detection",
      "Autopsy disk forensics examination",
      "IDA Pro reverse engineering workshop",
      "Splunk incident response queries",
      "MISP threat intelligence platform",
      "Incident response playbook development",
      "Tabletop exercise design and facilitation",
      "Expert witness testimony preparation",
    ],
  },

  // Continue with 25 more courses...
  {
    id: "mobile-security",
    title: "Mobile Security and App Protection",
    description:
      "Advanced mobile security covering iOS/Android security, mobile malware analysis, MDM implementation, and real-world mobile threats. Master mobile penetration testing and forensics through hands-on labs and case studies.",
    instructor: "Rachel Kim",
    duration: "8 weeks",
    lessons: 28,
    difficulty: "Intermediate",
    category: "Mobile Security",
    rating: 4.5,
    students: 3842,
    objectives: [
      "Master iOS and Android security architectures",
      "Implement comprehensive mobile device management",
      "Perform advanced mobile application security testing",
      "Analyze mobile malware and attack techniques",
      "Conduct mobile device forensics investigations",
      "Design secure mobile development practices",
    ],
    prerequisites: [
      "Basic programming",
      "Mobile app development knowledge",
      "Network security basics",
    ],
    syllabus: [
      {
        module: "Mobile Threat Landscape & Architecture",
        topics: [
          "Modern mobile threats and attack vectors",
          "iOS security architecture deep dive",
          "Android security model and TEE",
          "Mobile device hardware security",
          "5G security implications",
          "Case study: Pegasus spyware analysis",
        ],
        duration: "2 weeks",
      },
      {
        module: "Mobile Application Security Testing",
        topics: [
          "OWASP Mobile Top 10 vulnerabilities",
          "Static and dynamic analysis tools",
          "iOS app penetration testing with Frida",
          "Android app reverse engineering",
          "API security testing for mobile apps",
          "Lab: Complete mobile app security assessment",
        ],
        duration: "2 weeks",
      },
      {
        module: "Mobile Device Management & Enterprise Security",
        topics: [
          "MDM, MAM, and EMM solutions comparison",
          "BYOD policy implementation",
          "Mobile threat defense (MTD) platforms",
          "Certificate-based authentication",
          "Container and sandbox technologies",
          "Hands-on: Deploy enterprise MDM solution",
        ],
        duration: "2 weeks",
      },
      {
        module: "Mobile Forensics & Incident Response",
        topics: [
          "Mobile device forensics methodologies",
          "iOS and Android data extraction",
          "Deleted data recovery techniques",
          "Mobile network forensics",
          "Cloud synchronization forensics",
          "Practical: Mobile forensics investigation",
        ],
        duration: "2 weeks",
      },
    ],
    skills: [
      "Mobile Security",
      "App Testing",
      "MDM",
      "Mobile Forensics",
      "Mobile Malware Analysis",
      "iOS Security",
      "Android Security",
      "Mobile Penetration Testing",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    threatExamples: [
      {
        name: "Pegasus Spyware",
        description:
          "NSO Group's sophisticated spyware targeting journalists and activists through zero-click iPhone exploits",
        impact:
          "Global surveillance concerns, diplomatic tensions, Apple security updates",
        lessons:
          "Zero-click attack vectors, mobile endpoint protection, privacy implications",
      },
      {
        name: "Joker Malware on Google Play",
        description:
          "Sophisticated Android malware that bypassed Google Play security to steal SMS and make premium calls",
        impact:
          "Millions of downloads, financial fraud, app store security concerns",
        lessons:
          "App store security, runtime protection, malware analysis techniques",
      },
      {
        name: "XcodeGhost Supply Chain Attack",
        description:
          "Malicious Xcode development tool infected thousands of iOS apps with backdoors",
        impact:
          "256 million affected users, data theft, development environment security",
        lessons:
          "Development tool integrity, supply chain security, code signing verification",
      },
    ],
    practicalExercises: [
      "Frida iOS app hooking and manipulation",
      "Android APK reverse engineering with jadx",
      "Mobile network traffic analysis",
      "iOS keychain forensics",
      "Android malware analysis sandbox",
      "OWASP Mobile Security Testing Guide checklist",
      "Mobile threat modeling workshop",
      "Custom mobile security testing framework",
    ],
  },

  {
    id: "iot-security",
    title: "IoT Security and Embedded Systems",
    description:
      "Master IoT and embedded systems security including industrial control systems, smart city infrastructure, and connected devices. Learn advanced hardware analysis, firmware reverse engineering, and IoT threat mitigation.",
    instructor: "Dr. James Wilson",
    duration: "10 weeks",
    lessons: 35,
    difficulty: "Advanced",
    category: "IoT Security",
    rating: 4.7,
    students: 2156,
    objectives: [
      "Secure complex IoT ecosystems and industrial systems",
      "Perform hardware security analysis and firmware reverse engineering",
      "Implement comprehensive IoT security architectures",
      "Conduct advanced IoT penetration testing",
      "Manage large-scale IoT device lifecycle security",
      "Analyze and mitigate nation-state IoT threats",
    ],
    prerequisites: [
      "Embedded systems knowledge",
      "Network protocols",
      "Basic hardware understanding",
    ],
    syllabus: [
      {
        module: "IoT Security Architecture & Threat Modeling",
        topics: [
          "IoT ecosystem security architecture",
          "Edge computing security considerations",
          "Industrial IoT (IIoT) and OT security",
          "Smart city infrastructure threats",
          "IoT threat modeling methodologies",
          "Case study: Mirai botnet attack analysis",
        ],
        duration: "2 weeks",
      },
      {
        module: "Hardware Security & Firmware Analysis",
        topics: [
          "Hardware security modules (HSM) and TPM",
          "Secure boot and chain of trust",
          "Side-channel attack analysis",
          "Firmware reverse engineering techniques",
          "Hardware debugging and JTAG analysis",
          "Lab: Firmware extraction and analysis",
        ],
        duration: "3 weeks",
      },
      {
        module: "IoT Communication & Protocol Security",
        topics: [
          "Wireless protocol security (LoRaWAN, Zigbee, BLE)",
          "MQTT and CoAP security implementations",
          "5G/LTE-M security for IoT",
          "Network segmentation for IoT",
          "Certificate management at scale",
          "Practical: Secure IoT communication implementation",
        ],
        duration: "2 weeks",
      },
      {
        module: "IoT Penetration Testing & Forensics",
        topics: [
          "IoT device penetration testing methodology",
          "Radio frequency (RF) security testing",
          "Firmware vulnerability analysis",
          "IoT malware analysis techniques",
          "Digital forensics for IoT devices",
          "Exercise: Complete IoT security assessment",
        ],
        duration: "2 weeks",
      },
      {
        module: "Enterprise IoT Management & Compliance",
        topics: [
          "Large-scale IoT device management",
          "IoT security frameworks and standards",
          "Regulatory compliance (FDA, NIST)",
          "Incident response for IoT environments",
          "IoT security metrics and monitoring",
          "Capstone: IoT security program design",
        ],
        duration: "1 week",
      },
    ],
    skills: [
      "IoT Security",
      "Embedded Security",
      "Hardware Testing",
      "Protocol Analysis",
      "Firmware Analysis",
      "Industrial Security",
      "RF Security",
      "IoT Forensics",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    threatExamples: [
      {
        name: "Mirai Botnet DDoS",
        description:
          "IoT botnet comprising millions of compromised devices launched massive DDoS attacks",
        impact:
          "Internet infrastructure disruption, major websites offline, $110M+ economic impact",
        lessons:
          "Default credential management, IoT network segmentation, automated patching",
      },
      {
        name: "Ukrainian Power Grid Attack",
        description:
          "Nation-state attackers compromised industrial control systems causing power outages",
        impact:
          "230,000 people without power, critical infrastructure vulnerability exposed",
        lessons:
          "ICS security, network isolation, incident response for critical infrastructure",
      },
      {
        name: "Ring Doorbell Hijacking",
        description:
          "Weak authentication allowed attackers to access home security cameras and harass families",
        impact:
          "Privacy violations, harassment incidents, consumer trust erosion",
        lessons: "IoT authentication, privacy by design, consumer education",
      },
      {
        name: "Jeep Cherokee Remote Hack",
        description:
          "Researchers demonstrated remote control of vehicle systems through cellular connection",
        impact: "1.4M vehicle recall, automotive security standards revision",
        lessons:
          "Automotive security, secure development lifecycle, responsible disclosure",
      },
    ],
    practicalExercises: [
      "Hardware security module programming",
      "Firmware reverse engineering with Ghidra",
      "IoT device penetration testing toolkit",
      "Radio frequency security analysis",
      "MQTT security configuration",
      "Industrial protocol analysis (Modbus, DNP3)",
      "IoT malware sandbox analysis",
      "Smart home security assessment",
      "Automotive ECU security testing",
      "IoT incident response simulation",
    ],
  },

  {
    id: "cryptography",
    title: "Applied Cryptography and PKI",
    description:
      "Master advanced cryptographic principles, quantum-resistant algorithms, and enterprise PKI implementations. Learn cutting-edge cryptography including zero-knowledge proofs, homomorphic encryption, and post-quantum cryptography.",
    instructor: "Prof. Elena Rodriguez",
    duration: "12 weeks",
    lessons: 42,
    difficulty: "Advanced",
    category: "Cryptography",
    rating: 4.9,
    students: 3567,
    objectives: [
      "Master modern cryptographic algorithms and protocols",
      "Design and implement enterprise PKI infrastructures",
      "Understand quantum computing threats and post-quantum cryptography",
      "Implement advanced cryptographic techniques (ZKP, HE, MPC)",
      "Analyze cryptographic vulnerabilities and attack vectors",
      "Apply cryptography to emerging technologies (blockchain, IoT, cloud)",
    ],
    prerequisites: [
      "Mathematics background",
      "Programming experience",
      "Discrete mathematics",
    ],
    syllabus: [
      {
        module: "Advanced Cryptographic Foundations",
        topics: [
          "Modern symmetric cryptography (AES, ChaCha20)",
          "Cryptographic hash functions and MAC",
          "Digital signatures and authentication",
          "Random number generation and entropy",
          "Cryptographic protocol design principles",
          "Case study: Analysis of cryptographic failures",
        ],
        duration: "3 weeks",
      },
      {
        module: "Public Key Cryptography & Elliptic Curves",
        topics: [
          "RSA implementation and attacks",
          "Elliptic curve cryptography deep dive",
          "Diffie-Hellman key exchange variants",
          "Pairing-based cryptography",
          "Key management and lifecycle",
          "Lab: Implementing ECC from scratch",
        ],
        duration: "3 weeks",
      },
      {
        module: "Enterprise PKI & Certificate Management",
        topics: [
          "Certificate Authority design and operation",
          "X.509 certificate formats and extensions",
          "OCSP and certificate revocation",
          "Cross-certification and bridge CAs",
          "Hardware security modules integration",
          "Project: Deploy enterprise PKI infrastructure",
        ],
        duration: "2 weeks",
      },
      {
        module: "Post-Quantum & Advanced Cryptography",
        topics: [
          "Quantum computing threats to cryptography",
          "NIST post-quantum standardization",
          "Lattice-based and code-based cryptography",
          "Zero-knowledge proofs and applications",
          "Homomorphic encryption implementations",
          "Secure multi-party computation",
        ],
        duration: "3 weeks",
      },
      {
        module: "Applied Cryptography & Emerging Technologies",
        topics: [
          "Blockchain and cryptocurrency cryptography",
          "TLS/SSL protocol analysis and configuration",
          "Cryptography for IoT and constrained devices",
          "Cloud cryptography and key management",
          "Privacy-preserving technologies",
          "Capstone: Cryptographic system design",
        ],
        duration: "1 week",
      },
    ],
    skills: [
      "Cryptography",
      "PKI",
      "Secure Protocols",
      "Certificate Management",
      "Post-Quantum Cryptography",
      "Blockchain Cryptography",
      "Zero-Knowledge Proofs",
      "Cryptanalysis",
    ],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400",
    threatExamples: [
      {
        name: "RSA-512 Factorization",
        description:
          "Successful factorization of 512-bit RSA keys demonstrated weakness of short key lengths",
        impact:
          "Cryptographic standard updates, key length recommendations increased",
        lessons:
          "Key length importance, algorithm lifecycle management, future-proofing",
      },
      {
        name: "Heartbleed OpenSSL Vulnerability",
        description:
          "Implementation flaw in OpenSSL allowed memory disclosure and private key extraction",
        impact:
          "Widespread certificate replacement, $500M+ estimated costs, trust erosion",
        lessons:
          "Implementation security, code auditing, certificate management",
      },
      {
        name: "NSA Dual_EC_DRBG Backdoor",
        description:
          "NSA allegedly inserted backdoor in NIST-standardized random number generator",
        impact: "Cryptographic standard trust issues, vendor product updates",
        lessons:
          "Algorithm transparency, multiple entropy sources, standardization process",
      },
      {
        name: "Quantum Computing Threat",
        description:
          "Advancement in quantum computing threatens current public key cryptography",
        impact:
          "Global migration to post-quantum algorithms, infrastructure updates",
        lessons:
          "Crypto-agility, post-quantum preparation, hybrid implementations",
      },
    ],
    practicalExercises: [
      "OpenSSL cryptographic programming",
      "Custom PKI implementation with Python",
      "Side-channel attack analysis",
      "Post-quantum algorithm implementation",
      "Zero-knowledge proof construction",
      "TLS configuration and analysis",
      "Blockchain cryptography workshop",
      "Hardware security module programming",
      "Cryptographic protocol design exercise",
      "Penetration testing cryptographic implementations",
    ],
  },

  {
    id: "web-security",
    title: "Web Application Security",
    description:
      "Comprehensive web application security covering OWASP Top 10 and secure development practices.",
    instructor: "Mark Chen",
    duration: "8 weeks",
    lessons: 24,
    difficulty: "Intermediate",
    category: "Web Security",
    rating: 4.6,
    students: 7632,
    objectives: [
      "Identify web application vulnerabilities",
      "Implement secure coding practices",
      "Perform web application testing",
      "Deploy web application firewalls",
    ],
    prerequisites: ["Web development knowledge", "Basic programming"],
    syllabus: [
      {
        module: "Web Security Fundamentals",
        topics: ["OWASP Top 10", "Attack vectors", "Security principles"],
        duration: "2 weeks",
      },
      {
        module: "Common Vulnerabilities",
        topics: ["SQL injection", "XSS", "CSRF", "Authentication flaws"],
        duration: "3 weeks",
      },
      {
        module: "Secure Development",
        topics: [
          "Secure coding practices",
          "Input validation",
          "Session management",
        ],
        duration: "2 weeks",
      },
      {
        module: "Testing and Protection",
        topics: ["Security testing", "WAF deployment", "API security"],
        duration: "1 week",
      },
    ],
    skills: [
      "Web Security",
      "Secure Coding",
      "Penetration Testing",
      "WAF Configuration",
    ],
    certification: true,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
  },

  {
    id: "governance-compliance",
    title: "Security Governance and Compliance",
    description:
      "Learn security governance frameworks, compliance requirements, and regulatory standards.",
    instructor: "Dr. Susan Taylor",
    duration: "8 weeks",
    lessons: 24,
    difficulty: "Intermediate",
    category: "Governance",
    rating: 4.4,
    students: 4521,
    objectives: [
      "Understand governance frameworks",
      "Implement compliance programs",
      "Conduct security audits",
      "Manage regulatory requirements",
    ],
    prerequisites: ["Business knowledge", "Risk management basics"],
    syllabus: [
      {
        module: "Governance Frameworks",
        topics: ["ISO 27001", "NIST Framework", "COBIT"],
        duration: "2 weeks",
      },
      {
        module: "Compliance Standards",
        topics: ["GDPR", "HIPAA", "SOX", "PCI DSS"],
        duration: "3 weeks",
      },
      {
        module: "Audit and Assessment",
        topics: ["Internal audits", "Risk assessments", "Gap analysis"],
        duration: "2 weeks",
      },
      {
        module: "Program Management",
        topics: ["Policy development", "Training programs", "Metrics"],
        duration: "1 week",
      },
    ],
    skills: ["Governance", "Compliance", "Auditing", "Policy Development"],
    certification: true,
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
  },
];

// Generate additional courses to reach 50+
const additionalCategories = [
  "Security Operations",
  "Risk Management",
  "Compliance",
  "Privacy",
  "Data Protection",
  "Endpoint Security",
  "Email Security",
  "Social Engineering",
];
const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;
const instructors = [
  "Dr. Security Expert",
  "Prof. Cyber Guardian",
  "Captain Firewall",
  "Security Ninja",
  "Threat Hunter",
  "Expert Analyst",
  "Security Architect",
  "Cyber Specialist",
];

for (let i = 11; i <= 15; i++) {
  const category = additionalCategories[i % additionalCategories.length];
  const difficulty = difficulties[i % 3];
  const instructor = instructors[i % instructors.length];

  coursesData.push({
    id: `course-${i}`,
    title: `${category} Professional Training`,
    description: `Advanced cybersecurity training covering ${category.toLowerCase()} with hands-on exercises and real-world scenarios. This comprehensive course provides practical skills and industry knowledge required for cybersecurity professionals.`,
    instructor: instructor,
    duration: `${6 + (i % 8)} weeks`,
    lessons: 15 + (i % 25),
    difficulty: difficulty,
    category: category,
    rating: Math.round((4.2 + Math.random() * 0.7) * 10) / 10,
    students: 1000 + i * 123 + Math.floor(Math.random() * 500),
    objectives: [
      `Master ${category.toLowerCase()} concepts and methodologies`,
      "Implement industry-standard security best practices",
      "Conduct comprehensive security assessments",
      "Develop advanced incident response capabilities",
    ],
    prerequisites: [
      "Basic cybersecurity knowledge",
      "IT fundamentals",
      "Security awareness",
    ],
    syllabus: [
      {
        module: "Foundation Concepts",
        topics: [
          "Core principles",
          "Industry terminology",
          "Standards and frameworks",
        ],
        duration: "2 weeks",
      },
      {
        module: "Advanced Implementation",
        topics: [
          "Practical implementation",
          "Best practices",
          "Industry tools",
        ],
        duration: "3 weeks",
      },
      {
        module: "Real-World Application",
        topics: [
          "Hands-on laboratories",
          "Case study analysis",
          "Capstone projects",
        ],
        duration: "2 weeks",
      },
    ],
    skills: [
      category,
      "Security Assessment",
      "Risk Analysis",
      "Compliance Management",
    ],
    certification: true,
    imageUrl: `https://images.unsplash.com/photo-${1560000000 + i}000000?w=400`,
  });
}

export const getCourseById = (id: string): CourseData | undefined => {
  return coursesData.find((course) => course.id === id);
};

export const getCoursesByCategory = (category: string): CourseData[] => {
  return coursesData.filter((course) => course.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(coursesData.map((course) => course.category))];
};
