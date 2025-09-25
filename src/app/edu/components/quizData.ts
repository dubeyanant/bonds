import { Question, Quiz } from './types';

export const baseQuizzes: Quiz[] = [
  {
    id: "basics",
    title: "Bond Basics Assessment",
    description: "Test your understanding of fundamental bond concepts",
    difficulty: "Beginner",
    questionCount: 5,
    estimatedTime: "15 min",
    topics: ["Bond Types", "Basic Terminology", "Risk Factors"],
    points: 100,
    attempts: 0,
    bestScore: undefined
  },
  {
    id: "pricing",
    title: "Bond Pricing & Valuation",
    description: "Advanced concepts in bond pricing and yield calculations",
    difficulty: "Intermediate",
    questionCount: 15,
    estimatedTime: "25 min",
    topics: ["Present Value", "YTM", "Duration", "Convexity"],
    points: 200,
    attempts: 2,
    bestScore: 85
  },
  {
    id: "ratings",
    title: "Credit Analysis & Ratings",
    description: "Deep dive into credit risk assessment and rating methodologies",
    difficulty: "Intermediate",
    questionCount: 12,
    estimatedTime: "20 min",
    topics: ["Credit Risk", "Rating Agencies", "Default Probability"],
    points: 150,
    attempts: 1,
    bestScore: 92
  },
  {
    id: "portfolio",
    title: "Bond Portfolio Management",
    description: "Strategic approach to building and managing bond portfolios",
    difficulty: "Advanced",
    questionCount: 20,
    estimatedTime: "35 min",
    topics: ["Asset Allocation", "Hedging", "Performance Measurement"],
    points: 300,
    attempts: 0,
    bestScore: undefined
  },
  {
    id: "tax",
    title: "Tax Implications Quiz",
    description: "Navigate the complex tax landscape of bond investing",
    difficulty: "Advanced",
    questionCount: 8,
    estimatedTime: "12 min",
    topics: ["Tax Treatment", "TDS", "Capital Gains"],
    points: 120,
    attempts: 0,
    bestScore: undefined
  }
];

export const bondBasicsQuestions: Question[] = [
  {
    id: "1",
    question: "What is the relationship between bond prices and interest rates?",
    options: [
      "Bond prices and interest rates move in the same direction",
      "Bond prices and interest rates move in opposite directions",
      "There is no relationship between bond prices and interest rates",
      "The relationship depends on the bond's credit rating"
    ],
    correctAnswer: 1,
    explanation: "Bond prices and interest rates have an inverse relationship. When interest rates rise, bond prices fall, and vice versa. This is because existing bonds with lower rates become less attractive when new bonds offer higher rates.",
    difficulty: "Easy",
    topic: "Basic Terminology"
  },
  {
    id: "2",
    question: "Which of the following is NOT a type of bond?",
    options: [
      "Government Securities (G-Sec)",
      "Corporate Bonds",
      "Municipal Bonds", 
      "Equity Shares"
    ],
    correctAnswer: 3,
    explanation: "Equity shares represent ownership in a company, not debt. Bonds are debt instruments where the issuer owes the holder a debt and is obliged to pay interest and/or repay the principal at maturity.",
    difficulty: "Easy",
    topic: "Bond Types"
  },
  {
    id: "3",
    question: "What does the term 'Face Value' or 'Par Value' of a bond represent?",
    options: [
      "The current market price of the bond",
      "The amount paid as interest annually",
      "The nominal value that will be repaid at maturity",
      "The price at which the bond was originally issued"
    ],
    correctAnswer: 2,
    explanation: "Face Value (or Par Value) is the nominal amount of the bond that will be repaid to the bondholder at maturity. In India, this is typically ₹1,000 per bond.",
    difficulty: "Easy",
    topic: "Basic Terminology"
  },
  {
    id: "4",
    question: "Which of the following represents the highest risk factor for bond investors?",
    options: [
      "Interest rate risk",
      "Default risk", 
      "Inflation risk",
      "Liquidity risk"
    ],
    correctAnswer: 1,
    explanation: "Default risk (credit risk) is typically considered the highest risk for bond investors as it can result in complete loss of principal and interest if the issuer fails to meet its obligations.",
    difficulty: "Medium",
    topic: "Risk Factors"
  },
  {
    id: "5",
    question: "What is the primary difference between Government Securities (G-Sec) and Corporate Bonds?",
    options: [
      "G-Sec have higher interest rates than Corporate Bonds",
      "Corporate Bonds have longer maturity periods than G-Sec",
      "G-Sec are issued by the government while Corporate Bonds are issued by companies",
      "There is no significant difference between them"
    ],
    correctAnswer: 2,
    explanation: "The primary difference is the issuer: Government Securities are issued by Central or State Governments and are considered virtually risk-free, while Corporate Bonds are issued by companies and carry higher credit risk but typically offer higher returns.",
    difficulty: "Easy",
    topic: "Bond Types"
  }
];

export const learningModules = [
  "Introduction to Bonds",
  "Credit Ratings Explained", 
  "Understanding Bond Pricing",
  "Yield Calculations & Analysis",
  "Tax Implications of Bond Investing",
  "Duration & Risk Management"
];
