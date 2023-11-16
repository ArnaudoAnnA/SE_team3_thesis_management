# Insert proposal

This file contains a report about the FE testing on the insert proposal component.

This manual testing will be done as the following:

- Screenshot of the form with wrong data highlighted
- Explanation of the procedure used for the test
- Screenshot of the result of the test
- Conclusions

# Authentication 

The insert proposal component should be accesible only by teachers so we are going to try to access it using both the teacher and student accounts.

Results:

When logged into the student account, the page doesn't load (as shown in the screenshot)

![Screenshot](./screenshots_insert/loginStudent.png)

When logged into the teacher account, the page loads and works as expected.

# Mobile CSS Testing

In this part there's a test regarding the mobile part of the application into 3 devices:
- Galaxy Fold
- iPad Air
- iPhone 12

The CSS is responsive and it adapts in the different dimensions of the devices:

### Galaxy fold
![Screenshot](./screenshots_insert/galaxy_fold.png)
### iPad Air
![Screenshot](./screenshots_insert/ipad_air.png)
### iPhone 12
![Screenshot](./screenshots_insert/iphone_12_pro.png)

# Functionality tests
## Correct proposal insertion

In this test we are going to try and insert a new valid thesis proposal

![Screenshot](./screenshots_insert/correct1.png)

RESULTS:
The thesis is uploaded correctly and can be seen among the other ones.

![Screenshot](./screenshots_insert/correct2.png)
![Screenshot](./screenshots_insert/correct3.png)

## Invalid fields testing

In this test we are going to try inserting thesis with wrong values in the corresponding fields.
## Empty fields

![Screenshot](./screenshots_insert/emptytitle.png)

Results: the page doesn't upload any proposal and notifies the user with the corresponding alert on the empty field

## Wrong email format on supervisors

![Screenshot](./screenshots_insert/email.png)

Results: the page notifies the user to enter a valid email address

## Expected expiration date before current date

![Screenshot](./screenshots_insert/date.png)

Results: in this case, the thesis is uploaded, but the page ignores the user input (because it doesn't make sense that a thesis expires before being published) and sets the expiration date to 6 months after the current date.

![Screenshot](./screenshots_insert/date2.png)

## Duplicated keywords

![Screenshot](./screenshots_insert/keyword.png)

Results: the page correctly notifies the user that keyword has already been introduced and avoids making duplicates. However, infinite keywords can be introduced, which may be something to avoid.

## Duplicated co-supervisors

![Screenshot](./screenshots_insert/cosupervisors.png)

Results: same behaviour as the previous test.