import { users, chatMessages, legalDocuments, legalKnowledge, type User, type InsertUser, type ChatMessage, type InsertChatMessage, type LegalDocument, type InsertLegalDocument, type LegalKnowledge, type InsertLegalKnowledge } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat messages
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Legal documents
  createLegalDocument(document: InsertLegalDocument): Promise<LegalDocument>;
  getLegalDocument(id: number): Promise<LegalDocument | undefined>;
  getLegalDocumentsBySession(sessionId: string): Promise<LegalDocument[]>;
  
  // Legal knowledge
  getLegalKnowledge(): Promise<LegalKnowledge[]>;
  searchLegalKnowledge(keywords: string[], category?: string): Promise<LegalKnowledge[]>;
  createLegalKnowledge(knowledge: InsertLegalKnowledge): Promise<LegalKnowledge>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private legalDocuments: Map<number, LegalDocument>;
  private legalKnowledge: Map<number, LegalKnowledge>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentDocumentId: number;
  private currentKnowledgeId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.legalDocuments = new Map();
    this.legalKnowledge = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentDocumentId = 1;
    this.currentKnowledgeId = 1;
    
    // Initialize with sample legal knowledge
    this.initializeLegalKnowledge();
  }

  private initializeLegalKnowledge() {
    const knowledgeBase = [
      // Property Law
      {
        category: "property",
        keywords: ["property", "registration", "documents", "stamp duty", "registry"],
        question: "What is the property registration process in India?",
        answer: "Property registration in India involves: 1) Document verification and stamp duty payment 2) Visit to Sub-Registrar's office 3) Biometric verification of parties 4) Registration fee payment 5) Document registration and receipt. Required documents include sale deed, NOC, property card, and identity proofs.",
        priority: 1
      },
      {
        category: "property",
        keywords: ["sale deed", "purchase", "property", "buyer", "seller"],
        question: "What is a sale deed and why is it important?",
        answer: "A sale deed is a legal document that transfers ownership of property from seller to buyer. It's important because: 1) Provides legal proof of ownership 2) Required for property registration 3) Needed for bank loans 4) Establishes clear title 5) Protects against future disputes.",
        priority: 1
      },
      {
        category: "property",
        keywords: ["tenant", "landlord", "rent", "eviction", "lease"],
        question: "What are tenant rights in India?",
        answer: "Tenant rights in India include: 1) Right to peaceful enjoyment 2) Protection from illegal eviction 3) Right to reasonable notice 4) Right to essential services 5) Right to privacy 6) Right to maintenance and repairs. Eviction requires proper legal notice and court proceedings.",
        priority: 1
      },
      
      // Criminal Law
      {
        category: "criminal",
        keywords: ["FIR", "police", "complaint", "criminal", "case"],
        question: "How to file an FIR?",
        answer: "To file an FIR: 1) Visit the nearest police station 2) Provide written complaint with details 3) Include time, place, and nature of offense 4) Get FIR copy with registration number 5) Follow up on investigation. FIR should be filed immediately after the incident.",
        priority: 1
      },
      {
        category: "criminal",
        keywords: ["bail", "arrest", "custody", "court", "accused"],
        question: "What are the types of bail in India?",
        answer: "Types of bail in India: 1) Regular Bail - after arrest and custody 2) Anticipatory Bail - before arrest when anticipating arrest 3) Interim Bail - temporary relief. Bail application should include personal details, case details, grounds for bail, and surety arrangements.",
        priority: 1
      },
      {
        category: "criminal",
        keywords: ["domestic violence", "protection", "women", "harassment"],
        question: "What protection is available for domestic violence?",
        answer: "Protection under Domestic Violence Act 2005: 1) File complaint with magistrate 2) Get protection order 3) Residence order for shared household 4) Monetary relief for expenses 5) Custody order for children 6) Compensation order. Help available through women helplines and legal aid.",
        priority: 1
      },
      
      // Family Law
      {
        category: "family",
        keywords: ["divorce", "marriage", "custody", "maintenance", "alimony"],
        question: "What are the grounds for divorce in India?",
        answer: "Grounds for divorce under Hindu Marriage Act include: adultery, cruelty, desertion for 2+ years, conversion to another religion, mental disorder, communicable disease, and irretrievable breakdown. Mutual consent divorce is also available.",
        priority: 1
      },
      {
        category: "family",
        keywords: ["child custody", "children", "guardian", "parent"],
        question: "How is child custody decided in India?",
        answer: "Child custody in India is decided based on: 1) Best interest of the child 2) Child's age and preference 3) Financial stability of parents 4) Moral character 5) Ability to provide care. Courts prefer joint custody when possible. Children below 5 years usually stay with mother.",
        priority: 1
      },
      {
        category: "family",
        keywords: ["marriage registration", "certificate", "wedding"],
        question: "How to register marriage in India?",
        answer: "Marriage registration process: 1) Apply to marriage registrar 2) Submit required documents 3) Publish notice for 30 days 4) Appear before registrar with witnesses 5) Sign marriage register 6) Obtain marriage certificate. Required documents include age proof, address proof, photos, and affidavit.",
        priority: 1
      },
      
      // Civil Law
      {
        category: "civil",
        keywords: ["contract", "agreement", "breach", "damages", "civil suit"],
        question: "What constitutes a valid contract?",
        answer: "A valid contract requires: 1) Offer and acceptance 2) Lawful consideration 3) Capacity to contract 4) Free consent 5) Lawful object 6) Not expressly declared void. All parties must be competent and the agreement must be enforceable by law.",
        priority: 1
      },
      {
        category: "civil",
        keywords: ["legal notice", "demand", "breach", "contract"],
        question: "When should you send a legal notice?",
        answer: "Send legal notice when: 1) Breach of contract occurs 2) Payment dues are pending 3) Property disputes arise 4) Service deficiency occurs 5) Before filing suit. Legal notice provides opportunity to resolve dispute without court intervention and is often mandatory before filing suit.",
        priority: 1
      },
      {
        category: "civil",
        keywords: ["employment", "termination", "wrongful", "dismissal"],
        question: "What are employee rights in case of wrongful termination?",
        answer: "Employee rights for wrongful termination: 1) Notice pay or pay in lieu 2) Gratuity if eligible 3) Pending salary and benefits 4) Provident fund withdrawal 5) Relief under labor laws 6) Approach labor court for reinstatement. Industrial Disputes Act provides protection against unfair dismissal.",
        priority: 1
      },
      
      // Consumer Law
      {
        category: "consumer",
        keywords: ["consumer", "complaint", "deficiency", "service", "goods"],
        question: "How to file a consumer complaint?",
        answer: "Consumer complaints can be filed: 1) District Consumer Forum (up to ₹20 lakhs) 2) State Consumer Commission (₹20 lakhs to ₹1 crore) 3) National Consumer Commission (above ₹1 crore). Include purchase proof, deficiency details, and relief sought.",
        priority: 1
      },
      {
        category: "consumer",
        keywords: ["online shopping", "ecommerce", "refund", "return"],
        question: "What are consumer rights for online shopping?",
        answer: "Consumer rights for online shopping: 1) Right to return within specified period 2) Right to refund for defective products 3) Right to replacement 4) Protection against unfair practices 5) Right to cancel order before delivery 6) Compensation for delayed delivery. Consumer Protection Act 2019 covers e-commerce transactions.",
        priority: 1
      },
      {
        category: "consumer",
        keywords: ["medical negligence", "doctor", "hospital", "treatment"],
        question: "How to file complaint for medical negligence?",
        answer: "Medical negligence complaint process: 1) Collect medical records and evidence 2) Get expert medical opinion 3) File complaint in consumer forum 4) Include details of negligence and damages 5) Seek compensation for loss. Medical negligence includes wrong treatment, delayed diagnosis, surgical errors, and lack of informed consent.",
        priority: 1
      },
      
      // Additional Legal Areas
      {
        category: "general",
        keywords: ["legal aid", "free", "lawyer", "poor", "helpline"],
        question: "How to get free legal aid in India?",
        answer: "Free legal aid available through: 1) Legal Services Authority (NALSA) 2) District Legal Services Authority 3) Lok Adalats 4) Legal aid clinics 5) NGO legal aid programs. Eligible persons include women, children, disabled persons, SC/ST, and those with annual income below prescribed limit.",
        priority: 1
      },
      {
        category: "general",
        keywords: ["right to information", "RTI", "government", "transparency"],
        question: "How to file RTI application?",
        answer: "RTI application process: 1) Identify correct public authority 2) Draft application clearly stating information required 3) Pay prescribed fee 4) Submit to Public Information Officer 5) Receive information within 30 days. RTI fee is ₹10 for central government and varies for states.",
        priority: 1
      }
    ];

    knowledgeBase.forEach(kb => {
      this.createLegalKnowledge(kb);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentMessageId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async createLegalDocument(insertDocument: InsertLegalDocument): Promise<LegalDocument> {
    const id = this.currentDocumentId++;
    const document: LegalDocument = {
      ...insertDocument,
      id,
      uploadedAt: new Date()
    };
    this.legalDocuments.set(id, document);
    return document;
  }

  async getLegalDocument(id: number): Promise<LegalDocument | undefined> {
    return this.legalDocuments.get(id);
  }

  async getLegalDocumentsBySession(sessionId: string): Promise<LegalDocument[]> {
    return Array.from(this.legalDocuments.values())
      .filter(doc => doc.sessionId === sessionId);
  }

  async getLegalKnowledge(): Promise<LegalKnowledge[]> {
    return Array.from(this.legalKnowledge.values());
  }

  async searchLegalKnowledge(keywords: string[], category?: string): Promise<LegalKnowledge[]> {
    const allKnowledge = Array.from(this.legalKnowledge.values());
    
    return allKnowledge.filter(kb => {
      const categoryMatch = !category || kb.category === category;
      const keywordMatch = keywords.some(keyword => 
        kb.keywords?.some(kw => kw.toLowerCase().includes(keyword.toLowerCase())) ||
        kb.question.toLowerCase().includes(keyword.toLowerCase()) ||
        kb.answer.toLowerCase().includes(keyword.toLowerCase())
      );
      return categoryMatch && keywordMatch;
    }).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  async createLegalKnowledge(insertKnowledge: InsertLegalKnowledge): Promise<LegalKnowledge> {
    const id = this.currentKnowledgeId++;
    const knowledge: LegalKnowledge = { ...insertKnowledge, id };
    this.legalKnowledge.set(id, knowledge);
    return knowledge;
  }
}

export const storage = new MemStorage();
