import React from 'react';

function SubjectList(props){
    let subjects= props.data;
	return (
  	  <div className='text-3xl font-bold underline'>
        {
            subjects.map((subject)=>{
                return <li key={subject.id}>{subject.code} - {subject.description}</li>
            })
        }
        


      </div>
  	)
}

export default SubjectList