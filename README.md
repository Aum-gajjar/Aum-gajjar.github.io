# Aum Gajjar // SYSTEM.BOOT — Personal Data Portfolio

> **DATA. INFRASTRUCTURE. INSIGHT.**  
> A high-performance, cyber-technical personal portfolio designed for Data Analytics, Cloud ETL Engineering, Machine Learning, and Executive BI Reporting.

---

## ⚡ Live Highlights & Features

- **3D Particle Point Cloud & ML Clustering**: Interactive Three.js particle visualizer classifying 1,600+ nodes into clinical risk clusters.
- **3D Holographic Profile Badge**: Cursor tilt-tracking avatar card rendered with Three.js.
- **Interactive Confusion Matrix & Threshold Simulator**: Real-time recalculation of True Positives, False Positives, Recall, Precision, and F1-Score on the Diabetes 130-US Hospitals dataset (11.2% positive class).
- **Animated Cloud ETL Pipeline**: Live animated flow diagram showing data packets moving across **Amazon S3 -> AWS Data Wrangler -> Amazon Athena -> Power BI**.
- **Live BI Dashboards Telemetry**: Dedicated tabbed container configured with responsive iframe wrappers for Power BI and Tableau embed injection.
- **Interactive Command-Line Interface (CLI)**: Terminal supporting commands (`help`, `sudo hire aum`, `run metrics.exe`, `cat skills.txt`, `ls projects`, `contact`, `clear`, `theme`).
- **Instant Dark & Light Mode**: Cybernetic dark theme default with high-contrast light mode toggle.

---

## 📂 Project Architecture

```
Aum-Portfolio/
├── index.html                  # Main single-page application entry
├── data/
│   └── portfolio-data.js       # Central data store for projects, metrics & profile info
├── css/
│   └── style.css               # Design system, hardware borders, typography & theme overrides
├── js/
│   ├── app.js                  # Theme switcher, dashboard tabs, punchcard, contact form
│   ├── three-scene.js          # Three.js 3D particle visualizer & holographic avatar
│   ├── ml-simulator.js         # Interactive decision threshold confusion matrix
│   └── terminal.js             # Interactive CLI command executor
├── assets/
│   ├── profile.jpg             # LinkedIn profile headshot
│   └── avatar-placeholder.svg  # Fallback cybernetic avatar asset
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 🛠️ How to Add or Edit Projects

All project information is centralized in [`data/portfolio-data.js`](data/portfolio-data.js). To add a new project to your portfolio:

1. Open `data/portfolio-data.js`.
2. Add a new object inside the `projects` array:

```javascript
{
  id: "customer-churn-model",
  title: "Customer Churn Prediction Engine",
  category: "Machine Learning & Retention",
  status: "DEPLOYED",
  tools: ["Python", "XGBoost", "Power BI", "SQL"],
  keyMetric: "0.82 F1-Score // $45K Annual Savings",
  description: "Trained predictive classification models on 50,000+ subscription records to identify high-risk customer segments and trigger retention workflows.",
  keyFinding: "Contract duration and recent support ticket frequency were top churn indicators.",
  interactiveType: "standard",
  githubUrl: "https://github.com/Aum-gajjar/churn-prediction",
  liveDemoUrl: "https://your-live-demo-url.com"
}
```

3. Save the file. Your new project will immediately appear across the site and in the terminal CLI (`ls projects`)!

---

## 📊 How to Embed Live Tableau / Power BI Dashboards

Inside [`index.html`](index.html), navigate to the `<!-- BI_TELEMETRY -->` section (`#dashboards-section`). Replace the placeholder iframe container with your published embed link:

### Power BI:
```html
<iframe 
  src="https://app.powerbi.com/view?r=YOUR_POWER_BI_PUBLISHED_REPORT_ID" 
  title="Sales & Operations KPI Dashboard"
  allowFullScreen="true">
</iframe>
```

### Tableau Public:
```html
<iframe 
  src="https://public.tableau.com/views/YOUR_WORKBOOK_NAME/YOUR_VIEW_NAME?:showVizHome=no&:embed=true" 
  title="Clinical Healthcare Analytics"
  allowFullScreen="true">
</iframe>
```

---

## 🚀 How to Host on GitHub Pages (Free)

1. Push this repository to your GitHub account (`https://github.com/Aum-gajjar/<repo-name>`).
2. In your GitHub repository:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**, select `main` (root `/`).
   - Click **Save**.
3. In under 60 seconds, your site will be live at:
   `https://aum-gajjar.github.io/<repo-name>/`

---

## 📬 Contact & Connect

- **Name:** Aum Bimalbhai Gajjar
- **Location:** Toronto, ON, Canada
- **Email:** [aumgajjar456@gmail.com](mailto:aumgajjar456@gmail.com)
- **Phone:** (647) 629-2456
- **LinkedIn:** [linkedin.com/in/aum-gajjar-837874217](https://www.linkedin.com/in/aum-gajjar-837874217)
- **GitHub:** [github.com/Aum-gajjar](https://github.com/Aum-gajjar)
