# Zoom Registration Script

This is a short script that was made to help my friends automate the registration for zoom meetings where they have the EmailID and first name of the registrants in a csv file. The sample CSV file is given in the repository.

## Usage

Install the required packages using npm.

```bash
npm install
```

The API_key and the API_Secret are given in the config.js file. Please do replace them with the API_KEY and API_secret for your zoom account.

The csv file accessed by the script is registrants.csv. Either rename the file name as you wish or do replace the contents of the csv file with the data to be used.

Change the the meetid variable in the index.js file with the meeting Id you wish to register

If any of the users were unable to register, it will generate a file named "error.txt" stating the reason why it failed
 