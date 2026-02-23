// Função para adicionar um novo contato
function addContact() {
    // Obtendo os valores dos campos
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
  
    if (name && email && phone) {
      // Criando o objeto de contato
      const contact = {
        name: name,
        email: email,
        phone: phone
      };
  
      // Obtendo os contatos do localStorage
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
      // Adicionando o novo contato
      contacts.push(contact);
  
      // Salvando os contatos de volta no localStorage
      localStorage.setItem('contacts', JSON.stringify(contacts));
  
      // Atualizando a tabela e o contador de contatos
      updateContactsTable();
      updateContactCount();
  
      // Limpando os campos de entrada
      document.getElementById('nameInput').value = '';
      document.getElementById('emailInput').value = '';
      document.getElementById('phoneInput').value = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
  
  // Função para atualizar a tabela de contatos
  function updateContactsTable() {
    // Obtendo os contatos do localStorage
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
    // Obtendo o corpo da tabela
    const tbody = document.querySelector('#contactTable tbody');
    tbody.innerHTML = '';
  
    // Preenchendo a tabela com os contatos
    contacts.forEach((contact, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>
          <button class="edit" onclick="editContact(${index})">Editar</button>
          <button class="delete" onclick="deleteContact(${index})">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Função para editar um contato
  function editContact(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
  
    // Preenchendo os campos com os dados do contato
    document.getElementById('nameInput').value = contact.name;
    document.getElementById('emailInput').value = contact.email;
    document.getElementById('phoneInput').value = contact.phone;
  
    // Remover o contato antigo (será substituído)
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  
    // Atualizando a tabela e o contador de contatos
    updateContactsTable();
    updateContactCount();
  }
  
  // Função para excluir um contato
  function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  
    // Remover o contato do array
    contacts.splice(index, 1);
  
    // Salvando os contatos atualizados
    localStorage.setItem('contacts', JSON.stringify(contacts));
  
    // Atualizando a tabela e o contador de contatos
    updateContactsTable();
    updateContactCount();
  }
  
  // Função para atualizar o contador de contatos
  function updateContactCount() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    document.getElementById('contactCount').innerText = contacts.length;
  }
  
  // Função para filtrar os contatos
  function filterContacts() {
    const filter = document.getElementById('filterInput').value.toLowerCase();
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  
    // Atualizando a tabela com os contatos filtrados
    const tbody = document.querySelector('#contactTable tbody');
    tbody.innerHTML = '';
  
    filteredContacts.forEach((contact, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>
          <button class="edit" onclick="editContact(${index})">Editar</button>
          <button class="delete" onclick="deleteContact(${index})">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Inicializando a tabela e o contador de contatos ao carregar a página
  document.addEventListener('DOMContentLoaded', () => {
    updateContactsTable();
    updateContactCount();
  });
  