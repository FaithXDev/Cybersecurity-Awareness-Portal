export interface DetailedLessonContent {
  id: string;
  title: string;
  duration: string;
  type: "reading" | "video" | "lab" | "quiz" | "simulation" | "case-study";
  content: string;
  detailedContent: string;
  keyPoints: string[];
  practicalExamples: string[];
  threatExamples: string[];
  resources: string[];
  labInstructions?: string;
  realWorldScenarios: string[];
}

export interface DetailedModuleContent {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  lessons: DetailedLessonContent[];
  assessments: {
    type: string;
    description: string;
    duration: string;
  }[];
}

export interface EnhancedCourseMaterialData {
  courseId: string;
  modules: DetailedModuleContent[];
  capstoneProject?: {
    title: string;
    description: string;
    requirements: string[];
    deliverables: string[];
    duration: string;
  };
}

export const enhancedCourseMaterials: EnhancedCourseMaterialData[] = [
  {
    courseId: "cybersec-fundamentals",
    modules: [
      {
        id: "module-1",
        title: "Cybersecurity Foundations & Threat Landscape",
        description:
          "Master fundamental cybersecurity principles and analyze current threat landscape",
        learningObjectives: [
          "Understand and apply the CIA triad in real-world scenarios",
          "Analyze major cyber attacks and extract lessons learned",
          "Identify threat actors and their motivations",
          "Map attacks to the cyber kill chain methodology",
        ],
        lessons: [
          {
            id: "lesson-1-1",
            title: "CIA Triad Deep Dive with Case Studies",
            duration: "90 min",
            type: "reading",
            content:
              "Comprehensive analysis of Confidentiality, Integrity, and Availability with real-world breach examples.",
            detailedContent: `
The CIA Triad forms the foundation of all cybersecurity practices. This lesson examines each component through major security incidents:

CONFIDENTIALITY: Protection of sensitive information from unauthorized disclosure
- Case Study: Equifax Breach (2017) - Personal data of 147 million Americans exposed
- Technical Details: Web application vulnerability allowed unauthorized database access
- Business Impact: $700M+ in costs, regulatory fines, class-action lawsuits
- Lessons: Input validation, database security, incident response timing

INTEGRITY: Ensuring data accuracy and preventing unauthorized modification
- Case Study: Ukraine Power Grid Attack (2015) - Malware modified industrial control systems
- Technical Details: Spear-phishing led to network compromise and SCADA manipulation
- Business Impact: 230,000 people without power for 6 hours
- Lessons: Network segmentation, system hardening, change management

AVAILABILITY: Ensuring systems and data are accessible when needed
- Case Study: WannaCry Ransomware (2017) - Global disruption of critical services
- Technical Details: SMB vulnerability exploitation with ransomware payload
- Business Impact: 300,000+ computers affected, healthcare systems shutdown
- Lessons: Patch management, backup strategies, business continuity planning
            `,
            keyPoints: [
              "CIA Triad is fundamental to all security decisions",
              "Real-world attacks often target multiple CIA components",
              "Business impact extends beyond technical damage",
              "Prevention costs less than incident response",
            ],
            practicalExamples: [
              "Analyzing Equifax breach timeline and response",
              "Mapping WannaCry attack to CIA violations",
              "Assessing Ukraine grid attack industrial impact",
            ],
            threatExamples: [
              "Nation-state attacks on critical infrastructure",
              "Ransomware targeting healthcare systems",
              "Data breaches exposing personal information",
            ],
            resources: [
              "NIST Cybersecurity Framework",
              "Equifax breach timeline and analysis",
              "WannaCry technical analysis report",
              "Ukraine power grid attack case study",
            ],
            realWorldScenarios: [
              "Hospital ransomware response decision-making",
              "Data breach notification requirements",
              "Critical infrastructure protection planning",
            ],
          },
          {
            id: "lesson-1-2",
            title: "Current Threat Landscape Analysis",
            duration: "75 min",
            type: "case-study",
            content:
              "In-depth analysis of current cyber threats, threat actors, and attack trends.",
            detailedContent: `
The cybersecurity threat landscape evolves rapidly. This lesson examines current threats:

THREAT ACTOR CATEGORIES:
1. Nation-State Actors (APT Groups)
   - Examples: APT28 (Russia), APT1 (China), Lazarus (North Korea)
   - Motivations: Espionage, disruption, economic advantage
   - Capabilities: Zero-day exploits, custom malware, long-term persistence

2. Cybercriminal Organizations
   - Examples: REvil, DarkSide, Conti ransomware groups
   - Motivations: Financial gain through ransomware, fraud, theft
   - Capabilities: Ransomware-as-a-Service, money laundering networks

3. Insider Threats
   - Examples: Edward Snowden, Reality Winner, malicious employees
   - Motivations: Ideology, revenge, financial gain
   - Capabilities: Privileged access, knowledge of systems, trust exploitation

CURRENT ATTACK TRENDS:
- Supply chain attacks increasing 300% year-over-year
- Ransomware evolution from encryption to data exfiltration
- Cloud misconfigurations leading to data exposure
- AI-powered social engineering campaigns
- Zero-trust architecture adoption driving new attack vectors
            `,
            keyPoints: [
              "Threat actors have different motivations and capabilities",
              "Attack trends shift based on technology adoption",
              "Supply chain attacks are increasingly common",
              "Insider threats remain significant risk",
            ],
            practicalExamples: [
              "APT28 attack campaign analysis",
              "SolarWinds supply chain compromise",
              "Colonial Pipeline ransomware incident",
            ],
            threatExamples: [
              "State-sponsored espionage campaigns",
              "Ransomware-as-a-Service operations",
              "Insider threat scenarios",
            ],
            resources: [
              "MITRE ATT&CK Framework",
              "Verizon Data Breach Investigations Report",
              "Mandiant M-Trends Report",
              "CISA threat intelligence reports",
            ],
            realWorldScenarios: [
              "Threat intelligence briefing preparation",
              "Risk assessment for new technology adoption",
              "Incident attribution analysis",
            ],
          },
        ],
        assessments: [
          {
            type: "Threat Analysis Report",
            description:
              "Analyze a recent major cyber incident and map to CIA triad violations",
            duration: "2 hours",
          },
          {
            type: "Threat Actor Profiling",
            description:
              "Create detailed profile of an APT group including TTPs and attribution",
            duration: "3 hours",
          },
        ],
      },
    ],
    capstoneProject: {
      title: "Cybersecurity Framework Implementation",
      description:
        "Design and implement a comprehensive cybersecurity program for a fictional organization",
      requirements: [
        "Conduct risk assessment and threat modeling",
        "Select and justify security framework",
        "Design security architecture",
        "Create incident response plan",
        "Develop security awareness program",
      ],
      deliverables: [
        "Risk assessment report",
        "Security framework implementation plan",
        "Incident response playbook",
        "Security awareness training materials",
        "Executive presentation",
      ],
      duration: "2 weeks",
    },
  },
  {
    courseId: "network-security",
    modules: [
      {
        id: "module-1",
        title: "Advanced Network Security Architecture",
        description:
          "Design zero-trust network architectures and understand advanced threats",
        learningObjectives: [
          "Design zero-trust network architectures",
          "Implement software-defined perimeters",
          "Analyze advanced persistent threat techniques",
          "Secure cloud and hybrid environments",
        ],
        lessons: [
          {
            id: "lesson-1-1",
            title: "Zero-Trust Network Design Principles",
            duration: "120 min",
            type: "lab",
            content:
              "Hands-on implementation of zero-trust architecture principles",
            detailedContent: `
Zero Trust represents a fundamental shift from perimeter-based security:

CORE PRINCIPLES:
1. Never Trust, Always Verify
   - Continuous authentication and authorization
   - Identity-based access controls
   - Behavioral analytics for anomaly detection

2. Least Privilege Access
   - Just-in-time access provisioning
   - Role-based access control (RBAC)
   - Privilege escalation monitoring

3. Assume Breach
   - Network micro-segmentation
   - Lateral movement prevention
   - Continuous monitoring and logging

IMPLEMENTATION ARCHITECTURE:
- Policy Decision Point (PDP): Central authorization engine
- Policy Enforcement Point (PEP): Network access controls
- Policy Information Point (PIP): Context and risk data
- Identity Provider (IdP): Authentication services
- Security Information and Event Management (SIEM): Monitoring
            `,
            keyPoints: [
              "Zero trust eliminates network perimeter assumptions",
              "Identity becomes the new security perimeter",
              "Continuous verification replaces one-time authentication",
              "Micro-segmentation limits lateral movement",
            ],
            practicalExamples: [
              "Google BeyondCorp implementation",
              "Microsoft Zero Trust deployment",
              "Palo Alto Prisma SASE platform",
            ],
            threatExamples: [
              "APT lateral movement techniques",
              "Insider threat privilege abuse",
              "Supply chain compromise scenarios",
            ],
            resources: [
              "NIST Zero Trust Architecture (SP 800-207)",
              "Google BeyondCorp research papers",
              "Zero Trust Maturity Model",
              "CISA Zero Trust guidance",
            ],
            labInstructions: `
LAB EXERCISE: Zero Trust Network Implementation

Objective: Configure a zero-trust network using open-source tools

Environment Setup:
1. Deploy pfSense firewall with multiple VLANs
2. Install FreeRADIUS for authentication
3. Configure OpenVPN for remote access
4. Set up ELK stack for logging

Implementation Steps:
1. Create network segments for different user types
2. Configure identity-based access policies
3. Implement certificate-based authentication
4. Set up network access control (NAC)
5. Deploy monitoring and alerting

Testing Scenarios:
1. User authentication and authorization
2. Lateral movement prevention
3. Anomaly detection and response
4. Policy violation alerting

Deliverables:
- Network architecture diagram
- Policy configuration files
- Security monitoring dashboard
- Incident response procedures
            `,
            realWorldScenarios: [
              "Remote workforce security during pandemic",
              "Mergers and acquisitions network integration",
              "Cloud migration security planning",
            ],
          },
        ],
        assessments: [
          {
            type: "Network Architecture Design",
            description:
              "Design zero-trust network for enterprise with 10,000+ users",
            duration: "4 hours",
          },
        ],
      },
    ],
  },
  {
    courseId: "ethical-hacking",
    modules: [
      {
        id: "module-1",
        title: "Advanced Penetration Testing Methodology",
        description:
          "Master professional penetration testing frameworks and methodologies",
        learningObjectives: [
          "Apply PTES methodology to complex environments",
          "Understand legal and ethical considerations",
          "Design comprehensive rules of engagement",
          "Perform threat modeling for penetration tests",
        ],
        lessons: [
          {
            id: "lesson-1-1",
            title: "PTES Framework Deep Dive",
            duration: "105 min",
            type: "simulation",
            content:
              "Comprehensive penetration testing methodology with real-world application",
            detailedContent: `
The Penetration Testing Execution Standard (PTES) provides a comprehensive framework:

PHASE 1: PRE-ENGAGEMENT INTERACTIONS
- Scope definition and rules of engagement
- Statement of work (SOW) development
- Legal authorization documentation
- Communication protocols establishment

PHASE 2: INTELLIGENCE GATHERING
- Passive information collection (OSINT)
- Active reconnaissance techniques
- Social engineering vectors identification
- Technical infrastructure mapping

PHASE 3: THREAT MODELING
- Asset identification and valuation
- Threat agent analysis
- Attack vector enumeration
- Risk assessment and prioritization

PHASE 4: VULNERABILITY ANALYSIS
- Automated scanning and validation
- Manual verification techniques
- False positive elimination
- Exploit feasibility assessment

PHASE 5: EXPLOITATION
- Proof-of-concept development
- Remote and local exploitation
- Client-side attack vectors
- Physical security testing

PHASE 6: POST-EXPLOITATION
- Privilege escalation techniques
- Persistence establishment
- Lateral movement execution
- Data exfiltration simulation

PHASE 7: REPORTING
- Executive summary development
- Technical findings documentation
- Risk rating and prioritization
- Remediation recommendations
            `,
            keyPoints: [
              "PTES provides systematic approach to penetration testing",
              "Each phase builds upon previous phase results",
              "Documentation is critical throughout process",
              "Legal and ethical considerations paramount",
            ],
            practicalExamples: [
              "Enterprise network penetration test",
              "Web application security assessment",
              "Social engineering campaign",
            ],
            threatExamples: [
              "Advanced persistent threat simulation",
              "Insider threat scenarios",
              "Supply chain attack vectors",
            ],
            resources: [
              "PTES Technical Guidelines",
              "OWASP Testing Guide",
              "NIST SP 800-115",
              "SANS penetration testing methodology",
            ],
            realWorldScenarios: [
              "Financial institution penetration test",
              "Healthcare system security assessment",
              "Government network evaluation",
            ],
          },
        ],
        assessments: [
          {
            type: "Penetration Test Plan",
            description:
              "Develop comprehensive penetration test plan for complex environment",
            duration: "6 hours",
          },
        ],
      },
    ],
  },
];

export const getEnhancedCourseMaterial = (
  courseId: string,
): EnhancedCourseMaterialData | undefined => {
  return enhancedCourseMaterials.find(
    (material) => material.courseId === courseId,
  );
};

export const getAllEnhancedCourseIds = (): string[] => {
  return enhancedCourseMaterials.map((material) => material.courseId);
};
