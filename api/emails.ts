import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchRecentEmails } from '../src/lib/imap.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user, password, host, port } = req.body;

  if (!user || !password) {
    return res.status(400).json({
      error: "Credentials Required",
      message: "Email and password are required to fetch emails."
    });
  }

  try {
    const emails = await fetchRecentEmails({
      user: user,
      password: password,
      host: host || "imap.gmail.com",
      port: port || 993,
    });

    res.status(200).json({ emails });
  } catch (error: any) {
    console.error("Error fetching emails:", error);
    res.status(500).json({
      error: "Connection Failed",
      message: "Failed to connect to the IMAP server. Please check your credentials.",
      details: error.message,
    });
  }
}
