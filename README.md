# Codemon Assignment
##### - Had fun completing this assignemnt
##### - Completed the following APIs

### 1. GET /products
##### - It displays all the products stored in the database (in the format {_id, name; description, price})
<img src='./screenshots/GetAll.png' alt="GetAll">

### 2. GET /products/:productID
##### - It displays the details of the product with the specific id passed as parameter (_id is generated by mongoDB)
<img src='./screenshots/GetById.png' alt="GetById">

### 3. PATCH /products/:productID
##### - It updates the value of price of the product with specific id passed as parameter
<img src='./screenshots/PatchSucess.png' alt="PatchSucess">

##### - Performed error handling when: invalid payload is sent (i.e price)
<img src='./screenshots/InvalidPayload.png' alt="InvalidPayload">

##### - Performed error handling when: product with the mentioned id is not found
<img src='./screenshots/IdNotFound.png' alt="IdNotFound">

### 4. Performed Unit tests for the API to cover all possible cases
<img src='./screenshots/Screenshot (33).png' alt="UnitTests">

