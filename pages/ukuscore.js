import Layout from '../components/Layout';
import Ukuframe from '../components/Ukuframe';
import React, { Component } from 'react';

export default class Sudoku extends Component{ 
    constructor(props) {
        super(props);
       
    }

    render(){        

        return ( <Layout title="Nextbrain - Ukulele">

                    <div className='sudokupage'>
                        <Ukuframe />
                    </div>

                    <style jsx global>{`
                        body{
                            background:#FFF !important;
                        }

                        .ukupage{
                            display:flex;
                            flex-direction:row;
                            flex-wrap: wrap;
                            justify-content:space-around;
                            width:95%;
                            
                        }
                        .settingbar{
                            display:flex;
                            justify-content:center;
                        }
                        .settinglabel{
                            margin-right:20px;
                        }
                        .settinginput{
                            margin-right:50px;
                        }

                        @media print {
                            .settingbar {
                                display: none;
                            }
                        }   
                        
                    `}</style>

                </Layout>);
    
    }
}
