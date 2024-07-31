const pagarme = require('pagarme');
const api_key = require("../data/keys.json").api_key;

let clientInstance;

const connectPagarme = async () => {
  if (!clientInstance) {
    try {
      clientInstance = await pagarme.client.connect({ api_key });
      console.log('Pagar.me client connected');
    } catch (error) {
      console.error('Failed to connect to Pagar.me', error);
      throw error;
    }
  }
  return clientInstance;
};

const createBankAccount = async (bankAccountData) => {
  try {
    const client = await connectPagarme();
    const bankAccount = await client.bankAccounts.create(bankAccountData);
    console.log('Bank account created successfully:', bankAccount);
    return bankAccount;
  } catch (error) {
    console.error('Error creating bank account:', error.response ? error.response.errors : error);
    throw error;
  }
};

const createRecipient = async (recipientData) => {
  try {
    const client = await connectPagarme();
    const recipient = await client.recipients.create(recipientData);
    console.log('Recipient created successfully:', recipient);
    return recipient;
  } catch (error) {
    console.error('Error creating recipient:', error.response ? error.response.errors : error);
    throw error;
  }
};

module.exports = { createBankAccount, createRecipient };
