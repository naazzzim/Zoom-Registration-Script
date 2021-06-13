//include required modules
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
const fs=require('fs');

meetid = MEETING-ID     //Change meetID

async function apiCall(userData){
   
      
    for(const user of userData){

        const payload = {
            iss: config.APIKey,
            exp: ((new Date()).getTime() + 2000)
        };
        const token = jwt.sign(payload, config.APISecret);


        var options = {
            uri: "https://api.zoom.us/v2/meetings/"+meetid+"/registrants", 
            auth: {
                'bearer': token
            },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            body:{
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            },
            json: true,
            method: 'POST' 
        };
        
        await rp(options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            try {
                fs.appendFileSync('error.txt',err.toString()+'\n'+'Data of the user which caused the error is ->'+'first_name:'+user.first_name+", last_name:"+user.last_name+", email:"+user.email+'\n\n')
            } catch (error) {
                console.log(error);
            }
        });
    }
}

function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        
        if(obj[headers[0]]==='')
            continue
        result.push(obj);
    }
    return result; 
  }

let data
  try {
      data = fs.readFileSync('registrants.csv', 'utf8')
    } catch (err) {
        console.error(err)
    }
const userData=csvJSON(data);
apiCall(userData);
 
  
  
  
    
    
    
    