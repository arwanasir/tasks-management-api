import { formatTaskTitle } from "../utils/formatter.js";

describe('unit test for task title',() =>{
    it('the function should trim and uppercase the title',()=>{
        const input = 'finish lab ';
        expect(formatTaskTitle(input)).toBe("FINISH LAB");        
    });

})