const { faker } = require('@faker-js/faker');

//destination addresses
const addressesList = faker.helpers.uniqueArray(faker.finance.ethereumAddress, 15);
//source address
const sourceETHAddress = faker.finance.ethereumAddress();

//dynamic balance value
let balance = 1000000;

function getAddresses() {
    console.log('getAddresses module called:');
    console.log(addressesList);
    return { addressesList, sourceETHAddress};
}

function getBalance(accountAddress) {
    console.log(`getBalance module called...\naccount: ${accountAddress} balance: ${balance}`);
    return { accountAddress, balance };
}

//allows to update wallet balance when new transaction is added
function updateBalance(amount) {
    balance = balance - amount;
}

module.exports = {
    getAddresses,
    getBalance, 
    updateBalance  
};