import React,{useState} from 'react';
import InboxContent from './inboxContent';
import Navbar from '../memberportalnav';


const Request = () => {
const [selectedMessages, setSelectedMessages] = useState([]);
  return (
    <div >
        <Navbar/>
        <InboxContent
        selectedMessages={selectedMessages} 
        setSelectedMessages={setSelectedMessages} 
        />
      
    </div>
  );
};

export default Request;

