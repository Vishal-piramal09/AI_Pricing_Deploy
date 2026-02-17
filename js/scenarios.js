/**
 * AI Pricing Scenarios - Intelligence Layer
 * This file contains all the scenarios, detection logic, and personalized nudging
 */

// RM Scenarios
const rmScenarios = [
    {
        id: 'high-take-up-rate',
        name: 'High Take Up Rate - Priority Case',
        description: 'Customer highly likely to accept the loan offer based on behavioral indicators',
        icon: 'check-circle',
        iconColor: '#10b981',
        iconBackground: '#d1fae5',
        detection: function(data) {
            // Logic to detect high take up rate scenarios
            return (data.bureauScore > 720 && data.incomeStability === 'High' && data.competitiveOffers < 2);
        },
        nudgeMessage: 'This customer is highly likely to take up the loan offer. Prioritize this case for faster processing as conversion probability is high.',
        approvalPathway: 'Cases with high take-up probability receive expedited processing.',
        riskLevel: 'low',
        recommendations: [
            'Focus on quick processing to secure the business',
            'Consider pre-approval for accelerated disbursement',
            'Prepare documentation in advance to streamline closing'
        ],
        impactAnalysis: {
            profitabilityImpact: 'Positive (ensures revenue capture)',
            conversionLikelihood: '+85%',
            processingTimeImpact: 'Priority processing recommended'
        }
    },
    {
        id: 'low-take-up-rate',
        name: 'Low Take Up Rate - Deprioritize',
        description: 'Customer unlikely to proceed with the loan based on behavioral indicators',
        icon: 'exclamation-triangle',
        iconColor: '#9ca3af',
        iconBackground: '#f3f4f6',
        detection: function(data) {
            // Logic to detect low take up rate scenarios
            return (data.bureauScore < 680 && data.competitiveOffers > 3 && data.roiDeviationPercent > 1.0);
        },
        nudgeMessage: 'This customer has a low probability of proceeding with the loan. Consider deprioritizing effort as conversion is unlikely.',
        approvalPathway: 'Standard processing without expedited handling.',
        riskLevel: 'medium',
        recommendations: [
            'Minimize effort spent on extensive documentation',
            'Consider automated follow-up rather than manual outreach',
            'Focus resources on higher-probability cases'
        ],
        impactAnalysis: {
            profitabilityImpact: 'Minimal (opportunity cost savings)',
            conversionLikelihood: '<15%',
            processingTimeImpact: 'Standard (non-priority)'
        }
    },
    {
        id: 'micro-deviation',
        name: 'Micro-Deviation (Low Impact)',
        description: 'Very small ROI/PF tweak with negligible profitability delta',
        icon: 'microscope',
        iconColor: '#3b82f6',
        iconBackground: '#dbeafe',
        detection: function(data) {
            // Logic to detect micro-deviation scenarios
            return (data.roiDeviationPercent < 0.2 && data.processingFeeDeviationPercent < 0.5);
        },
        nudgeMessage: 'This minor deviation has minimal impact on profitability. Consider whether the customer relationship benefit justifies the administrative overhead.',
        approvalPathway: 'This deviation is within auto-approval parameters due to its minimal financial impact.',
        riskLevel: 'low',
        recommendations: [
            'Proceed with auto-approval if customer conversion is likely',
            'Consider bundling with other value-added services',
            'Document the business justification for audit purposes'
        ],
        impactAnalysis: {
            profitabilityImpact: 'Minimal (< ₹5,000)',
            conversionLikelihood: '+15%',
            processingTimeImpact: 'None'
        }
    },
    {
        id: 'strategic-relationship',
        name: 'Strategic Relationship Case',
        description: 'High LTV / important relationship; deviation may be commercially justified',
        icon: 'handshake',
        iconColor: '#8b5cf6',
        iconBackground: '#ede9fe',
        detection: function(data) {
            return (data.customerLTV > 200000 || data.customerSegment === 'Premium' || data.previousLoansCount >= 2);
        },
        nudgeMessage: 'This customer has significant lifetime value potential. Relationship-based pricing can enhance long-term profitability despite the short-term revenue impact.',
        approvalPathway: 'Strategic relationship deviations receive expedited review with elevated approval thresholds.',
        riskLevel: 'low',
        recommendations: [
            'Consider the full relationship portfolio value',
            'Document long-term revenue potential',
            'Emphasize cross-sell opportunities in your justification'
        ],
        impactAnalysis: {
            profitabilityImpact: 'Short-term negative, long-term positive',
            conversionLikelihood: '+35%',
            processingTimeImpact: 'Expedited'
        }
    },
    {
        id: 'prime-customer-conversion',
        name: 'Prime Customer – Conversion Critical',
        description: 'Strong bureau, low FOIR; likely drop without small ROI/PF reduction',
        icon: 'star',
        iconColor: '#f59e0b',
        iconBackground: '#fef3c7',
        detection: function(data) {
            return (data.bureauScore > 750 && data.foir < 0.5 && data.competitiveOffer === true);
        },
        nudgeMessage: 'This high-quality customer presents minimal risk and is likely to shop around for better rates. A strategic pricing adjustment may secure a valuable low-risk asset.',
        approvalPathway: 'Prime customer deviations receive higher auto-approval thresholds based on risk profile excellence.',
        riskLevel: 'very low',
        recommendations: [
            'Highlight excellent risk profile in your justification',
            'Compare expected returns against portfolio average',
            'Consider expedited processing as additional value proposition'
        ],
        impactAnalysis: {
            profitabilityImpact: 'Moderate (₹5,000 - ₹15,000)',
            conversionLikelihood: '+45%',
            processingTimeImpact: 'Can be expedited'
        }
    },
    {
        id: 'high-ticket-exposure',
        name: 'High Ticket Exposure Case',
        description: 'Large loan; even small ROI reduction causes high absolute ₹ revenue impact',
        icon: 'sack-dollar',
        iconColor: '#dc2626',
        iconBackground: '#fee2e2',
        detection: function(data) {
            return (data.loanAmount > 2000000);
        },
        nudgeMessage: 'This high-ticket loan means even a small ROI deviation creates significant absolute revenue impact. Consider whether partial deviation would still secure the business.',
        approvalPathway: 'High ticket deviations receive additional scrutiny due to absolute revenue impact.',
        riskLevel: 'medium',
        recommendations: [
            'Quantify absolute revenue impact in your justification',
            'Consider tiered pricing structure based on loan tenure',
            'Highlight risk mitigants specific to this high exposure'
        ],
        impactAnalysis: {
            profitabilityImpact: 'High (> ₹50,000)',
            conversionLikelihood: '+20%',
            processingTimeImpact: 'Additional 1-2 days for review'
        }
    }
];

