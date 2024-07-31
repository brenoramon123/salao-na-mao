const { createBankAccount, createRecipient } = require('./pagarme');

// Dados da conta bancária de exemplo
const bankAccountData = {
    bank_code: '341', // Código do banco (Itaú)
    agencia: '0932',
    agencia_dv: '5', // Se não houver dígito verificador, remova esta linha
    conta: '58054',
    conta_dv: '1',
    document_number: '26224451990', // CPF/CNPJ do titular da conta
    legal_name: 'Tony Stark', // Nome do titular da conta
    type: 'conta_corrente' // Tipo da conta (conta_corrente ou conta_poupanca)
  };

// Dados do recebedor de exemplo (sem bank_account_id)
const recipientDataTemplate = {
    code: '1234',
    register_information: {
      email: 'tstark@avengers.com',
      document_number: '26224451990', // Adicionando document_number aqui
      type: 'individual',
      site_url: 'https://sitedorecebedor.com.br',
      phone_numbers: [{ ddd: '21', number: '994647568', type: 'mobile' }],
      name: 'Recebedor Pessoa Fisica',
      mother_name: 'Nome da mae',
      birthdate: '12/10/1995', // Formato DD/MM/YYYY
      monthly_income: "120000", // Garantir que é um número
      professional_occupation: 'Vendedor',
      address: {
        street: 'Av. General Justo',
        complementary: 'Bloco A',
        street_number: '375',
        neighborhood: 'Centro',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipcode: '20021130',
        reference_point: 'Ao lado da banca de jornal'
      }
    },
  transfer_settings: { transfer_enabled: false, transfer_interval: 'daily', transfer_day: 0 },
  automatic_anticipation_settings: { enabled: true, type: 'full', volume_percentage: '50', delay: null }
};

const main = async () => {
  try {
    // Criar conta bancária
    const bankAccount = await createBankAccount(bankAccountData);
    const bankAccountId = bankAccount.id;

    // Criar recebedor com o ID da conta bancária
    const recipientData = {
      ...recipientDataTemplate,
      bank_account_id: bankAccountId // Adicionar bank_account_id aqui
    };

    const recipient = await createRecipient(recipientData);
    console.log('Recipient created:', recipient);
  } catch (error) {
    console.error('Error in main flow:', error);
  }
};

main();
