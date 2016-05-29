# fcc-timestamp
Timestamp microservice made for FreeCodeCamp basejump

# usage

To make API call, enter a unix timestamp or a natural language date

Examples:
https://fccts.herokuapp.com/march%2014%1592
https://fccts.herokuapp.com/-11922249600

Response:
{"unix":-11922249600,"natural":"March 14, 1592"}

# source

index.js (default) runs with vanilla node
alternative index2.js requires express, but dependencies not listed in package