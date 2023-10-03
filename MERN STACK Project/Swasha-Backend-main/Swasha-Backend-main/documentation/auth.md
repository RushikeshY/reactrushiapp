<h1 align="center"><b>AUTHENTICAION APIs</b></h1>

#### ***POST*** - Register User 
```
    http://localhost:5000/api/v1/register 
```
```json
{
   "name":"first + middle + last name",
    "email":"example@gmail.com",
    "mobileNum":"+919876543210",
    "password":"***********"
}
```
<br />

#### ***POST*** - Login User
```
    http://localhost:5000/api/v1/login
```
```json
{
    "email":"example@gmail.com",
    "password":"***********"
}
```
<br />

#### ***GET*** - Logout User
```
    http://localhost:5000/api/v1/logout
```
```json
{
    "email":"example@gmail.com"
}
```
<br />

#### ***POST*** - Forgot Password
```
    http://localhost:5000/api/v1/password/forgot
```
```json
{
    "email":"example@gmail.com"
}
```
<br />

#### ***PUT*** - Reset Password
```
```
```json
```
<br />

#### ***GET*** - User Detail - (to see our detail)
```
    http://localhost:5000/api/v1/me
```
<br />


#### ***PUT*** - Update/Change Password - (By user itself)
```
    http://localhost:5000/api/v1/password/update
```
```json
{
    "oldPassword":"myOlderPassword",
    "newPassword":"example-PasswordNew123@",
    "confirmPassword":"example-PasswordNew123@"
}
```
<br />

#### ***PUT*** - Update Profile Details - like email, mobile no., so on.
```
    http://localhost:5000/api/v1/me/update
```
```json
{
    "email":"mallikarjuna123@gmail.com"
    "mobileNum":"9876543210"
}
```
<br />








<!-- Sample  -->
<!-- #### Heading
```
    http://localhost:5000/api/v1/
```
```json
```
<br /> -->

