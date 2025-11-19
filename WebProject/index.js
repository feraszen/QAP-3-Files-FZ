// Desc: Project 4 - Lawncare Invoice Generator 
// Author: FERAS ZEN
// Dates: NOV 18, 2025

var $ = function (id) {
  return document.getElementById(id);
};

// Format currency
const cur2Format = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Format decimals
const com2Format = new Intl.NumberFormat("en-CA", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Format property size (no decimals)
const sizeFormat = new Intl.NumberFormat("en-CA", {
  maximumFractionDigits: 0,
});

// Program constants
const BORDER_PERCENT = 0.04;
const BORDER_RATE = 0.28;
const LAWN_PERCENT = 0.95;
const LAWN_RATE = 0.04;
const FERT_RATE = 0.03;
const HST_RATE = 0.15;
const ENV_TAX_RATE = 0.014;

// ----------------------------
// START MAIN PROGRAM
// ----------------------------

// Inputs
var custName = prompt("Enter Customer Name:");
var custAddress = prompt("Enter Street Address:");
var custCity = prompt("Enter City:");
var custPhone = prompt("Enter Phone Number (999-999-9999):");
var propSize = prompt("Enter Property size (sq ft):");

// ----------------------------
// FIX #1 — Validate Phone Format
// ----------------------------
var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
if (!phonePattern.test(custPhone)) {
    alert("Phone number must be in the format 999-999-9999.");
    location.reload();
}

// ----------------------------
// FIX #2 — Validate Property Size
// ----------------------------
propSize = parseFloat(propSize);
if (isNaN(propSize) || propSize <= 0) {
    alert("Invalid property size. Please enter a positive number.");
    location.reload();
}

// ----------------------------
// Calculations
// ----------------------------
var borderSqFt = propSize * BORDER_PERCENT;
var borderCost = borderSqFt * BORDER_RATE;

var lawnSqFt = propSize * LAWN_PERCENT;
var lawnCost = lawnSqFt * LAWN_RATE;

var fertCost = propSize * FERT_RATE;

var totalCharges = borderCost + lawnCost + fertCost;

var hstAmount = totalCharges * HST_RATE;
var envTaxAmount = totalCharges * ENV_TAX_RATE;

var invoiceTotal = totalCharges + hstAmount + envTaxAmount;

// ----------------------------
// Output (with FIX #3 & FIX #4 applied)
// ----------------------------
var myOutput = `
  <div style="font-family: sans-serif; color: #333; margin: 5px; padding: 5px;">
    
    <div style="background-color: #ffc000; padding: 20px; border-bottom: 1px solid black; text-align: center;">
        <h4 style="margin: 0; font-weight: bold; font-size: 1.3em;">Mo's Lawncare Services - Customer Invoice</h4>
    </div>

    <div style="padding: 5px;">
        <p style="margin-bottom: 3px; font-weight: bold; font-size: 1.15em;">Customer details:</p>
        
        <div style="margin-left: 10px; margin-bottom: 8px; line-height: 1.4; font-size: 1.1em;">
            ${custName}<br>
            ${custAddress}<br>
            ${custCity} ${custPhone}
        </div>

        <p style="margin-bottom: 8px; font-weight: bold; font-size: 1.15em;">
            Property size (in sq ft): 
            <span style="font-weight: normal;">${sizeFormat.format(propSize)}</span>
        </p>

        <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
            
            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Border cost:</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; width: 35%; font-size: 1.1em;">
                    ${cur2Format.format(borderCost)}
                </td>
            </tr>

            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Mowing cost:</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; font-size: 1.1em;">
                    ${cur2Format.format(lawnCost)}
                </td>
            </tr>

            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Fertilizer cost:</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; font-size: 1.1em;">
                    ${cur2Format.format(fertCost)}
                </td>
            </tr>

            <tr><td colspan="2" style="border: 1px solid black; background-color: #f7f7f7;">&nbsp;</td></tr>

            <tr style="font-weight: bold;">
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Total charges:</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; font-size: 1.1em;">
                    ${cur2Format.format(totalCharges)}
                </td>
            </tr>

            <tr><td colspan="2" style="border: 1px solid black; background-color: #f7f7f7;">&nbsp;</td></tr>

            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Sales tax (HST):</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; font-size: 1.1em;">
                    ${cur2Format.format(hstAmount)}
                </td>
            </tr>

            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Environmental tax:</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; font-size: 1.1em;">
                    ${cur2Format.format(envTaxAmount)}
                </td>
            </tr>

            <tr><td colspan="2" style="border: 1px solid black; background-color: #f7f7f7;">&nbsp;</td></tr>

            <tr style="font-weight: bold; background-color: #e5e5e5;">
                <td style="border: 1px solid black; padding: 5px; font-size: 1.1em;">Invoice total:</td>
                <td style="border: 1px solid black; padding: 5px; text-align: right; font-size: 1.1em;">
                    ${cur2Format.format(invoiceTotal)}
                </td>
            </tr>
        </table>
    </div>

    <div style="background-color: #ffc000; padding: 20px; border-top: 1px solid black; text-align: center;">
        <h4 style="margin: 0; font-weight: bold; font-size: 1.3em;">Turning Lawns into Landscapes</h4>
    </div>

  </div>
`;

document.write(myOutput);


