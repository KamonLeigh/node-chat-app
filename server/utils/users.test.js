const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
    let users;
    
    beforeEach(()=>{
        users = new Users();
        users.users =[
            {
                id:'1',
                name:'Mike',
                room:'Node Course'
            },
            {
                id:'2',
                name:'Jen',
                room:'React course'
            },
            {
                id:'3',
                name:'Julie',
                room:'Node Course'
            }
        ];
    })

    it('should add new user', ()=>{
        const users = new Users();
        const user ={
            id:'123',
            name:'Byron',
            room:'secret room'
        };

        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    it('it should find user', ()=>{
        const userList = users.getUser('3');

        expect(userList.name).toEqual(['Julie']);
    });

    it('it should not find user', ()=>{
        const userList = users.getUser('4');

        expect(userList).toNotExist
    });
 
    it('should remove a user', () => {
        const userId = '1';
        const user = users.removeUser(userId);
    
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
      });

    it('should not remove user', ()=>{
        const userList = users.removeUser('4')

        expect(userList).toNotExist;
    });
    it('should return names for node course', ()=>{
        const userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });
    it('should return names for react course', ()=>{
        const userList = users.getUserList('React course');

        expect(userList).toEqual(['Jen']);
    });

});