export interface ThreatData {
  id: string;
  name: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  indicators: string[];
  prevention: string[];
  affectedSectors: string[];
  recentActivity: string;
  riskLevel: number;
}

export const threatsData: ThreatData[] = [
  {
    id: "ransomware-as-a-service",
    name: "Ransomware-as-a-Service (RaaS)",
    category: "Ransomware",
    severity: "Critical",
    description:
      "Cybercriminals offering ransomware tools and infrastructure to other criminals, lowering the barrier to entry for ransomware attacks. This business model has significantly increased the frequency and sophistication of ransomware attacks. RaaS operators provide user-friendly interfaces, customer support, and profit-sharing models, making ransomware accessible to less technically skilled criminals. The rise of cryptocurrency has further enabled this ecosystem by providing anonymous payment methods. Law enforcement agencies worldwide are struggling to combat this decentralized threat model. Organizations must implement comprehensive backup strategies, employee training, and advanced threat detection systems. The impact on critical infrastructure, healthcare systems, and small businesses has been devastating. RaaS has evolved to include data exfiltration and public shaming tactics, adding reputational damage to the traditional encryption-based extortion. Recent variants have shown capabilities to target cloud environments and virtual machine infrastructures. The economic impact of RaaS operations is estimated to cost organizations billions of dollars annually in ransom payments, recovery costs, and business disruption.",
    indicators: [
      "Unusual network traffic patterns",
      "Unexpected file encryption",
      "Ransom notes appearing on systems",
      "Lateral movement across network",
    ],
    prevention: [
      "Regular offline backups",
      "Network segmentation",
      "Employee security training",
      "Advanced endpoint protection",
      "Incident response planning",
    ],
    affectedSectors: [
      "Healthcare",
      "Finance",
      "Education",
      "Government",
      "Manufacturing",
    ],
    recentActivity: "Major healthcare system hit with $40M ransom demand",
    riskLevel: 95,
  },
  {
    id: "ai-powered-phishing",
    name: "AI-Powered Phishing Campaigns",
    category: "Social Engineering",
    severity: "High",
    description:
      "Sophisticated phishing campaigns using artificial intelligence to create highly personalized and convincing attack vectors. These attacks leverage machine learning algorithms to analyze social media profiles, professional networks, and public information to craft targeted messages. AI-generated deepfake audio and video content is being used to impersonate executives and trusted contacts. Natural language processing helps create grammatically correct and contextually appropriate phishing emails that bypass traditional detection methods. The technology enables real-time adaptation of attack strategies based on victim responses. Chatbots powered by AI can conduct extended conversations with potential victims, building trust over time. Image recognition capabilities allow for the creation of convincing fake websites and documents. The scale and sophistication of these attacks pose unprecedented challenges for traditional security awareness training. Organizations must implement advanced AI-powered defense systems to counter these evolving threats. The psychological manipulation techniques employed by AI systems are becoming increasingly sophisticated and harder to detect.",
    indicators: [
      "Highly personalized phishing emails",
      "Perfect grammar and spelling in suspicious emails",
      "Deepfake audio/video messages",
      "Sophisticated social engineering tactics",
    ],
    prevention: [
      "Advanced email filtering",
      "Multi-factor authentication",
      "Regular security awareness training",
      "Behavioral analysis tools",
      "Zero-trust email verification",
    ],
    affectedSectors: ["All Industries", "Government", "Finance", "Technology"],
    recentActivity: "AI-generated CEO voice used in $243,000 fraud",
    riskLevel: 88,
  },
  {
    id: "supply-chain-attacks",
    name: "Software Supply Chain Attacks",
    category: "Advanced Persistent Threat",
    severity: "High",
    description:
      "Targeting third-party vendors and suppliers to gain access to primary targets through trusted software and services. These attacks exploit the interconnected nature of modern software development and distribution. Attackers compromise legitimate software packages, updates, or development tools to inject malicious code that affects all downstream users. The SolarWinds attack demonstrated the devastating potential of supply chain compromises, affecting thousands of organizations worldwide. Package repositories for popular programming languages have become prime targets for supply chain attacks. Code signing certificates are being stolen or misused to legitimize malicious software. Open source software dependencies create vast attack surfaces that are difficult to monitor and secure. The complexity of modern software supply chains makes detection and attribution extremely challenging. Organizations must implement comprehensive vendor risk management and software composition analysis. The impact of successful supply chain attacks can be far-reaching and long-lasting, affecting national security and critical infrastructure.",
    indicators: [
      "Unexpected software behavior",
      "Unauthorized network connections",
      "Modified trusted applications",
      "Suspicious package dependencies",
    ],
    prevention: [
      "Software composition analysis",
      "Vendor security assessments",
      "Code signing verification",
      "Network monitoring",
      "Isolated development environments",
    ],
    affectedSectors: ["Technology", "Defense", "Government", "Finance"],
    recentActivity: "Malicious packages discovered in NPM repository",
    riskLevel: 82,
  },
  {
    id: "cloud-infrastructure-attacks",
    name: "Cloud Infrastructure Exploitation",
    category: "Cloud Security",
    severity: "Medium",
    description:
      "Exploiting misconfigurations and vulnerabilities in cloud services to gain unauthorized access to sensitive data. The rapid adoption of cloud services has created new attack vectors and security challenges. Misconfigured storage buckets, databases, and access controls are common entry points for attackers. Shared responsibility models in cloud computing create confusion about security obligations. Container and serverless technologies introduce additional complexity and potential vulnerabilities. Cloud service provider APIs become targets for credential stuffing and brute force attacks. Multi-tenancy in cloud environments raises concerns about data isolation and cross-tenant attacks. The ephemeral nature of cloud resources makes forensic investigation and incident response more challenging. Organizations often lack visibility into their cloud security posture and compliance status. Cloud-native attack techniques exploit the dynamic and automated nature of cloud environments. The scale and speed of cloud environments can amplify the impact of security incidents.",
    indicators: [
      "Unexpected cloud resource usage",
      "Unauthorized API calls",
      "Data exfiltration from cloud storage",
      "Suspicious cloud account activity",
    ],
    prevention: [
      "Cloud security posture management",
      "Identity and access management",
      "Network segmentation",
      "Continuous monitoring",
      "Regular security audits",
    ],
    affectedSectors: ["SaaS", "E-commerce", "Startups", "Technology"],
    recentActivity: "Exposed S3 bucket containing 100M customer records",
    riskLevel: 75,
  },
  {
    id: "mobile-banking-trojans",
    name: "Advanced Mobile Banking Trojans",
    category: "Mobile Malware",
    severity: "High",
    description:
      "Sophisticated mobile malware specifically designed to steal banking credentials and financial information from smartphones. These trojans use advanced evasion techniques including screen overlay attacks, SMS interception, and real-time transaction manipulation. Modern variants can bypass two-factor authentication by intercepting SMS codes and push notifications. They often masquerade as legitimate banking apps or popular applications to trick users into installation. Remote access capabilities allow attackers to control infected devices and perform fraudulent transactions. Social engineering techniques are integrated into the malware to manipulate victims into providing additional credentials. Machine learning algorithms help the malware adapt to different banking applications and security measures. The global reach of these trojans affects millions of mobile banking users across different countries and platforms. Law enforcement agencies struggle to track and prosecute the international criminal networks behind these operations. The financial losses from mobile banking trojans reach billions of dollars annually worldwide.",
    indicators: [
      "Unexpected app installations",
      "Suspicious permission requests",
      "Unauthorized financial transactions",
      "Battery drain and performance issues",
    ],
    prevention: [
      "App store verification",
      "Mobile device management",
      "Regular security updates",
      "Behavioral monitoring",
      "User education programs",
    ],
    affectedSectors: ["Banking", "Finance", "Mobile Payments", "E-commerce"],
    recentActivity: "New variant targets 400+ banking apps globally",
    riskLevel: 87,
  },
  {
    id: "iot-botnet-networks",
    name: "IoT Botnet Networks",
    category: "IoT Security",
    severity: "Medium",
    description:
      "Large-scale networks of compromised Internet of Things devices used for distributed attacks and cryptocurrency mining. These botnets exploit weak default credentials and unpatched vulnerabilities in IoT devices including routers, cameras, smart home devices, and industrial sensors. The Mirai botnet demonstrated the potential for IoT devices to be weaponized for massive DDoS attacks. Infected devices continue to function normally while secretly participating in malicious activities. The decentralized nature of IoT botnets makes them resilient to takedown efforts. Cryptocurrency mining malware specifically targets IoT devices with sufficient processing power. The vast number of IoT devices and poor security practices create an enormous attack surface. Many IoT manufacturers prioritize functionality and cost over security, leaving devices vulnerable. The lifecycle management of IoT devices often lacks adequate security update mechanisms. Consumer awareness of IoT security risks remains low, contributing to the problem.",
    indicators: [
      "Unusual network traffic from IoT devices",
      "Performance degradation of connected devices",
      "Unexpected internet usage",
      "Devices connecting to unknown servers",
    ],
    prevention: [
      "Change default passwords",
      "Regular firmware updates",
      "Network segmentation",
      "IoT security monitoring",
      "Device inventory management",
    ],
    affectedSectors: [
      "Smart Homes",
      "Industrial IoT",
      "Healthcare",
      "Transportation",
    ],
    recentActivity: "50,000 smart cameras recruited into botnet",
    riskLevel: 70,
  },
  {
    id: "state-sponsored-apt",
    name: "State-Sponsored APT Groups",
    category: "Advanced Persistent Threat",
    severity: "Critical",
    description:
      "Nation-state actors conducting sophisticated, long-term cyber espionage and sabotage operations against government, military, and critical infrastructure targets. These Advanced Persistent Threat (APT) groups possess extensive resources, advanced technical capabilities, and specific geopolitical objectives. They employ zero-day exploits, custom malware, and social engineering to establish persistent access to target networks. The attribution of APT attacks is often complex and controversial, involving detailed forensic analysis and intelligence gathering. These groups often focus on intellectual property theft, diplomatic intelligence, and strategic military information. Critical infrastructure attacks by state actors pose national security risks and potential for widespread disruption. The line between espionage and warfare becomes blurred in cyberspace, creating new challenges for international law and diplomacy. Defense against APT requires nation-level coordination and information sharing between government and private sector entities. The long-term nature of APT campaigns means that detection often occurs months or years after initial compromise.",
    indicators: [
      "Advanced persistent presence",
      "Custom malware signatures",
      "Lateral movement patterns",
      "Data exfiltration activities",
    ],
    prevention: [
      "Advanced threat detection",
      "Network segmentation",
      "Regular security assessments",
      "Threat intelligence sharing",
      "Incident response capabilities",
    ],
    affectedSectors: [
      "Government",
      "Defense",
      "Critical Infrastructure",
      "Technology",
    ],
    recentActivity: "APT29 linked to recent government agency breaches",
    riskLevel: 92,
  },
  {
    id: "deepfake-disinformation",
    name: "Deepfake Disinformation Campaigns",
    category: "Disinformation",
    severity: "Medium",
    description:
      "AI-generated fake audio and video content used to spread false information, manipulate public opinion, and conduct social engineering attacks. Deepfake technology has become increasingly sophisticated and accessible, enabling the creation of convincing fake media content. Political figures, business leaders, and celebrities are common targets for deepfake creation. The technology poses significant risks to democratic processes, financial markets, and social stability. Detection of deepfakes requires specialized tools and expertise that may not be widely available. Social media platforms struggle to identify and remove deepfake content at scale. The psychological impact of deepfakes extends beyond individual victims to undermine trust in authentic media. Legal frameworks for addressing deepfake abuse are still evolving in most jurisdictions. The democratization of deepfake creation tools increases the potential for widespread misuse. Organizations must develop policies and technologies to address deepfake threats to their reputation and operations.",
    indicators: [
      "Unusual facial expressions or lip sync",
      "Inconsistent lighting or shadows",
      "Audio quality mismatches",
      "Suspicious source or distribution",
    ],
    prevention: [
      "Deepfake detection tools",
      "Media authentication",
      "Source verification",
      "Employee awareness training",
      "Crisis communication plans",
    ],
    affectedSectors: ["Media", "Politics", "Entertainment", "Business"],
    recentActivity: "Deepfake CEO video used in stock manipulation",
    riskLevel: 68,
  },
  {
    id: "quantum-computing-threats",
    name: "Quantum Computing Cryptographic Threats",
    category: "Emerging Technology",
    severity: "Medium",
    description:
      "The potential for quantum computers to break current cryptographic algorithms and encryption methods that protect sensitive data and communications. While practical quantum computers capable of cryptographic attacks don't yet exist, the threat drives current security planning and research. Shor's algorithm could theoretically break RSA and elliptic curve cryptography that secure most internet communications. Organizations must begin planning for post-quantum cryptography to prepare for this future threat. The timeline for quantum computing threats remains uncertain, but security experts recommend proactive preparation. Nation-states are heavily investing in quantum computing research for both defensive and offensive capabilities. The concept of 'harvest now, decrypt later' attacks involves collecting encrypted data today for future quantum decryption. Quantum key distribution offers potential solutions but requires significant infrastructure changes. The transition to quantum-resistant algorithms will be complex and costly for organizations worldwide. International standards bodies are working to develop and validate post-quantum cryptographic algorithms.",
    indicators: [
      "Current indicators not applicable",
      "Future threat assessment based on quantum computing advances",
      "Cryptographic vulnerability analysis",
      "Long-term data protection requirements",
    ],
    prevention: [
      "Post-quantum cryptography planning",
      "Cryptographic agility",
      "Regular algorithm updates",
      "Quantum-resistant protocols",
      "Strategic security roadmap",
    ],
    affectedSectors: ["Government", "Finance", "Healthcare", "Technology"],
    recentActivity: "IBM announces 433-qubit quantum processor",
    riskLevel: 60,
  },
  {
    id: "business-email-compromise",
    name: "Business Email Compromise (BEC)",
    category: "Social Engineering",
    severity: "High",
    description:
      "Sophisticated email fraud schemes targeting organizations to trick employees into transferring money or sensitive information to criminals posing as trusted entities. BEC attacks often involve impersonation of executives, vendors, or business partners through compromised or spoofed email accounts. The attacks rely heavily on social engineering and research about target organizations and their business relationships. Financial losses from BEC attacks exceed billions of dollars annually, making it one of the most costly cyber threats. Criminals often conduct extensive reconnaissance using social media, company websites, and public records to create convincing impersonation attempts. The attacks frequently target finance departments and employees with authority to transfer funds or access sensitive data. Wire transfer fraud is a common outcome of successful BEC attacks, with funds often quickly moved through multiple accounts to obscure the trail. Real estate transactions have become a popular target for BEC criminals due to the large sums involved and less stringent verification procedures. The emotional manipulation techniques used in BEC attacks exploit human psychology and organizational hierarchies.",
    indicators: [
      "Urgent wire transfer requests",
      "Changes to vendor payment instructions",
      "Executive impersonation emails",
      "Requests for sensitive information",
    ],
    prevention: [
      "Multi-factor verification for financial transactions",
      "Employee training on BEC tactics",
      "Email authentication protocols",
      "Vendor verification procedures",
      "Financial control policies",
    ],
    affectedSectors: ["Finance", "Real Estate", "Manufacturing", "Healthcare"],
    recentActivity: "University loses $11M to BEC attack",
    riskLevel: 85,
  },

  {
    id: "zero-day-exploits",
    name: "Zero-Day Vulnerability Exploits",
    category: "Vulnerability Exploitation",
    severity: "Critical",
    description:
      "Attacks that exploit previously unknown software vulnerabilities before developers can create and deploy patches. Zero-day exploits are particularly dangerous because there are no existing defenses against them. Cybercriminals and nation-state actors actively search for these vulnerabilities to use in targeted attacks. The time between discovery and patching creates a window of opportunity for attackers. Zero-day exploits are often sold on dark web markets for significant sums. Organizations with high-value targets are particularly at risk from zero-day attacks. The development of exploit kits has made zero-day exploits more accessible to less skilled attackers. Bug bounty programs help organizations discover vulnerabilities before malicious actors. The responsible disclosure process aims to balance security research with public safety. Advanced persistent threat groups often stockpile zero-day exploits for strategic use.",
    indicators: [
      "Unusual system behavior or crashes",
      "Unexpected network traffic",
      "Unknown processes running",
      "System performance degradation",
    ],
    prevention: [
      "Keep all software updated",
      "Use application sandboxing",
      "Implement endpoint detection",
      "Network monitoring and anomaly detection",
      "Vulnerability scanning programs",
    ],
    affectedSectors: [
      "All Industries",
      "Government",
      "Critical Infrastructure",
    ],
    recentActivity:
      "Critical Windows vulnerability discovered in authentication system",
    riskLevel: 98,
  },
  {
    id: "cryptocurrency-malware",
    name: "Cryptocurrency Mining Malware",
    category: "Malware",
    severity: "High",
    description:
      "Malicious software designed to secretly use infected computers' processing power to mine cryptocurrency for attackers. This type of malware, also known as cryptojacking, has become increasingly popular due to the rising value of cryptocurrencies. Unlike traditional malware, cryptominers often aim to remain hidden for extended periods to maximize profits. The malware can significantly slow down infected systems and increase electricity costs for victims. Web-based cryptojacking uses JavaScript to mine cryptocurrency when users visit infected websites. Mobile devices are increasingly targeted by cryptocurrency mining malware. Cloud infrastructure has become a prime target due to its computational resources. The distributed nature of cryptocurrency networks makes detection and prevention challenging. Some variants combine cryptomining with other malicious activities like data theft. The profitability of cryptojacking has led to its adoption by various cybercriminal groups.",
    indicators: [
      "Significantly slower computer performance",
      "Overheating and increased fan noise",
      "Higher than normal electricity bills",
      "CPU usage consistently at 100%",
    ],
    prevention: [
      "Use ad blockers and script blockers",
      "Keep antivirus software updated",
      "Monitor system resource usage",
      "Block known cryptomining domains",
      "Use browser security extensions",
    ],
    affectedSectors: ["Individual Users", "Small Business", "Cloud Providers"],
    recentActivity:
      "New cryptominer targets Docker containers in cloud environments",
    riskLevel: 78,
  },
  {
    id: "insider-threats",
    name: "Malicious Insider Threats",
    category: "Internal Security",
    severity: "High",
    description:
      "Security threats originating from individuals within the organization, including employees, contractors, or business partners who have authorized access to systems and data. Insider threats can be particularly devastating because these individuals already have legitimate access and knowledge of internal systems. Motivations vary from financial gain and revenge to espionage and ideology. Detecting insider threats is challenging because the activity often appears legitimate. Privileged users pose the highest risk due to their elevated access levels. The COVID-19 pandemic and remote work have increased insider threat risks. Data loss prevention systems can help monitor for suspicious data access patterns. Behavioral analytics and user activity monitoring are key detection methods. Organizations must balance security monitoring with employee privacy concerns. The impact of insider threats often extends beyond immediate financial losses to include damaged reputation and regulatory penalties.",
    indicators: [
      "Unusual access patterns to sensitive data",
      "Downloading large amounts of data",
      "Accessing systems outside normal hours",
      "Attempts to bypass security controls",
    ],
    prevention: [
      "Implement principle of least privilege",
      "Regular access reviews and audits",
      "User behavior analytics",
      "Data loss prevention systems",
      "Employee security awareness training",
    ],
    affectedSectors: ["Finance", "Healthcare", "Government", "Technology"],
    recentActivity:
      "Bank employee steals customer data for identity theft ring",
    riskLevel: 84,
  },
  {
    id: "social-media-scams",
    name: "Social Media-Based Scams",
    category: "Social Engineering",
    severity: "Medium",
    description:
      "Fraudulent schemes conducted through social media platforms to deceive users into sharing personal information, money, or access credentials. These scams exploit the trust and social connections inherent in social media networks. Romance scams target users seeking relationships, building emotional connections before requesting money. Investment scams promise high returns on cryptocurrency or other investments. Fake giveaways and contests collect personal information for identity theft. Phishing attempts use fake social media messages to steal login credentials. Social media scams often use fake profiles with stolen photos and information. The viral nature of social media can help scams spread rapidly. Deepfake technology is increasingly used to create convincing fake videos. Social media platforms struggle to detect and remove scam content quickly enough. Education about social media security is crucial for prevention.",
    indicators: [
      "Unsolicited messages from unknown contacts",
      "Requests for money or personal information",
      "Too-good-to-be-true offers or deals",
      "Urgent requests for immediate action",
    ],
    prevention: [
      "Verify contacts and requests independently",
      "Use strong privacy settings",
      "Be skeptical of unsolicited offers",
      "Report suspicious accounts and content",
      "Educate family and friends about scams",
    ],
    affectedSectors: ["General Public", "Small Business", "E-commerce"],
    recentActivity: "Fake cryptocurrency giveaway scam nets $2M from victims",
    riskLevel: 65,
  },
  {
    id: "dns-hijacking",
    name: "DNS Hijacking Attacks",
    category: "Network Security",
    severity: "High",
    description:
      "Attacks that manipulate Domain Name System (DNS) queries to redirect users to malicious websites or intercept their traffic. DNS hijacking can occur at various levels, from individual devices to internet service providers. Router-based attacks modify DNS settings on home and business routers. ISP-level hijacking affects thousands of users simultaneously. DNS cache poisoning introduces false information into DNS resolvers. These attacks can redirect banking and e-commerce traffic to fake websites designed to steal credentials. DNS over HTTPS (DoH) and DNS over TLS (DoT) provide protection but aren't universally adopted. Nation-state actors use DNS hijacking for surveillance and censorship. The decentralized nature of DNS makes comprehensive protection challenging. Regular monitoring of DNS settings and using secure DNS providers can help prevent attacks.",
    indicators: [
      "Unexpected website redirections",
      "Security certificate warnings",
      "Slow or unusual internet behavior",
      "Pop-ups on normally clean websites",
    ],
    prevention: [
      "Use secure DNS providers",
      "Regularly check router DNS settings",
      "Enable DNS over HTTPS",
      "Monitor network traffic",
      "Keep router firmware updated",
    ],
    affectedSectors: ["ISPs", "Small Business", "Home Users", "E-commerce"],
    recentActivity:
      "Major ISP DNS infrastructure compromised affecting 100K users",
    riskLevel: 81,
  },
  {
    id: "api-security-threats",
    name: "API Security Vulnerabilities",
    category: "Web Security",
    severity: "High",
    description:
      "Security flaws in Application Programming Interfaces (APIs) that expose sensitive data and functionality to unauthorized access. APIs have become critical components of modern applications, making their security paramount. Common vulnerabilities include broken authentication, excessive data exposure, and injection attacks. Rate limiting failures can lead to denial of service attacks. Improper asset management leaves shadow APIs vulnerable. The OWASP API Security Top 10 provides a framework for understanding common risks. API security testing requires specialized tools and methodologies. Microservices architectures increase the API attack surface. DevSecOps practices help integrate security into API development. Regular security audits and penetration testing are essential for API security.",
    indicators: [
      "Unusual API traffic patterns",
      "Unauthorized API access attempts",
      "Data exfiltration through API calls",
      "API error messages revealing sensitive information",
    ],
    prevention: [
      "Implement strong API authentication",
      "Use rate limiting and throttling",
      "Regular API security testing",
      "API gateway security controls",
      "Monitor and log API activity",
    ],
    affectedSectors: ["Technology", "SaaS", "E-commerce", "Finance"],
    recentActivity:
      "Popular social media API exposes personal data of 50M users",
    riskLevel: 83,
  },
  {
    id: "supply-chain-software",
    name: "Open Source Supply Chain Attacks",
    category: "Software Security",
    severity: "Critical",
    description:
      "Attacks targeting open source software components and packages to compromise applications that depend on them. Modern software development heavily relies on open source libraries and dependencies, creating vast attack surfaces. Package repositories like npm, PyPI, and Maven Central have become targets for malicious code injection. Typosquatting attacks use similar names to legitimate packages to trick developers. Dependency confusion attacks exploit naming conflicts between public and private packages. Compromised maintainer accounts can be used to inject malicious code into popular packages. The transitive nature of dependencies means one compromised package can affect thousands of applications. Software composition analysis tools help identify vulnerable dependencies. Package signing and verification mechanisms provide security but aren't universally adopted. The challenge lies in balancing the benefits of open source software with security risks.",
    indicators: [
      "Unexpected package behavior",
      "Unauthorized network connections from applications",
      "Modified package checksums",
      "Suspicious package update notifications",
    ],
    prevention: [
      "Software composition analysis",
      "Dependency pinning and lock files",
      "Private package repositories",
      "Code review of dependencies",
      "Automated vulnerability scanning",
    ],
    affectedSectors: ["Software Development", "Technology", "Startups"],
    recentActivity:
      "Malicious Python package with 10K downloads discovered in PyPI",
    riskLevel: 89,
  },
  {
    id: "deepfake-audio",
    name: "AI-Generated Voice Cloning",
    category: "Artificial Intelligence",
    severity: "Medium",
    description:
      "Technology that creates realistic synthetic speech that mimics specific individuals' voices for fraudulent purposes. Voice cloning has become increasingly sophisticated and accessible, requiring only minutes of sample audio. These attacks target high-profile executives and public figures for business email compromise and social engineering. Real-time voice conversion allows for live impersonation during phone calls. The technology poses risks to voice-based authentication systems. Financial institutions are particularly vulnerable to voice cloning fraud. Legal and ethical frameworks struggle to keep pace with the technology. Detection of synthetic speech requires specialized tools and training. The democratization of voice cloning technology increases the potential for widespread misuse. Organizations must develop new verification methods beyond voice recognition.",
    indicators: [
      "Unusual requests from familiar voices",
      "Phone calls with slight audio quality issues",
      "Rushed or urgent tone in voice communications",
      "Requests that bypass normal procedures",
    ],
    prevention: [
      "Multi-factor voice verification",
      "Callback verification procedures",
      "Voice deepfake detection tools",
      "Employee training on voice fraud",
      "Alternative authentication methods",
    ],
    affectedSectors: ["Finance", "Legal", "Entertainment", "Politics"],
    recentActivity: "CEO voice clone used in $35M wire transfer fraud",
    riskLevel: 72,
  },
  {
    id: "quantum-resistant-crypto",
    name: "Post-Quantum Cryptography Transition",
    category: "Cryptography",
    severity: "Medium",
    description:
      "The ongoing challenge of migrating from current cryptographic systems to quantum-resistant algorithms before practical quantum computers emerge. This transition involves significant technical, operational, and financial challenges for organizations worldwide. NIST has standardized several post-quantum cryptographic algorithms, but implementation remains complex. Hybrid systems that use both classical and post-quantum algorithms provide interim protection. The timeline for quantum computing threats remains uncertain, creating planning challenges. Legacy systems may be difficult or impossible to upgrade to quantum-resistant cryptography. Cryptographic agility becomes crucial for future-proofing security systems. International coordination is needed to ensure interoperability of new standards. The transition period creates vulnerabilities as organizations implement new systems. Performance implications of post-quantum algorithms may require hardware upgrades.",
    indicators: [
      "Current indicators not directly applicable",
      "Assessment based on cryptographic inventory",
      "Quantum computing advancement monitoring",
      "Regulatory compliance requirements",
    ],
    prevention: [
      "Cryptographic asset inventory",
      "Post-quantum migration planning",
      "Hybrid cryptographic implementations",
      "Regular cryptographic assessments",
      "Staying informed on quantum developments",
    ],
    affectedSectors: [
      "Government",
      "Finance",
      "Healthcare",
      "Critical Infrastructure",
    ],
    recentActivity: "NIST finalizes post-quantum cryptography standards",
    riskLevel: 55,
  },
  {
    id: "cloud-misconfiguration",
    name: "Cloud Security Misconfigurations",
    category: "Cloud Security",
    severity: "High",
    description:
      "Improperly configured cloud services and resources that expose sensitive data and systems to unauthorized access. Cloud misconfigurations are among the leading causes of data breaches in cloud environments. Common issues include publicly accessible storage buckets, overprivileged IAM roles, and unencrypted data. The shared responsibility model creates confusion about security obligations between cloud providers and customers. Default configurations are often insecure and require manual hardening. The dynamic nature of cloud environments makes configuration drift a constant challenge. Infrastructure as Code (IaC) can help maintain consistent security configurations. Cloud Security Posture Management (CSPM) tools provide automated configuration monitoring. Compliance frameworks provide guidance but require careful implementation. Regular security audits and penetration testing are essential for cloud security.",
    indicators: [
      "Publicly accessible cloud storage",
      "Excessive permissions in IAM policies",
      "Unencrypted data transmission",
      "Missing security logging and monitoring",
    ],
    prevention: [
      "Cloud security posture management",
      "Infrastructure as Code security scanning",
      "Regular configuration audits",
      "Principle of least privilege",
      "Automated compliance monitoring",
    ],
    affectedSectors: ["SaaS", "Startups", "E-commerce", "Healthcare"],
    recentActivity:
      "Healthcare provider exposes 3M patient records via misconfigured S3 bucket",
    riskLevel: 87,
  },
  {
    id: "fileless-malware",
    name: "Fileless Malware Attacks",
    category: "Advanced Malware",
    severity: "High",
    description:
      "Sophisticated malware that operates entirely in computer memory without writing files to disk, making detection extremely difficult. Fileless attacks leverage legitimate system tools and processes to carry out malicious activities. PowerShell, WMI, and other administrative tools are commonly exploited for fileless attacks. These attacks often target system registries and memory to maintain persistence. Living-off-the-land techniques use trusted applications for malicious purposes. Detection requires advanced behavioral analysis and memory forensics. Traditional signature-based antivirus solutions often fail to detect fileless attacks. Endpoint detection and response (EDR) tools are better equipped to identify these threats. The increasing sophistication of fileless malware poses significant challenges to cybersecurity. Nation-state actors and advanced persistent threat groups commonly use fileless techniques.",
    indicators: [
      "Unusual PowerShell or WMI activity",
      "Suspicious registry modifications",
      "Unexpected network connections from system processes",
      "Memory anomalies in system processes",
    ],
    prevention: [
      "Endpoint detection and response tools",
      "PowerShell logging and monitoring",
      "Application whitelisting",
      "Behavioral analysis tools",
      "Memory protection mechanisms",
    ],
    affectedSectors: ["Government", "Finance", "Healthcare", "Technology"],
    recentActivity:
      "Fileless malware campaign targets financial institutions globally",
    riskLevel: 91,
  },
  {
    id: "biometric-spoofing",
    name: "Biometric Authentication Bypass",
    category: "Authentication Security",
    severity: "Medium",
    description:
      "Attacks that circumvent biometric security systems using fake fingerprints, facial recognition spoofing, or voice mimicking. Biometric spoofing exploits weaknesses in biometric capture and processing systems. 3D printing technology enables creation of realistic fingerprint replicas. High-resolution photos can be used to spoof facial recognition systems. Voice synthesis and replay attacks target voice recognition systems. Presentation attack detection (PAD) systems provide additional security layers. Multimodal biometric systems using multiple biometric factors improve security. The permanence of biometric data creates long-term security implications if compromised. Privacy concerns arise from biometric data collection and storage. Legal frameworks for biometric data protection vary globally. Organizations must balance convenience with security when implementing biometric systems.",
    indicators: [
      "Unexpected biometric authentication failures",
      "Security system alerts about presentation attacks",
      "Unusual patterns in biometric enrollment",
      "Reports of biometric data misuse",
    ],
    prevention: [
      "Liveness detection systems",
      "Multimodal biometric authentication",
      "Regular biometric system updates",
      "Encrypted biometric data storage",
      "Employee training on biometric security",
    ],
    affectedSectors: [
      "Finance",
      "Government",
      "Healthcare",
      "Consumer Electronics",
    ],
    recentActivity:
      "Researchers demonstrate smartphone fingerprint spoofing with 3D printing",
    riskLevel: 69,
  },
  {
    id: "container-security",
    name: "Container Runtime Attacks",
    category: "Infrastructure Security",
    severity: "High",
    description:
      "Security threats targeting containerized applications and orchestration platforms like Docker and Kubernetes. Container security involves multiple layers from image security to runtime protection. Vulnerable base images can introduce security flaws into all derived containers. Container escape attacks aim to break out of container isolation. Misconfigured container orchestration platforms expose sensitive data and systems. Privileged containers pose significant security risks if compromised. Secrets management in containerized environments requires special consideration. Network segmentation and micro-segmentation become critical in container environments. Container image scanning and vulnerability management are essential security practices. Runtime protection and anomaly detection help identify attacks in progress.",
    indicators: [
      "Unusual container network traffic",
      "Unexpected container privilege escalation",
      "Suspicious container resource usage",
      "Unauthorized access to container orchestration APIs",
    ],
    prevention: [
      "Container image vulnerability scanning",
      "Runtime security monitoring",
      "Network policy enforcement",
      "Secrets management solutions",
      "Container hardening practices",
    ],
    affectedSectors: ["Technology", "Cloud Providers", "DevOps", "Startups"],
    recentActivity: "Critical Kubernetes vulnerability allows cluster takeover",
    riskLevel: 85,
  },
  {
    id: "automotive-cybersecurity",
    name: "Connected Vehicle Cyber Attacks",
    category: "IoT Security",
    severity: "Medium",
    description:
      "Security threats targeting connected and autonomous vehicles through various attack vectors including wireless communications, onboard systems, and remote services. Modern vehicles contain numerous electronic control units (ECUs) that communicate over internal networks. Remote attacks can target vehicle connectivity systems including cellular, Wi-Fi, and Bluetooth. Physical access attacks involve connecting to onboard diagnostic ports. Over-the-air update mechanisms can be compromised to deliver malicious firmware. Vehicle-to-vehicle (V2V) and vehicle-to-infrastructure (V2I) communications create new attack surfaces. The safety implications of automotive cybersecurity extend beyond data protection to physical safety. Regulatory frameworks for automotive cybersecurity are still evolving. The complexity of automotive supply chains creates challenges for security assurance. Consumer awareness of vehicle cybersecurity risks remains limited.",
    indicators: [
      "Unusual vehicle behavior or system malfunctions",
      "Unexpected software updates or changes",
      "Strange network traffic from vehicle systems",
      "Unauthorized access to vehicle data",
    ],
    prevention: [
      "Secure software development practices",
      "Network segmentation in vehicles",
      "Cryptographic protection of communications",
      "Regular security updates and patches",
      "Penetration testing of vehicle systems",
    ],
    affectedSectors: ["Automotive", "Transportation", "Consumer"],
    recentActivity:
      "Security researchers demonstrate remote vehicle unlock exploit",
    riskLevel: 73,
  },
  {
    id: "medical-device-hacking",
    name: "Medical Device Cybersecurity Threats",
    category: "Healthcare Security",
    severity: "High",
    description:
      "Attacks targeting internet-connected medical devices including pacemakers, insulin pumps, and hospital equipment. Medical device security involves life-safety considerations beyond traditional cybersecurity. Legacy medical devices often lack modern security features and update mechanisms. Network-connected devices in hospitals create entry points for broader attacks. The FDA and other regulators are implementing cybersecurity requirements for medical devices. Patient privacy and HIPAA compliance add complexity to medical device security. The long lifecycle of medical devices creates challenges for maintaining security over time. Interoperability requirements can conflict with security best practices. Security research in medical devices raises ethical considerations about responsible disclosure. Healthcare organizations must balance patient care with cybersecurity risks.",
    indicators: [
      "Unusual device behavior or alarms",
      "Unexpected network traffic from medical devices",
      "Device connectivity issues",
      "Unauthorized configuration changes",
    ],
    prevention: [
      "Network segmentation for medical devices",
      "Regular security assessments",
      "Device inventory and asset management",
      "Vendor security requirements",
      "Incident response procedures",
    ],
    affectedSectors: ["Healthcare", "Medical Device Manufacturers"],
    recentActivity:
      "Insulin pump vulnerability allows remote dosage manipulation",
    riskLevel: 88,
  },
  {
    id: "deepfake-detection",
    name: "Deepfake Detection Evasion",
    category: "Artificial Intelligence",
    severity: "Medium",
    description:
      "Advanced deepfake technologies designed to evade current detection systems and create increasingly convincing fake media. The arms race between deepfake creation and detection continues to escalate. Generative adversarial networks (GANs) are becoming more sophisticated in creating realistic fake content. Detection systems that rely on artifacts or inconsistencies can be overcome by improved generation techniques. Real-time deepfake generation is becoming possible with improved hardware and algorithms. The democratization of deepfake technology increases the potential for misuse. Social media platforms struggle to implement effective deepfake detection at scale. Legal and regulatory frameworks for addressing deepfakes are still developing. The psychological impact of deepfakes extends beyond individual victims to societal trust in media. Research into provenance and authentication technologies provides potential solutions.",
    indicators: [
      "Subtle inconsistencies in facial expressions",
      "Unnatural eye movements or blinking patterns",
      "Audio-visual synchronization issues",
      "Inconsistent lighting or shadows",
    ],
    prevention: [
      "Advanced deepfake detection tools",
      "Media authentication and provenance",
      "Multi-source verification",
      "Public awareness and education",
      "Platform content moderation policies",
    ],
    affectedSectors: ["Media", "Politics", "Entertainment", "Justice System"],
    recentActivity:
      "New deepfake algorithm achieves 99% realism in benchmark tests",
    riskLevel: 76,
  },
  {
    id: "smart-grid-attacks",
    name: "Smart Grid Cybersecurity Threats",
    category: "Critical Infrastructure",
    severity: "Critical",
    description:
      "Attacks targeting modernized electrical grid infrastructure that relies on digital communications and automated controls. Smart grids integrate information technology with operational technology, creating new attack surfaces. SCADA systems controlling power generation and distribution can be targeted by cybercriminals and nation-states. Advanced metering infrastructure (AMI) creates millions of potential entry points into grid networks. Communication protocols used in smart grids may lack adequate security controls. The interconnected nature of smart grids means local attacks can have widespread impacts. Physical and cyber security must be considered together for comprehensive protection. Regulatory requirements like NERC CIP provide security frameworks but implementation varies. The critical nature of electrical infrastructure makes smart grid security a national security issue. Backup systems and manual controls provide resilience against cyber attacks.",
    indicators: [
      "Unusual SCADA system behavior",
      "Unauthorized access to grid control systems",
      "Abnormal power flow patterns",
      "Communication system anomalies",
    ],
    prevention: [
      "Network segmentation and air gaps",
      "Industrial control system security",
      "Regular security assessments",
      "Incident response procedures",
      "Employee security training",
    ],
    affectedSectors: ["Energy", "Utilities", "Critical Infrastructure"],
    recentActivity: "Power grid attack in Ukraine causes widespread blackouts",
    riskLevel: 94,
  },
  {
    id: "satellite-communication",
    name: "Satellite Communication Jamming",
    category: "Communication Security",
    severity: "Medium",
    description:
      "Attacks that disrupt satellite communications through jamming, spoofing, or other interference techniques. Satellite communications are critical for military, commercial, and civilian applications. GPS jamming and spoofing can affect navigation systems and timing references. Commercial satellite internet services become targets as they gain popularity. Ground station security is often overlooked but critical for overall satellite security. The space domain is becoming increasingly contested and competitive. International law governing space activities is complex and evolving. Anti-satellite weapons and capabilities are being developed by multiple nations. Cybersecurity of satellite systems involves both ground and space components. Backup communication systems and redundancy provide resilience against attacks.",
    indicators: [
      "GPS signal loss or inaccuracy",
      "Satellite communication interruptions",
      "Unusual interference patterns",
      "Ground station security breaches",
    ],
    prevention: [
      "Anti-jamming technologies",
      "Encrypted satellite communications",
      "Ground station physical security",
      "Backup communication systems",
      "International cooperation on space security",
    ],
    affectedSectors: ["Military", "Aviation", "Maritime", "Telecommunications"],
    recentActivity: "Commercial satellite internet disrupted by signal jamming",
    riskLevel: 71,
  },
  {
    id: "synthetic-identity",
    name: "Synthetic Identity Fraud",
    category: "Identity Theft",
    severity: "High",
    description:
      "Fraudulent identities created by combining real and fake personal information to establish credit profiles and commit financial crimes. Synthetic identity fraud is one of the fastest-growing types of financial crime. Criminals combine real Social Security numbers with fake names and addresses to create new identities. These synthetic identities are cultivated over time to build credit history and pass verification checks. Machine learning and automation make it easier to create and manage multiple synthetic identities. Traditional identity verification methods often fail to detect synthetic identities. The impact extends beyond immediate financial losses to affect credit systems and regulatory compliance. Detection requires advanced analytics and cross-institutional data sharing. Financial institutions are implementing new verification technologies to combat synthetic identity fraud. The long-term nature of these schemes makes them difficult to detect until significant losses occur.",
    indicators: [
      "Credit applications with unusual data combinations",
      "Lack of historical credit data for applicants",
      "Multiple applications with similar information",
      "Inconsistent identity verification results",
    ],
    prevention: [
      "Advanced identity verification systems",
      "Cross-institutional data sharing",
      "Machine learning fraud detection",
      "Regular credit monitoring",
      "Enhanced due diligence procedures",
    ],
    affectedSectors: ["Banking", "Credit", "Insurance", "Financial Services"],
    recentActivity:
      "Synthetic identity ring defrauds banks of $200M over 5 years",
    riskLevel: 82,
  },
  {
    id: "workplace-surveillance",
    name: "Workplace Surveillance Overreach",
    category: "Privacy Security",
    severity: "Medium",
    description:
      "Excessive monitoring of employees through digital surveillance tools that may violate privacy rights and create security vulnerabilities. The rise of remote work has increased workplace surveillance technology adoption. Employee monitoring software can capture keystrokes, screen content, and personal activities. Biometric tracking and location monitoring raise privacy concerns. The data collected by surveillance systems creates new security risks if compromised. Legal frameworks for workplace surveillance vary by jurisdiction and are evolving. Employee trust and morale can be negatively impacted by excessive surveillance. Balancing productivity monitoring with privacy rights requires careful consideration. Transparent policies and consent mechanisms are important for ethical surveillance. Alternative approaches like outcome-based management may achieve similar goals with less privacy invasion.",
    indicators: [
      "Employee complaints about privacy invasion",
      "Excessive data collection by monitoring tools",
      "Lack of transparency in surveillance policies",
      "Security incidents involving surveillance data",
    ],
    prevention: [
      "Clear surveillance policies and procedures",
      "Regular privacy impact assessments",
      "Secure storage of surveillance data",
      "Employee education and consent",
      "Legal compliance reviews",
    ],
    affectedSectors: ["All Industries", "Remote Work", "Human Resources"],
    recentActivity:
      "Employee surveillance software data breach exposes private communications",
    riskLevel: 64,
  },
];

export const getThreatById = (id: string): ThreatData | undefined => {
  return threatsData.find((threat) => threat.id === id);
};

export const getThreatsByCategory = (category: string): ThreatData[] => {
  return threatsData.filter((threat) => threat.category === category);
};

export const getThreatsBySeverity = (severity: string): ThreatData[] => {
  return threatsData.filter((threat) => threat.severity === severity);
};

export const getAllThreatCategories = (): string[] => {
  return [...new Set(threatsData.map((threat) => threat.category))];
};

export const getCurrentThreatLevel = (): {
  level: string;
  color: string;
  description: string;
} => {
  const criticalThreats = threatsData.filter(
    (t) => t.severity === "Critical",
  ).length;
  const highThreats = threatsData.filter((t) => t.severity === "High").length;

  if (criticalThreats >= 3) {
    return {
      level: "CRITICAL",
      color: "destructive",
      description: "Multiple critical threats detected",
    };
  } else if (criticalThreats >= 1 || highThreats >= 5) {
    return {
      level: "HIGH",
      color: "warning",
      description: "Elevated threat activity",
    };
  } else {
    return {
      level: "MEDIUM",
      color: "secondary",
      description: "Normal threat levels",
    };
  }
};
