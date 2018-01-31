const expect = require('expect');
const {isRealString} = require('./validation');

//import 3 drings

//isRealString
  //should reject non-string values 
  //should reject strings with only spaces
  //should allow strings with non-space chracters


  describe('isRealString',()=>{
    it('should reject non-string values', ()=>{
        const result = isRealString(4556);
        expect(result).toBe(false);
    })

    it('should reject strings with no spaces', ()=>{
        const result = isRealString('  ');
        expect(result).toBe(false);
    })
    it('should allow strings with non-space characters', ()=>{
        const result = isRealString(' test ');
        expect(result).toBe(true);
    })
  });