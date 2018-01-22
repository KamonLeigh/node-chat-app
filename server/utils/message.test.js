let expect = require('expect');
let{generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', ()=>{
    it('should generate correct message object',()=>{
        let from = 'Byron';
        let text = 'This is a text';
        let message = generateMessage(from,text);

        expect(message).toInclude({from, text});
        //expect(message.name).toBe(name)
        //expect(message.text).toBe(text)
        expect(message.createdAt).toBeA('number')
    });     
 });


describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        let from = 'Byron';
        let longitude =-1.0286814;
        let latitude =52.5885828;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let location =generateLocationMessage(from, latitude, longitude);

        expect(location).toInclude({from, url});
        expect(location.createdAt).toBeA('number');
    });
});