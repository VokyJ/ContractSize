document.getElementById('calculate').addEventListener('click', function() {
    const accountBalance = parseFloat(document.getElementById('account-balance').value);
    const riskPercentage = parseFloat(document.getElementById('risk-percentage').value);
    const stopLoss = parseFloat(document.getElementById('stop-loss').value);
    const contractType = document.getElementById('contract-type').value;

    if (isNaN(accountBalance) || isNaN(riskPercentage) || isNaN(stopLoss)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    const contractDetails = {
        'nq-emini': { tickValue: 5, tickSize: 0.25 },
        'nq-micro': { tickValue: 0.5, tickSize: 0.25 },
        'es-emini': { tickValue: 12.5, tickSize: 0.25 },
        'es-micro': { tickValue: 1.25, tickSize: 0.25 },
        'ym-emini': { tickValue: 5, tickSize: 1 },
        'ym-micro': { tickValue: 0.5, tickSize: 1 }
    };

    const selectedContract = contractDetails[contractType];
    const riskAmount = (accountBalance * (riskPercentage / 100)).toFixed(2);
    const riskPerContract = (stopLoss * selectedContract.tickValue).toFixed(2);
    const positionSize = Math.floor(riskAmount / riskPerContract);
    const marginRequired = (positionSize * selectedContract.tickValue * stopLoss).toFixed(2);

    document.getElementById('result').innerHTML = `
        <p>Risk Amount: $${riskAmount}</p>
        <p>Risk per Contract: $${riskPerContract}</p>
        <p>Position Size: ${positionSize} contracts</p>
        <p>Margin Required: $${marginRequired}</p>
    `;
});