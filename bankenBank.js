var inquirer = require("inquirer");
const cTable = require('console.table');

var accounts = [
    {   
        'Bank_Name': 'Banken',
        'accountName':'Vinit',
        'accountNumber': 1234567,
        'accountBalance': 5000,
        'transactionLog': []
    },
    {
        'Bank_Name': 'Banken',
        'accountName':'John',
        'accountNumber': 2345678,
        'accountBalance': 15000,
        'transactionLog': []
    }
]

var banks = [
    {
        'bank_Name': 'Bank of America',
        'accounts': [
            {
                'accountName': 'Mike',
                'accountNumber': 1234567,
                'accountBalance': 5000,
                'transactionLog': []
            },
            {
                'accountName': 'Will',
                'accountNumber': 2345678,
                'accountBalance': 8000,
                'transactionLog': []
            },
        ]
    },

    {
        'bank_Name':'Chase Bank',
        'accounts':[
            {
                'accountName': 'Chris',
                'accountNumber': 3456789,
                'accountBalance': 10000.56,
                'transactionLog': []
            },
            {
                'accountName': 'Shane',
                'accountNumber': 2345670,
                'accountBalance': 300.89,
                'transactionLog': []
            },
        ],
    },

    {
        'bank_Name': 'TD Bank',
        'accounts':[
            {
                'accountName': 'Kristine',
                'accountNumber': 3456712,
                'accountBalance': 50000.45,
                'transactionLog': []
            },
            {
                'accountName': 'Amanda',
                'accountNumber': 5671234,
                'accountBalance': 34000.52,
                'transactionLog': []
            },
        ]
    }
]


bankenBank();

//************* Main bamazon function *******************/
function bankenBank(){
    inquirer.prompt([
        {
        message: "Select the option from the menu",
        name: "menu",
        type: "rawlist",
        choices:[
            "Make Transfer to another account",
            "Make transfer to another bank account",
            "Receive account transfer from another bank",
            "See transaction log",
            "Check the account balance",
            "Get all the bank's account"
        ]
        }
    ]).then(function(answer){
        console.log(answer.menu);
        var menuChoice = answer.menu;

        switch(menuChoice){
        case "Make Transfer to another account":
            transferToAccount();
            break;
        
        case "Make transfer to another bank account":
            transferToAnotherBank();
            break;
        
        case "Receive account transfer from another bank":
            receiveTransfer();
            break;

        case "See transaction log":
            transLog();
            break;

        case "Check the account balance":
            checkBalance();
            break;

        case "Get all the bank's account":
            getBankAcc();
            break;
        }
    })        
}

//*************** transferToAccount function to display over all sale ****************/
function transferToAccount(){
    // console.log('making transfer to another account');
    let accountOption = [];
    for(let i = 0; i<accounts.length; i++){
        accountOption.push(accounts[i].accountName);
    };

    inquirer.prompt([
        {
          message: "Select the account transfering from",
          name: "transferFrom",
          type: "rawlist",
          choices: function(){                      
              return accountOption;
          }
        },
        {
            message: "Select the account transfering to",
            name: "transferTo",
            type: "rawlist",
            choices: function(){
                return accountOption;
            }
        },
        {
            message: "Enter the amount transfering: ",
            name: "transferAmount",
            type: "number",
            validate: function(input){
                if(input > 0){
                    return true;
                }else{
                    return 'Please enter a value greater than 0';
                }
            }
        }

    ]).then(function(answer){
        // console.log(answer.transferFrom);
        // console.log(answer.transferTo);
        // console.log(answer.transferAmount);

        for(let j = 0; j < accounts.length; j++){
            if(answer.transferTo === accounts[j].accountName){
                // console.log('To: ',answer.transferTo,' amount: ',accounts[j].accountBalance)
                accounts[j].accountBalance += answer.transferAmount;
                // console.log('To: ',answer.transferTo,' amount: ',accounts[j].accountBalance );
                accounts[j].transactionLog.push({
                    Transfer_From_Account: answer.transferFrom,
                    Transfer_To_Account: answer.transferTo,
                    Transfer_Amount: answer.transferAmount,
                    Account_Balance: accounts[j].accountBalance
                })
                // console.table(accounts[j].transactionLog);
            }

            if(answer.transferFrom === accounts[j].accountName){
                // console.log('From: ',answer.transferFrom,' amount: ',accounts[j].accountBalance)
                accounts[j].accountBalance -= answer.transferAmount;
                // console.log('From: ',answer.transferFrom,' amount: ',accounts[j].accountBalance);
                accounts[j].transactionLog.push({
                    Transfer_From_Account: answer.transferFrom,
                    Transfer_To_Account: answer.transferTo,
                    Transfer_Amount: answer.transferAmount,
                    Account_Balance: accounts[j].accountBalance
                })
                // console.table(accounts[j].transactionLog);
            }

        }
        newTransfer();
      })
}

