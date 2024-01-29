TEMPLATE FOR RETROSPECTIVE (Team 03)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done 

7 / 7

- Total points committed vs done 

33 / 33

- Nr of hours planned vs spent (as a team)

114h 50m / 112h 15m


**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Manual FE testing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    21   |    -   |   75h 35m    |  71h 20m   |
| _#16_  |    4    |    5   |    5h        |   2h 25m   |
| _#28_  |    9    |    5   |  10h 45m     |   13h 45m  |   
| _#29_  |    1    |    2   |     30m      |     15m    | 
| _#17_  |    0    |    3   |      0m      |     0m     |
| _#18_  |    2    |    5   |    3h 30m    |     3h     |
| _#120_ |    7    |    8   |    13h 30m   |   15h 30m  |
| _#33_  |    4    |    5   |      6h      |    6h      |      
   
- _#0_ : Meetings, Technical debt, Docker, GitHub issues
- _#16_ : Search Archive
- _#28_ : Professor Approve Student requests
- _#29_ : Notify Professor Thesis Request
- _#17_ : Add Academic Co-Supervisor (<i> NOTE: this story has an est. time equal to 0 since, at the beginning of the sprint, we discovered that was already implemented, inherited from provious sprints</i>)
- _#18_ : Notify Expiration
- _#120_ : Browse notifications
- _#33_ : See thesis request

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Estimated Hours per task average: 2h 23m
- Actual Hours per task average: 2h 20m
- Estimated Hours Standard deviation: 3h 31m
- Actual Hours Standard deviation: 3h 27m

- Total task estimation error ratio [(sum of total hours estimation / sum of total hours spent) - 1]:  |(6890/6735)-1|  = |0,023| = 2,3%

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 7h30m
  - Total hours spent: 5h
  - Nr of automated unit test cases: 5
- E2E testing:
  - Total hours estimated: 17h30m
  - Total hours spent:  17h20m
- Code review 
  - Total hours estimated: 17h
  - Total hours spent:  14h20m
- Technical Debt management:
  - Total hours estimated: 8h
  - Total hours spent: 10h50m 
  - Hours estimated for remediation by SonarQube: 1d5h 
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 8h 
  - Hours spent on remediation: 10h50m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.3%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability:  A
    - security: A
    - maintainability: A
  
## ASSESSMENT

- What caused your errors in estimation (if any)?

  1. There were some bugs that we were scared about not finding a solution in few time, so that we overstimated some tasks. 
By the way, we reinvested the extra-time by managing some technical debt.

  2. There were some misunderstanding inside the team about how to design features, so that some of them had to been
reimplemented. 

  3. The sprint was covering an holiday period, so that the dynamics related to working hours have been different than we used to (since we never had sprints covering long holiday before this one).


- What lessons did you learn (both positive and negative) in this sprint?

  1. It's really important to have an interactive work inside the team, so that errors can be discovered promptly;

  2. We have experienced the feeling of having to manage our working time when having a lot of free time;

  3. We need to estimate more time to manage technical debt.

- Which improvement goals set in the previous retrospective were you able to achieve? 

  1. We managed to take some time to prepare the demo and the presentation.
  
  2. We REALLY improved our estimation a lot.

- Which ones you were not able to achieve? Why?

Everything was achieved.


- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

Make the sprint planning reunion faster.
Give more importance to story points.
Allocate more time to tasks related ti code maintanability.

- One thing you are proud of as a Team!!

We feel as we can keep working toghether to the point that we could also become officially work colleagues.