# Apply for proposal

This file contains a report about the FE testing on the apply for proposal component.

This manual testing will be done as the following:

- Screenshot of the form with wrong data highlighted
- Explanation of the procedure used for the test
- Screenshot of the result of the test
- Conclusions

# Authentication 

The apply for proposal component should be accesible only by students so we are going to try to access it using both the teacher and student accounts.

Results:

When logged into the teacher account, the page doesn't load (as shown in the screenshot)

![Screenshot](./screenshots_apply/login.png)

When logged into the student account, the page loads and works as expected.

# Mobile CSS Testing

In this part there's a test regarding the mobile part of the application into 3 devices:
- Galaxy Fold
- iPad Air
- iPhone 12

The CSS is responsive and it adapts in the different dimensions of the devices:

### Galaxy fold
![Screenshot](./screenshots_apply/galaxy_fold1.png)
![Screenshot](./screenshots_apply/galaxy_fold2.png)
### iPad Air
![Screenshot](./screenshots_apply/ipad_air.png)
### iPhone 12
![Screenshot](./screenshots_apply/iphone_12.png)

# Functionality tests

## Uploading a CV

In this test we are going to try to upload a cv with each of the specified formats (.pdf, .doc and .docx) and one unspecified format to see how the page handles it.

RESULTS:

As expected, the supported cv formats are accepted and uploaded (both with drag and drop and pop-up file selection).

Unsupported formats get rejected and the user is notified about it with a red warning in the top part of the page.

- PDF
![Screenshot](./screenshots_apply/pdf.png)
- DOC
![Screenshot](./screenshots_apply/doc.png)
- DOCX
![Screenshot](./screenshots_apply/docx.png)
- TXT
![Screenshot](./screenshots_apply/txt.png)

## Getting back to thesis details

In this test we are going to test the back arrow button to go back to the proposal details.

Results:

- Before pressing the button
![Screenshot](./screenshots_apply/back1.png)

- After pressing the button
![Screenshot](./screenshots_apply/back2.png)

## Sending an application

In this test we are going try to send an application to a thesis.

RESULTS: the application is sent succesfully.
![Screenshot](./screenshots_apply/send1.png)

## Sending an application to an already applied thesis

In this test we are going to try send an application to a thesis we've already applied to.

RESULTS: the duplicate application is rejected.
![Screenshot](./screenshots_apply/send2.png)

