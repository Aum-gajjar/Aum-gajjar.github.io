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
    gpa: "3.76 / 4.00",
    college: "St. Clair College, Windsor, ON",
    recordsProcessed: "100K+",
    topRocAuc: "0.6804"
  },

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
