import { storage } from "../storage";
import type { LegalKnowledge } from "@shared/schema";

export class ChatbotService {
  private categorizeQuery(query: string): string {
    const queryLower = query.toLowerCase();
    
    // Property law keywords
    if (this.matchesKeywords(queryLower, [
      "property", "registration", "stamp duty", "registry", "land", "house", "apartment",
      "real estate", "deed", "title", "ownership", "possession", "sale deed", "lease",
      "rent", "tenant", "landlord", "eviction", "mortgage", "plot", "builder"
    ])) {
      return "property";
    }
    
    // Criminal law keywords
    if (this.matchesKeywords(queryLower, [
      "fir", "police", "criminal", "theft", "assault", "crime", "arrest", "bail",
      "investigation", "court", "judge", "lawyer", "advocate", "case", "complaint",
      "fraud", "cheating", "dowry", "domestic violence", "murder", "robbery"
    ])) {
      return "criminal";
    }
    
    // Family law keywords
    if (this.matchesKeywords(queryLower, [
      "divorce", "marriage", "custody", "maintenance", "alimony", "family",
      "child", "adoption", "guardian", "wife", "husband", "separation",
      "dowry", "wedding", "matrimonial", "inheritance", "succession"
    ])) {
      return "family";
    }
    
    // Civil law keywords
    if (this.matchesKeywords(queryLower, [
      "contract", "agreement", "breach", "civil", "damages", "compensation",
      "suit", "litigation", "dispute", "injunction", "specific performance",
      "partnership", "company", "business", "employment", "labor"
    ])) {
      return "civil";
    }
    
    // Consumer law keywords
    if (this.matchesKeywords(queryLower, [
      "consumer", "complaint", "deficiency", "service", "goods", "product",
      "warranty", "guarantee", "refund", "exchange", "forum", "commission",
      "redressal", "defective", "quality", "price", "overcharge"
    ])) {
      return "consumer";
    }
    
    return "general";
  }

  private matchesKeywords(query: string, keywords: string[]): boolean {
    return keywords.some(keyword => query.includes(keyword));
  }

