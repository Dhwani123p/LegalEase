import { createWorker } from 'tesseract.js';

export class OCRService {
  private worker: any = null;

  async initialize(): Promise<void> {
    if (this.worker) return;
    
    this.worker = await createWorker('eng');
    await this.worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%^&*()_+-=[]{}|;:\'",.<>/?`~'
    });
  }

  async extractText(imageBuffer: Buffer): Promise<{ text: string; confidence: number }> {
    await this.initialize();
    
    try {
      const { data } = await this.worker.recognize(imageBuffer);
      return {
        text: data.text.trim(),
        confidence: data.confidence
      };
    } catch (error) {
      console.error('OCR extraction error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  async extractTextFromBase64(base64Image: string): Promise<{ text: string; confidence: number }> {
    await this.initialize();
    
    try {
      // Remove data URL prefix if present
      const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      return await this.extractText(buffer);
    } catch (error) {
      console.error('OCR extraction error:', error);
      throw new Error('Failed to extract text from base64 image');
    }
  }

  async cleanup(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }

  // Preprocess text for better legal document analysis
  preprocessLegalText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .replace(/[^\w\s.,!?;:()\-]/g, '') // Remove special characters except common punctuation
      .trim();
  }
}

export const ocrService = new OCRService();
