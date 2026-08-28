const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIFeedbackGenerator {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async generateFeedback(evalData) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Act as a Senior Developer Assessor. Evaluate this student's profile for the target role: ${evalData.targetRole}.
        Detected Role: ${evalData.detectedRole} (Confidence: ${evalData.confidence})
        Final Developer Score: ${evalData.finalScore}/100
        Strengths found: ${evalData.strengths.join(", ")}
        Weaknesses found: ${evalData.weaknesses.join(", ")}
        
        Generate a strict JSON response with the following structure. Do NOT include markdown blocks like \`\`\`json, just the raw JSON:
        {
          "summary": "2-3 sentences explaining their current level and interview readiness",
          "strengths": ["string", "string"],
          "weaknesses": ["string", "string"],
          "skillGaps": ["string", "string"],
          "recommendations": ["string", "string"],
          "projectRecommendations": ["string", "string"],
          "interviewAdvice": "Specific advice for their next interview",
          "roleRecommendation": "Advice on whether they should stick to their target role or pivot",
          "interviewReadiness": {
            "fundamentals": "STRONG, GOOD, NEEDS WORK, or WEAK",
            "problemSolving": "STRONG, GOOD, NEEDS WORK, or WEAK",
            "systemDesign": "STRONG, GOOD, NEEDS WORK, or WEAK",
            "domainKnowledge": "STRONG, GOOD, NEEDS WORK, or WEAK"
          }
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();
      
      // Clean up potential markdown formatting from Gemini
      if (text.startsWith("```json")) {
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      }

      return JSON.parse(text);
    } catch (error) {
      console.error("AI Feedback Generation Failed:", error);
      return this.getFallbackFeedback(evalData);
    }
  }

  getFallbackFeedback(evalData) {
    return {
      summary: "Your profile indicates a foundational understanding of software development, but requires further refinement before applying for roles.",
      strengths: evalData.strengths || ["Basic programming concepts"],
      weaknesses: evalData.weaknesses || ["Advanced problem solving"],
      skillGaps: ["System Design", "Advanced Algorithms"],
      recommendations: ["Build a full-stack CRUD application", "Practice medium-level algorithmic problems daily"],
      projectRecommendations: ["Design and deploy a REST API with authentication and a database."],
      interviewAdvice: "Focus on explaining your thought process clearly during technical rounds.",
      roleRecommendation: `Keep building your skills in ${evalData.targetRole !== 'ANY' ? evalData.targetRole : 'Fullstack'} development.`,
      interviewReadiness: {
        fundamentals: "GOOD",
        problemSolving: "NEEDS WORK",
        systemDesign: "WEAK",
        domainKnowledge: "NEEDS WORK"
      }
    };
  }
}

module.exports = new AIFeedbackGenerator();