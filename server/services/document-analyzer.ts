export class DocumentAnalyzer {
  analyzeDocumentText(text: string): { summary: string; keyPoints: string[]; legalArea: string; documentType: string } {
    const textLower = text.toLowerCase();
    
    // Determine document type and legal area
    const documentType = this.identifyDocumentType(textLower);
    const legalArea = this.identifyLegalArea(textLower);
    
    // Extract key points based on document patterns
    const keyPoints = this.extractKeyPoints(text, documentType);
    
    // Generate summary based on document type
    const summary = this.generateSummary(text, documentType, legalArea);
    
    return {
      summary,
      keyPoints,
      legalArea,
      documentType
    };
  }

  private identifyDocumentType(textLower: string): string {
    // Property documents
    if (this.containsKeywords(textLower, ["sale deed", "purchase deed", "conveyance deed"])) {
      return "Sale Deed";
    }
    if (this.containsKeywords(textLower, ["lease deed", "rent agreement", "rental agreement"])) {
      return "Lease Agreement";
    }
    if (this.containsKeywords(textLower, ["power of attorney", "poa"])) {
      return "Power of Attorney";
    }
    
    // Legal notices and complaints
    if (this.containsKeywords(textLower, ["legal notice", "notice under", "hereby give notice"])) {
      return "Legal Notice";
    }
    if (this.containsKeywords(textLower, ["first information report", "fir", "police station"])) {
      return "FIR";
    }
    if (this.containsKeywords(textLower, ["complaint", "consumer forum", "deficiency in service"])) {
      return "Consumer Complaint";
    }
    
    // Contracts and agreements
    if (this.containsKeywords(textLower, ["agreement", "contract", "party of the first part", "party of the second part"])) {
      return "Contract/Agreement";
    }
    if (this.containsKeywords(textLower, ["employment agreement", "service agreement", "appointment letter"])) {
      return "Employment Agreement";
    }
    
    // Court documents
    if (this.containsKeywords(textLower, ["petition", "application", "honorable court", "plaintiff", "defendant"])) {
      return "Court Petition";
    }
    if (this.containsKeywords(textLower, ["judgment", "order", "court", "decided", "disposed"])) {
      return "Court Order/Judgment";
    }
    
    // Family law documents
    if (this.containsKeywords(textLower, ["divorce petition", "mutual consent", "dissolution of marriage"])) {
      return "Divorce Petition";
    }
    if (this.containsKeywords(textLower, ["maintenance", "alimony", "child custody"])) {
      return "Maintenance Application";
    }
    
    return "Legal Document";
  }

  private identifyLegalArea(textLower: string): string {
    // Property law
    if (this.containsKeywords(textLower, [
      "property", "sale deed", "lease", "rent", "possession", "title", "registry",
      "stamp duty", "registration", "land", "plot", "apartment", "house"
    ])) {
      return "property";
    }
    
    // Criminal law
    if (this.containsKeywords(textLower, [
      "fir", "police", "crime", "theft", "assault", "bail", "arrest", "investigation",
      "criminal", "accused", "victim", "cognizable", "non-cognizable"
    ])) {
      return "criminal";
    }
    
    // Family law
    if (this.containsKeywords(textLower, [
      "marriage", "divorce", "custody", "maintenance", "alimony", "family",
      "child", "spouse", "matrimonial", "separation", "guardian"
    ])) {
      return "family";
    }
    
    // Consumer law
    if (this.containsKeywords(textLower, [
      "consumer", "deficiency", "service", "goods", "complaint", "forum",
      "redressal", "warranty", "guarantee", "refund", "compensation"
    ])) {
      return "consumer";
    }
    
    // Civil law
    if (this.containsKeywords(textLower, [
      "contract", "agreement", "breach", "damages", "compensation", "civil suit",
      "injunction", "specific performance", "dispute", "litigation"
    ])) {
      return "civil";
    }
    
    return "general";
  }

  private extractKeyPoints(text: string, documentType: string): string[] {
    const keyPoints: string[] = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 10);
    
    // Common patterns for extracting key information
    for (const line of lines) {
      const lineLower = line.toLowerCase();
      
      // Dates
      if (this.containsDate(line)) {
        keyPoints.push(`📅 ${line}`);
      }
      
      // Amounts/Money
      if (this.containsAmount(line)) {
        keyPoints.push(`💰 ${line}`);
      }
      
      // Names (assuming capitalized words might be names)
      if (this.containsNames(line)) {
        keyPoints.push(`👤 ${line}`);
      }
      
      // Property details
      if (lineLower.includes("property") || lineLower.includes("address") || lineLower.includes("situated")) {
        keyPoints.push(`🏠 ${line}`);
      }
      
      // Legal provisions
      if (lineLower.includes("section") || lineLower.includes("act") || lineLower.includes("clause")) {
        keyPoints.push(`⚖️ ${line}`);
      }
      
      // Important terms based on document type
      if (documentType === "Sale Deed" && (lineLower.includes("consideration") || lineLower.includes("purchase"))) {
        keyPoints.push(`📋 ${line}`);
      }
      
      if (documentType === "FIR" && (lineLower.includes("accused") || lineLower.includes("incident"))) {
        keyPoints.push(`🚨 ${line}`);
      }
    }
    
    // Limit to most relevant points
    return keyPoints.slice(0, 8);
  }

  private generateSummary(text: string, documentType: string, legalArea: string): string {
    const textLength = text.length;
    
    if (textLength < 100) {
      return "Document appears to be incomplete or contains insufficient text for analysis.";
    }
    
    let summary = `This is a ${documentType} related to ${legalArea} law. `;
    
    // Add document-specific summary details
    switch (documentType) {
      case "Sale Deed":
        summary += "It documents the transfer of property ownership from seller to buyer. Key aspects include property details, consideration amount, and legal formalities for registration.";
        break;
      case "Lease Agreement":
        summary += "It establishes the terms and conditions for renting/leasing property. Important elements include rental amount, duration, and responsibilities of landlord and tenant.";
        break;
      case "Legal Notice":
        summary += "It serves as a formal warning or demand before initiating legal proceedings. It outlines the grievance and provides opportunity for resolution.";
        break;
      case "FIR":
        summary += "It records the first information about a cognizable offense reported to police. It initiates the criminal investigation process.";
        break;
      case "Consumer Complaint":
        summary += "It details grievances against deficient goods or services. It seeks redressal through consumer protection forums.";
        break;
      case "Contract/Agreement":
        summary += "It defines the terms, conditions, and obligations between contracting parties. It creates legally binding commitments.";
        break;
      case "Court Petition":
        summary += "It presents a formal request to the court for legal remedy or relief. It outlines the facts, legal grounds, and prayers.";
        break;
      case "Divorce Petition":
        summary += "It initiates the legal process for dissolution of marriage. It states grounds for divorce and seeks court intervention.";
        break;
      default:
        summary += "It contains legal provisions and clauses relevant to the specified legal area. Professional legal advice is recommended for proper understanding.";
    }
    
    // Add length-based detail
    if (textLength > 2000) {
      summary += " This is a comprehensive document with detailed clauses and provisions.";
    } else if (textLength > 500) {
      summary += " This document contains moderate detail with essential legal elements.";
    } else {
      summary += " This appears to be a brief document or excerpt.";
    }
    
    summary += " Please consult a qualified lawyer for specific legal advice and interpretation.";
    
    return summary;
  }

  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private containsDate(line: string): boolean {
    // Simple date pattern matching
    const datePatterns = [
      /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/,
      /\d{1,2}(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/
    ];
    
    return datePatterns.some(pattern => pattern.test(line));
  }

  private containsAmount(line: string): boolean {
    // Money patterns
    const amountPatterns = [
      /₹\s*\d+/,
      /rs\.?\s*\d+/i,
      /rupees?\s+\d+/i,
      /\d+\s*rupees?/i,
      /\d+\s*lakhs?/i,
      /\d+\s*crores?/i
    ];
    
    return amountPatterns.some(pattern => pattern.test(line));
  }

  private containsNames(line: string): boolean {
    // Simple name detection (multiple capitalized words)
    const namePattern = /\b[A-Z][a-z]+\s+[A-Z][a-z]+/;
    return namePattern.test(line) && line.length < 100; // Avoid long paragraphs
  }
}

export const documentAnalyzer = new DocumentAnalyzer();