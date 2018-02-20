pragma solidity ^0.4.4;
contract SupplyChain {

mapping(address=>uint)  public Supplier;  //Two accounts for supplier
mapping(address=> uint) public Thermometer; //Three account for transit thermometer
address public Distributor; // One account for distributor
 address public ColdStorageVehicle; // One account for cold storage vehicle

mapping(address=>uint)  public Retailer; // Two account for retailer

uint public CurrentTemperature, Rate, Qty, ShippingCharges;
uint public decInTemp,totaldecr;


Supplier[0x3704b7fde360605b65b09f88114ca762c16f0358]=100;
Supplier[0xb76461840d2be572aefd5c748278de66401898cc]=100;

//Constructor
 function SupplyChain()
{
CurrentTemperature =100; //temperatureaddress
Rate=0; //rateaddress
Qty=0;  //qtyaddress
ShippingCharges=0; //shippingaddress
}


function addConsignment(address distradd address Supplieradd,address ColdStorageVehicleadd,uint temp, uint newqty, uint newRate, uint newShippingCharges)
{

    Distributor=distradd; //distributoraddress
   // Supplier[Supplieradd]=newqty*newRate;
   ColdStorageVehcile=ColdStorageVehicleadd;
    CurrentTemperature=temp;
	Rate= newRate;
	Qty= newqty;
	ShippingCharges=newShippingCharges;

}

function setTemperature(address ColdStorage,uint decrtemp)
{
    decInTemp=decrtemp;
    totaldecr=CurrentTemperature-decInTemp;
	uint curr=ColdStorageVehicle[ColdStorage];
	ColdStorageVehicle[ColdStorage]=curr-decrtemp;
}

function RecordTemperature(address therm, address Coldstorage)
{
	Thermometer[therm]=totaldecr;
	ColdStorageVehicle[Coldstorage]=totaldecr;
	totaldecr=totaldecr-decInTemp;
}


}
