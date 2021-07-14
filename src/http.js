/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 3.0.1
 * @author  Emmanuel Uchenna
 * @license EIU
 *
 **/

 class EasyHTTP {
    // Make an HTTP GET Request 
    async get(url) {
      const response = await fetch(url);
      const resData = await response.json();
      return resData;
    }
  
    // Make an HTTP POST Request
    async post(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const resData = await response.json();
      return resData;
     
    }
  
     // Make an HTTP PUT Request
     async put(url, data) {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const resData = await response.json();
      return resData;
    }
    // Make an HTTP patch request
    async patch(url, data) {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body:JSON.stringify(data)
      });
      const resDate = await response.json();
      return resDate;
    }
    // Make an HTTP DELETE Request
    async delete(url) {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
  
      const resData = await 'Resource Deleted...';
      return resData;
    }
  
   }
// make public
export const http = new EasyHTTP();