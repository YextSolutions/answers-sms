# answers-sms
Responds to questions about US Presidents via SMS using a Yext Answers Experience and Twilio.

To utilize this template:
1. Follow along with first 3 steps of the [Create a U.S. Presidents Search Guide Experience Guide](https://hitchhikers.yext.com/guides/answers-president-search-guide/) 
2. Clone this repo and add a ```.env``` file with a variable called ```ANSWERS_API_KEY``` that has your Answers Experience API Key. 
3. Create a Twilio account with a phone number.
4. Run your endpoint locally by entering ```node index``` in the terminal.
5. Navigate in the terminal to wherever you have ngrok saved and run ```./ngrok http 3000```.
6. Copy the HTTPS URL where your endpoint is exposed and add it as the SMS webhook for Twilio phone number.
7. Text your Twilio number to test.

See the [Build a SMS Chat with Twilio and Answers Guide](https://hitchhikers.yext.com/guides/answers-sms-with-twilio/) for more details.
