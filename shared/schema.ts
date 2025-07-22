import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  content: text("content").notNull(),
  isBot: boolean("is_bot").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  category: text("category"), // legal category like 'property', 'criminal', etc.
});

export const legalDocuments = pgTable("legal_documents", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalText: text("original_text"),
  extractedText: text("extracted_text"),
  summary: text("summary"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  sessionId: text("session_id").notNull(),
});

export const legalKnowledge = pgTable("legal_knowledge", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'civil', 'criminal', 'property', 'family', etc.
  keywords: text("keywords").array(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  priority: integer("priority").default(1),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  content: true,
  isBot: true,
  category: true,
});

export const insertLegalDocumentSchema = createInsertSchema(legalDocuments).pick({
  filename: true,
  originalText: true,
  extractedText: true,
  summary: true,
  sessionId: true,
});

export const insertLegalKnowledgeSchema = createInsertSchema(legalKnowledge).pick({
  category: true,
  keywords: true,
  question: true,
  answer: true,
  priority: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertLegalDocument = z.infer<typeof insertLegalDocumentSchema>;
export type LegalDocument = typeof legalDocuments.$inferSelect;
export type InsertLegalKnowledge = z.infer<typeof insertLegalKnowledgeSchema>;
export type LegalKnowledge = typeof legalKnowledge.$inferSelect;