function newTransfer(){
    inquirer.prompt([
        {
            message: "Would you like to make another transaction?",
            type: "rawlist",
            name: "newOrder",
            choices:["Yes", "No"]
        }
    ]).then(function(response){
        if(response.newOrder === "Yes"){
            bankenBank(); //If the response is Yes then calls the Bamazon function
        }else{
            return;
        }
    })
}

//*********** transferToAnotherBank function to display any product whose stock is less than 5 ************/
function transferToAnotherBank(){
   let bankList = []
   let bankAccounts = []
    for(let i=0; i<banks.length; i++){
        // console.log(banks[i].bank_Name);
        bankList.push(banks[i].bank_Name);
    };

    inquirer.prompt([
        {
          message: "Select the bank you would like to make transfer to",
          name: "bank",
          type: "rawlist",
          choices: function(){                      
              return bankList;
          }
        },
        {
            message: "Enter the account number transfering from: ",
            name: "accountNumFrom",
            type: "number",
            validate: function(input){
                let validAccFrom = false;
                for(let j=0; j<accounts.length; j++){
                    if(accounts[j].accountNumber === input){
                        validAccFrom = true;
                    }
                }
                
                if(validAccFrom === true){
                    return true;
                }else{
                    return 'Please enter a valid account';
                }
            }
        },
        {
            message: "Enter the account number transfering to: ",
            name: "accountNumTo",
            type: "number",
            validate: function(input){
                let validAccTo = false;
                for(let j=0; j<banks.length; j++){
                    banks[j].accounts.forEach(function(details){
                        if(details.accountNumber === input){
                            validAccTo = true;
                        }
                    });
                }
                
                if(validAccTo === true){
                    return true;
                }else{
                    return 'Please enter a valid account';
                }
            }
        },
        {
            message: "Enter the amount transfering: ",
            name: "diffBankTransfer",
            type: "number",
            validate: function(input){
                if(input > 0){
                    return true;
                }else{
                    return 'Please enter a value greater than 0';
                }
            }
        }

    ]).then(function(answer){
        // console.log(answer.bank);
        // console.log(answer.accountNumFrom)
        // console.log(answer.accountNumTo)
        // console.log(answer.diffBankTransfer);

        for(let j = 0; j < accounts.length; j++){
            if(answer.accountNumFrom === accounts[j].accountNumber){
                // console.log('From: ',accounts[j].accountName,' amount: ',accounts[j].accountBalance)
                accounts[j].accountBalance -= answer.diffBankTransfer;
                // console.log('From: ',accounts[j].accountName,' amount: ',accounts[j].accountBalance );
                accounts[j].transactionLog.push({
                    Transfer_From_Account: answer.accountNumFrom,
                    Transfer_To_Account: answer.accountNumTo,
                    Transfer_Amount: answer.diffBankTransfer,
                    Account_Balance: accounts[j].accountBalance
                })
                // console.table(accounts[j].transactionLog);
            }
        }

        for(let k=0; k<banks.length;k++){
            banks[k].accounts.forEach(function(acc){
                if(answer.accountNumTo === acc.accountNumber){
                    // console.log('To: ',acc.accountName,' amount: ',acc.accountBalance)
                    acc.accountBalance += answer.diffBankTransfer;
                    // console.log('From: ',acc.accountName,' amount: ',acc.accountBalance);
                    acc.transactionLog.push({
                        Transfer_From_Account: answer.accountNumFrom,
                        Transfer_To_Account: answer.accountNumTo,
                        Transfer_Amount: answer.diffBankTransfer,
                        Account_Balance: acc.accountBalance
                    })
                    // console.table(acc.transactionLog);
                }
            })
        }
        newTransfer();
    })
}

