# Time tracking
The purpose of this exercise is for us to understand what kind of code you
produce when solving a challenge. We are focusing on maintainability,
your technical approach, how you map your idea into architecture and code,
and what you prioritize with the limited time.

## Process
- Timebox to ~4 hours development time.
- Commit and push milestones to your Github repo. Treat every commit as if it was going into production.
- Share a link with us when you're finished.

## Introduction
We have started a task submission platform which allows a user to submit and
view answers for tasks they are assigned to. They are sharing the submitted answers
with their managers internally. Users have to work directly inside the textarea on
the platform.

The solution works well and managers are happy to be able to see their users
submissions. After some time, managers are starting to doubt how long users take
to complete the tasks. Instead of relying on the users to report them how long
it took they want to see the numbers on the platform, when users sit down
with their managers.

## Goal
Implement an MVP that, after submitting a task, shows how long a user has been
actively working on it. Users will go through their submission with the manager,
who wants to see the submission and the time it took to complete.
Users work on tasks in multiple sessions: When the user takes a pause working on
a task and comes back later, a new session starts.

Add information to the task submission screen that shows in seconds:
- How long did it take the user to submit the task?
- In how many sessions did the user work on the task?
- How long was the user's average session for this task?

Add another screen that shows time statistics in seconds:
- How long has the user been working in total?
- On average, how long did it take the user to submit a task?
- How long is the user's average session?

## How to get started
This project contains a React app and a Ruby on Rails api.
You need to run the React app (localhost:3000) separately from the Ruby on Rails api (localhost:5000).
Follow these steps to set up the project and get started:

### React app
- Navigate into the folder `/app`
- Use the specified node version (14.17.3). E.g. if you have nvm installed run `nvm use`
- Install dependencies by running `yarn install`
- Start the dev server by running `yarn start`

### Rails api
- Navigate into the folder `/api`
- Install ruby globally
- Install the dependencies by running `bundle`
- Setup the database by running `rails db:setup`
- Start the server by running `rails s`

## Additional info
- Feel free to make own assumptions if any questions come up during the development.
- You can change the code and project structure to suit your preference.
- Users are using the latest version of Chrome/Firefox.
- Users never open two tabs at the same time.
- Users often switch between devices when starting a new session, but never use
two devices at the same time.
- Do not use additional 3rd party libraries.

## Assumptions while development
Mentioning all assumptions and approaches that were followed for this task below.
I hope they'll help in understanding code better

### For frontend
- Whenever user opens a task (which is not submitted yet), start time is saved in time_spent column in form of hash, and everytime if user refreshes, closes tab or go back, session ends and end_time and time difference is saved
- Since we are not editing tasks, so for submitted tasks I am not storing time(session)
- Task summary will only be visible on those tasks which are submitted by that user, for future development we can update in such a way only users with manager role will be able to view task summary screen
- Sharing couple of edge cases which can be part of future development like if user is idle, switches to another tab or go back using browser back button
- For idle case, when user lands on task submission page we store start time in a state, now every time our window receive mouse or keyboard event, we check if this event happening after x time, if it crosses that time we'll assume that user was idle they were not using our platform, if not then we'll continue with defined workflow
- In case of tab change or browser back button, set end time for ongoing session (update {end_time} for time_spent column)

### For backend
- Added UserTask model in order to store time spent on task and sessions for that task
- I've used an array type column (since sqlite does not support jsonb column type, jsonb column can also be used if we were working with postgresql)
- In time_spent column single {start_time: '', end_time: '', time_taken: ''} represents user's session spent on a task
- Saving start time and end time for every session, as it gives us more control over users activity, also saving time difference when user ends session
- Every single hash in time_spent column, represents user session for that task
