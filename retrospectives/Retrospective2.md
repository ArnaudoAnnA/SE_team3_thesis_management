RETROSPECTIVE 2 (Team 3)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done

4/4

- Total points committed vs. done

9/9

- Nr of hours planned vs. spent (as a team)

109h 15m/99h 55m

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Manual FE testing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |   18    |    -   |   60h 15m  |   56h 50m    |
| _#4_   |    5    |    3   |    22h     |   19h 55m    |
| _#5_   |    4    |    2   |    10h     |     8h       |
| _#6_   |    4    |    2   |    12h     |   11h 30m    |
| _#7_   |    4    |    2   |     5h     |    3h 40m    |

- _#0_ corresponds to start meeting, daily scrum meetings and previous issues fix
- _#4_ : Browse Applications
- _#5_ : Accept Application
- _#6_ : Browse Applications Decisions
- _#7_ : Browse Proposals

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Estimated Hours per task average: 3h 7m
- Actual Hours per task average: 2h 51m
- Estimated Hours Standard deviation: 2h 48m
- Actual Hours Standard deviation: 2h 30m

- Total task estimation error ratio [(sum of total hours estimation / sum of total hours spent) - 1]:  |(6555/5995)-1|  = |0,093| = 9,3% 

  ## QUALITY MEASURES 

- Unit Testing: 
  - Total hours estimated: 6h 
  - Total hours spent: 8h
  - Nr of automated unit test cases: 3 
- E2E testing:
  - Total hours estimated: 7h
  - Total hours spent: 4h30m
- Code review 
  - Total hours estimated: 1h
  - Total hours spent: 1h

## ASSESSMENT

- What caused your errors in estimation (if any)?

We overstimated the effort in learning the authentication with SAML. We were afraid from learning new technologies (such as firebase) because in the 1st sprint we understimated it. In the end it wasn't so difficult to implement.

We also overstimated the time to fix bugs and errors from previous stories.

- What lessons did you learn (both positive and negative) in this sprint?

Internal deadlines are useful for debugging and testing. Also that we need to find a balance where we set realistic goals given the team capabilities and work hours.

- Which improvement goals set in the previous retrospective were you able to achieve? 

We were able to achieve all the goals we set in the previous sprint. Those goals were:

1. have a meeting between peoples in charge of the same story before starting developing (1h30 it's enough): the objective is pre-defining the interfaces, methods and APIs' signatures;
2. establish a deadline inside the sprint and try to have the code ready for that date, so then we can focus on testing;
3. Manual drawing of GUI before starting developing.

  
- Which ones you were not able to achieve? Why?

None.


- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

Try to reach a balance in the estimation for each story/task. (We understimated in sprint 1 and overstimated in sprint 2)

- One thing you are proud of as a Team!!

We were able to finish everything before the demo's date and respected the internal deadlines.