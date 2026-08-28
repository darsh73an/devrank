const { ROLE_CONFIG } = require('../config/roleConfig');

class RoleDetector {
  detectRole(githubData, resumeText = "") {
    const allSignals = [];
    
    if (githubData) {
      allSignals.push(...Object.keys(githubData.languages || {}));
      allSignals.push(...(githubData.topics || []));
    }
    
    const normalizedResume = resumeText.toLowerCase();
    const roleScores = {};
    
    for (const [role, config] of Object.entries(ROLE_CONFIG)) {
      if (role === 'ANY') continue;
      
      let matchCount = 0;
      config.signals.forEach(signal => {
        const lowerSignal = signal.toLowerCase();
        if (allSignals.includes(lowerSignal) || normalizedResume.includes(lowerSignal)) {
          matchCount++;
        }
      });
      roleScores[role] = matchCount;
    }

    if (roleScores.FRONTEND > 3 && roleScores.BACKEND > 3) {
      roleScores.FULLSTACK = Math.round((roleScores.FRONTEND + roleScores.BACKEND) * 0.7);
    }

    let highestRole = 'ANY';
    let maxScore = 0;
    let totalScore = 0;

    for (const [role, score] of Object.entries(roleScores)) {
      totalScore += score;
      if (score > maxScore) {
        maxScore = score;
        highestRole = role;
      }
    }

    const confidence = totalScore > 0 ? maxScore / totalScore : 0;

    return {
      detectedRole: confidence < 0.25 ? 'ANY' : highestRole,
      confidence: parseFloat(confidence.toFixed(2)),
      allScores: roleScores,
      evidence: [`Detected ${maxScore} primary signals for ${highestRole}`]
    };
  }
}

module.exports = new RoleDetector();