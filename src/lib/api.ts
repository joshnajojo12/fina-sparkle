// API service for backend integration
const API_BASE_URL = 'http://localhost:3001';

export interface WalletData {
  wallet_id: number;
  user_name: string;
  phone: string;
  balance_rupees: number;
  balance_paise: number;
  wallet_type: string;
  is_sandbox: boolean;
  updated_at: string;
}

export interface Transaction {
  transaction_id: number;
  recipient: string;
  amount_paise: number;
  amount_rupees: number;
  type: string;
  is_sandbox: boolean;
  status: string;
  description: string;
  created_at: string;
}

export interface TransactionHistory {
  wallet_id: number;
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface PaymentRequest {
  to: string;
  amount_rupees: number;
  type: string;
  sandbox?: boolean;
}

export interface PaymentResponse {
  success: boolean;
  transaction_id: number;
  amount_rupees: number;
  amount_paise: number;
  to: string;
  type: string;
  new_balance_rupees: number;
  new_balance_paise: number;
  is_sandbox: boolean;
  timestamp: string;
  message: string;
}

export interface ExpenseRequest {
  description: string;
  amount_rupees: number;
  category?: string;
  sandbox?: boolean;
}

export interface ExpenseResponse {
  success: boolean;
  transaction_id: number;
  description: string;
  amount_rupees: number;
  amount_paise: number;
  category: string;
  new_balance_rupees: number;
  new_balance_paise: number;
  is_sandbox: boolean;
  timestamp: string;
  message: string;
}

// API functions
export const api = {
  // Get wallet balance and details
  async getWallet(): Promise<WalletData> {
    const response = await fetch(`${API_BASE_URL}/wallet/1`);
    if (!response.ok) {
      throw new Error('Failed to fetch wallet data');
    }
    return response.json();
  },

  // Make a payment
  async makePayment(payment: PaymentRequest): Promise<PaymentResponse> {
    const response = await fetch(`${API_BASE_URL}/wallet/1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payment,
        sandbox: true, // Keep it in sandbox mode
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Payment failed');
    }
    
    return response.json();
  },

  // Add personal expense (Bali trip, laptop, bills, etc.)
  async addExpense(expense: ExpenseRequest): Promise<ExpenseResponse> {
    const response = await fetch(`${API_BASE_URL}/wallet/1/expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...expense,
        sandbox: true, // Keep it in sandbox mode
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add expense');
    }
    
    return response.json();
  },

  // Reset wallet to ₹1,00,000
  async resetWallet(): Promise<{ success: boolean; message: string; balance_rupees: number }> {
    const response = await fetch(`${API_BASE_URL}/wallet/1/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to reset wallet');
    }
    
    return response.json();
  },

  // Get transaction history
  async getTransactions(limit = 20, offset = 0): Promise<TransactionHistory> {
    const response = await fetch(`${API_BASE_URL}/wallet/1/transactions?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  },

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; database: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  },
};