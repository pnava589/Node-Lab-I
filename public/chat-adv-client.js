// add code here

const socket = io('http://localhost:3000');
    var myName = prompt('whats your name?');
    window.onload=(e)=>{
        document.querySelector('.messages-header h3').textContent = 'Chat ['+myName+' ]';

        
    };
    


      retrievePerson();
      async function retrievePerson(){
        const url = `https://randomuser.me/api`;
        const response = await fetch(url);
        const res = await response.json();
        const person ={apiResponse:res,name:myName}
        socket.emit('new user',person);
        };

        //const newobj = {message:'has joined',users:list,user:obj,className:"message-user"}
        socket.on('user',obj=>{
            createNewMessage(obj.className,obj);
            updateUsers(obj.users);
        })
        
        document.querySelector("#leave").addEventListener('click', e => {
        socket.emit('client leaving', myName);
        document.querySelector('#chatForm').style.display='none';

        });

        document.querySelector("#chatForm").addEventListener('submit', e => {
            e.preventDefault();
            const entry = document.querySelector("#entry");
            // send message to server
            let person ={Name:myName};
            let msg = {message:entry.value,user:person};
            createNewMessage('message-sent',msg);
            socket.emit('chat from client', entry.value);
            entry.value = "";
        });

        socket.on('chat from server', msg => {
            let person ={Name:msg.user};
            let obj = {message:msg.message,user:person};
            createNewMessage('message-received',obj);
            
        });
        
        function updateUsers(msg){
            console.log(msg);
            document.querySelector("#users ul").innerHTML ="";
            msg.forEach(user => {
            createListItem(user);
            //document.querySelector("#users ul").appendChild(li2);
        });

    }

    //const newobj = {message:'has joined',users:list,user:obj,className:"message-user"}
        function createNewMessage(className,obj){

            const item = document.createElement('li');
            item.setAttribute('class',className);
            const name = document.createElement('p');
            name.setAttribute('class','message-data');
            name.innerHTML = obj.user.Name;
            const span = document.createElement('span');
            span.innerHTML = 'Today';
            const content = document.createElement('p');
            content.setAttribute('class','message-text');
            content.innerHTML = obj.message;
            name.appendChild(span);
            item.appendChild(name);
            item.appendChild(content);
            document.querySelector('.messages-body ul').appendChild(item);

        }
            function createListItem(element){

                const li = document.createElement('li');
                const img = document.createElement('img');
                const userBox = document.createElement('div');
                const name = document.createElement('p');
                name.innerHTML = element.Name;
                userBox.setAttribute('class','name');
                img.setAttribute('src',`https://randomuser.me/api/portraits/med/${element.Gender}/${element.Id}.jpg`);
                img.setAttribute('alt',"avatar");
                userBox.appendChild(name);
                li.appendChild(img);
                li.appendChild(userBox);
                document.querySelector('#users ul').appendChild(li);
                
        }
