
let content;
let pageSelect;
let typeSelect;
let sendButton;

const handleResponse = async (response) => {
  switch(response.status) {
    case 200: 
      content.innerHTML = `<b>Success</b>`;
      break;
    case 201:
      content.innerHTML = `<b>Created</b>`;
      break;
    case 400: 
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    case 404:
      content.innerHTML = `<b>Resource Not Found</b>`;
      break;
    default: 
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }
  
  let obj = await response.json();
  //let jsonString = JSON.stringify(obj);
  content.innerHTML += `<p>Message: ${obj.message}</p>`;
};

const requestUpdate = async () => {
  const page = pageSelect.value;
  const type = typeSelect.value;
  
  let response = await fetch(page, {
    method: 'GET',
    headers: {
      'Accept': type,
    },
  });
  
  handleResponse(response);
};

const init = () => {
  console.log('index.js loaded');
  
  // Gets the content section
  content = document.querySelector('#content');

  // Get the controls
  pageSelect = document.querySelector("#page");
  typeSelect = document.querySelector("#type");
  sendButton = document.querySelector("#send");
  
  sendButton.onclick = (e) => {
    requestUpdate();
    return false;
  }
};

window.onload = init;
  