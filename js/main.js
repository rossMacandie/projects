let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};



let removeSVG = '<svg class="svg-icon" viewBox="0 0 20 20"><path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path></svg>'
let completeSVG = '<svg class="svg-icon" viewBox="0 0 20 20"><path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path></svg>'

renderToDoList();

document.getElementById('add').addEventListener('click', addItem);

document.addEventListener('keypress', function(){
    if(event.keycode === 13 || event.which === 13){
        addItem();
    }
});


function addItem() {
    let value = document.getElementById('item').value;
    if(value){
        addHTML(value);
        document.getElementById('item').value = '';
        
        data.todo.push(value);
        dataObjectUpdated();
    }
}

function renderToDoList() {
    if(!data.todo.length && !data.completed.length) return;

    for(let i = 0; i < data.todo.length; i++){
        let value = data.todo[i];
        addHTML(value,false);
    }

    for(let i = 0; i < data.completed.length; i++){
        let value = data.completed[i];
        addHTML(value, true);
    }
    
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        
    } else{
        data.completed.splice(data.completed.indexOf(value), 1);
        
    }
    
    dataObjectUpdated();
    
    parent.removeChild(item);
}

function completeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
        console.log(data);
    } else{
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
        console.log(data);
    }
    
    dataObjectUpdated();
    
    let target = (parent.id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    
}

function addHTML(text, completed) {
    let list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
    
    let item = document.createElement('li');
    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    remove.addEventListener('click', removeItem);
    
    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    
    // change priority of the items 

    list.insertBefore(item, list.childNodes[0]);

}

// create a function that clears the field after input and implement it 
// TODO


// Organise js file into a module pattern
// TODO