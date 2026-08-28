const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");

class ResumeService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async processResume(fileBuffer, targetRole) {
    try {
      const data = await pdfParse(fileBuffer);
      const rawText = data.text;
      
      const extractedData = await this.extractWithAI(rawText, targetRole);
      
      return {
        success: true,
        score: this.calculateMockScore(extractedData, targetRole),
        ...extractedData
      };
    } catch (error) {
      console.error("Resume Extraction Error:", error);
      return { success: false, error: "Failed to process PDF." };
    }
  }

  async extractWithAI(text, targetRole) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        Extract details from this resume text for a candidate targeting the ${targetRole} role.
        Return strict JSON only. No markdown blocks.
        Resume Text: ${text}
        
        Format required:
        {
          "skills": ["string"],
          "projects": [{"name": "string", "technologies": ["string"]}],
          "experience": [{"title": "string", "company": "string"}],
          "education": [{"degree": "string", "institution": "string"}],
          "roleRelevance": "HIGH, MEDIUM, or LOW",
          "missingSkills": ["string"]
        }
      `;

      const result = await model.generateContent(prompt);
      let jsonText = result.response.text().trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();
      }
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("AI Resume Parsing failed:", error);
      return { skills: [], projects: [], experience: [], education: [], roleRelevance: "LOW", missingSkills: [] };
    }
  }

  calculateMockScore(extractedData, targetRole) {
    let score = 50; 
    if (extractedData.skills.length > 5) score += 20;
    if (extractedData.projects.length > 0) score += 20;
    if (extractedData.roleRelevance === "HIGH") score += 10;
    return Math.min(score, 100);
  }
}

module.exports = new ResumeService();