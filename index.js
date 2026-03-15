
const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const FormData = require("form-data");
const request = require("request")


async function run() {
  try {
    // `path-to-file` input defined in action metadata file
    const pathToFile = core.getInput("path-to-file");
    console.log(`Path: ${pathToFile}`);
    if (fs.existsSync(pathToFile)) {
      console.log(`File Exists`);
    } else {
      console.log(`File Does Not Exist`);
    }

    // `category` input defined in action metadata file
    const category = core.getInput("category");
    console.log(`category: ${category}`);

    // `apiKey` input defined in action metadata file
    const apiKey = core.getInput("apiKey");
    console.log("API KEY: " + apiKey );

    const formData = {
      "app": fs.createReadStream( pathToFile ),
      "key": apiKey,
      "category": category
    }

    request.post({url:'https://preprod.api.quokkapedia.io/v1/developer/android/upload-binary', formData: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
      const jj = JSON.parse(body);
      console.log("Safe App Portal Results URL: ", jj.resultsUrl);
    });
  
    
  } catch (err) {
      console.log("Error with upload:", err);
  }
}
run();
