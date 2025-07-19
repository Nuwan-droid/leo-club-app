import React,{useState} from 'react';
import InboxContent from './inboxcontent';




const Request = () => {
const [selectedMessages, setSelectedMessages] = useState([]);
  return (
    <div >
      
        <InboxContent
        selectedMessages={selectedMessages} 
        setSelectedMessages={setSelectedMessages} 
        />
      
    </div>
  );
};

export default Request;

