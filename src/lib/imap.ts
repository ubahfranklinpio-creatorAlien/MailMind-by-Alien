import { ImapFlow } from 'imapflow';
import { simpleParser, ParsedMail } from 'mailparser';

export interface EmailData {
  id: string;
  uid: number;
  subject: string;
  from: string;
  date: Date;
  snippet: string;
}

export async function fetchRecentEmails(config: any): Promise<EmailData[]> {
  const client = new ImapFlow({
    host: config.host,
    port: config.port,
    secure: config.port === 993,
    auth: {
      user: config.user,
      pass: config.password,
    },
    logger: false, // Disable verbose logging
  });

  const emails: EmailData[] = [];

  try {
    await client.connect();
    
    // Select inbox and open it read-only
    let lock = await client.getMailboxLock('INBOX');
    try {
      // Fetch the last 20 emails
      const mailbox = client.mailbox;
      if (!mailbox) return [];
      
      const totalMessages: number = (mailbox as any).exists;
      if (totalMessages === 0) return [];
      
      const start = Math.max(1, totalMessages - 19);
      const seq = `${start}:*`;

      for await (const message of client.fetch(seq, { source: true, uid: true })) {
        if (message.source) {
          const parsed = await simpleParser(message.source);
          
          let snippet = parsed.text || '';
          if (snippet.length > 500) {
            snippet = snippet.substring(0, 500) + '...';
          }

          emails.push({
            id: message.uid.toString(),
            uid: message.uid,
            subject: parsed.subject || '(No Subject)',
            from: parsed.from?.text || '(Unknown Sender)',
            date: parsed.date || new Date(),
            snippet: snippet.trim(),
          });
        }
      }
    } finally {
      lock.release();
    }
    
    await client.logout();
    
    // Sort array descending (newest first)
    return emails.sort((a, b) => b.uid - a.uid);

  } catch (err) {
    console.error("IMAP Error:", err);
    throw err;
  }
}
