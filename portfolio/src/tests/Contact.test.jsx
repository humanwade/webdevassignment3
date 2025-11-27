import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest'; 
import { BrowserRouter } from 'react-router-dom';
import Contact from '../features/contact/Contact'; 

describe("Contact Page Unit Test", () => {
    it("renders the contact page title correctly", () => {
        global.fetch = vi.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve({ 
                    phone: "123-456-7890", 
                    email: "test@example.com", 
                    linkedin: "http://linkedin.com" 
                }),
                ok: true
            })
        );
        render(
            <BrowserRouter>
                <Contact />
            </BrowserRouter>
        );

        const titleElement = screen.getByTestId("contact-title");
        expect(titleElement).toHaveTextContent("CONTACT ME");
    });
});