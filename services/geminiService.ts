
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_DIVIDENDS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Simulates calling the Massive Dividends API as requested.
 * Endpoint: https://api.massive.com/v3/reference/dividends
 */
export const fetchMassiveDividends = async (symbol: string) => {
  // In a real app, this would be: await fetch(`https://api.massive.com/v3/reference/dividends?symbol=${symbol}&apiKey=...`)
  return MOCK_DIVIDENDS[symbol] || null;
};

export const generateTradeAdvisory = async (asset: string, assetClass: string) => {
  try {
    const divData = await fetchMassiveDividends(asset);
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `[ROLE] ACT AS A SENIOR QUANTITATIVE STRATEGIST & AGENTIC ORCHESTRATOR.
      [TASK] Generate a high-frequency trading signal for ${asset} (${assetClass}) using 60/30/10 weighting logic.
      
      [CONTEXT]
      Dividend Data: ${divData ? JSON.stringify(divData) : 'None'}
      
      [REASONING PIPELINE]
      1. QUANT SCAN: Evaluate Bollinger Band width and Delta-hedging zones for "Gamma Squeeze" potential.
      2. SENTIMENT: Scrape news. Weight "Institutional Adoption" (ETF Flows) vs "Regulatory Risk."
      3. CORRELATION: Check "Lead-Lag" breakout between Crypto Miners (AI-Infrastructure) and Spot price.
      4. RISK OVERRIDE: Apply Kelly Criterion. If Global Bond Yields (FRED) spike >0.1% in 2h, trigger HOLD/CANCEL.
      
      [CONSTRAINTS]
      - Support Level for BTC is strictly $89,200. Trigger Auto-Hedge (BUY_PUTS) if below.
      - 60% Weight: Technical Gamma Analysis.
      - 30% Weight: Institutional Sentiment Score.
      - 10% Weight: Cross-asset Miner Correlation.

      RETURN A JSON OBJECT:
      {
        "asset": "${asset}",
        "type": "BUY/SELL/HOLD",
        "confidence": number (0-1),
        "entry": number,
        "tp1": number, "tp2": number, "sl": number,
        "lotSize": number,
        "rsi": number,
        "timeframe": "M5/M15",
        "rationale": "Detailed 60/30/10 weighted reasoning including yield implications if equity.",
        "fundingRate": number,
        "gammaPivot": "string",
        "deltaSkew": number,
        "etfNetFlow": "string",
        "nexusVerdict": "2-sentence HFT synthesis",
        "hedgeActive": boolean (true if BTC < 89200)
      }`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            asset: { type: Type.STRING },
            type: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            entry: { type: Type.NUMBER },
            tp1: { type: Type.NUMBER },
            tp2: { type: Type.NUMBER },
            sl: { type: Type.NUMBER },
            lotSize: { type: Type.NUMBER },
            rsi: { type: Type.NUMBER },
            timeframe: { type: Type.STRING },
            rationale: { type: Type.STRING },
            fundingRate: { type: Type.NUMBER },
            gammaPivot: { type: Type.STRING },
            deltaSkew: { type: Type.NUMBER },
            etfNetFlow: { type: Type.STRING },
            nexusVerdict: { type: Type.STRING },
            hedgeActive: { type: Type.BOOLEAN }
          },
          required: ["asset", "type", "confidence", "entry", "tp1", "tp2", "sl", "lotSize", "rsi", "timeframe", "rationale", "fundingRate", "gammaPivot", "deltaSkew", "etfNetFlow", "nexusVerdict", "hedgeActive"]
        }
      }
    });
    
    const text = response.text || '';
    const cleanJson = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanJson);
    return { ...result, dividendData: divData };
  } catch (error) {
    console.error("Trade Advisory Error:", error);
    return null;
  }
};

export const askNexus = async (query: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Nexus Institutional AI. System Instruction: Use 60/30/10 weighted HFT reasoning. Context: ${context}. User: ${query}`,
    });
    return response.text;
  } catch (error) {
    return "Error processing request.";
  }
};

export const getMacroAnalysis = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `High-level institutional analysis on: ${topic}. Focus on Gamma Exposure, 10Y yields, and AI-Miner correlation.`,
    });
    return response.text;
  } catch (error) {
    return "Unavailable.";
  }
};

export const getInstitutionalPulse = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Top 5 headlines: ETF flows, Fed sentiment, AI mining pivots.",
      config: { tools: [{ googleSearch: {} }] }
    });
    return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error) {
    return { text: "Feed offline.", sources: [] };
  }
};

export const getGeopoliticalRiskInsights = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Analyze global yield spreads, dividend yields of tech indices vs US 10Y, and risk-off correlation using real-time FRED data.",
      config: { tools: [{ googleSearch: {} }] }
    });
    return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error) {
    return { text: "Failed.", sources: [] };
  }
};
