# Assignment-1-Web-Scraper


## Requirements of your solution

The application should be written as an Node.js application in Javascript following the JavaScript Standard Style - You have to install and configure it yourself (and add it to the package.json) (your initial repo will be empty). The examiner should be able to run standard in the console to see that you have no errors with the command npm run lint.

The only command the examiner should use to run your application after cloning it from GitHub is npm install and npm start (with the starting URL as a parameter).

You should work with GitHub and do several commits to show how your solution has been made.

You are free to find and use external modules.

You must structure your own code so you must create at least use three own modules.

The application should be able to take a parameter with the start-URL so one easy could change servers when running the examination.

Try to make a solution that is as general as possible. We will provide an alternative server that your script also should pass (see below). This is to test that your code is general for different scenarios. The HTML structure will never be changed but there could be changes in:
href attributes in HTML: To check that your scraper doesn't use hardcoded URLs. URLs only defined in Javascript code (as in the AJAX and cinema example) will not be changed, so you can hardcode these.

The day(s) all three friends will be available (remember: if none, the application should give the end-user a message about that).

The movie titles, their time and if they are fully booked or not.

The availability of tables at the restaurant and the redirect URL we get when we log in.
