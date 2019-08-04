import React, { Component } from 'react';

const chordCount = 4;
const sectionLength= 7;


class Ukuframe extends Component{
    
    constructor(props){
        super(props);
        this.fillframegrid = this.fillframegrid.bind(this)
    }

    fillframegrid(scoreSection){
        if(this.props.notes && this.props.notes.length > 0){
            let position = 0; 
            for(let note of this.props.notes){
                scoreSection.find(s => s.chordIndex == note.chordIndex).Line[position].display = note.fretSectionIndex;
                position++;
            }
         }      
    }

    render(){
        let index = 0;
        let scoreSection = [];
        for(let chordIndex = 1; chordIndex <= chordCount; chordIndex ++){

            let scoreLine = [];           
            for(let position = 0; position < sectionLength; position++){
                index++;         
                scoreLine.push({index:index, display:''});
            }
            scoreSection.push({chordIndex: chordIndex, Line: scoreLine});
        }
        this.fillframegrid(scoreSection);     
       
        return (
            <div className='ukuframe'>
            {
                scoreSection.map(sl => {
                    return (
                        <div className='scoreline' key={sl.chordIndex}>
                            <div className='scoregrid scoregridTitle' >{sl.chordIndex + '弦'}</div>
                            {
                                sl.Line.map((s,noteindex) => {
                                        return (
                                            <div className='scoregrid scoregridNote' key={noteindex}>
                                                {s.display}
                                            </div>
                                        );
                                    })                            
                            }

                        </div>
                    )  
                })
            }
            <style jsx>{`
                .ukuframe{
                    width:300px;
                    margin-bottom:20px;
                    display:flex;
                    flex-direction:column;
                    justify-content: center;
                }

                .scoreline{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    width: 100%;
                    background-color: #6190E8;
                }

                .scoregrid{
                    width: 60px;
                    height: 30px;
                    margin-right:2px;
                    display: flex;
                    justify-content: center;
                } 
                
                .scoregridTitle{
                    padding-top: 10px;
                    background-color: #6190E8;
                    color: #fff;
                }

                .scoregridNote{
                    padding-top: 10px;
                    background: linear-gradient(#fff 49%,#D8D8D8 0,#D8D8D8 52%,#fff 0);
                    background-color: #fff;
                }

            `}</style>
            </div>
        );
    }
}

export default Ukuframe;