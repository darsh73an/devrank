const axios = require('axios');

class GithubService {
  async fetchProfile(username) {
    try {
      const profile = await axios.get(`https://api.github.com/users/${username}`, { timeout: 5000 });
      const repos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { timeout: 5000 });
      return { profile: profile.data, repos: repos.data };
    } catch (error) {
      console.error(`GitHub API Error for ${username}:`, error.message);
      return null;
    }
  }

  normalizeData(rawData) {
    if (!rawData) return null;
    
    const languages = {};
    const topics = [];
    let stars = 0;

    rawData.repos.forEach(repo => {
      if (repo.language) {
        const lang = repo.language.toLowerCase();
        languages[lang] = (languages[lang] || 0) + 1;
      }
      if (repo.topics) topics.push(...repo.topics);
      stars += repo.stargazers_count;
    });

    return {
      publicRepos: rawData.profile.public_repos,
      stars,
      languages,
      topics: [...new Set(topics)]
    };
  }

  calculateScore(normalizedData) {
    if (!normalizedData) return { available: false, score: null, reason: "API unavailable or user not found" };

    let score = 0;
    score += Math.min(normalizedData.publicRepos * 2.5, 40);
    score += Math.min(normalizedData.stars * 5, 40);
    score += Math.min(Object.keys(normalizedData.languages).length * 5, 20);

    return { available: true, score: Math.min(score, 100), data: normalizedData };
  }
}

module.exports = new GithubService();