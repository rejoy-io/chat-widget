import { styles, CLOSE_ICON, MESSAGE_ICON } from "./assets.js";

class MessageWidget {
  constructor(position = "bottom-right", welcomeMessage = "Welcome to Rejoy Chat") {
    this.position = this.getPosition(position);
    this.welcomeMessage = welcomeMessage;
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
        await this.fetchChatResponse(input);
        inputElement.value = '';
      }
    });
  }

  async fetchChatResponse(inputMessage) {
    console.log("Input message: ", inputMessage)
    if (!inputMessage.trim()) return;

    const orgId = "05e6e914-f22a-44cc-b66a-bf82081f539f";
    const projectId = "029516a1-2663-465d-a20c-0d50fe15f30f";

    this.displayMessage(inputMessage, true);

    const requestParams = new URLSearchParams({
        query: inputMessage,
        project_id: projectId,
        org_id: orgId,
    });

    const response = await fetch(`https://rejoy-dp-7wy44zlxvq-uc.a.run.app/generate_response?${requestParams}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Rejoy-Widget-Identifier': 'rejoy-widget-identifier',
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Chat response: ", data);
        if (data.text) {
            this.displayMessage(data.text, false);
        }
    } else {
        console.error("Failed to fetch chat response.");
    }
  }

  displayMessage(message, isUser) {
    const messagesContainer = this.widgetContainer.querySelector('.messages__container');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    newMessage.className = isUser ? 'user-message' : 'bot-message';
    messagesContainer.appendChild(newMessage);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
