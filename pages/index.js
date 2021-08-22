import { Container, Grid, TextField,Card } from '@material-ui/core'
import DarkTextTypography from '../src/components/DarkTextTypography'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import CodeCard from '../src/components/CodeCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  textbox: {
      width:'100%',
      marginTop:16,
  }
}));

  

export default function Home() {
  const classes = useStyles();
  const [projectPath,setProjectPath] = useState("");
  const [projectName,setProjectName] = useState("");
  const [venvPath,setVenvPath] = useState("");
  const [rootUser,setRootUser] = useState("");
  const [dbUser,setDbUser] = useState("");
  const [dbPassword,setDbPassword] = useState("");

  const setProjectAbsolutePath = (path)=>{
    setProjectPath(path);
    if(path.substr(path.length-1,1)=='/'){
      path = path.substring(0,path.length-1)
    }
    
    setVenvPath(path+"/venv/");
    var path_arr = path.split("/");
    setProjectName(path_arr[path_arr.length-1])
  }

  return (
    <Container >
      
      <DarkTextTypography variant="h2" style={{marginTop:64}}>
        Django server with Gunicorn and Nginx
      </DarkTextTypography>
      <br/><br/>

      <Grid container>
        <Grid item xs={12} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <Card style={{padding:20}}>
            <Grid container>
              <DarkTextTypography>
                Please enter the following
              </DarkTextTypography>
            {/* <form noValidate autoComplete="off"> */}
            <Grid item xs={12} lg={12}>
              <TextField 
                id="ProjectPath-Input" 
                label="Project Absolute Path" 
                variant="outlined" 
                className={classes.textbox}
                value={projectPath}
                helperText={"Eg: /home/ubuntu/myproject"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event)=>{setProjectAbsolutePath(event.target.value)}} />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                id="Project-Name-Input" 
                label="Project Name" 
                variant="outlined" 
                className={classes.textbox}
                value={projectName}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={"Eg: myproject"}
                onChange={(event)=>{setProjectName(event.target.value)}} />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                id="venv-Name-Input" 
                label="Virtualenv Path" 
                variant="outlined" 
                className={classes.textbox}
                value={venvPath}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={"Eg: /home/ubuntu/myproject/venv"}
                onChange={(event)=>{setVenvPath(event.target.value)}} />
            </Grid>

            <Grid item xs={12}>
            <TextField 
              id="Root-User-Input" 
              label="Root user Name" 
              variant="outlined" 
              className={classes.textbox}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={"Eg: ubuntu"}
              onChange={(event)=>{setRootUser(event.target.value)}} />
              
              </Grid>
          {/* </form> */}
            </Grid>
          </Card>
          
        </Grid>
        <Grid item xs={12} lg={2}></Grid>
      </Grid>
      

      <br/><br/>

      <Grid container>
        <Grid item xs={12} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <DarkTextTypography variant={"h2"}>
            Gunicorn Setup
          </DarkTextTypography>
          <br/>
          <DarkTextTypography variant={"h3"}>
            Installing
          </DarkTextTypography>
          <br/><br/>
          <DarkTextTypography variant={"body1"}>
            Change directory to project root folder
          </DarkTextTypography>

          <CodeCard lines={["cd "+projectPath]} prefix={"$"}/>

          <DarkTextTypography variant={"body1"}>
            Activate virtaul environment
          </DarkTextTypography>

          <CodeCard lines={["source venv/bin/activate"]} prefix={"$"}/>

          <DarkTextTypography variant={"body1"}>
            Install gunicorn
          </DarkTextTypography>

          <CodeCard lines={["pip install gunicorn"]} prefix={"(venv) $"}/>

          <br/>
          <DarkTextTypography variant={"h3"}>
          Testing
          </DarkTextTypography>
          <br/><br/>
          <DarkTextTypography variant={"body1"}>
            With Virtualenv still active run 
          </DarkTextTypography>
          <CodeCard lines={["gunicorn --bind 0.0.0.0:8000 "+projectName+".wsgi"]} prefix={"(venv) $"} error={projectName ? "":"Enter Project Name"}/>
          <DarkTextTypography variant={"body1"}>
          When you are finished testing, hit CTRL-C in the terminal window to stop Gunicorn.
          <br/><br/>
          We’re now finished configuring our Django application with gunicorn. We can back out of our virtual environment by typing:
          </DarkTextTypography>
          <CodeCard lines={["deactivate"]} prefix={"(venv) $"}/>
          <DarkTextTypography variant={"h4"}>
          Create a Gunicorn systemd Service File
          </DarkTextTypography>

          <CodeCard lines={["sudo nano /etc/systemd/system/gunicorn.service"]} prefix={"$"}/>

          <CodeCard 
          title={"/etc/systemd/system/gunicorn.service"}
          lines={[
          "[Unit]",
          "Description=gunicorn daemon",
          "After=network.target",
          "[Service]",
          "User="+rootUser,
          "Group=www-data",
          "WorkingDirectory="+projectPath,
          "ExecStart="+venvPath+"bin/gunicorn --access-logfile - --workers 3 --bind unix:"+projectPath+"/"+projectName+".sock "+projectName+".wsgi:application",
          "[Install]",
          "WantedBy=multi-user.target"
          ]}
          error={projectName && rootUser ? "" : "Please Enter All the details (Project Name, RootUser, ProjectPath,Venv)"}
             />
          <DarkTextTypography variant={"body1"}>
          We can now start the Gunicorn service we created and enable it so that it starts at boot
          </DarkTextTypography>

          <CodeCard lines={["sudo systemctl start gunicorn","sudo systemctl enable gunicorn"]} prefix={"$"}/>
          
          <DarkTextTypography variant={"body1"}>
          Check the status 
          </DarkTextTypography>

          <CodeCard lines={["sudo systemctl status gunicorn"]} prefix={"$"}/>
          <DarkTextTypography variant={"body1"}>
          and see if the <b>{projectName}.sock</b> file is created
          </DarkTextTypography>
          <CodeCard lines={["ls "+projectPath]} prefix={"$"} error={projectPath ? "":"Enter Project Path"}/>
          <DarkTextTypography variant={"body1"}>
          If you make changes to the <b>/etc/systemd/system/gunicorn.service</b> file, reload the daemon to reread the service definition and restart the Gunicorn process by typing:
          </DarkTextTypography>
          <CodeCard lines={["sudo systemctl daemon-reload","sudo systemctl restart gunicorn"]} prefix={"$"}/>
          
          
        </Grid>
        <Grid item xs={12} lg={2}></Grid>
      </Grid>


      <Grid container>
        <Grid item xs={12} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <DarkTextTypography variant={"h2"}>
            Nginx Setup
          </DarkTextTypography>
          <br/>
          <DarkTextTypography variant={"h3"}>
            Installing
          </DarkTextTypography>

          <CodeCard lines={["sudo apt-get update","sudo apt-get install nginx"]} prefix={"$"}/>

          <DarkTextTypography variant={"h3"}>
          Creating Server Block 
          </DarkTextTypography>

          <CodeCard lines={["sudo nano /etc/nginx/sites-available/"+projectName]} prefix={"$"} error={projectName ? "":"Enter Project Name"}/>

          <CodeCard 
          title={"/etc/nginx/sites-available/"+projectName}
          lines={[
          "server {",
          "    listen 80;",
          "    server_name server_domain_or_IP;",
          "    location = /favicon.ico { access_log off; log_not_found off; }",
          "    location /static/ {",
          "        root "+projectPath+";",
          "    }",
          "    location / {",
          "        include proxy_params;",
          "        proxy_pass http://unix:"+projectPath+"/"+projectName+".sock;",
          "    }",
          "}"
          ]}
          error={projectName && rootUser ? "" : "Please Enter All the details (Project Name, RootUser, ProjectPath,Venv)"}
             />

        <DarkTextTypography variant={"body1"}>
        Now, we can enable the file by linking it to the sites-enabled directory
        </DarkTextTypography>

        
        <CodeCard lines={["sudo ln -s /etc/nginx/sites-available/"+projectName+" /etc/nginx/sites-enabled"]} prefix={"$"} error={projectName ? "":"Enter Project Name"}/>
          
        <DarkTextTypography variant={"body1"}>
        Test your Nginx configuration for syntax errors by typing:
        </DarkTextTypography>

        <CodeCard lines={["sudo nginx -t"]} prefix={"$"}/>

        <DarkTextTypography variant={"body1"}>
        If no errors are reported, go ahead and restart Nginx by typing:
        </DarkTextTypography>
        <CodeCard lines={[" sudo systemctl restart nginx"]} prefix={"$"}/>

        <DarkTextTypography variant="h4">
          And DONE!!
        </DarkTextTypography>

          
        </Grid>
        <Grid item xs={12} lg={2}></Grid>
      </Grid>
    




    </Container>
  )
}
