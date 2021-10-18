const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const { provideCore } = require('@yext/answers-core');
const { answersApiKey } = require('./config');

const core = provideCore({
	apiKey: answersApiKey,
	experienceKey: 'us_presidents_demo',
	locale: 'en',
	experienceVersion: 'PRODUCTION',
  endpoints: {
    universalSearch: 'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query?someparam=blah',
    verticalSearch: 'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query',
    questionSubmission: 'https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion',
    status: 'https://answersstatus.pagescdn.com',
    universalAutocomplete: 'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete',
    verticalAutocomplete: 'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete',
    filterSearch: 'https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch'
  }
});

const noAnswer = 'Uh oh! We did not understand your question. Please try asking a different one.';
const preAnswer = 'Hopefully this answers your question: ';

app.use(express.urlencoded({extended: true}));

app.post('/sms', async (req, res) => {

  const twiml = new MessagingResponse();

  let answer = noAnswer;

  try {
    searchResults = await core.verticalSearch({
      query: req.body.Body,
      verticalKey: 'wiki_bios',
      limit: 1
    });
    
    if (searchResults.directAnswer) {
      answer = preAnswer + searchResults.directAnswer.value
    } else if (searchResults.verticalResults.results[0] && searchResults.verticalResults.results[0].highlightedFields.s_snippet.value){
      answer = preAnswer + searchResults.verticalResults.results[0].highlightedFields.s_snippet.value;
    } 


  } catch (err) {
    console.log(err);
  }

  twiml.message(answer);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(PORT, () => console.log(`Webhook server is listening, port ${ PORT }`));