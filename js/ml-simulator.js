/* ==========================================================================
   ML SIMULATOR // CONFUSION MATRIX DECISION THRESHOLD
   ========================================================================== */

(function() {
  'use strict';

  const thresholdSlider = document.getElementById('threshold-slider');
  const thresholdVal = document.getElementById('threshold-val');
  
  const elTN = document.getElementById('val-tn');
  const elFP = document.getElementById('val-fp');
  const elFN = document.getElementById('val-fn');
  const elTP = document.getElementById('val-tp');
  const elRecall = document.getElementById('recall-display');
  const elPrecision = document.getElementById('precision-display');
  const elF1 = document.getElementById('f1-display');
  const elInterpretation = document.getElementById('threshold-interpretation');

  if (!thresholdSlider) return;

  // Real-world distribution from Diabetes 130-US Hospitals (11.2% positive readmission class)
  const TOTAL_POSITIVES = 1142;
  const TOTAL_NEGATIVES = 9034;

  function updateMatrix() {
    const threshold = parseFloat(thresholdSlider.value) / 100;
    if (thresholdVal) thresholdVal.textContent = threshold.toFixed(2);

    // Logistic sigmoid & power response simulation matching XGBoost probability distributions
    // Higher threshold = stricter classification -> fewer positives predicted (higher precision, lower recall)
    // Lower threshold = lenient classification -> more positives predicted (higher recall, lower precision)
    
    // Fitted to match benchmark 0.5466 recall at threshold = 0.50
    const tpRatio = Math.max(0.05, Math.min(0.98, 1 - Math.pow(threshold, 0.72) * 0.76));
    const fpRatio = Math.max(0.01, Math.min(0.95, Math.pow(1 - threshold, 1.85) * 0.62));

    const tp = Math.round(TOTAL_POSITIVES * tpRatio);
    const fn = TOTAL_POSITIVES - tp;
    
    const fp = Math.round(TOTAL_NEGATIVES * fpRatio);
    const tn = TOTAL_NEGATIVES - fp;

    const specificity = tn / (tn + fp);
    const workloadRate = (tp + fp) / (TOTAL_POSITIVES + TOTAL_NEGATIVES);

    if (elTP) elTP.textContent = tp.toLocaleString();
    if (elFN) elFN.textContent = fn.toLocaleString();
    if (elTN) elTN.textContent = tn.toLocaleString();
    if (elFP) elFP.textContent = fp.toLocaleString();

    if (elRecall) elRecall.textContent = `Recall: ${recall.toFixed(4)}`;
    if (elPrecision) elPrecision.textContent = `Precision: ${precision.toFixed(4)}`;
    if (elF1) elF1.textContent = `F1-Score: ${f1.toFixed(4)}`;

    // Update graphical gauge bars & values
    const elGaugeRecallVal = document.getElementById('gauge-recall-val');
    const elGaugeRecallBar = document.getElementById('gauge-recall-bar');
    const elGaugeSpecVal = document.getElementById('gauge-spec-val');
    const elGaugeSpecBar = document.getElementById('gauge-spec-bar');
    const elGaugeWorkloadVal = document.getElementById('gauge-workload-val');
    const elGaugeWorkloadBar = document.getElementById('gauge-workload-bar');

    if (elGaugeRecallVal) elGaugeRecallVal.textContent = `${(recall * 100).toFixed(1)}%`;
    if (elGaugeRecallBar) elGaugeRecallBar.style.width = `${(recall * 100).toFixed(1)}%`;

    if (elGaugeSpecVal) elGaugeSpecVal.textContent = `${(specificity * 100).toFixed(1)}%`;
    if (elGaugeSpecBar) elGaugeSpecBar.style.width = `${(specificity * 100).toFixed(1)}%`;

    if (elGaugeWorkloadVal) elGaugeWorkloadVal.textContent = `${(workloadRate * 100).toFixed(1)}% Flagged`;
    if (elGaugeWorkloadBar) elGaugeWorkloadBar.style.width = `${(workloadRate * 100).toFixed(1)}%`;

    if (elInterpretation) {
      if (threshold < 0.35) {
        elInterpretation.textContent = `High Sensitivity Mode: Prioritizes catching readmissions (FN=${fn}), with increased nurse follow-up outreach volume (${(workloadRate * 100).toFixed(1)}% of all patients).`;
      } else if (threshold > 0.65) {
        elInterpretation.textContent = `Conservative Specificity Mode: Limits false positives (FP=${fp}), but risks missing ${fn} high-risk clinical readmissions.`;
      } else {
        elInterpretation.textContent = `Balanced Operational Threshold: Recommended threshold capturing positive readmission signals while maintaining manageable nurse workload.`;
      }
    }
  }

  thresholdSlider.addEventListener('input', updateMatrix);
  // Initial call
  updateMatrix();
})();

