let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {

    const description =
        document.getElementById("description").value;

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveTransactions();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
}

function deleteTransaction(id) {

    transactions =
        transactions.filter(transaction => transaction.id !== id);

    saveTransactions();

    displayTransactions();
}

function displayTransactions() {

    const list =
        document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        const li = document.createElement("li");

        li.classList.add(
            "transaction",
            transaction.type
        );

        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>
                ${transaction.type === "income" ? "+" : "-"}
                ₹${transaction.amount}
                <button onclick="deleteTransaction(${transaction.id})"
                style="width:auto; margin:0 0 0 10px;">
                Delete
                </button>
            </span>
        `;

        list.appendChild(li);

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income - expense;

    document.getElementById("income").innerText =
        `₹${income}`;

    document.getElementById("expense").innerText =
        `₹${expense}`;

    document.getElementById("balance").innerText =
        `₹${balance}`;
}

function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

displayTransactions();
