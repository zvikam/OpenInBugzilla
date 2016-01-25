# OpenInBugzilla
Chrome extension that searches configured Bugzilla instances for selected bug number(s)

# Build
(1) Create a private key for signing the extension

(2) Build the extension

    make

# Install
(1) Install extension using the chrome extension manager, 
    or by simply dragging the [.crx] file onto your browser window.

(2) Configure your Bugzilla URL in the extension's "Options" page
    Multiple bugzilla servers are supported.

(3) Whenever a number is "selected" on a page, right-click and follow the menu to open the bug with the corresponding #
    Multiple selection is supported - will open as a "search results" page.
    
# Examples
