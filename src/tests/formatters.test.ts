import { formatTaskTitle,createSlug } from "../utils/formatter.js";

describe('unit test for task title',() =>{
    it('the function should trim and uppercase the title',()=>{
        const input = 'finish lab ';
        expect(formatTaskTitle(input)).toBe("FINISH LAB");        
    });
    it("should return a url-friendly slug",()=>{
        const input  = 'final project prep';
        expect(createSlug(input)).toBe('final-project-prep')
    })

})