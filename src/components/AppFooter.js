import { Container } from '@material-ui/core';
import React from 'react';
import WhiteTextTypography from './WhiteTextTypography';


export function AppFooter(){
    return(
        <div style={{textAlign:'center',background:'#00bcd4',padding:32,marginTop:256}}>

            <Container>
                <WhiteTextTypography variant="caption">
                By Satya Koppisetti
                </WhiteTextTypography>
            </Container>
           
        </div>
    )
}