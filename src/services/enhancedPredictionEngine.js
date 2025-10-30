// Enhanced Prediction Engine with Advanced Stats
class EnhancedPredictionEngine {
  constructor() {
    this.weights = {
      recentForm: 0.25,
      homeAdvantage: 0.15,
      headToHead: 0.20,
      teamStrength: 0.15,
      injuries: 0.10,
      momentum: 0.10,
      sentiment: 0.05
    };
  }

  // Main prediction method
  async generatePrediction(homeTeam, awayTeam, matchData = {}) {
    console.log('🤖 Generating enhanced prediction...');

    // Simulate fetching advanced stats (in real app, this would call your API)
    const homeStats = await this.getTeamStats(homeTeam);
    const awayStats = await this.getTeamStats(awayTeam);
    const h2hData = await this.getHeadToHead(homeTeam, awayTeam);
    const injuries = await this.getInjuryData(homeTeam, awayTeam);
    const sentiment = await this.getSentiment(homeTeam, awayTeam);

    // Calculate base probabilities
    const homeScore = this.calculateTeamScore(homeStats, 'home', injuries.home, sentiment.home);
    const awayScore = this.calculateTeamScore(awayStats, 'away', injuries.away, sentiment.away);

    // Adjust for head-to-head
    const h2hAdjustment = this.calculateH2HAdjustment(h2hData, homeTeam, awayTeam);
    
    // Calculate final probabilities
    const probabilities = this.calculateProbabilities(
      homeScore + h2hAdjustment.home,
      awayScore + h2hAdjustment.away
    );

    // Generate detailed prediction
    return {
      homeTeam,
      awayTeam,
      probabilities,
      winner: this.determineWinner(probabilities),
      confidence: Math.max(...Object.values(probabilities)),
      
      // Advanced stats
      expectedGoals: {
        home: homeStats.xG,
        away: awayStats.xG
      },
      
      // Detailed breakdowns
      stats: {
        homeStats,
        awayStats
      },
      
      headToHead: h2hData,
      injuries,
      sentiment,
      
      // Reasoning
      reasoning: this.generateReasoning(
        homeStats, 
        awayStats, 
        h2hData, 
        injuries, 
        sentiment,
        homeScore,
        awayScore
      ),
      
      // Markets
      markets: this.generateMarkets(homeStats, awayStats, probabilities),
      
      // Visualizations data
      visualizations: this.generateVisualizationData(homeStats, awayStats, h2hData),
      
      // Comparison with other models
      modelComparison: this.compareModels(homeTeam, awayTeam, probabilities),
      
      // Value bets (comparing to bookmaker odds)
      valueBets: this.findValueBets(probabilities)
    };
  }

  // Simulate team stats (replace with real API data)
  async getTeamStats(teamName) {
    await this.delay(100); // Simulate API call
    
    const baseStats = {
      // Expected goals
      xG: (Math.random() * 1.5 + 0.8).toFixed(2),
      xA: (Math.random() * 1.2 + 0.5).toFixed(2),
      xGAgainst: (Math.random() * 1.0 + 0.5).toFixed(2),
      
      // Possession & style
      possession: Math.floor(Math.random() * 30) + 45,
      passAccuracy: Math.floor(Math.random() * 15) + 75,
      shotsPerGame: Math.floor(Math.random() * 8) + 10,
      shotsOnTarget: Math.floor(Math.random() * 4) + 4,
      
      // Defensive
      tacklesPerGame: Math.floor(Math.random() * 10) + 15,
      interceptions: Math.floor(Math.random() * 8) + 10,
      cleanSheets: Math.floor(Math.random() * 5) + 3,
      
      // Recent form (last 10 matches)
      form: this.generateForm(10),
      goalsScored: Math.floor(Math.random() * 10) + 15,
      goalsConceded: Math.floor(Math.random() * 8) + 5,
      points: Math.floor(Math.random() * 10) + 20,
      
      // Advanced metrics
      corners: Math.floor(Math.random() * 3) + 5,
      cards: (Math.random() * 1.5 + 1.5).toFixed(1),
      
      // Momentum (weighted recent form)
      momentum: this.calculateMomentum(),
      
      // Team strength rating
      rating: Math.floor(Math.random() * 20) + 70
    };
    
    return baseStats;
  }

