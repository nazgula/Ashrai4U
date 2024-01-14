var AWS = require('aws-sdk');
var path = require("path");
var fs = require('fs')

const {shellCommend} = require("./shellCommend");





( async() => {
    const env = 'dev';
    let bucketName =  "bismarter-site";
    let distributionId  = 'E2GX02PAQDVPTS';

    if ( env === 'tst' ) {
        // bucketName =  "bitlander-react-tst";
        // distributionId  = 'E1X1EZIPMRYNJ9';
    }
    console.log("running npm run build, this can take a mintue");
    await shellCommend("npm run build");

    // delete all 
    console.log("delete all objects from bucket");
    
    await shellCommend("aws s3 rm --recursive s3://" + bucketName);

    console.log("successfully deleted all objects from s3 bucket: " + bucketName );
    // start upload to s3

    console.log("start uploading to s3 bucket:  " + bucketName);
    await shellCommend("aws s3 sync ./build/ s3://" + bucketName);

    console.log("successfully upload all objects to s3 bucket: " + bucketName );



    console.log("start invalidation cloud front " + distributionId );

    // clear chace
    await shellCommend('aws cloudfront create-invalidation --distribution-id '+distributionId+'  --paths "/*"');

    
    console.log("cloud front cache successfully cleared for " + distributionId );

    
    console.log("script done");
    console.log("you can now open your distributionId link");



    

})();


