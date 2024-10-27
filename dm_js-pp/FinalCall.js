process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
 const fs = require('fs');
 const path = require('path');
 const axios = require('axios');
 const { wrapper } = require('axios-cookiejar-support');
 const { CookieJar } = require('tough-cookie');

 // Create a new cookie jar
 const jar = new CookieJar();
 const client = wrapper(axios.create({ jar }));

 async function callEndpoints() {
   try {
     // Call the first endpoint
     const response1 = await client.get('https://devgreen.aistudio.consulting/api/auth/csrf');
     console.log('Response from endpoint 1:', response1.data);

     // Use the response from the first endpoint in the payload for the second endpoint
     const payloadForEndpoint2 = {
         ...response1.data,
         "email":"datower@datower.com",
         "password":"Password@12345",
     };

     console.log({payloadForEndpoint2});

     // Call the second endpoint with the payload
     const response2 = await client.post('https://devgreen.aistudio.consulting/api/auth/callback/credentials', {...payloadForEndpoint2});
     console.log('Response from endpoint 2:', response2.data);

     // Call the third endpoint
     const response3 = await client.get('https://devgreen.aistudio.consulting/api/uploads?filePath=da-test/JSFile.csv&bucket=da-data-mapping');
     console.log('Response from endpoint 3:', response3.data);
     const presignedUrl = response3.data.presignedUrl;
     console.log('Presigned URL:', presignedUrl);

     // Read the file to be uploaded
     const filePath =
	 'C:/Users/selzeniny001/etic-dm-app/JSFile.csv';
     console.log('File path:', filePath); // Log the file path

     // Log the contents of the directory
     const directoryContents = fs.readdirSync(path.dirname(filePath));
     console.log('Directory contents:', directoryContents);

     const fileData = fs.readFileSync(filePath);
	 console.log('File Data:', fileData);
	
     // Call the fourth endpoint to upload the file
     const response4 = await client.put(presignedUrl, fileData, {
         headers: {
             'Content-Type': 'application/octet-stream'
         }
     });
     console.log('Response from endpoint 4:', response4.data);
     console.log('Response from endpoint 4:', response4.status);
	 
	 // Create Chat Session
	 const payloadForEndpoint5 = {
     "user_id": "7695645b-1261-40e2-918c-9918adb243d7",
     "workflow_id": "5a7e46ad-a194-4937-aacd-cd9e1a125570"
     };

     console.log({payloadForEndpoint5});

     // Call the fifth endpoint with the payload
     const response5 = await client.post('https://devgreen.aistudio.consulting/api/bots/chat-sessions', {...payloadForEndpoint5});
     console.log('Response from endpoint 5:', response5.data);
	 
	 // Use the response from the fifth endpoint in the payload for the sixth endpoint
	 console.log(response5.data.chat_session.chat_session_id);
     const payloadForEndpoint6 = {
	"chat_session_id": response5.data.chat_session.chat_session_id,
    "user_id": "7695645b-1261-40e2-918c-9918adb243d7",
    "message_body": "",
    "attachments_url": ["gs://ais-devgreen/da-test/JSFile.csv"],
    "type": "USER",
    "runtime_config": {"target_schema":"oracle-ap-invoice-interface"}
	};
      
     console.log({payloadForEndpoint6});

     // Call the sixth endpoint with the payload
     const response6 = await client.post('https://devgreen.aistudio.consulting/api/bots/chat-sessions/create-message', {...payloadForEndpoint6});
     console.log('Response from endpoint 6:', response6.data);
	 // Call the seventh endpoint
	 const sessionid = response6.data.message.chat_session_id;
     const getmessageurl = 'https://devgreen.aistudio.consulting/api/bots/chat-sessions/'+sessionid;
	  console.log({getmessageurl});
	 const response7 = await client.get(getmessageurl);
     console.log('Response from endpoint 7:', response7.data);

   } catch (error) {
     console.error('Error calling endpoints:', error);
   }
 }


 callEndpoints();