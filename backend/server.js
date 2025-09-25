const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Database setup
let db;

async function initializeDatabase() {
  try {
    // Open database connection
    db = await open({
      filename: path.join(__dirname, 'db.sqlite'),
      driver: sqlite3.Database
    });

    // Create tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS wallets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        balance_paise INTEGER NOT NULL DEFAULT 0,
        wallet_type TEXT DEFAULT 'UPI',
        is_sandbox BOOLEAN DEFAULT true,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wallet_id INTEGER NOT NULL,
        to_identifier TEXT NOT NULL,
        amount_paise INTEGER NOT NULL,
        transaction_type TEXT NOT NULL,
        is_sandbox BOOLEAN DEFAULT true,
        status TEXT DEFAULT 'completed',
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (wallet_id) REFERENCES wallets (id)
      );
    `);

    // Seed demo user and wallet if not exists
    const existingUser = await db.get('SELECT id FROM users WHERE id = 1');
    if (!existingUser) {
      await db.run('INSERT INTO users (id, name, phone) VALUES (1, "Demo User", "+91-9999999999")');
      
      // Create sandbox UPI wallet with ₹100,000 (10,000,000 paise)
      await db.run(`
        INSERT INTO wallets (id, user_id, balance_paise, wallet_type, is_sandbox) 
        VALUES (1, 1, 10000000, 'UPI', true)
      `);
      
      console.log('✅ Demo user and wallet seeded with ₹100,000');
    }

  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

// Helper function to convert rupees to paise
function rupeesToPaise(rupees) {
  return Math.round(rupees * 100);
}

// Helper function to convert paise to rupees
function paiseToRupees(paise) {
  return paise / 100;
}

// API Routes

// GET /wallet/1 - View wallet balance
app.get('/wallet/:id', async (req, res) => {
  try {
    const walletId = parseInt(req.params.id);
    
    const wallet = await db.get(`
      SELECT w.*, u.name as user_name, u.phone 
      FROM wallets w 
      JOIN users u ON w.user_id = u.id 
      WHERE w.id = ?
    `, [walletId]);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({
      wallet_id: wallet.id,
      user_name: wallet.user_name,
      phone: wallet.phone,
      balance_rupees: paiseToRupees(wallet.balance_paise),
      balance_paise: wallet.balance_paise,
      wallet_type: wallet.wallet_type,
      is_sandbox: wallet.is_sandbox,
      updated_at: wallet.updated_at
    });

  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /wallet/1/pay - Make a simulated payment
app.post('/wallet/:id/pay', async (req, res) => {
  try {
    const walletId = parseInt(req.params.id);
    const { to, amount_rupees, type, sandbox = true } = req.body;

    // Validation
    if (!to || !amount_rupees || !type) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, amount_rupees, type' 
      });
    }

    if (amount_rupees <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be positive' 
      });
    }

    const amountPaise = rupeesToPaise(amount_rupees);

    // Get current wallet balance
    const wallet = await db.get('SELECT balance_paise FROM wallets WHERE id = ?', [walletId]);
    
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (wallet.balance_paise < amountPaise) {
      return res.status(400).json({ 
        error: 'Insufficient balance',
        current_balance_rupees: paiseToRupees(wallet.balance_paise),
        required_amount_rupees: amount_rupees
      });
    }

    // Start transaction
    await db.run('BEGIN TRANSACTION');

    try {
      // Deduct amount from wallet
      const newBalance = wallet.balance_paise - amountPaise;
      await db.run(
        'UPDATE wallets SET balance_paise = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newBalance, walletId]
      );

      // Record transaction
      const result = await db.run(`
        INSERT INTO transactions (wallet_id, to_identifier, amount_paise, transaction_type, is_sandbox, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        walletId,
        to,
        amountPaise,
        type,
        sandbox ? 1 : 0,
        `${type} payment to ${to}`
      ]);

      await db.run('COMMIT');

      res.json({
        success: true,
        transaction_id: result.lastID,
        amount_rupees: amount_rupees,
        amount_paise: amountPaise,
        to: to,
        type: type,
        new_balance_rupees: paiseToRupees(newBalance),
        new_balance_paise: newBalance,
        is_sandbox: sandbox,
        timestamp: new Date().toISOString(),
        message: sandbox ? 'Sandbox payment completed successfully' : 'Payment completed successfully'
      });

    } catch (transactionError) {
      await db.run('ROLLBACK');
      throw transactionError;
    }

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// GET /wallet/1/transactions - List transaction history
app.get('/wallet/:id/transactions', async (req, res) => {
  try {
    const walletId = parseInt(req.params.id);
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const transactions = await db.all(`
      SELECT 
        id as transaction_id,
        to_identifier as recipient,
        amount_paise,
        (amount_paise / 100.0) as amount_rupees,
        transaction_type as type,
        is_sandbox,
        status,
        description,
        created_at
      FROM transactions 
      WHERE wallet_id = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `, [walletId, limit, offset]);

    const totalTransactions = await db.get(
      'SELECT COUNT(*) as count FROM transactions WHERE wallet_id = ?',
      [walletId]
    );

    res.json({
      wallet_id: walletId,
      transactions: transactions,
      pagination: {
        total: totalTransactions.count,
        limit: limit,
        offset: offset,
        has_more: (offset + limit) < totalTransactions.count
      }
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /twilio-webhook - Future SMS integration endpoint
app.post('/twilio-webhook', async (req, res) => {
  try {
    // This endpoint will be used for Twilio SMS webhooks in the future
    // For now, just log the incoming data
    console.log('Twilio webhook received:', req.body);
    
    // TODO: Implement SMS processing logic here
    // - Parse SMS for transaction details
    // - Update wallet balance if needed
    // - Store transaction record
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing Twilio webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'disconnected'
  });
});

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 FinanceAI Backend Server running on port ${PORT}`);
    console.log(`📊 Database: SQLite (db.sqlite)`);
    console.log(`💰 Demo wallet seeded with ₹100,000 (sandbox mode)`);
    console.log(`\n📋 API Endpoints:`);
    console.log(`   GET  /wallet/1           - View wallet balance`);
    console.log(`   POST /wallet/1/pay       - Make payment`);
    console.log(`   GET  /wallet/1/transactions - List transactions`);
    console.log(`   POST /twilio-webhook     - SMS webhook (future)`);
    console.log(`   GET  /health             - Health check`);
    console.log(`\n🔧 Example curl commands:`);
    console.log(`   curl -X GET <BASE>/wallet/1`);
    console.log(`   curl -X POST <BASE>/wallet/1/pay -H "Content-Type: application/json" -d '{"to":"9876543210","amount_rupees":500,"type":"bill","sandbox":true}'`);
    console.log(`   curl -X GET <BASE>/wallet/1/transactions`);
  });
}

startServer().catch(console.error);