//*********** Function to add stock quantity to the inventory **************/
function receiveTransfer(){
    inquirer.prompt([
        {
           name: "seeTrans",
           type: "rawlist",
           message: "Would you like to see the money transferred from another account?",
           choices:["Yes", "No"]
        }
    ]).then(function(result){
        if(result.seeTrans === "Yes"){

                inquirer.prompt([
                    {
                        name: "Inv",
                        type: "list",
                        message: "Choose the bank where the money was transfered to",
                        choices: function(){
                            var bankOption = [];
                            for(let i=0; i<banks.length; i++){
                                // console.log(banks[i].bank_Name);
                                bankOption.push(banks[i].bank_Name);
                            };
                            return (bankOption);
                        }
                    },
                    {
                        message: "Enter the account number of the account money was received to: ",
                        name: "accountNumTo",
                        type: "number",
                        validate: function(input){
                            let validAccTo = false;
                            for(let j=0; j<banks.length; j++){
                                banks[j].accounts.forEach(function(details){
                                    if(details.accountNumber === input){
                                        validAccTo = true;
                                    }
                                });
                            }
                            
                            if(validAccTo === true){
                                return true;
                            }else{
                                return 'Please enter a valid account';
                            }
                        }
                    }
                ]).then(function(answer){
                    console.log("\n-----------------------------------------------------------\n");
                    // console.log(answer);
                    for(let k=0; k<banks.length;k++){
                        banks[k].accounts.forEach(function(acc){
                            if(answer.accountNumTo === acc.accountNumber){
                                // console.log('To: ',acc.accountName,' amount: ',acc.accountBalance)
                                // acc.accountBalance += answer.diffBankTransfer;
                                // // console.log('From: ',acc.accountName,' amount: ',acc.accountBalance);
                                // acc.transactionLog.push({
                                //     Transfer_From_Account: answer.accountNumFrom,
                                //     Transfer_To_Account: answer.accountNumTo,
                                //     Transfer_Amount: answer.diffBankTransfer,
                                //     Account_Balance: acc.accountBalance
                                // })
                                console.table(acc.transactionLog);
                            }
                        })
                    }
                    console.log("-----------------------------------------------------------\n");

                    newTransfer();
                })

                function updateInv(answer){
                    for(var j=0; j<result.length; j++){
                        if(answer.Inv === result[j].product_name){
                            var Inv = answer.Inv;
                            var InvQuantity = parseInt(answer.InvResponse);
                            var currentInv = parseInt(result[j].stock_quantity);
                            var invName = result[j].product_name;
                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    stock_quantity: currentInv+InvQuantity
                                },
                                {
                                    product_name: invName
                                }
                            ]);
                        }
                    }
                }
        }else{
            console.log("\n-----------------------------------------------------------\n");
            bankenBank();
        }
    })
}

//************ Function to add a new product to the databse ******************/
function transLog(){
    inquirer.prompt([
        {
            name: "accTrans",
            type: "number",
            message: "Enter the account number to retreive the transaction log:",
            validate: function(input){
                let validAccFrom = false;
                for(let j=0; j<accounts.length; j++){
                    if(accounts[j].accountNumber === input){
                        validAccFrom = true;
                    }
                }
                
                if(validAccFrom === true){
                    return true;
                }else{
                    return 'Please enter a valid account';
                }
            }
        }
    ]).then(function(result){
        // console.log(result);
        accounts.forEach(function(acc){
            // console.log(acc.accountNumber);
            if(result.accTrans === acc.accountNumber){
                console.log('\n--------------------------------------------------------------------------------\n');
                console.table(acc.transactionLog);
                console.log('--------------------------------------------------------------------------------\n');
            }
        })

        newTransfer();
    })
}

//************ new product function  *******************/
function checkBalance(){
    inquirer.prompt([
        {
            message: 'Enter the account number: ',
            name: 'checkBal',
            type: 'number',
            validate: function(input){
                if(Number.isNaN(input)){
                    return 'Please enter a number';
                }else{
                    return true;
                }
            }
        }
    ]).then(function(result){
        accounts.forEach(function(account){
            if(result.checkBal === account.accountNumber){
                console.log('\n--------------------------------------------------------------------------------\n');
                console.table({
                    'Account_Name': account.accountName,
                    'Account_Balance': account.accountBalance
                });
                console.log('--------------------------------------------------------------------------------\n');
            }
        });

        newTransfer();
    })
}

function getBankAcc(){
    var bankAccounts = []
    // inquirer.prompt([
    //     {
    //         message: 'Enter the account number: ',
    //         name: 'bankAcc',
    //         type: 'number',
    //         validate: function(input){
    //             if(Number.isNaN(input)){
    //                 return 'Please enter a number';
    //             }else{
    //                 return true;
    //             }
    //         }
    //     }
    // ]).then(function(result){
        accounts.forEach(function(account){
            bankAccounts.push({
                Bank_Name: account.Bank_Name,
                Account_Name: account.accountName,
                Account_Number: account.accountNumber,
                Account_Balance: account.accountBalance
            });
        });

        console.log('\n--------------------------------------------------------------------------------\n');
        console.table(bankAccounts);
        console.log('--------------------------------------------------------------------------------\n');

        newTransfer();
    // })
}