// Mock data for demonstration purposes
const sampleData = {
    // Customer information
    customerName: 'Rajendra Kumar',
    customerID: 'CUST10045678',
    loanAmount: 2500000,
    loanTenure: 60, // months
    loanPurpose: 'Home Renovation',
    bureauScore: 745,
    bureauHistory: 60, // months
    foir: 0.55,
    incomeStability: 'High', // Low, Medium, High
    
    // Deviation details
    requestedROI: 11.25, // %
    standardROI: 12.0, // %
    roiDeviationPercent: 0.75, // % points
    requestedProcessingFee: 10000,
    standardProcessingFee: 25000,
    processingFeeDeviationPercent: 0.6,
    absoluteProfitabilityImpact: 120000,
    
    // Customer relationship
    customerSegment: 'Premium',
    previousLoansCount: 2,
    activeLoansCount: 1,
    isTopUp: true,
    customerLTV: 250000,
    
    // Competitive landscape
    competitiveOffer: true,
    competitiveOffers: 1,
    competitivePressureZone: true
};

// Function to detect applicable scenarios
function detectScenarios(data) {
    // Detect applicable RM scenarios
    const applicableRMScenarios = rmScenarios.filter(function(scenario) { 
        return scenario.detection(data);
    });
    
    // Return the detected scenarios
    return {
        rm: applicableRMScenarios
    };
}

// Helper function to generate personalized nudges
function generatePersonalizedNudge(scenarios) {
    if (!scenarios || scenarios.length === 0) {
        return "No specific scenarios detected for this case.";
    }
    
    // In a real system, we would prioritize and combine nudges
    // based on scenario importance and compatibility
    const primaryScenario = scenarios[0];
    
    return {
        message: primaryScenario.nudgeMessage,
        approvalPathway: primaryScenario.approvalPathway,
        recommendations: primaryScenario.recommendations,
        riskLevel: primaryScenario.riskLevel
    };
}

// Initialize scenarios on page load
document.addEventListener('DOMContentLoaded', function() {
    // For demo purposes, detect scenarios based on sample data
    const detectedScenarios = detectScenarios(sampleData);
    
    // In a real app, we would display the detected scenarios
    // and generate personalized nudges based on them
    console.log("Detected Scenarios:", detectedScenarios);
    
    if (detectedScenarios.rm.length > 0) {
        const nudge = generatePersonalizedNudge(detectedScenarios.rm);
        console.log("Personalized Nudge:", nudge);
    }
    
    // Initialization for the landing page
    initLandingPage();
});

// Basic landing page functionality
function initLandingPage() {
    const rmButton = document.querySelector('.rm-btn');
    const approverButton = document.querySelector('.approver-btn');
    
    if (rmButton) {
        rmButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('lastInterface', 'rm');
            window.location.href = 'rm-interface.html';
        });
    }
    
    if (approverButton) {
        approverButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('lastInterface', 'approver');
            window.location.href = 'approver-interface.html';
        });
    }
}