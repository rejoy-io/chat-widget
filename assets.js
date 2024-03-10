export const styles = `
.widget__container * {
    box-sizing: border-box;
}
h3, p, input, textarea, button {
    margin: 0;
    padding: 0;
}
.widget__container {
    box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
    width: 400px;
    overflow: auto;
    position: fixed;
    right: 30px;
    bottom: 30px;
    transition: max-height .2s ease;
    font-family: Helvetica, Arial, sans-serif;
    background-color: #e6e6e6a6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.widget__icon {
    cursor: pointer;
    transition: transform .3s ease;
}
.button__container {
    border: none;
    background-color: #6B46C1; 
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    bottom: -30px;
    right: 10px;
}
.widget__header {
    padding: 1rem 2rem;
    background-color: #6B46C1;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
}
form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.form__field label {
    font-size: 14px;
    margin-bottom: 8px;
}
.form__field input,
.form__field textarea {
    border: 1px solid #000000ad;
    border-radius: 3px;
    padding: 10px;
    background-color: #fff;
}
.form__field input {
    height: 40px;
}
.form__field textarea {
    height: 100px;
    resize: vertical;
}
form button {
    height: 48px;
    border-radius: 6px;
    font-size: 16px;
    background-color: #6B46C1;
    color: #fff;
    border: none;
    cursor: pointer;
}
form button:hover {
    background-color: rgba(107, 70, 193, 0.85);
}
.messages__container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    margin-bottom: 10px;
}
.chat__input {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
}
.chat__submit {
    width: auto;
    padding: 0 20px;
}
.widget__hidden {
    display: none;
}
`;

export const MESSAGE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
`;

export const CLOSE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
`;
