# Archive Proposal

This file contains a report about the FE testing on the insert proposal component.

This manual testing will be done as the following:

- Screenshot of the form with wrong data highlighted
- Explanation of the procedure used for the test
- Screenshot of the result of the test
- Conclusions

## Authentication

The insert proposal component should be accesible only by teachers so we are going to try to access it using both the teacher and student accounts.

![Teacher view](screenshots_archiveButton/teacherViewDesktop.png)

The student view does not have the edit dropdown menu.

![Student view](screenshots_archiveButton/studentViewDesktop.png)

## Responsive Design

The CSS is responsive and it adapts in the different dimensions of the devices:

### iPhone
![iPhone](screenshots_archiveButton/teacherViewiPhone.png)

### iPad
![iPad](screenshots_archiveButton/teacherViewiPad.png)

## Functionality tests

The button should immediately archive the thesis and bring back to the list page where the thesis should not appear anymore.

### Before the archival

![](screenshots_archiveButton/beforeArchival.png)

### Pressing of the button

![](screenshots_archiveButton/buttonPressing.png)

### Attention popup

#### Desktop

![](screenshots_archiveButton/attentionPopupDesktop.png)

#### Mobile

![](screenshots_archiveButton/attentionPopupMobile.png)

#### Tablet

![](screenshots_archiveButton/attentionPopupTablet.png)

### Done popup

#### Desktop

![](screenshots_archiveButton/donePopupDesktop.png)

#### Mobile

![](screenshots_archiveButton/donePopupMobile.png)

#### Tablet

![](screenshots_archiveButton/donePopupTablet.png)

### After the archival

![](screenshots_archiveButton/afterArchival.png)

## COnclusions

The component works as expected and it is responsive.