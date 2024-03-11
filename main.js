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
    padding: 0;
    line-height: 1;
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
    display: flex;
    align-items: center;
    justify-content: center;
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


class MessageWidget {
  lastMessageElement = null;
  isNewMessage = true;

  constructor(position = "bottom-right", welcomeMessage = "Welcome to Rejoy Chat", orgId, projectId) {
    this.position = this.getPosition(position);
    this.welcomeMessage = welcomeMessage;
    this.orgId = orgId;
    this.projectId = projectId;
    this.open = false;
    this.initialize();
    this.injectStyles();
  }

  position = "";
  open = false;
  widgetContent = null;

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  async initialize() {
    /**
     * Create and append a div element to the document body
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__hidden", "widget__container");

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();

    /**
     * Append the widget's content and the button to the container
     */
    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);
    this.setupEventListeners();
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
          <header class="widget__header">
          <h3>${this.welcomeMessage}</h3>
      </header>
      <div class="messages__container"></div> <!-- Container for chat messages -->
      <form id="chatForm" class="chat__form">
          <input
              type="text"
              id="chatMessage"
              name="message"
              placeholder="Type your message here..."
              class="chat__input"
              autocomplete="off" /> <!-- Improved input field for typing messages -->
          <button type="submit" class="chat__submit">Send</button>
      </form>
    `;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }
  }

  setupEventListeners() {
    const form = document.getElementById('chatForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputElement = document.getElementById('chatMessage');
      const input = inputElement.value.trim();
      if (input) {
        try {
            await this.fetchChatResponse(input);
        } catch (error) {
            console.error("Failed to fetch chat response.", error);
        }
        inputElement.value = '';
      }
    });
  }

  async fetchChatResponse(inputMessage) {
    console.log("Input message: ", inputMessage)
    if (!inputMessage.trim()) return;

    this.isNewMessage = true;

    this.displayMessage(inputMessage, true);

    const requestParams = new URLSearchParams({
        query: inputMessage,
        project_id: this.projectId,
        org_id: this.orgId,
    });

    const response = await fetch(`https://rejoy-dp-7wy44zlxvq-uc.a.run.app/generate_response?${requestParams}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Rejoy-Widget-Identifier': 'rejoy-widget-identifier',
        }
    });

    if (response.body) {
      const reader = response.body.getReader();
      let accumulatedJson = '';

      try {
          while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              accumulatedJson += new TextDecoder().decode(value, { stream: true });

              try {
                  let endOfObject = accumulatedJson.indexOf('\n') + 1;
                  while (endOfObject) {
                      const jsonString = accumulatedJson.slice(0, endOfObject - 1);
                      accumulatedJson = accumulatedJson.slice(endOfObject);
                      const result = JSON.parse(jsonString);

                      if (result.text) {
                        if (this.isNewMessage) {
                          this.displayMessage(result.text, false);
                          this.isNewMessage = false;
                        } else {
                          this.lastMessageElement.textContent += result.text;
                        }
                      }
                      // Handle other data like images or references as needed

                      endOfObject = accumulatedJson.indexOf('\n') + 1;
                  }
              } catch (error) {
                  console.error('Error parsing JSON:', error);
                  // Handle partial data or parsing error
              }
          }
      } catch (error) {
          console.error('Streaming error:', error);
          // Handle streaming error
      } finally {
          reader.releaseLock();
      }
    }
  }

  displayMessage(message, isUser) {
    const messagesContainer = this.widgetContainer.querySelector('.messages__container');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    newMessage.className = isUser ? 'user-message' : 'bot-message';
    messagesContainer.appendChild(newMessage);

    this.lastMessageElement = newMessage;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

}

function initializeWidget(position = "bottom-right", welcomeMessage = "Welcome to Rejoy Chat", orgId, projectId) {
  return new MessageWidget(position, welcomeMessage, orgId, projectId);
}

initializeWidget("bottom-right", 
                 "Welcome to Rejoy Chat", 
                 "05e6e914-f22a-44cc-b66a-bf82081f539f", 
                 "029516a1-2663-465d-a20c-0d50fe15f30f");