  // Head to head data
  async getHeadToHead(homeTeam, awayTeam) {
    await this.delay(100);
    
    const totalMatches = Math.floor(Math.random() * 8) + 5;
    const homeWins = Math.floor(Math.random() * (totalMatches / 2));
    const awayWins = Math.floor(Math.random() * (totalMatches / 2));
    const draws = totalMatches - homeWins - awayWins;
    
    return {
      totalMatches,
      homeWins,
      awayWins,
      draws,
      lastMeetings: [
        { date: '2024-08-15', result: `${Math.floor(Math.random() * 4)}-${Math.floor(Math.random() * 3)}`, winner: ['Home', 'Away', 'Draw'][Math.floor(Math.random() * 3)] },
        { date: '2024-03-10', result: `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 3)}`, winner: ['Home', 'Away', 'Draw'][Math.floor(Math.random() * 3)] },
        { date: '2023-11-20', result: `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 3)}`, winner: ['Home', 'Away', 'Draw'][Math.floor(Math.random() * 3)] }
      ],
      homeGoalsAvg: (Math.random() * 1.5 + 1).toFixed(1),
      awayGoalsAvg: (Math.random() * 1.5 + 0.8).toFixed(1)
    };
  }

  // Injury & suspension data
  async getInjuryData(homeTeam, awayTeam) {
    await this.delay(100);
    
    return {
      home: {
        keyPlayersOut: Math.floor(Math.random() * 3),
        impact: Math.random() > 0.5 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
        details: this.generateInjuryDetails()
      },
      away: {
        keyPlayersOut: Math.floor(Math.random() * 3),
        impact: Math.random() > 0.5 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
        details: this.generateInjuryDetails()
      }
    };
  }

  generateInjuryDetails() {
    const injuries = [];
    const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
    const num = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < num; i++) {
      injuries.push({
        position: positions[Math.floor(Math.random() * positions.length)],
        importance: ['Key', 'Regular', 'Backup'][Math.floor(Math.random() * 3)],
        status: ['Injured', 'Suspended'][Math.floor(Math.random() * 2)]
      });
    }
    
