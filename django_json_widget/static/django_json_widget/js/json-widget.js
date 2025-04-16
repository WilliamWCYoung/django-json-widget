class JSONWidget {
    constructor(containerId, textareaId, options, initialContent) {
        this.container = document.getElementById(containerId);
        this.textarea = document.getElementById(textareaId);
        this.options = options;
        this.initialContent = initialContent;
        this.init();
    }

    init() {
        this.options.onChange = () => {
            const json = this.editor.get();
            this.textarea.value = JSON.stringify(json);
        };

        this.editor = new JSONEditor(this.container, this.options);
        this.textarea.value = this.initialContent;
        this.editor.set(JSON.parse(this.initialContent));
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
        
        new JSONWidget(containerId, textareaId, options, content);
    });
}); 