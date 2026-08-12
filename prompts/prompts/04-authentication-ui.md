Read AGENTS.md first and follow it strictly.

Implement the Sign Up screen exactly as shown in the attached design. Then create a matching Sign In screen using the same layout and visual style, but with sign-in copy and no password field. Both screens should use email and social auth UI only. 

Update onboarding so pressing Get Started navigates to the Sign Up screen. 

When the main Sign Up or Sign In button is pressed, show a verification modal saying the user has received an email and should enter the verification code.

The code should be 6 digits, use the number pad, and keep the modal above the keyboard. Entering six digits must only submit a verification request — do not treat digit completion itself as successful authentication. The modal must remain open while verification is pending or when the code is invalid; display any returned error message in the modal. Navigate to the home route (`/`) only after the verification request succeeds.

@prompt_material/03-auth-screen.png