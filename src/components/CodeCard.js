import { Card, Grid } from "@material-ui/core";
import WhiteTextTypography from './WhiteTextTypography';
export default function CodeCard(props){
    
    return(
        <Card style={{background:props.error ? "#f77":"#333",marginTop:16,marginBottom:32}}>
            <Grid container style={{textAlign:'left'}}>
                {props.title ? 
                    <Grid item xs={12} style={{background:"#555",paddingLeft:20}}>
                        <WhiteTextTypography variant="h6">{props.title}</WhiteTextTypography>
                    </Grid> 
                : <></>}
                {props.error ? 
                    <Grid item xs={12} style={{background:"#f00",paddingLeft:20}}>
                        <WhiteTextTypography variant="h6">{props.error}</WhiteTextTypography>
                    </Grid> 
                : <></>}
                <Grid item xs={12} lg={12} style={{padding:20}}>
                    {props.lines.map((item,index)=>{
                        return(
                        <WhiteTextTypography variant="body1">
                            {props.prefix?<span class="unselectable-text" style={{marginRight:16}}>{props.prefix}</span>:<></>}
                            {item}
                        </WhiteTextTypography>)
                    })}
                </Grid>
                
            </Grid>
        </Card>
    )
}