const headerHTML=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
      Swasha Email
    </title>
    <style>
      .email-container{
        max-width: 600px;
        background-color: #f9f9f9;
        margin: auto;
        letter-spacing: 0px;
        color: #202020;
        border-right: 2px solid #bcbcbc;
        border-left: 2px solid #bcbcbc;
      }
      .email-header{
        background: linear-gradient(133.71deg, #003C7A, #1270D1);
        height: 150px;
        text-align: center;
        width: 100%
      }
      .swasha-logo{
        height: 60px;
        width: auto;
      }
      .email-body{
        min-height: 380px;
        display: table;
        margin: 20px;
      }
      .email-innerbody{
        display: table-cell;
        vertical-align:middle;
        font: normal normal normal 16px Open Sans;
      }
      .email-footer{
        background-color: #003C7A;
        height: 120px;
        width: 100%;
        text-align: center;
        color: #9C9C9C;
        font-size: 9px;
      }     
      .email-body button
      {
        border: 0px;
        background-color: #003C7A;
        color: white;
        padding: 12px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <table class="email-header">
        <tr>
          <td align="center">
            <img class="swasha-logo" src="https://swasha.org/png/Logo_NoBG.png" alt="Swasha Logo" title="Swasha Logo"/>
          </td>
        </tr>
      </table>
      <div class="email-body">
        <div class="email-innerbody">`;
module.exports=headerHTML