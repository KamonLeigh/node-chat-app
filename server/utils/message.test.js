let expect = require('expect');
let{generateMessage} = require('./message');


describe('generateMessage', ()=>{
    it('should generate correct message object',()=>{
        let from = 'Byron';
        let text = 'This is a text';
        let message = generateMessage(from,text);

        expect(message).toInclude({from, text});
        //expect(message.name).toBe(name)
        //expect(message.text).toBe(text)
        expect(message.createdAt).toBeA('number')
    })      
 });