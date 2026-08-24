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

  // Real-world distribution from Diabetes 130-US Hospitals validation set (N=10,176, 11.2% readmitted)
  const TOTAL_POSITIVES = 1142; // 624 TP + 518 FN
  const TOTAL_NEGATIVES = 9034; // 7652 TN + 1382 FP

  function updateMatrix() {
    const threshold = parseFloat(thresholdSlider.value) / 100;
    if (thresholdVal) thresholdVal.textContent = threshold.toFixed(2);

    // Logistic response calibrated so at threshold=0.50: TP=624 (0.5464), FP=1382 (0.1530)
    // Decreasing threshold increases TP & FP (higher recall, lower precision)
    // Increasing threshold decreases TP & FP (higher precision, lower recall)
    const tpRatio = Math.max(0.04, Math.min(0.98, 0.5464 * Math.pow(0.5 / Math.max(0.05, threshold), 0.65)));
    const fpRatio = Math.max(0.008, Math.min(0.92, 0.1530 * Math.pow((1 - threshold) / 0.5, 1.45)));

    const tp = Math.round(TOTAL_POSITIVES * Math.min(0.98, tpRatio));
    const fn = TOTAL_POSITIVES - tp;
    
    const fp = Math.round(TOTAL_NEGATIVES * Math.min(0.92, fpRatio));
    const tn = TOTAL_NEGATIVES - fp;

    const recall = tp / (tp + fn);
    const precision = (tp + fp > 0) ? (tp / (tp + fp)) : 0;
    const f1 = (precision + recall > 0) ? (2 * (precision * recall) / (precision + recall)) : 0;

    if (elTP) elTP.textContent = tp.toLocaleString();
    if (elFN) elFN.textContent = fn.toLocaleString();
    if (elTN) elTN.textContent = tn.toLocaleString();
    if (elFP) elFP.textContent = fp.toLocaleString();

    if (elRecall) elRecall.textContent = `Recall: ${recall.toFixed(4)}`;
    if (elPrecision) elPrecision.textContent = precision.toFixed(4);
    if (elF1) elF1.textContent = f1.toFixed(4);

    if (elInterpretation) {
      if (threshold < 0.35) {
        elInterpretation.textContent = `High Sensitivity Alert: Capturing ${(recall * 100).toFixed(1)}% of readmission cases (FN=${fn}), but generating ${fp.toLocaleString()} false alarms for clinical staff.`;
      } else if (threshold > 0.65) {
        elInterpretation.textContent = `High Specificity Alert: Minimizing false alarms (FP=${fp}), but missing ${fn} patients who require post-discharge intervention.`;
      } else {
        elInterpretation.textContent = `Balanced Trade-off: Operational threshold capturing positive readmission cases while controlling nurse follow-up workload.`;
      }
    }
  }

  thresholdSlider.addEventListener('input', updateMatrix);
  // Initial call
  updateMatrix();
})();
