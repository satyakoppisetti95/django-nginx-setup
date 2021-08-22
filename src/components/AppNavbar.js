import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link'
import { Container } from '@material-ui/core';
import WhiteTextTypography from './WhiteTextTypography';

const useStyles = makeStyles((theme) => ({

title: {
    flexGrow: 1,
    marginTop:16,
    marginBottom:16
}
}));



export default function AppNavbar(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar position="sticky" color="secondary">
            <Container>
            <Toolbar>
               
                
                <Link href="/" passHref={true}>
                    <div className={classes.title}>
                    <WhiteTextTypography variant="h5">
                    Django Server setup
                    </WhiteTextTypography>
                    </div>
                </Link>
                
            </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
}