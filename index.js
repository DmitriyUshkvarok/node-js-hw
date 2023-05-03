const db = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'allContacts':
      const allContacts = await db.listContacts();
      return console.log(allContacts);

    case 'getContacts':
      const getContacts = await db.getContactById(id);
      return console.log(getContacts);

    case 'addContacts':
      const addContacts = await db.addContact(name, email, phone);
      return console.log(addContacts);

    case 'remove':
      const removeContacts = await db.removeContact(id);
      return console.log(removeContacts);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
