class JSONWidget {
    constructor(containerId, textareaId, options, initialContent, nonce) {
        this.container = document.getElementById(containerId);
        this.textarea = document.getElementById(textareaId);
        this.options = options;
        this.initialContent = initialContent;
        this.nonce = nonce;
        this.init();
    }

    init() {
        this.options.onChange = () => {
            const json = this.editor.get();
            this.textarea.value = JSON.stringify(json);
        };

        // Add nonce to any dynamically created style elements
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(document, tagName);
            if (tagName.toLowerCase() === 'style') {
                element.setAttribute('nonce', this.nonce);
            }
            return element;
        }.bind(this);

        this.editor = new JSONEditor(this.container, this.options);
        this.textarea.value = this.initialContent;
        this.editor.set(JSON.parse(this.initialContent));

        // Restore original createElement
        document.createElement = originalCreateElement;
    }
}

// Initialize widgets when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const widgets = document.querySelectorAll('[data-json-widget]');
    widgets.forEach(widget => {
        const containerId = widget.getAttribute('data-container-id');
        const textareaId = widget.getAttribute('data-textarea-id');
        const options = JSON.parse(widget.getAttribute('data-options'));
        const content = widget.textContent;
        const nonce = widget.getAttribute('data-nonce');
        
        new JSONWidget(containerId, textareaId, options, content, nonce);
    });
}); 