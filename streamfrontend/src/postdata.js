



export function PostLogin(userData){
	
			
				
      			fetch('http://127.0.0.1:8000/stream/login/' , { method: 'POST' , body: JSON.stringify(userData) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
      			.then(res => res.json())
      			.then(response => console.log(response))
      			.catch(error => reject(error) );

				);

		

}