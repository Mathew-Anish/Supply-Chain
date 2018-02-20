import "../stylesheets/app.css";
// Import libraries we need.
import {
    default as Web3
} from 'web3';
import {
    default as contract
} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import conference_artifacts from '../../build/contracts/SupplyChain.json'

var SupplyChain = contract(SupplyChain_artifacts);
var accounts, Distributor,Supplier,CurrentTemperature, Rate, Qty, ShippingCharges;


window.App ={}
  start:function() {
    var self=this;

    web3.eth.getAccounts(function(err,accs)
{
	 if(err!=null)
	 {
	 alert("There was an error fetchig your accounts");
	 return;
	 }
	 if(accs.length==0)
	 {
	 alert("Couldn't get any accounts! Make sure your etherium client is configured correctly");
	 return;
	 }
	 accounts=accs;
	 //console.log(accounts);
	 account=accounts[0];
	 Distributor =account[9];

	 self.initializeConference();
});
  },

  initializeSupplyChain :function() {
  var self = this;
  SupplyChain.deployed.then(function(instance)
  {
     SupplyChain=instance;
     self.checkValues();
  }).catch(function(e)
  {
     console.log(e);
  });
  },

checkValues: function()
{
	SupplyChain.deployed().then(function(instance)
	{
	SupplyChain=instance;
	conference.Distributor.call().then(
	function(Distributor)
	{
	  $("input#distributoraddress").val(Distributor);
	  return SupplyChain.supplieraddress.call();
	}).then(function(Supplier)
	{
	  $("input#distributoraddress").val(Distributor);
	  return SupplyChain.Temp.call();
	}).then(
	function(CurrentTemperature){
	//constole.log("current temp" +CurrentTemperature);
	$("input#temperatureaddress").val(CurrentTemperature);
	 return SupplyChain.Qty.call();
	}).then(
	function(Qty)
	{
	$("input#qtyaddress").val(Qty);
	return SupplyChain.Rate.call();
	}).then(
	function(Rate)
	{
	$("input#rateaddress").val(Rate);
	return SupplyChain.ShippingCharges.call();

}). then(
function(ShippingCharges)
{
	$("input#shippingaddress").val(ShippingCharges);
});
}).catch(function(e))
{
	console.log(e);
});
},


addConsignment: function(distributoraddress,supplieraddress,temperatureaddress,qtyaddress,rateaddress,shippingaddress )
{
	var supplyChain;
	SupplyChain.deployed().then(function(instance)
	{
	   supplychain=instance;
	   supplychain.addConsignment(distributoraddress,supplieraddress,temperatureaddress,qtyaddress,rateaddress,shippingaddress,{
	   from: account[5];
	   }).then(
	   function() {
	   return supplyChain.Distributor.call();
	}).then(
	function(Distributor)
	{
	  return supplyChain.CurrentTemperature.call();
	}).then(
	function(CurrentTemperature)
	{
	return supplyChain.Qty.call();
	}).then(
	function(Qty)
	{
	return supplyChain.Rate.call();
	}).then(
	function(Rate)
	{
	return supplyChain.ShippingCharges.call();
	});
 

}).catch(function(e){
	console.log(e);
})
}


window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    Conference.setProvider(web3.currentProvider);
    App.start();

    // Wire up the UI elements
    $("#addConsignment").click(function() {
        var val1 = $("#Distributor").val();
        var val2 = $("#Supplier").val();
        var val3 = $("#CurrentTemperature").val();
        var val4 = $("#Qty").val();
        var val5 = $("#Rate").val();
        var val6 = $("#ShippingCharges").val();


        App.addConsignment();
    });
});