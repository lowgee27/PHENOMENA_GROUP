// Require the Client constructor from the pg package
const { Client } = require('pg')
// Create a constant, CONNECTION_STRING, from either process.env.DATABASE_URL or postgres://localhost:5432/phenomena-dev
const client = new Client('postgres://localhost:5432/phenomena-dev-2');
// Create the client using new Client(CONNECTION_STRING)
// Do not connect to the client in this file!

/**
 * Report Related Methods
 */

/**
 * You should select all reports which are open. 
 *  
 * Additionally you should fetch all comments for these
 * reports, and add them to the report objects with a new field, comments.
 * 
 * Lastly, remove the password field from every report before returning them all.
 */
async function getOpenReports() {
  try {
    // first load all of the reports which are open
    
  
    // then load the comments only for those reports, using a
    // WHERE "reportId" IN () clause

    
    // then, build two new properties on each report:
    // .comments for the comments which go with it
    //    it should be an array, even if there are none
    // .isExpired if the expiration date is before now
    //    you can use Date.parse(report.expirationDate) < new Date()
    // also, remove the password from all reports


    // finally, return the reports
  

  } catch (error) {
    throw error;
  }
}

/**
 * You should use the reportFields parameter (which is
 * an object with properties: title, location, description, password)
 * to insert a new row into the reports table.
 * 
 * On success, you should return the new report object,
 * and on failure you should throw the error up the stack.
 * 
 * Make sure to remove the password from the report object
 * before returning it.
 */

 // Get all of the fields from the passed in object
async function createReport(reportFields) {
  const { title, location, description, password } = reportFields

      // insert the correct fields into the reports table
    // remember to return the new row from the query
  try {
    const { rows: [report] } = await client.query(`
      INSERT INTO reports(title, location, description, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [title, location, description, password])

    // remove the password from the returned row
    delete report.password;

    // return the new report
    return report;

  } catch (error) {
    throw error;
  }
}

/**
 * NOTE: This function is not for use in other files, so we use an _ to
 * remind us that it is only to be used internally.
 * (for our testing purposes, though, we WILL export it)
 * 
 * It is used in both closeReport and createReportComment, below.
 * 
 * This function should take a reportId, select the report whose 
 * id matches that report id, and return it. 
 * 
 * This should return the password since it will not eventually
 * be returned by the API, but instead used to make choices in other
 * functions.
 */


async function _getReport(reportId) {
  try {
       // SELECT the report with id equal to reportId
    const { rows: [report] } = await client.query(`
    SELECT *
    FROM reports
    WHERE "id" = ${reportId};
    `)
    // return the report
    return report;

  } catch (error) {
    throw error;
  }
}

/**
 * You should update the report where the reportId 
 * and password match, setting isOpen to false.
 * 
 * If the report is updated this way, return an object
 * with a message of "Success".
 * 
 * If nothing is updated this way, throw an error
 */
async function closeReport(reportId, password) {
  try {
    // First, actually grab the report with that id
    const closeReport = await _getReport(reportId)
    // If it doesn't exist, throw an error with a useful message
    if (!closeReport) {
      throw Error('Report does not exist with that id');
      // If the passwords don't match, throw an error
    } else if (closeReport.password !== password) {
      throw Error("Password incorrect for this report, please try again");
      // If it has already been closed, throw an error with a useful message
    } else if (closeReport.isOpen === false) {
      throw Error('This report has already been closed');
      // Finally, update the report if there are no failures, as above
    } else {
      await client.query(`
     UPDATE reports
     SET "isOpen" = false
     WHERE id=${reportId}
    `)
    }
    // Return a message stating that the report has been closed
    return { message: "Report successfully closed!" }


  } catch (error) {
    throw error;
  }
}


    // If it doesn't exist, throw an error with a useful message
    
  
    // If the passwords don't match, throw an error
    

    // If it has already been closed, throw an error with a useful message
    

    // Finally, update the report if there are no failures, as above
    

    // Return a message stating that the report has been closed
    

/**
 * Comment Related Methods
 */

/**
 * If the report is not found, or is closed or expired, throw an error
 * 
 * Otherwise, create a new comment with the correct
 * reportId, and update the expirationDate of the original
 * report to CURRENT_TIMESTAMP + interval '1 day' 
 */

async function createReportComment(reportId, commentFields) {
  // read off the content from the commentFields
  

  try {
    // grab the report we are going to be commenting on


    // if it wasn't found, throw an error saying so
    

    // if it is not open, throw an error saying so
    

    // if the current date is past the expiration, throw an error saying so
    // you can use Date.parse(report.expirationDate) < new Date() to check
    

    // all go: insert a comment
    

    // then update the expiration date to a day from now
    

    // finally, return the comment
    

  } catch (error) {
    throw error;
  }
}

// export the client and all database functions below
module.exports = {
  client,
  createReport,
  _getReport,
  closeReport
}