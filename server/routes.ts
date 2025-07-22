import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { chatbotService } from "./services/chatbot";
import { ocrService } from "./services/ocr";
import { documentAnalyzer } from "./services/document-analyzer";
import { insertChatMessageSchema, insertLegalDocumentSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed (JPEG, PNG, PDF, DOC, DOCX)'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get chat messages for a session
  app.get("/api/chat/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a message and get bot response
  app.post("/api/chat/:sessionId/message", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messageData = insertChatMessageSchema.parse({
        ...req.body,
        sessionId,
        isBot: false
      });

      // Save user message
      const userMessage = await storage.createChatMessage(messageData);

      // Generate bot response
      const { response, category, suggestions } = await chatbotService.generateResponse(messageData.content);

      // Save bot response
      const botMessage = await storage.createChatMessage({
        sessionId,
        content: response,
        isBot: true,
        category
      });

      res.json({
        userMessage,
        botMessage,
        suggestions
      });
    } catch (error) {
      console.error('Error processing message:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  // Get welcome message
  app.get("/api/chat/welcome", async (req, res) => {
    try {
      const welcomeMessage = await chatbotService.getWelcomeMessage();
      res.json({ message: welcomeMessage });
    } catch (error) {
      console.error('Error getting welcome message:', error);
      res.status(500).json({ error: "Failed to get welcome message" });
    }
  });

  // Upload and analyze document
  app.post("/api/documents/upload", upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { sessionId } = req.body;
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }

      const { originalname, buffer, mimetype } = req.file;
      let extractedText = "";
      let summary = "";

      // Extract text using OCR for images
      if (mimetype.startsWith('image/')) {
        try {
          const ocrResult = await ocrService.extractText(buffer);
          extractedText = ocrService.preprocessLegalText(ocrResult.text);
          
          if (extractedText.length > 100) {
            const analysisResult = documentAnalyzer.analyzeDocumentText(extractedText);
            summary = `**Document Type:** ${analysisResult.documentType}\n**Legal Area:** ${analysisResult.legalArea}\n\n**Summary:** ${analysisResult.summary}\n\n**Key Points:**\n${analysisResult.keyPoints.join('\n')}`;
          }
        } catch (ocrError) {
          console.error('OCR processing failed:', ocrError);
          extractedText = "OCR processing failed. Please ensure the image is clear and contains readable text.";
        }
      } else {
        // For other file types, we would need additional processing
        extractedText = "Document uploaded successfully. Text extraction is currently supported for image files only.";
      }

      // Save document record
      const documentData = insertLegalDocumentSchema.parse({
        filename: originalname,
        originalText: "", // Would store original PDF/DOC text if processed
        extractedText,
        summary,
        sessionId
      });

      const document = await storage.createLegalDocument(documentData);

      res.json({
        id: document.id,
        filename: document.filename,
        extractedText: document.extractedText,
        summary: document.summary,
        uploadedAt: document.uploadedAt
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid document data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process document" });
      }
    }
  });

  // Get documents for a session
  app.get("/api/documents/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const documents = await storage.getLegalDocumentsBySession(sessionId);
      res.json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  // Get specific document
  app.get("/api/documents/:sessionId/:documentId", async (req, res) => {
    try {
      const { documentId } = req.params;
      const document = await storage.getLegalDocument(parseInt(documentId));
      
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      res.json(document);
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: "Failed to fetch document" });
    }
  });

  // Search legal knowledge
  app.get("/api/knowledge/search", async (req, res) => {
    try {
      const { q, category } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }

      const keywords = q.toLowerCase().split(/\s+/).filter(word => word.length > 2);
      const results = await storage.searchLegalKnowledge(
        keywords,
        category && typeof category === 'string' ? category : undefined
      );

      res.json(results);
    } catch (error) {
      console.error('Error searching knowledge:', error);
      res.status(500).json({ error: "Failed to search knowledge base" });
    }
  });

  // Get all legal knowledge
  app.get("/api/knowledge", async (req, res) => {
    try {
      const knowledge = await storage.getLegalKnowledge();
      res.json(knowledge);
    } catch (error) {
      console.error('Error fetching knowledge:', error);
      res.status(500).json({ error: "Failed to fetch knowledge base" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
