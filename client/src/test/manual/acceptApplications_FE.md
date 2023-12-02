# Accept/decline applications

This file contains a report about the FE testing on the application decisions component.

This manual testing will be done as the following:

- Explanation of the procedure used for the test
- Screenshot of the result of the test

# Teachers view

The accept/decline applications component should be accesible only by teachers so we are going to try to access it using the teacher account and look through the applications to our thesis proposals.

Results:

When logged into the teacher account we can access the applications section by clicking in the navigation bar. 

![Screenshot](./screenshots_accept/main.png)

A new page appears and we can see the Pending, Accepted and Rejected student applications. 

![Screenshot](./screenshots_accept/pending.png)
![Screenshot](./screenshots_accept/accepted.png)
![Screenshot](./screenshots_accept/rejected.png)

## Application details

By clicking on each student we can access the details of its application. 

![Screenshot](./screenshots_accept/studentDetails.png)

If we click on a pending application, its details and 2 buttons to Accept/decline the application are shown
![Screenshot](./screenshots_accept/decision.png)

## Accepting/declining an application

Using the buttons we can accept or decline the application, which appears in the corresponding section after accepting/declining it. (For this test we are going to accept an application)

![Screenshot](./screenshots_accept/decision2.png)

In this case, the application coming from Simone Marino for the "Autonomous Robot Navigation using Machine Learning" thesis that we accepted is shown in the accepted applications.

![Screenshot](./screenshots_accept/result.png)

## Back to all applications

In this test we are going to try going back to the applications with the back button.

RESULTS:
![Screenshot](./screenshots_accept/back.png)
![Screenshot](./screenshots_accept/accepted.png)

# Mobile CSS Testing

In this part there's a test regarding the mobile part of the application into 3 devices:
- Galaxy Fold
- iPad Air
- iPhone 12

The CSS is responsive and it adapts in the different dimensions of the devices:

### Galaxy fold
![Screenshot](./screenshots_accept/galaxy_fold.png)
### iPad Air
![Screenshot](./screenshots_accept/ipad_air.png)
### iPhone 12
![Screenshot](./screenshots_accept/iphone_12.png)