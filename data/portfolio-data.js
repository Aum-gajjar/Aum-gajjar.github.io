/**
 * PORTFOLIO DATA STORE // AUM GAJJAR
 * 
 * To add or edit projects in the future, simply add or update an object in the `projects` array below!
 * The website will automatically render the new cards, tags, metrics, and terminal listings.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Aum Bimalbhai Gajjar",
    role: "Data Analyst & Engineer",
    location: "Toronto, ON, Canada",
    email: "aumgajjar456@gmail.com",
    phone: "(647) 629-2456",
    linkedin: "https://www.linkedin.com/in/aum-gajjar-837874217",
    github: "https://github.com/Aum-gajjar",
    resumeUrl: "assets/Aum%20Gajjar%20CV.pdf",
    gpa: "3.76 / 4.00",
    college: "St. Clair College, Windsor, ON",
    recordsProcessed: "100K+",
    topRocAuc: "0.6804"
  },

  awards: [
    {
      id: "most-involved-class-rep",
      title: "Most Involved Class Representative of the Year",
      issuer: "Student Representative Council (SRC) — St. Clair College",
      period: "2025 – 2026",
      badgeType: "HONOR OF THE YEAR",
      description: "Awarded by the SRC Executive Board recognizing outstanding dedication, proactive engagement, and exceptional service to a cohort of 60+ Data Analytics students and the college community.",
      highlights: [
        "Primary student advocate and liaison between faculty, administration, and 60+ technical students.",
        "Drove campus academic workshops, volunteer participation, and peer collaboration."
      ],
      media: "assets/awards/Aum_gajjar class rep award.jfif",
      mediaType: "image"
    },
    {
      id: "student-volunteer-of-the-year",
      title: "Student Volunteer of the Year Award",
      issuer: "St. Clair College",
      period: "2024 – 2025",
      badgeType: "LEADERSHIP EXCELLENCE",
      description: "Honoured with the Student Volunteer of the Year award for extensive contributions across 4 consecutive semesters as SRC Class Representative, Data Club member, and Public Speaking Club contributor.",
      highlights: [
        "Dedicated over 100+ volunteer hours fostering campus engagement and technical peer learning.",
        "Maintained high academic standing while managing cross-club student initiatives."
      ],
      media: "assets/awards/volunteer_award_pic.jfif",
      mediaType: "image",
      externalLink: "https://lnkd.in/p/g9_u8vrs"
    },
    {
      id: "academic-distinction",
      title: "Letter of Academic Distinction (4.0 GPA)",
      issuer: "Zekelman School of Information Technology — St. Clair College",
      period: "Fall 2024 (Issued Jan 2025)",
      badgeType: "PERFECT 4.0 GPA",
      description: "Granted to a select group of high-performing students demonstrating exceptional academic mastery in Data Analytics for Business.",
      highlights: [
        "Achieved a perfect 4.0 GPA semester across database systems, statistical modeling, and analytics.",
        "Recognized by IT faculty as part of an influential high-performing student cohort."
      ],
      media: "assets/awards/Aum_StClair_Academic_Distinction.pdf",
      mediaType: "pdf"
    },
    {
      id: "weava-national-feature",
      title: "National Volunteer Week Feature",
      issuer: "Windsor Essex Association for Volunteer Administration (WEAVA)",
      period: "Apr 2025",
      badgeType: "NATIONAL RECOGNITION",
      description: "Featured nationally during National Volunteer Week celebrating exceptional community impact and student leadership across Ontario.",
      highlights: [
        "Profiled for dedicated community service, academic liaison work, and student advocacy."
      ],
      media: "assets/awards/Aum_Gajjar_volunteering.jpg",
      mediaType: "image",
      externalLink: "https://weavablog.wordpress.com/national-volunteer-week-feature/"
    }
  ],

  certifications: [
    {
      id: "salesforce-certified-associate",
      title: "Salesforce Certified Associate & Platform Foundation",
      issuer: "Salesforce",
      category: "CRM & Enterprise Systems",
      description: "Demonstrated proficiency in Salesforce CRM ecosystem, data models, reporting architecture, business user management, and security fundamentals.",
      media: "assets/certifications/Salesforce_associate.jpg",
      pdfUrl: "assets/certifications/Salesforce Platform foundation.pdf"
    },
    {
      id: "servicenow-platform-analytics",
      title: "ServiceNow Micro-Certification: Platform Analytics",
      issuer: "ServiceNow",
      category: "Enterprise Analytics & Telemetry",
      description: "Validated competencies in ServiceNow Performance Analytics, dashboard creation, KPI indicators, data visualizations, and automated analytics workspaces.",
      media: "assets/certifications/micro-certification-platform-analytics.png"
    },
    {
      id: "servicenow-welcome",
      title: "ServiceNow Micro-Certification: Welcome to ServiceNow",
      issuer: "ServiceNow",
      category: "Cloud Workflow Automation",
      description: "Foundational architecture in Now Platform navigation, table structures, workflow orchestration, and enterprise incident lifecycle workflows.",
      media: "assets/certifications/micro-certification-welcome-to-servicenow.png"
    },
    {
      id: "tcs-esg-experience",
      title: "ESG Virtual Experience Program",
      issuer: "Tata Consultancy Services (TCS) & Forage",
      category: "Corporate Sustainability Analytics",
      description: "Completed industry simulation on Environmental, Social, and Governance (ESG) analytics, data audits, sustainability metrics tracking, and executive disclosure reporting.",
      pdfUrl: "assets/certifications/TCS ESG Virtual Experience Program.pdf"
    },
    {
      id: "career-essentials-data-analysis",
      title: "Career Essentials in Data Analysis",
      issuer: "Microsoft & LinkedIn",
      category: "Analytics & BI Storytelling",
      description: "End-to-end data cleaning, exploratory data analysis, visual storytelling, business communication, and statistical foundations."
    },
    {
      id: "python-essential-training",
      title: "Python Essential Training",
      issuer: "LinkedIn Learning",
      category: "Programming & Automation",
      description: "Object-oriented scripting, data structures, automated web extraction with Selenium/BeautifulSoup, and data manipulation with pandas."
    }
  ],

  projects: [
    {
      id: "healthcare-readmission",
      title: "Healthcare 30-Day Readmission Risk Predictive Model",
      category: "Clinical Analytics & Machine Learning",
      status: "VALIDATED & OPTIMIZED",
      tools: ["Python", "pandas", "XGBoost", "LightGBM", "Scikit-Learn", "EDA"],
      keyMetric: "0.5466 Recall // 0.6804 ROC-AUC",
      description: "Analyzed the Diabetes 130-US Hospitals dataset (100k+ records) to identify factors associated with 30-day readmissions. Handled severe 11.2% positive class imbalance using stratified sampling and cost-sensitive classification.",
      keyFinding: "Prior inpatient utilization and emergency encounters were the strongest predictors of readmission risk.",
      interactiveType: "confusion-matrix",
      githubUrl: "https://github.com/Aum-gajjar",
      liveDemoUrl: "#dashboards-section"
    },
    {
      id: "cloud-etl-pipeline",
      title: "Automated Cloud ETL & Business Intelligence Pipeline",
      category: "Data Engineering & Cloud",
      status: "PRODUCTION PIPELINE",
      tools: ["AWS Athena", "AWS Data Wrangler", "Python", "Power BI", "Amazon S3", "Jira", "Basecamp"],
      keyMetric: "100,000+ Records Processed // Sub-2s Query Latency",
      description: "Led a capstone analytics team at Halight Inc. to engineer automated cloud workflows extracting, transforming, and validating organizational datasets from S3 and Athena to power executive Power BI performance dashboards.",
      keyFinding: "Partitioning Parquet files in S3 and utilizing AWS Data Wrangler reduced analytical query scan costs by over 40%.",
      interactiveType: "etl-animation",
      githubUrl: "https://github.com/Aum-gajjar",
      liveDemoUrl: "#dashboards-section"
    },
    {
      id: "odoo-erp-automation",
      title: "Automated Web Ingestion & Odoo ERP Analytics",
      category: "Automation & ERP Systems",
      status: "DEPLOYED WORKFLOW",
      tools: ["Python", "Selenium", "Playwright", "BeautifulSoup", "Odoo ERP", "SQL"],
      keyMetric: "100% Automated Data Extraction // 15% Time Saved",
      description: "Constructed resilient automated data extraction pipelines to collect structured commercial information. Analyzed business processes inside Odoo ERP to identify operational bottlenecks and improve data consistency.",
      keyFinding: "Automated recurring data ingestion scripts eliminated manual repetitive data entry workflows.",
      interactiveType: "standard",
      githubUrl: "https://github.com/Aum-gajjar",
      liveDemoUrl: "mailto:aumgajjar456@gmail.com"
    }
  ],

  dashboards: [
    {
      id: "dash-sales",
      title: "Executive Sales & Operations KPI Dashboard",
      platform: "Power BI // DirectQuery",
      description: "Enterprise Power BI report tracking 12 operational KPIs, revenue run rate, regional variance, and inventory turnover across 30,000 monthly transactions.",
      embedPlaceholderComment: "Replace with Tableau Public or Power BI embed URL"
    },
    {
      id: "dash-health",
      title: "Clinical Healthcare & 30-Day Readmission Analytics",
      platform: "Tableau // Clinical Data",
      description: "Comprehensive hospital analytics dashboard displaying patient cohort demographics, readmission risk heatmaps, and length-of-stay distribution.",
      embedPlaceholderComment: "Replace with Tableau Public or Power BI embed URL"
    },
    {
      id: "dash-supply",
      title: "Cloud ETL Telemetry & Logistics Pipeline Performance",
      platform: "Power BI // AWS Athena",
      description: "Real-time operational monitoring dashboard visualizing Amazon Athena query latency, S3 ingestion batch volumes, and daily anomaly flags.",
      embedPlaceholderComment: "Replace with Tableau Public or Power BI embed URL"
    }
  ]
};
