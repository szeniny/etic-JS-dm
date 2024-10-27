process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
 const fs = require('fs');
 const path = require('path');
 const axios = require('axios');
 const { wrapper } = require('axios-cookiejar-support');
 const { CookieJar } = require('tough-cookie');

 // Create a new cookie jar
 const jar = new CookieJar();
 const client = wrapper(axios.create({ jar }));
 //import { setTimeout } from "timers/promises";
 async function callEndpoints() {
   try {
	
		setTimeout(() => { console.log('After Timeout'); }, 10000);
		  console.log('Start timeout');
   } catch (error) {
     console.error('Error calling endpoints:', error);
   }
 }
 callEndpoints();