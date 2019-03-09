import Layout from '../components/Layout';
import React, {Component} from 'react';

export default class Cal24Point extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <Layout title='Nextbrain - 24 点'>
                <div className='cal24page'>
                    千变万化的 24 点


                </div>
                <style jsx>{`
                    .cal24page{
                        display:flex;
                    }
                `}</style>
            </Layout>
        );
    }
}