    return injuries;
  }

  // Sentiment analysis (team mood)
  async getSentiment(homeTeam, awayTeam) {
    await this.delay(100);
    
    return {
      home: {
        score: (Math.random() * 40 + 50).toFixed(1), // 50-90
        trend: ['Rising', 'Stable', 'Falling'][Math.floor(Math.random() * 3)],
        factors: ['Recent win streak', 'Manager confidence', 'Fan support']
      },
      away: {
        score: (Math.random() * 40 + 50).toFixed(1),
        trend: ['Rising', 'Stable', 'Falling'][Math.floor(Math.random() * 3)],
        factors: ['Good away form', 'Team chemistry', 'Media positivity']
      }
    };
  }

  // Calculate team score with weighted factors
  calculateTeamScore(stats, venue, injuries, sentiment) {
    let score = 50; // Base score
    
    // Recent form (weighted more heavily)
    const formScore = this.getFormScore(stats.form) * this.weights.recentForm * 100;
    score += formScore;
    
    // Home advantage
    if (venue === 'home') {
      score += this.weights.homeAdvantage * 100;
    }
    
    // Team strength
    score += (stats.rating - 70) * this.weights.teamStrength * 2;
    
    // Momentum
    score += stats.momentum * this.weights.momentum * 10;
    
    // Injuries impact
    const injuryPenalty = injuries.keyPlayersOut * 5;
    score -= injuryPenalty * this.weights.injuries * 10;
    
    // Sentiment
    score += (parseFloat(sentiment.score) - 70) * this.weights.sentiment;
    
    return Math.max(0, Math.min(100, score));
  }

  // Calculate probabilities from scores
  calculateProbabilities(homeScore, awayScore) {
    const total = homeScore + awayScore;
    const homeWinProb = Math.round((homeScore / total) * 100);
    const drawProb = Math.round(Math.abs(homeScore - awayScore) < 10 ? 25 : 20);
    const awayWinProb = 100 - homeWinProb - drawProb;
    
    return {
      homeWin: Math.max(10, Math.min(80, homeWinProb)),
      draw: Math.max(10, Math.min(40, drawProb)),
      awayWin: Math.max(10, Math.min(80, awayWinProb))
    };
  }

  // Head-to-head adjustment
  calculateH2HAdjustment(h2h, homeTeam, awayTeam) {
    const homeWinRate = h2h.homeWins / h2h.totalMatches;
    const awayWinRate = h2h.awayWins / h2h.totalMatches;
    
    return {
      home: (homeWinRate - 0.33) * 20,
      away: (awayWinRate - 0.33) * 20
    };
  }

  // Generate reasoning
  generateReasoning(homeStats, awayStats, h2h, injuries, sentiment, homeScore, awayScore) {
    const reasons = [];
    
    // Form analysis
    const homeFormScore = this.getFormScore(homeStats.form);
    const awayFormScore = this.getFormScore(awayStats.form);
    if (homeFormScore > awayFormScore + 0.2) {
      reasons.push({
        factor: 'Recent Form',
        impact: 'High',
        description: `Home team in superior form (${(homeFormScore * 100).toFixed(0)}% vs ${(awayFormScore * 100).toFixed(0)}%)`
      });
    }
    
    // Home advantage
    reasons.push({
      factor: 'Home Advantage',
      impact: 'Medium',
      description: 'Historical 15% boost for home teams in this league'
    });
    
    // Head to head
    if (h2h.homeWins > h2h.awayWins * 1.5) {
      reasons.push({
        factor: 'Head-to-Head',
        impact: 'Medium',
        description: `Home team dominates this fixture (${h2h.homeWins} wins vs ${h2h.awayWins})`
      });
    }
    
    // Injuries
    if (injuries.away.keyPlayersOut > 1) {
      reasons.push({
        factor: 'Injuries',
        impact: injuries.away.impact,
        description: `Away team missing ${injuries.away.keyPlayersOut} key players`
      });
    }
    
    // Expected goals
    reasons.push({
      factor: 'Expected Goals',
      impact: 'High',
      description: `Home xG: ${homeStats.xG}, Away xG: ${awayStats.xG} per game`
    });
    
    // Sentiment
    if (parseFloat(sentiment.home.score) > parseFloat(sentiment.away.score) + 10) {
      reasons.push({
        factor: 'Team Sentiment',
        impact: 'Low',
        description: `Home team morale significantly higher (${sentiment.home.score} vs ${sentiment.away.score})`
      });
    }
    
    return reasons;
  }

  // Generate markets
  generateMarkets(homeStats, awayStats, probabilities) {
    const totalXG = parseFloat(homeStats.xG) + parseFloat(awayStats.xG);
    
    return {
      overUnder: {
        line: 2.5,
        over: totalXG > 2.5 ? Math.round(55 + Math.random() * 15) : Math.round(35 + Math.random() * 15),
        recommendation: totalXG > 2.5 ? 'Over 2.5' : 'Under 2.5'
      },
      btts: {
        yes: parseFloat(homeStats.xG) > 1 && parseFloat(awayStats.xG) > 1 ? Math.round(60 + Math.random() * 15) : Math.round(40 + Math.random() * 15),
        recommendation: parseFloat(homeStats.xG) > 1 && parseFloat(awayStats.xG) > 1 ? 'Yes' : 'No'
      },
      corners: {
        line: 9.5,
        over: Math.round(50 + Math.random() * 20),
        total: homeStats.corners + awayStats.corners
      },
      cards: {
        line: 4.5,
        over: Math.round(50 + Math.random() * 20),
        total: (parseFloat(homeStats.cards) + parseFloat(awayStats.cards)).toFixed(1)
      },
      correctScore: this.generateCorrectScoreProbabilities(homeStats, awayStats)
    };
  }

  generateCorrectScoreProbabilities(homeStats, awayStats) {
    const scores = [];
    const homeXG = parseFloat(homeStats.xG);
    const awayXG = parseFloat(awayStats.xG);
    
    // Most likely scores based on xG
    const likelyHomeGoals = Math.round(homeXG);
    const likelyAwayGoals = Math.round(awayXG);
    
    scores.push({ score: `${likelyHomeGoals}-${likelyAwayGoals}`, probability: 12 });
    scores.push({ score: `${likelyHomeGoals + 1}-${likelyAwayGoals}`, probability: 10 });
    scores.push({ score: `${likelyHomeGoals}-${likelyAwayGoals + 1}`, probability: 9 });
    scores.push({ score: `${likelyHomeGoals + 1}-${likelyAwayGoals + 1}`, probability: 8 });
    scores.push({ score: '1-1', probability: 11 });
    
    return scores.sort((a, b) => b.probability - a.probability);
  }

  // Visualization data
  generateVisualizationData(homeStats, awayStats, h2h) {
    return {
      formChart: {
        home: this.formToChartData(homeStats.form),
        away: this.formToChartData(awayStats.form)
      },
      radarChart: {
        home: {
          attack: Math.round(parseFloat(homeStats.xG) * 30),
          defense: Math.round((3 - parseFloat(homeStats.xGAgainst)) * 30),
          possession: homeStats.possession,
          passing: homeStats.passAccuracy,
          intensity: homeStats.tacklesPerGame * 3
        },
        away: {
          attack: Math.round(parseFloat(awayStats.xG) * 30),
          defense: Math.round((3 - parseFloat(awayStats.xGAgainst)) * 30),
          possession: awayStats.possession,
          passing: awayStats.passAccuracy,
          intensity: awayStats.tacklesPerGame * 3
        }
      },
      momentumBar: {
        home: homeStats.momentum,
        away: awayStats.momentum
      },
      h2hTimeline: h2h.lastMeetings
    };
  }

  // Model comparison
  compareModels(homeTeam, awayTeam, ourProbabilities) {
    return {
      ourModel: ourProbabilities,
      eloModel: {
        homeWin: ourProbabilities.homeWin + (Math.random() * 10 - 5),
        draw: ourProbabilities.draw + (Math.random() * 6 - 3),
        awayWin: ourProbabilities.awayWin + (Math.random() * 10 - 5)
      },
      poissonModel: {
        homeWin: ourProbabilities.homeWin + (Math.random() * 8 - 4),
        draw: ourProbabilities.draw + (Math.random() * 5 - 2.5),
        awayWin: ourProbabilities.awayWin + (Math.random() * 8 - 4)
      },
      consensus: {
        homeWin: ourProbabilities.homeWin,
        draw: ourProbabilities.draw,
        awayWin: ourProbabilities.awayWin
      }
    };
  }

  // Value bets (comparing to bookmaker odds)
  findValueBets(probabilities) {
    // Simulate bookmaker odds
    const bookmakerOdds = {
      homeWin: (100 / probabilities.homeWin * 0.9).toFixed(2),
      draw: (100 / probabilities.draw * 0.9).toFixed(2),
      awayWin: (100 / probabilities.awayWin * 0.9).toFixed(2)
    };
    
    const valueBets = [];
    
    // Check for value (our probability > implied probability from odds)
    Object.keys(probabilities).forEach(outcome => {
      const ourProb = probabilities[outcome];
      const impliedProb = 100 / parseFloat(bookmakerOdds[outcome]);
      
      if (ourProb > impliedProb + 5) {
        valueBets.push({
          outcome: outcome.replace(/([A-Z])/g, ' $1').trim(),
          ourProbability: ourProb,
          bookmakerOdds: bookmakerOdds[outcome],
          impliedProbability: impliedProb.toFixed(1),
          value: (ourProb - impliedProb).toFixed(1),
          recommendation: 'Value Bet',
          potentialROI: ((ourProb / impliedProb - 1) * 100).toFixed(1)
        });
      }
    });
    
    return valueBets.length > 0 ? valueBets : null;
  }

  // Helper methods
  generateForm(length) {
    const results = ['W', 'W', 'D', 'L'];
    return Array(length).fill(0).map(() => results[Math.floor(Math.random() * results.length)]);
  }

  getFormScore(form) {
    const weights = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
    let score = 0;
    let totalWeight = 0;
    
    form.forEach((result, index) => {
      const weight = weights[index] || 0.1;
      if (result === 'W') score += weight * 3;
      else if (result === 'D') score += weight * 1;
      totalWeight += weight * 3;
    });
    
    return score / totalWeight;
  }

  calculateMomentum() {
    return (Math.random() * 6 + 2).toFixed(1); // 2-8 scale
  }

  formToChartData(form) {
    const points = { W: 3, D: 1, L: 0 };
    return form.map((result, index) => ({
      match: index + 1,
      points: points[result],
      result
    }));
  }

  determineWinner(probabilities) {
    const max = Math.max(probabilities.homeWin, probabilities.draw, probabilities.awayWin);
    if (max === probabilities.homeWin) return 'Home Win';
    if (max === probabilities.awayWin) return 'Away Win';
    return 'Draw';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new EnhancedPredictionEngine();