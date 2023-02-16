import { cleanup, render } from '@testing-library/react';
import ImageCarousel from "./ImageCarousel";
import { fetchImageUrls } from "../api/index";
import { act } from 'react-dom/test-utils';

describe('Slider', ()=> {

    afterEach(()=> {
        cleanup()
    })

    test('Images loaded', async()=> {  
        await act(async() => {
             const { findAllByText, container } = render(<ImageCarousel />)
             const res = await fetchImageUrls()
             expect(res.length).toBeGreaterThan(1);
     
             const html = await findAllByText(/Loading img/i)
             expect(html.length).toBe(5)

             const imgs = container.querySelector('img')
            
            expect(Object.keys(imgs).length).toBeGreaterThan(1)
           });   
     })

    test("Initial render", () => {
        const { getByText } = render(<ImageCarousel />)
        expect(getByText(/Loading.../i)).toBeInTheDocument();
     });
})

