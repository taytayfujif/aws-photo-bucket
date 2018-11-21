var pictures= document.querySelector( '#pictures');
var button = document.querySelector('#displayButton')
button.addEventListener("click", event =>{
    axios 
    .get('https://2jcordffif.execute-api.us-west-2.amazonaws.com/dev/treasure')
    .then(response =>{
       display(response);
    })
    .catch(error => {
        console.log('error', error);
    });
      
})
function display(response){
    console.log('response.data.message.Contents', response.data.message.Contents)
    pictures.innerHTML = response.data.message.Contents
  
    .map(function(pics){
        return `
        <img src ="${pics.Key}">
        `
    })
    .join("")
console.log('response', response);

}