  private extractKeywords(query: string): string[] {
    const stopWords = new Set(["the", "is", "at", "which", "on", "and", "a", "an", "as", "are", "was", "were", "been", "be", "have", "has", "had", "do", "does", "did", "can", "could", "should", "would", "may", "might", "will", "shall", "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "her", "its", "our", "their", "what", "when", "where", "why", "how", "who"]);
    
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 10); // Limit to top 10 keywords
  }

  async generateResponse(query: string): Promise<{ response: string; category: string; suggestions?: string[] }> {
    const category = this.categorizeQuery(query);
    const keywords = this.extractKeywords(query);
    
    // Enhanced intelligent response generation
    const intelligentResponse = this.generateIntelligentResponse(query, category);
    if (intelligentResponse) {
      const suggestions = this.generateSuggestions(category);
      return { response: intelligentResponse, category, suggestions };
    }
    
    // Search for relevant knowledge
    const relevantKnowledge = await storage.searchLegalKnowledge(keywords, category === "general" ? undefined : category);
    
    if (relevantKnowledge.length > 0) {
      const bestMatch = relevantKnowledge[0];
      const response = this.formatResponse(bestMatch);
      const suggestions = this.generateSuggestions(category);
      
      return { response, category, suggestions };
    }
    
    // Fallback response for unmatched queries
    const fallbackResponse = this.getFallbackResponse(category);
    const suggestions = this.generateSuggestions(category);
    
    return { response: fallbackResponse, category, suggestions };
  }

  private generateIntelligentResponse(query: string, category: string): string | null {
    const queryLower = query.toLowerCase();
    
    // Specific question patterns with detailed responses
    if (queryLower.includes("how to file") && queryLower.includes("fir")) {
      return `**How to File an FIR (First Information Report)**

To file an FIR in India, follow these steps:

**Step 1: Visit the Police Station**
- Go to the nearest police station in your jurisdiction
- You can file an FIR at any police station if it's an emergency

**Step 2: Provide Details**
- Give a written complaint with complete details
- Include: Date, time, place of incident, names of accused (if known)
- Describe the incident clearly and factually

**Step 3: FIR Registration**
- Police officer will record your statement
- You'll get a copy of the FIR with registration number
- Ensure you get the acknowledgment receipt

**Step 4: Follow Up**
- Keep the FIR copy safe for future reference
- You can inquire about investigation progress
- Contact investigating officer for updates

**Important Notes:**
- FIR should be filed immediately after the incident
- Police cannot refuse to register FIR for cognizable offenses
- You can approach higher authorities if police refuse to file FIR

*Disclaimer: This is general legal information. For specific cases, consult a qualified lawyer.*`;
    }
    
    if (queryLower.includes("property registration") || (queryLower.includes("property") && queryLower.includes("register"))) {
      return `**Property Registration Process in India**

**Documents Required:**
- Sale Deed/Agreement to Sell
- Title Documents of the property
- NOC from builder/society (if applicable)
- Property card/Survey settlement
- Identity and address proof of buyer and seller
- PAN cards of all parties
- Passport size photographs

**Step-by-Step Process:**

**1. Document Verification**
- Verify all property documents
- Check for clear title and no disputes
- Ensure NOC from relevant authorities

**2. Stamp Duty Payment**
- Calculate stamp duty based on state rates
- Pay stamp duty online or at designated centers
- Get stamp duty certificate

**3. Visit Sub-Registrar Office**
- Book appointment online (in most states)
- Visit with all original documents
- Carry two witnesses with valid ID

**4. Registration Process**
- Biometric verification of all parties
- Document verification by registrar
- Payment of registration fees
- Signing of documents

**5. Receipt and Completion**
- Get registered document copy
- Obtain registration receipt
- Update property records

**Important:** Registration must be done within 4 months of signing the agreement.

*Consult a legal expert for state-specific requirements and procedures.*`;
    }
    
    if (queryLower.includes("divorce") && (queryLower.includes("procedure") || queryLower.includes("process") || queryLower.includes("how"))) {
      return `**Divorce Procedures in India**

**Types of Divorce:**

**1. Mutual Consent Divorce**
- Both parties agree to divorce
- Faster process (6-18 months)
- Less expensive and less stressful

**Procedure:**
- File joint petition in family court
- First motion hearing (cooling period of 6 months)
- Second motion hearing (final decree)

**2. Contested Divorce**
- One party files against the other
- Longer process (2-5 years)
- Requires valid grounds

**Grounds for Divorce (Hindu Marriage Act):**
- Adultery
- Cruelty (physical or mental)
- Desertion for 2+ years
- Conversion to another religion
- Mental disorder
- Communicable disease (leprosy/VD)
- Renunciation of world

**Documents Required:**
- Marriage certificate
- Address proof
- Income proof
- Photos of marriage ceremony
- Evidence supporting grounds (if contested)

**Process:**
1. File petition in family court
2. Serve notice to other party
3. Response filing by respondent
4. Evidence and witness examination
5. Court judgment and decree

**Child Custody & Maintenance:**
- Child's welfare is paramount consideration
- Both parents have equal rights
- Maintenance based on income and needs

*Different personal laws apply to different religions. Consult a family law expert for specific guidance.*`;
    }
    
    if (queryLower.includes("consumer complaint") || (queryLower.includes("consumer") && queryLower.includes("file"))) {
      return `**How to File a Consumer Complaint**

**Consumer Forums in India:**

**1. District Consumer Forum**
- For complaints up to ₹20 lakhs
- Fastest resolution (usually 3-6 months)

**2. State Consumer Commission**
- For complaints between ₹20 lakhs to ₹1 crore
- Appeals from District Forum

**3. National Consumer Commission**
- For complaints above ₹1 crore
- Final appellate authority

**Documents Required:**
- Purchase receipt/bill
- Warranty/guarantee documents
- Correspondence with seller/service provider
- Photos/videos of defective product
- Medical certificates (if applicable)

**Filing Process:**

**Step 1: Prepare Complaint**
- Clearly state the deficiency in goods/services
- Mention relief sought (refund/replacement/compensation)
- Attach supporting documents

**Step 2: Submit Complaint**
- File online through e-Daakhil portal
- Or submit physical copy to forum
- Pay nominal filing fee

**Step 3: Hearing Process**
- Forum issues notice to opposite party
- Both parties present evidence
- Forum passes order

**Relief Available:**
- Refund of price paid
- Replacement of defective goods
- Compensation for loss/injury
- Punitive damages
- Discontinuation of unfair practices

**Time Limit:**
- Complaint must be filed within 2 years of cause of action
- Extensions possible in exceptional cases

*Keep all purchase documents safe and act within time limits for better chances of success.*`;
    }

    if (queryLower.includes("bail") && (queryLower.includes("application") || queryLower.includes("how") || queryLower.includes("apply"))) {
      return `**Bail Application Process in India**

**Types of Bail:**

**1. Regular Bail**
- Applied when arrested and in custody
- Filed in Sessions Court or High Court

**2. Anticipatory Bail**
- Applied before arrest when apprehending arrest
- Filed in Sessions Court or High Court under Section 438 CrPC

**3. Interim Bail**
- Temporary bail for short period
- Usually granted pending regular bail application

**Bail Application Process:**

**Step 1: Engage a Lawyer**
- Criminal lawyer experienced in bail matters
- Lawyer will assess the case and chances

**Step 2: Prepare Application**
- Draft bail application with grounds
- Attach relevant documents
- Include undertaking and surety details

**Step 3: File in Appropriate Court**
- Magistrate Court (for bailable offenses)
- Sessions Court (for non-bailable offenses)
- High Court (if Sessions Court rejects)

**Step 4: Court Hearing**
- Arguments by defense lawyer
- Prosecution may oppose
- Court decides based on merits

**Factors Considered by Court:**
- Nature and gravity of offense
- Character and antecedents of accused
- Possibility of fleeing from justice
- Likelihood of repeating offense
- Tampering with evidence or witnesses

**Bail Conditions:**
- Personal bond and surety
- Surrender passport
- Regular reporting to police
- Not to leave jurisdiction
- Not to contact witnesses

**Documents Required:**
- Copy of FIR
- Identity and address proof
- Income proof of surety
- Character certificate
- Medical certificate (if required)

*Bail is a right for bailable offenses and discretionary for non-bailable offenses. Time is crucial in bail applications.*`;
    }

    return null;
  }

  private formatResponse(knowledge: LegalKnowledge): string {
    return `**${knowledge.question}**\n\n${knowledge.answer}\n\n*Please note: This is general legal information. For specific legal advice, consult with a qualified attorney.*`;
  }

  private getFallbackResponse(category: string): string {
    const categoryResponses = {
      property: "I can help you with property-related queries including registration, documentation, stamp duty, and property laws in India. Could you please be more specific about your property concern?",
      criminal: "I can assist with criminal law matters including FIR filing, police procedures, and criminal case information. What specific criminal law issue would you like help with?",
      family: "I'm here to help with family law matters such as marriage, divorce, custody, and maintenance issues. Could you provide more details about your family law question?",
      civil: "I can help with civil law matters including contracts, agreements, and civil procedures. What specific civil law issue can I assist you with?",
      consumer: "I can guide you through consumer protection laws, complaint procedures, and consumer rights. What consumer issue would you like help with?",
      general: "I'm your AI legal assistant trained on Indian legal documents. I can help with property law, criminal law, family law, civil law, and consumer protection. Could you please specify your legal query or the area of law you need assistance with?"
    };
    
    return categoryResponses[category] || categoryResponses.general;
  }

  private generateSuggestions(category: string): string[] {
    const categorySuggestions = {
      property: [
        "Property registration process",
        "Documents required for property purchase",
        "Stamp duty calculation",
        "Property verification checklist"
      ],
      criminal: [
        "How to file an FIR",
        "Police investigation process",
        "Bail procedures",
        "Criminal case timeline"
      ],
      family: [
        "Divorce procedure in India",
        "Child custody laws",
        "Maintenance and alimony",
        "Marriage registration"
      ],
      civil: [
        "Contract law basics",
        "Civil suit procedure",
        "Legal notice format",
        "Property disputes"
      ],
      consumer: [
        "Consumer complaint procedure",
        "Consumer forums in India",
        "Product warranty rights",
        "Service deficiency claims"
      ],
      general: [
        "Property law queries",
        "Criminal law assistance",
        "Family law guidance",
        "Consumer protection"
      ]
    };
    
    return categorySuggestions[category] || categorySuggestions.general;
  }

  async getWelcomeMessage(): Promise<string> {
    return `🙏 **Welcome to AI Legal ChatBot!**

I'm your intelligent legal assistant specializing in **Indian law**. I can help you with:

✅ **Legal Queries & Guidance**
• Property registration & documentation
• Criminal law procedures (FIR, bail applications)
• Family law matters (divorce, custody, maintenance)
• Consumer protection & complaints
• Civil law contracts & agreements

✅ **Document Analysis & OCR**
• Upload legal documents for instant analysis
• Extract text from scanned images
• Get summaries and key points
• Identify document types and legal areas

✅ **Step-by-Step Procedures**
• Detailed legal process explanations
• Required documents checklists
• Court procedures and timelines
• Legal notices and applications

**Try asking me:**
• "How to file an FIR?"
• "Property registration process"
• "Divorce procedure in India"
• Or upload a legal document for analysis

*Please note: This is general legal information. For specific cases, consult a qualified lawyer.*

How can I assist you today? 🤖⚖️`;
  }
}

export const chatbotService = new ChatbotService();
