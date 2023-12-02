# Browse application decisions

This file contains a report about the FE testing on the browse application decisions component.

This manual testing will be done as the following:

- Explanation of the procedure used for the test
- Screenshot of the result of the test

# Students view

The browse application decisions component should be accesible only by students so we are going to try to access it using a student account.

Results:

When logged into the student account we can access the applications section by clicking in the navigation bar. 

![Screenshot](./screenshots_browse/main.png)

A new page appears and we can see the Pending, Accepted and Rejected applications, their details and a button to access the thesis details.

![Screenshot](./screenshots_browse/apps1.png)
![Screenshot](./screenshots_browse/apps2.png)
![Screenshot](./screenshots_browse/apps3.png)


# Functionality tests

## Browsing a new application

In this test we are going to apply for a new thesis proposal and see if it appears in the pending application decisions. In this case we are going to apply to the thesis "Autonomous Robot Navigation using Machine Learning"

RESULTS:

As expected, the new application appears in the pending application decisions until it is either accepted or rejected. 

![Screenshot](./screenshots_browse/newApply.png)

## Application thesis details

In this test we are going to try accesing the thesis details of the application.

Results:

![Screenshot](./screenshots_browse/details1.png)
![Screenshot](./screenshots_browse/details2.png)

The thesis details are shown and it is flagged with a text mentioning this is a thesis the user has applied to.

## Back to application decisions

In this test we are going to try going back to the applications with the back button.

RESULTS:
![Screenshot](./screenshots_browse/back.png)
![Screenshot](./screenshots_browse/apps2.png)

# Mobile CSS Testing

In this part there's a test regarding the mobile part of the application into 3 devices:
- Galaxy Fold
- iPad Air
- iPhone 12

The CSS is responsive and it adapts in the different dimensions of the devices:

### Galaxy fold
![Screenshot](./screenshots_browse/galaxy_fold.png)
### iPad Air
![Screenshot](./screenshots_browse/ipad_air.png)
### iPhone 12
![Screenshot](./screenshots_browse/iphone_12.png)