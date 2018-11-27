$(function() {
    const electionABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userString",
				"type": "string"
			}
		],
		"name": "setCandidate",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "candidate",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCandidate",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

    window.addEventListener('load', async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await ethereum.enable();
                web3.eth.defaultAccount = web3.eth.accounts[0];
                console.log('Using Metamask')
                ElectionContract = new web3.eth.Contract(electionABI, '0xb0c256d825e4aeed2398d53334b6185435ca9cb2');
                console.log('Connected to contract')
            } catch (error) {
                console.log('Error: ', error);
            }
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!' );
        }
    })

    function getUserInfo() {
        return ethereum.enable();
    }

    $('#get').click(function() {
        ElectionContract.methods.getCandidate().call().then(data => {
            console.log(data);
        })
    });
    $('#set').click(function() {
        ElectionContract.methods.setCandidate('FATHERMAN').call({
            from: web3.eth.accounts[0],
            gas:1000000,
            value: 10000000000000000
        })
        .then(data => {
            console.log(data);
        })
        .catch(e => {
            console.log(e)
        })
    });
});