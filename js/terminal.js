/* ==========================================================================
   INTERACTIVE CLI TERMINAL // AUM GAJJAR DATA PORTFOLIO
   ========================================================================== */

(function() {
  'use strict';

  const termInput = document.getElementById('cmd-input');
  const termOutput = document.getElementById('terminal-output');
  const termContainer = document.getElementById('terminal-container');

  if (!termInput || !termOutput) return;

  const history = [];
  let historyIndex = -1;

  function printLine(text, className = 'text-secondary') {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = text;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    const normalized = cmd.toLowerCase();

    // Echo command
    printLine(`<span style="color: var(--sys-blue);">root@aum-os:~$</span> <span style="color: var(--text-primary); font-weight: bold;">${escapeHtml(cmd)}</span>`);

    if (!normalized) return;

    switch (normalized) {
      case 'help':
        printLine(`
<div style="margin: 4px 0; border-left: 2px solid var(--sys-blue); padding-left: 8px;">
  <div style="color: var(--sys-blue); font-weight: bold;">AVAILABLE COMMANDS:</div>
  <div>• <span style="color: var(--text-primary);">sudo hire aum</span>    - Initiate direct recruitment &amp; contact protocol</div>
  <div>• <span style="color: var(--text-primary);">run metrics.exe</span>  - Execute telemetry &amp; performance diagnostics</div>
  <div>• <span style="color: var(--text-primary);">cat skills.txt</span>   - Display technical stack matrix</div>
  <div>• <span style="color: var(--text-primary);">cat bio.txt</span>      - Read professional background &amp; experience</div>
  <div>• <span style="color: var(--text-primary);">ls projects</span>      - List core analytics &amp; engineering projects</div>
  <div>• <span style="color: var(--text-primary);">contact</span>          - View full contact details &amp; profiles</div>
  <div>• <span style="color: var(--text-primary);">theme</span>            - Toggle UI Dark / Light mode</div>
  <div>• <span style="color: var(--text-primary);">clear</span>            - Clear terminal buffer</div>
</div>
        `);
        break;

      case 'sudo hire aum':
        printLine(`<span style="color: var(--sys-blue);">[AUTH] Root permissions granted. Initializing direct hire pipeline...</span>`);
        setTimeout(() => {
          printLine(`
<pre style="color: var(--sys-blue); font-size: 11px; line-height: 1.2;">
   ┌────────────────────────────────────────────────┐
   │  AUM BIMALBHAI GAJJAR // DATA ANALYST &amp; ENGR   │
   │  Location: Toronto, ON, Canada                 │
   │  Email: aumgajjar456@gmail.com                 │
   │  Phone: (647) 629-2456                         │
   │  Status: READY FOR NEW OPPORTUNITIES           │
   └────────────────────────────────────────────────┘
</pre>
<div>👉 <a href="mailto:aumgajjar456@gmail.com" style="color: var(--sys-blue); text-decoration: underline;">[ Send Email to aumgajjar456@gmail.com ]</a> | <a href="https://www.linkedin.com/in/aum-gajjar-837874217" target="_blank" style="color: var(--sys-blue); text-decoration: underline;">[ Open LinkedIn Profile ]</a></div>
          `);
        }, 300);
        break;

      case 'run metrics.exe':
        printLine(`<span style="color: var(--sys-blue);">Executing SYSTEM_DIAGNOSTICS telemetry...</span>`);
        setTimeout(() => {
          printLine(`
<div style="font-family: var(--font-mono); font-size: 12px; margin: 4px 0;">
  <div>✔ <span style="color: var(--sys-blue);">Cumulative GPA:</span> 3.76 / 4.00 (St. Clair College, Academic Honours)</div>
  <div>✔ <span style="color: var(--sys-blue);">Max Records Scaled:</span> 100,000+ records processed with AWS Athena</div>
  <div>✔ <span style="color: var(--sys-blue);">ML Precision/ROC-AUC:</span> 0.6804 ROC-AUC (XGBoost / LightGBM)</div>
  <div>✔ <span style="color: var(--sys-blue);">Support SLA:</span> 80%+ first-contact issue resolution rate</div>
  <div>✔ <span style="color: var(--sys-blue);">Manual Reporting Saved:</span> 10-15% reduction in recurring preparation</div>
</div>
          `);
        }, 400);
        break;

      case 'cat skills.txt':
        printLine(`
<div style="margin: 4px 0;">
  <div><strong style="color: var(--sys-blue);">DATA ANALYSIS &amp; REPORTING:</strong> SQL, Python, Excel, pandas, EDA, Statistical Analysis, KPI Dashboards</div>
  <div><strong style="color: var(--sys-blue);">DATA ENGINEERING &amp; CLOUD:</strong> AWS Athena, AWS Data Wrangler, PostgreSQL, MySQL, SQLite3, Selenium, Playwright</div>
  <div><strong style="color: var(--sys-blue);">BI &amp; VISUALIZATION:</strong> Power BI, Tableau, Excel Models, DAX, Interactive Reporting</div>
  <div><strong style="color: var(--sys-blue);">DELIVERY &amp; TOOLS:</strong> Jira, Basecamp, Agile/Scrum, Git, GitHub, Odoo ERP</div>
</div>
        `);
        break;

      case 'cat bio.txt':
        printLine(`
<div style="margin: 4px 0; color: var(--text-secondary);">
  Data &amp; Business Analytics professional with 2+ years of experience across data analysis,
  business reporting, dashboard development, requirements analysis, and decision support.
  Proven track record extracting and analyzing 100,000+ records in the cloud, streamlining workflows,
  and delivering executive BI dashboards.
</div>
        `);
        break;

      case 'ls projects':
      case 'ls':
        if (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) {
          const projectList = window.PORTFOLIO_DATA.projects.map((p, idx) => 
            `<div>${idx + 1}. <span style="color: var(--sys-blue); font-weight: bold;">${escapeHtml(p.title)}</span> <span style="color: var(--text-muted);">(${p.tools.slice(0, 3).join(', ')})</span></div>`
          ).join('');
          printLine(`<div style="margin: 4px 0;">${projectList}</div>`);
        } else {
          printLine(`
<div style="margin: 4px 0;">
  <div>1. <span style="color: var(--sys-blue);">Healthcare Readmission Risk Predictive Model</span> (Python, XGBoost, LightGBM)</div>
  <div>2. <span style="color: var(--sys-blue);">Automated Cloud ETL Pipeline</span> (AWS Athena, Data Wrangler, Python)</div>
  <div>3. <span style="color: var(--sys-blue);">Automated Extraction &amp; Odoo ERP Analysis</span> (Selenium, Playwright)</div>
</div>
          `);
        }
        break;

      case 'contact':
        printLine(`
<div style="margin: 4px 0;">
  <div>📧 Email: <a href="mailto:aumgajjar456@gmail.com" style="color: var(--sys-blue);">aumgajjar456@gmail.com</a></div>
  <div>📱 Phone: <a href="tel:+16476292456" style="color: var(--sys-blue);">(647) 629-2456</a></div>
  <div>📍 Location: Toronto, ON, Canada</div>
  <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/aum-gajjar-837874217" target="_blank" style="color: var(--sys-blue);">linkedin.com/in/aum-gajjar-837874217</a></div>
  <div>🐙 GitHub: <a href="https://github.com/Aum-gajjar" target="_blank" style="color: var(--sys-blue);">github.com/Aum-gajjar</a></div>
</div>
        `);
        break;

      case 'theme':
        if (window.toggleAppTheme) {
          window.toggleAppTheme();
          printLine(`<span style="color: var(--sys-blue);">Theme toggled successfully.</span>`);
        }
        break;

      case 'clear':
      case 'cls':
        termOutput.innerHTML = '';
        break;

      case 'date':
      case 'status':
        printLine(`SYSTEM TIME: ${new Date().toUTCString()} | STATUS: ALL NODES OPERATIONAL`);
        break;

      default:
        printLine(`<span style="color: var(--sys-accent-red);">Command not recognized: '${escapeHtml(cmd)}'. Type <span style="color: var(--sys-blue); font-weight: bold;">'help'</span> for instructions.</span>`);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
      }
      handleCommand(val);
      termInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        termInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (history.length > 0 && historyIndex < history.length - 1) {
        historyIndex++;
        termInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        termInput.value = '';
      }
    }
  });

  // Focus input when clicking anywhere in terminal
  if (termContainer) {
    termContainer.addEventListener('click', () => {
      termInput.focus();
    });
  }

  // Initial welcome message
  printLine(`<span style="color: var(--text-muted);">Welcome to AUM_OS [Version 2.0.26]. Type <span style="color: var(--sys-blue); font-weight: bold;">'help'</span> for available commands.</span>`);
})();
