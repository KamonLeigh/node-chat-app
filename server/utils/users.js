[{
    id:'#yynhhmmhmm',
    name:'Andrew',
    room:'The Office Fans'
}]

//addUser(id, name, room);
//removeUser(id);
//getUser(id);
//getUserList(room);



class Users{
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        const user = this.getUser(id);
    
        if (user) {
          this.users = this.users.filter((user) => user.id !== id);
        }
    
        return user;
      }

    getUser(id){
       return this.users.filter((user)=>user.id === id)[0]  
    
    }

    getUserList(room){
        const users = this.users.filter((user)=> user.room === room);
        const namesArray = users.map((user)=> user.name);

        return namesArray;
    }
}



// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     getUserDesription(){
//         return `${this.name} is ${this.age} years(s) old`
//     }
// }

// const me = new Person('Andrew', 25);
// console.log('this.name', me.name);
// console.log('this.age', me.age);

// const description = me.getUserDesription();

// console.log(description);

module.exports = {Users};

