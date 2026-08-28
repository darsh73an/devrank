const User = require('../models/User');
const Evaluation = require('../models/Evaluation');
const githubService = require('../services/platforms/githubService');
const roleDetector = require('../services/roleDetector');
const scorer = require('../services/scorer');
const aiFeedback = require('../services/aiFeedbackGenerator');

exports.createEvaluation = async (req, res) => {
  try {
    const { userId, targetRole, githubUsername, resumeText } = req.body;

    // 1. Fetch Platform Data
    const rawGithubData = await githubService.fetchProfile(githubUsername);
    const githubData = githubService.normalizeData(rawGithubData);
    const githubScore = githubService.calculateScore(githubData);

    // 2. Detect Role
    const roleDetection = roleDetector.detectRole(githubData, resumeText);

    // 3. Compile Platform Scores (Mocking others for brevity, real app uses similar services)
    const platformScores = {
      github: githubScore,
      leetcode: { available: false, score: null },
      codeforces: { available: false, score: null },
      hackerrank: { available: false, score: null },
      resume: { available: true, score: 75 } // Mock resume score
    };

    // 4. Calculate Final Score & Adaptive Weights
    const { finalScore, adjustedWeights, level } = scorer.calculateFinalScore(targetRole, platformScores);

    // 5. Structure Initial Evaluation Data
    const evaluationData = {
      userId,
      targetRole,
      detectedRole: roleDetection.detectedRole,
      roleConfidence: roleDetection.confidence,
      finalScore,
      level,
      adjustedWeights,
      scores: {
        github: githubScore.score,
        resume: 75
      },
      strengths: ["GitHub Projects", "Language Diversity"],
      weaknesses: ["Missing Competitive Programming Data"]
    };

    // 6. Generate AI Feedback & Interview Readiness
    const feedback = await aiFeedback.generateFeedback(evaluationData);

    // 7. Save to Database
    const newEvaluation = new Evaluation({
      ...evaluationData,
      scoreExplanation: feedback.summary,
      skillGaps: feedback.skillGaps,
      recommendations: feedback.recommendations,
      interviewReadiness: feedback.interviewReadiness,
      feedback: feedback.interviewAdvice
    });

    await newEvaluation.save();

    res.status(201).json({ success: true, evaluation: newEvaluation });
  } catch (error) {
    console.error("Evaluation Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate evaluation" });
  }
};