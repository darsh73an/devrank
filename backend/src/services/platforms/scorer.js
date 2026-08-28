const { ROLE_CONFIG } = require('../config/roleConfig');

class Scorer {
  calculateFinalScore(targetRole, platformScores) {
    const roleKey = targetRole === 'ANY' ? 'FULLSTACK' : targetRole;
    const originalWeights = ROLE_CONFIG[roleKey].weights;
    
    let availableWeight = 0;
    let finalScore = 0;
    const adjustedWeights = {};

    for (const [platform, weight] of Object.entries(originalWeights)) {
      if (platformScores[platform] && platformScores[platform].available && platformScores[platform].score !== null) {
        availableWeight += weight;
      }
    }

    if (availableWeight === 0) return { finalScore: 0, adjustedWeights: {}, level: 'Beginner' };

    for (const [platform, weight] of Object.entries(originalWeights)) {
      if (platformScores[platform] && platformScores[platform].available && platformScores[platform].score !== null) {
        const adjustedWeight = weight / availableWeight;
        adjustedWeights[platform] = adjustedWeight;
        finalScore += platformScores[platform].score * adjustedWeight;
      } else {
        adjustedWeights[platform] = 0;
      }
    }

    finalScore = Math.min(Math.max(Math.round(finalScore), 0), 100);

    let level = 'Beginner';
    if (finalScore >= 70) level = 'Advanced';
    else if (finalScore >= 40) level = 'Intermediate';

    return { finalScore, adjustedWeights, level };
  }
}

module.exports = new Scorer();