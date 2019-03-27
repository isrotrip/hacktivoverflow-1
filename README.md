# hacktivoverflow

Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login|POST||email:String(**Required**)<br>password:String(**Required**)<br>loginVia:String(**Required**)|error:<br>Status code 400<br>return object with key:<br>-message:String<br>success:<br>Status code 200<br>return object with key:<br>-message:String<br>token:String<br>userLogin:Object|token is decode using JWT, and userLogin for user experience
/users/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)<br>loginVia:String|error:<br>Status code 400<br>return object with key:<br>-message:String<br>success:<br>Status code 201<br>return object with key:<br>-message:String|register still available on the website as String
/users/verify|GET|token:String(**Required**)||error: <br> Status code 400 <br> return object with keys <br> -message:String<br>success: <br> Status code 200 <br> return object with key: <br> -userLogin:Object|Just in case the user click refresh <br> if token still available will be verified
/users/watchTag|PUT|token:String(**Required**)|status:String(**Required**)<br>watchTag:String(**Required**)|error:<br>Status code 400<br>return object with key:<br>-message:String<br>Status code 200<br>return object with key:<br>-message:String<br>-userLogin:Object|only update watchTag model in User Collection
/questions/update/:id|GET|token:String(**Required**)||error:<br>Status code 401/400<br>return object with key:<br>-message:String<br>success:<br>Status code 200<br>question:Object|status code 401 if the user doesn't authorized<br>for update populate purpose
/questions | GET | | | error: <br> Status code 500 <br> return object with keys: <br>-message:String <br> success: <br> Status code 200 <br> return object with keys: <br> questions:Array | get all questions
/questions|GET|||error:<br>internal server error<br>success:<br>show the list|view all questions
/questions/:id|GET|||error:<br>Status code 500<br>return object with key:<br>-message:String<br>success:<br>Status code 200<br>question:Object|for read in question pages purpose
/questions | POST | token:String(**Required**) | title:String(**Required**) <br> description:String(**Required**) <br> description:String(**Required**) | error: <br> Status code 400 <br> return object with keys: <br> -message:String <br> success: <br> Status code 201 <br> return object with keys: <br> -message:String <br> question:Object <br> | voting question
/questions/votes/:id|PUT|token:String(**Required**) | vote:String(**Required**) | error:<br> Status code 400 <br> return object with keys: <br> -message:String <br> success: <br> Status code 200 <br> return object with keys: <br> -message:String <br> -question:Object | for voting purpose as stackoverflow MVP
/questions/:id | PUT | token:String(**Required**) | title:String(**Required**) <br> description:String(**Required**) tags:String (**Required**) | error: <br> Status code 400/401/404 <br> return object with keys: <br> -message:String <br> Status code 200 <br> -message:String <br> -question:Object | Status code 400 if the field missing <br> 401 if not authorized <br> status code 404 if the content wasn't found
/questions/:id|DELETE|token:String(**Required**) <br>||error:<br> Status code 404/401 <br> return object with keys:<br> -message:String <br> success:<br> Status code 200 <br> return object with keys: <br> -message:String <br> -question:Object | Status code 404 if question not found <br> Status code 401 if not authorized
/answers/:id | GET | (req.params.id is question id) | | error:<br> Status code 404 <br> return object with keys: <br> message:String <br> success:<br> Status code 200 <br> return object with keys:<br>-message:String | status code 404 if the question is not found
/answers | POST | token:String(**Required**) | title:String(**Required**) <br> description:String(**Required**) <br> questionId:String(**Required**) | error: <br> Status code 404 <br> return object with keys: <br> message:String <br> success: <br> Status code 201 <br> return object with keys: <br> -message:String <br> answer:Object | Add answers to question
/answers/votes/:id | PUT | token:String(**Required**) | vote:String(**Required**) | error: <br> Status code 500 <br> Internal Server Error <br> success: <br> status code 200 <br> return object with keys <br> -message:String  <br> answer:Object | voting answer
/answers/:id | PUT | token:String(**Required**) | title:String(**Required**) <br> description:String(**Required**) | error: <br> Status code 404/400/401 <br> return object with keys: <br> -message:String <br> success <br> Status code 200 <br> return object with keys <br> -message:String <br> -answer:Object | 404 not found 400 wrong input field <br> 401 not authorized 
/answers/:id | error: <br> Status code 404/400/401 <br> return object with keys: <br> -message:String <br> success <br> Status code 200 <br> return object with keys <br> -message:String <br> -answer:Object | 404 not found 400 wrong input field <br> 401 not authorized

### Usage
command |
------- |
$ npm install |
$ npm run start server |
$ npm run serve client |

Access the Server via http://localhost:3000/
<br>
Access the Client via http://localhost:8080/