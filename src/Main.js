import React, {Component } from 'react'
import 'antd/dist/antd.css';
import Mainlayout from './containers/Mainlayout';
import Routes from './containers/Routes';


export default class Main extends Component {


    render() {
        return (
            <>
              <Mainlayout>
                <Routes/>
              </Mainlayout>
            </>
        )
    }
}
